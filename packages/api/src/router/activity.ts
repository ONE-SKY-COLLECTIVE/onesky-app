import { Activity, RefillWaterContainer } from "@acme/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { and, eq } from "@acme/db";
import { z } from "zod";

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
      return ctx.db.query.Activity.findMany({
        where: eq(Activity.userId, userId)
      });
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
