-- Add the points column to the user table
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "points" integer NOT NULL DEFAULT 0;

-- Insert default values for activity limits if not already present
INSERT INTO "activity_type_limit" ("type", "limit_per_day")
VALUES 
  ('refill_water_container', 5), 
  ('pick_up_trash', 3),
  ('plant_tree', 1)
ON CONFLICT ("type") DO NOTHING; 