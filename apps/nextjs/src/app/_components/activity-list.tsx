"use client"
import { useSession } from "next-auth/react";

import type { RouterOutputs } from "@acme/api";

import { api } from "~/trpc/react";
import { ActivityProof } from "./ActivityProof";

export function ActivityList() {
  const { status } = useSession();

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg bg-muted p-8">
        <h2 className="text-2xl font-bold text-primary">Please Sign In</h2>
        <p className="mt-2 text-center text-muted-foreground">
          You need to be signed in to view activities
        </p>
      </div>
    );
  }

  // For now, just get refill water container activities since that's all we support
  const [activities] = api.activity.getActivityByType.useSuspenseQuery("refill_water_container");

  if (activities.length === 0) {
    return (
      <div className="relative flex w-full flex-col gap-4">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
          <p className="text-2xl font-bold text-white">
            No refill activities yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}

type ActivityWithRefill = RouterOutputs["activity"]["getActivityByType"][number];

function ActivityCard(props: {
  activity: ActivityWithRefill;
}) {
  const { activity } = props;
  const container = activity.RefillWaterContainer;

  return (
    <div className="flex flex-row rounded-lg bg-muted p-4">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-primary">
          Refill Water Container
        </h2>
        
        {/* Display proof if available */}
        {container && container.proofUrl && (
          <ActivityProof url={container.proofUrl} />
        )}
        
        <p className="mt-2 text-sm">
          Date: {new Date(activity.date).toLocaleDateString()}
        </p>
        <p>Limit per day: {activity.limitPerDay}</p>
      </div>
    </div>
  );
}
