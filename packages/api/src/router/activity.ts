import { Activity } from "@acme/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { eq } from "@acme/db";
import { z } from "zod";

export const activityRouter = createTRPCRouter({
  getActivityByType: publicProcedure
    .input(z.string())
    .query(({ctx, input}) => {
      return ctx.db.query.Activity.findMany({
        where: eq(Activity.type, input),
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
    })
});

export type { Activity } from "@acme/db/schema";
