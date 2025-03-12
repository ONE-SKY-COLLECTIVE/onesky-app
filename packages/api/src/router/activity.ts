import type { AnyTRPCRouter } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { and, eq, sql } from "@acme/db";
import { z } from "zod";

import {
  Activity,
  RefillWaterContainer,
  User
} from "@acme/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { ActivityWithRefill } from "./types";


export const activityRouter : AnyTRPCRouter = createTRPCRouter({
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
    
        return user?.points ?? 0;
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
      return await ctx.db.query.Activity.findMany({
        where: eq(Activity.userId, ctx.session.user.id),
        with: {
          RefillWaterContainer: true
        }
      });
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
      limitPerDay: z.number().default(3)
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      
      try {
        // Create the base activity - let the database generate UUID
        const activity = await ctx.db.insert(Activity).values({
          userId: userId,
          date: input.date,
          type: "refill_water_container",
          limitPerDay: input.limitPerDay
        }).returning().execute();
        
        if (!activity[0]) {
          throw new Error("Failed to create activity");
        }
        
        // Create the refill container - let the database generate UUID
        await ctx.db.insert(RefillWaterContainer).values({
          activityId: activity[0].id,
          proofUrl: input.proofUrl ?? null
        }).execute();
        
        // Add points to user
        await ctx.db.update(User)
          .set({
            points: sql`${User.points} + ${input.proofUrl ? 50 : 10}`
          })
          .where(eq(User.id, userId))
          .execute();
          
        return activity[0];
      } catch (error) {
        console.error("Failed to create refill activity:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create refill activity"
        });
      }
    }),

  // Delete a refill activity
  deleteRefillActivity: protectedProcedure
    .input(z.object({
      activityId: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const { activityId } = input;
      const userId = ctx.session.user.id;
      
      // Get the activity to confirm ownership and calculate points
      const rawActivity = await ctx.db.query.Activity.findFirst({
        where: and(
          eq(Activity.id, activityId),
          eq(Activity.userId, userId)
        ),
        with: {
          RefillWaterContainer: true
        }
      });
      
      if (!rawActivity) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Activity not found or you don't have permission to delete it"
        });
      }
      
      const activity = rawActivity as ActivityWithRefill;
      
      // Calculate points to deduct
      const pointsToDeduct = activity.RefillWaterContainer.proofUrl ? 50 : 10;
      
      // Start a transaction
      await ctx.db.transaction(async (tx) => {
        // Delete the RefillWaterContainer
        await tx.delete(RefillWaterContainer)
          .where(eq(RefillWaterContainer.activityId, activityId));
          
        // Delete the activity
        await tx.delete(Activity)
          .where(eq(Activity.id, activityId));
          
        // Deduct points from user
        await tx.update(User)
          .set({
            points: sql`${User.points} - ${pointsToDeduct}`
          })
          .where(eq(User.id, userId));
      });
      
      return { success: true };
    })
});

export type { Activity } from "@acme/db/schema";
