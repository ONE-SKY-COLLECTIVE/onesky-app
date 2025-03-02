# Database Migrations

This directory contains database migration scripts to set up various features in the database.

## Activity Limits Migration

The activity limits migration adds database-level enforcement of daily activity limits. This ensures that users cannot exceed their daily limit for any activity type, even if they bypass the API constraints.

### What it does

1. Creates a `count_activities_by_type_and_day` function to count activities by user, type, and day
2. Creates an `activity_type_limit` table to store the daily limits for each activity type
3. Inserts default limits (5 for water refills, 3 for trash pickup, 1 for tree planting)
4. Creates a trigger function `check_activity_limit` to enforce the limits
5. Adds a trigger on the `activity` table that prevents inserting an activity when the user has reached their daily limit
6. Creates a view `user_daily_activity_counts` that shows the count of activities per user, type, and day

### How to run it

```bash
# Navigate to the db package
cd packages/db

# Run the migration
npm run db:migrate
```

## Usage in the API

The API has been updated to work with these database constraints:

1. It gets activity limits from the `activity_type_limit` table
2. It catches and handles database exceptions when a user tries to exceed their daily limit
3. It uses the `count_activities_by_type_and_day` function to get the current count

## Extending for New Activity Types

To add a new activity type with its own limit:

1. Insert a new row into the `activity_type_limit` table:

```sql
INSERT INTO "activity_type_limit" ("type", "limit_per_day") 
VALUES ('new_activity_type', 10);
```

2. The database trigger will automatically enforce this new limit.

## Changing Limits

To change the limit for an existing activity type:

```sql
UPDATE "activity_type_limit" 
SET "limit_per_day" = 10
WHERE "type" = 'refill_water_container';
```

The new limit will be enforced immediately for all new activities. 