-- Create a function to count activities for a user by type and date
CREATE OR REPLACE FUNCTION count_activities_by_type_and_day(
  user_id UUID, 
  activity_type VARCHAR, 
  activity_date TIMESTAMP WITH TIME ZONE
)
RETURNS INTEGER AS $$
DECLARE
  day_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO day_count
  FROM "activity"
  WHERE "user_id" = user_id
    AND "type" = activity_type
    AND DATE("date") = DATE(activity_date);
  
  RETURN day_count;
END;
$$ LANGUAGE plpgsql;

-- Create a table to store activity type limits
CREATE TABLE "activity_type_limit" (
  "type" VARCHAR(255) PRIMARY KEY,
  "limit_per_day" INTEGER NOT NULL
);

-- Insert default activity limits
INSERT INTO "activity_type_limit" ("type", "limit_per_day") VALUES
  ('refill_water_container', 5),
  ('pick_up_trash', 3),
  ('plant_tree', 1);

-- Create a trigger function to check activity limits before insertion
CREATE OR REPLACE FUNCTION check_activity_limit()
RETURNS TRIGGER AS $$
DECLARE
  current_count INTEGER;
  max_limit INTEGER;
BEGIN
  -- Get the daily limit for this activity type
  SELECT "limit_per_day" INTO max_limit
  FROM "activity_type_limit"
  WHERE "type" = NEW."type";
  
  -- If no limit found, use a default value or let it pass
  IF max_limit IS NULL THEN
    max_limit := 1000; -- Default high value if no specific limit
  END IF;
  
  -- Count existing activities for this user/type/day
  current_count := count_activities_by_type_and_day(NEW."user_id", NEW."type", NEW."date");
  
  -- Check if adding this would exceed the limit
  IF current_count >= max_limit THEN
    RAISE EXCEPTION 'Daily limit of % for activity type "%" has been reached', 
      max_limit, NEW."type";
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger on the activity table
CREATE TRIGGER enforce_activity_limit
BEFORE INSERT ON "activity"
FOR EACH ROW
EXECUTE FUNCTION check_activity_limit();

-- Also create a view for daily activity counts (useful for frontend querying)
CREATE OR REPLACE VIEW user_daily_activity_counts AS
SELECT 
  "user_id", 
  "type", 
  DATE("date") as activity_date, 
  COUNT(*) as count,
  MAX("limit_per_day") as limit_per_day
FROM "activity"
GROUP BY "user_id", "type", DATE("date"); 