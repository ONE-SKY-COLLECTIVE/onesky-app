import { TRPCError } from "@trpc/server";
import { and, eq, sql } from "@acme/db";
import { z } from "zod";

import {
  Activity,
  RefillWaterContainer,
  User
} from "@acme/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

// Define a type for the activity with optional RefillWaterContainer
interface ActivityWithRefill {
  id: string;
  userId: string;
  date: Date;
  type: string;
  limitPerDay: number;
  RefillWaterContainer: {
    id: string;
    proofUrl: string | null;
    activityId: string;
  } | null;
}

export const activityRouter = createTRPCRouter({
  // Get user's current points
  getUserPoints: protectedProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.session.user.id;

      try {
        const user = await ctx.db.query.User.findFirst({
          where: eq(User.id, userId),
          columns: {
            points: true
          }
        });
        // Use a definite type assertion to assure TypeScript this is safe
        return (user?.points ?? 0) as number;
      } catch (error) {
        console.error("Failed to fetch user points:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch user points"
        });
      }
    }),

  // Get refill activities only
  getRefillActivities: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        return await ctx.db.query.Activity.findMany({
          where: eq(Activity.type, "refill_water_container"),
          with: {
            RefillWaterContainer: true
          }
        });
      } catch (error) {
        console.error("Failed to fetch refill activities:", error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch activities'
        });
      }
    }),

  // Get activities by type
  getActivityByType: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      
      try {
        return await ctx.db.query.Activity.findMany({
          where: and(
            eq(Activity.type, input),
            eq(Activity.userId, userId)
          ),
          with: {
            RefillWaterContainer: true
          }
        });
      } catch (error) {
        console.error(`Failed to fetch activities of type ${input}:`, error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch activities'
        });
      }
    }),

  // Get all user activities
  getUserActivities: protectedProcedure
    .query(async ({ ctx }) => {   
      const userId = ctx.session.user.id;
      
      try {
        // Return all activities for the user with appropriate relations
        const activities = await ctx.db.query.Activity.findMany({
          where: eq(Activity.userId, userId),
        });
        
        // For refill activities, fetch the related RefillWaterContainer data
        const refillActivities = activities.filter(
          (activity) => activity.type === "refill_water_container"
        );
        
        if (refillActivities.length > 0) {
          const refillActivitiesWithContainer = await ctx.db.query.Activity.findMany({
            where: and(
              eq(Activity.userId, userId),
              eq(Activity.type, "refill_water_container")
            ),
            with: {
              RefillWaterContainer: true
            }
          });
          
          // Replace the refill activities with their enriched versions
          const activityMap = new Map<string, ActivityWithRefill>();
          
          // First add all activities
          for (const activity of activities) {
            activityMap.set(activity.id, {
              ...activity,
              RefillWaterContainer: null
            });
          }
          
          // Then replace refill activities with their enriched versions
          for (const activity of refillActivitiesWithContainer) {
            activityMap.set(activity.id, activity as unknown as ActivityWithRefill);
          }
          
          return Array.from(activityMap.values());
        }
        
        // If no refill activities, just return the basic activities
        return activities.map(activity => ({ 
          ...activity, 
          RefillWaterContainer: null 
        })) as ActivityWithRefill[];
      } catch (error) {
        console.error("Failed to fetch user activities:", error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to fetch activities'
        });
      }
    }),

  // Create generic activity
  createActivity: protectedProcedure
    .input(z.object({
      proofUrl: z.string().optional(),
      date: z.date(),
      type: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      
      try {
        // The trigger we created will enforce the daily limit automatically
        try {
          const [activity] = await ctx.db.insert(Activity).values({
            userId: userId,
            type: input.type,
            date: input.date,
            limitPerDay: 5, // Default limit, will be overridden by DB trigger
          }).returning({
            id: Activity.id,
          });

          if (!activity) {
            throw new Error("Failed to create activity");
          }

          // Calculate points to award based on proof URL
          const pointsToAward = input.proofUrl ? 50 : 10;
          
          // Only create the RefillWaterContainer for specific types
          if (input.type === "refill_water_container" && input.proofUrl) {
            await ctx.db.insert(RefillWaterContainer).values({
              proofUrl: input.proofUrl,
              activityId: activity.id,
            });
          }
          
          // Award points to the user
          await ctx.db
            .update(User)
            .set({
              points: sql`${User.points} + ${pointsToAward}`
            })
            .where(eq(User.id, userId));

          return activity;
        } catch (error) {
          // Catch database trigger exceptions
          const errorMessage = error instanceof Error ? error.message : String(error);
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: errorMessage
          });
        }
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("Failed to create activity:", error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create activity'
        });
      }
    }),

  // Specialized endpoint for refill activities
  createRefillActivity: protectedProcedure
    .input(z.object({
      proofUrl: z.string().optional(),
      date: z.date(),
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const activityType = "refill_water_container";
      
      try {
        // The trigger we created will enforce the daily limit automatically
        try {
          const [activity] = await ctx.db.insert(Activity).values({
            userId: userId,
            type: activityType,
            date: input.date,
            limitPerDay: 5, // Default limit, will be overridden by DB trigger
          }).returning({
            id: Activity.id,
          });

          if (!activity) {
            throw new Error("Failed to create activity");
          }

          // Calculate points to award based on proof URL
          const pointsToAward = input.proofUrl ? 50 : 10;

          await ctx.db.insert(RefillWaterContainer).values({
            proofUrl: input.proofUrl,
            activityId: activity.id,
          });
          
          // Award points to the user
          await ctx.db
            .update(User)
            .set({
              points: sql`${User.points} + ${pointsToAward}`
            })
            .where(eq(User.id, userId));

          return activity;
        } catch (error) {
          // Catch database trigger exceptions
          const errorMessage = error instanceof Error ? error.message : String(error);
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: errorMessage
          });
        }
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("Failed to create refill activity:", error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create refill activity'
        });
      }
    }),
});

export type { Activity } from "@acme/db/schema";
