"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { api } from "~/trpc/react";

export function AddActivityForm(): JSX.Element {
  const [proofUrl, setProofUrl] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  
  const utils = api.useUtils();
  
  const { mutate, isPending } = api.activity.createRefillActivity.useMutation({
    onSuccess: () => {
      setProofUrl("");
      setDate(new Date());
      void utils.activity.getActivityByType.invalidate("refill_water_container");
    },
    onError: (error) => {
      console.error("Failed to create activity:", error);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    mutate({
      proofUrl: proofUrl || undefined,
      date,
      limitPerDay: 1,
    });
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-muted p-6">
      <h2 className="mb-4 text-2xl font-bold text-primary">Add New Refill Activity</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
          disabled={isPending}
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          {isPending ? "Adding..." : "Add Activity"}
        </button>
      </form>
    </div>
  );
} 