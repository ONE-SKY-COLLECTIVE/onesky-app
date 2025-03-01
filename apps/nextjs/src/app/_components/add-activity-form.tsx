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

export function AddActivityForm(): JSX.Element {
  const [proofUrl, setProofUrl] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  
  const utils = api.useUtils();
  
  // Use the createRefillActivity endpoint for now as it's simpler
  const createActivity = api.activity.createRefillActivity.useMutation({
    onSuccess: () => {
      setProofUrl("");
      setDate(new Date());
      void utils.activity.getUserActivities.invalidate();
    },
    onError: (error) => {
      console.error("Failed to create activity:", error);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    createActivity.mutate({
      proofUrl: proofUrl || undefined,
      date,
      limitPerDay: 1,
    });
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-muted p-6">
      <h2 className="mb-4 text-2xl font-bold text-primary">Add New Activity</h2>
      
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
          disabled={createActivity.isPending}
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          {createActivity.isPending ? "Adding..." : "Add Activity"}
        </button>
      </form>
    </div>
  );
} 