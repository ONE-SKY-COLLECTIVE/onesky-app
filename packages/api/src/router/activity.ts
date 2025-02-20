import { Activity } from "@acme/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { eq } from "@acme/db";
import type { TRPCRouterRecord } from "@trpc/server";

export const activityRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.Activity.findMany();
  }),

  getUserActivities: publicProcedure.query(async ({ ctx }) => {   
    if (!ctx.session) {
      throw new Error('You must be logged in to access this resource');
    }
    const userId = ctx.session.user.id;
    console.log(userId);
    
    const activities = await ctx.db.select().from(Activity).where(eq(Activity.userId, userId));

    return activities;
  }),
} satisfies TRPCRouterRecord);
