ALTER TABLE "refill_water_coontainer" RENAME TO "refill_water_container";--> statement-breakpoint
ALTER TABLE "refill_water_container" DROP CONSTRAINT "refill_water_coontainer_activity_id_activity_id_fk";
--> statement-breakpoint
ALTER TABLE "refill_water_container" ADD CONSTRAINT "refill_water_container_activity_id_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activity"("id") ON DELETE cascade ON UPDATE no action;