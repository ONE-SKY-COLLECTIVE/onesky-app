"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { api } from "~/trpc/react";

// Define available activity types (for future use)
const ACTIVITY_TYPES = [
  { value: "refill_water_container", label: "Refill Water Container" },
  { value: "pick_up_trash", label: "Pick Up Trash" },
  { value: "plant_tree", label: "Plant a Tree" }
];

// Default daily limit for refill activities
const DEFAULT_DAILY_LIMIT = 5;

export function AddActivityForm(): JSX.Element {
  const [proofUrl, setProofUrl] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [error, setError] = useState<string>("");
  
  const utils = api.useUtils();
  
  // Get user activities to count how many were done today
  const { data: userActivities } = api.activity.getUserActivities.useQuery(undefined, {
    refetchOnWindowFocus: true,
  });

  // Count today's refill activities
  const todayString = new Date().toISOString().split('T')[0]; // Today in YYYY-MM-DD format
  const todayActivities = userActivities?.filter(
    activity => 
      activity.type === "refill_water_container" && 
      new Date(activity.date).toISOString().split('T')[0] === todayString
  ) ?? [];
  
  const dailyCount = todayActivities.length;
  const dailyLimit = DEFAULT_DAILY_LIMIT;
  const remaining = Math.max(0, dailyLimit - dailyCount);
  const reachedLimit = remaining === 0;
  
  // Calculate potential points based on proof URL
  const potentialPoints = proofUrl ? 50 : 10;
  
  // Use the createRefillActivity endpoint
  const createActivity = api.activity.createRefillActivity.useMutation({
    onSuccess: () => {
      setProofUrl("");
      setDate(new Date());
      setError("");
      void utils.activity.getUserActivities.invalidate();
      
      window.location.reload();
    },
    onError: (error) => {
      console.error("Failed to create activity:", error);
      setError(error.message);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (reachedLimit) {
      setError(`You have reached your daily limit of ${dailyLimit} refills`);
      return;
    }
    
    setError("");
    
    createActivity.mutate({
      proofUrl: proofUrl || undefined,
      date,
      limitPerDay: DEFAULT_DAILY_LIMIT
    });
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-muted p-6">
      <h2 className="mb-4 text-2xl font-bold text-primary">Add New Activity</h2>
      
      <div className={`mb-4 p-2 text-sm rounded ${reachedLimit ? 'bg-destructive/20 text-destructive' : 'bg-muted-foreground/20'}`}>
        <p>
          Today's water refills: {dailyCount}/{dailyLimit}
          {!reachedLimit && remaining > 0 && (
            <span> ({remaining} remaining)</span>
          )}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-2 text-sm rounded bg-destructive/20 text-destructive">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="activityType" 
            className="block text-sm font-medium text-muted-foreground"
          >
            Activity Type
          </label>
          <select
            id="activityType"
            value="refill_water_container"
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            disabled={true}
          >
            {ACTIVITY_TYPES.map((activityType) => (
              <option key={activityType.value} value={activityType.value}>
                {activityType.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-muted-foreground">
            Currently, only "Refill Water Container" is supported.
          </p>
        </div>

        <div>
          <label 
            htmlFor="proofUrl" 
            className="block text-sm font-medium text-muted-foreground"
          >
            Proof URL (Image or Social Media Link - Optional)
          </label>
          <input
            id="proofUrl"
            type="text"
            value={proofUrl}
            onChange={(e): void => setProofUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="https://"
          />
          <p className="mt-1 text-xs text-primary">
            {proofUrl 
              ? `✨ Adding proof will earn you 50 points!` 
              : `Adding proof will earn you 50 points instead of 10`}
          </p>
        </div>

        <div>
          <label 
            htmlFor="date" 
            className="block text-sm font-medium text-muted-foreground"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date.toISOString().split('T')[0]}
            onChange={(e): void => setDate(new Date(e.target.value))}
            className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            required
          />
        </div>

        <button
          type="submit"
          disabled={createActivity.isPending || reachedLimit}
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          {createActivity.isPending 
            ? "Adding..." 
            : reachedLimit 
              ? "Daily Limit Reached" 
              : `Add Activity (+${potentialPoints} points)`}
        </button>
      </form>
    </div>
  );
} 