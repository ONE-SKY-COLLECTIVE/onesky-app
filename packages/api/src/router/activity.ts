import { Activity, RefillWaterContainer } from "@acme/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { and, eq } from "@acme/db";
import { z } from "zod";

// Define a type for the activity with optional RefillWaterContainer
interface ActivityWithOptionalRefill {
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
  getActivityByType: publicProcedure
    .input(z.string())
    .query(({ctx, input}) => {
      if (!ctx.session) {
        throw new Error('You must be logged in to access this resource');
      }
      const userId = ctx.session.user.id;
      
      return ctx.db.query.Activity.findMany({
        where: and(
          eq(Activity.type, input),
          eq(Activity.userId, userId)
        ),
        with: {
          RefillWaterContainer: true
        }
      });
    }),

  getUserActivities: publicProcedure
    .query(async ({ ctx }) => {   
      if (!ctx.session) {
        throw new Error('You must be logged in to access this resource');
      }
      const userId = ctx.session.user.id;
      
      // Return all activities for the user with appropriate relations
      // Only include RefillWaterContainer for refill_water_container activities
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
        const activityMap = new Map<string, ActivityWithOptionalRefill>();
        
        // First add all activities
        for (const activity of activities) {
          activityMap.set(activity.id, {
            ...activity,
            RefillWaterContainer: null
          });
        }
        
        // Then replace refill activities with their enriched versions
        for (const activity of refillActivitiesWithContainer) {
          activityMap.set(activity.id, activity as unknown as ActivityWithOptionalRefill);
        }
        
        return Array.from(activityMap.values());
      }
      
      // If no refill activities, just return the basic activities
      return activities.map(activity => ({ 
        ...activity, 
        RefillWaterContainer: null 
      })) as ActivityWithOptionalRefill[];
    }),

  getRefillActivities: publicProcedure
    .query(({ ctx }) => {
      return ctx.db.query.Activity.findMany({
        where: eq(Activity.type, "refill_water_container"),
        with: {
          RefillWaterContainer : true
        }
      });
    }),

  createActivity: publicProcedure
    .input(z.object({
      proofUrl: z.string().optional(),
      limitPerDay: z.number(),
      date: z.date(),
      type: z.string(),
    }))
    .mutation(async ({ctx, input}) => {
      if(!ctx.session){
        throw new Error("You must be logged in to access this resource");
      }

      const [activity] = await ctx.db.insert(Activity).values({
        userId: ctx.session.user.id,
        type: input.type,
        date: input.date,
        limitPerDay: input.limitPerDay,
      }).returning({
        id: Activity.id,
      });

      if (!activity) {
        throw new Error("Failed to create activity");
      }

      // Only create the RefillWaterContainer for specific types
      if (input.type === "refill_water_container" && input.proofUrl) {
        await ctx.db.insert(RefillWaterContainer).values({
          proofUrl: input.proofUrl,
          activityId: activity.id,
        });
      }

      return activity;
    }),

  // Keep the old method for backward compatibility but mark as deprecated
  createRefillActivity: publicProcedure
    .input(z.object({
      proofUrl: z.string().optional(),
      limitPerDay: z.number(),
      date: z.date(),
    }))
    .mutation(async ({ctx, input}) => {
      if(!ctx.session){
        throw new Error("You must be logged in to access this resource");
      }

      const [activity] = await ctx.db.insert(Activity).values({
        userId: ctx.session.user.id,
        type: "refill_water_container",
        date: input.date,
        limitPerDay: input.limitPerDay,
      }).returning({
        id: Activity.id,
      });

      if (!activity) {
        throw new Error("Failed to create activity");
      }

      await ctx.db.insert(RefillWaterContainer).values({
        proofUrl: input.proofUrl,
        activityId: activity.id,
      });

      return activity;
    }),
});

export type { Activity } from "@acme/db/schema";
