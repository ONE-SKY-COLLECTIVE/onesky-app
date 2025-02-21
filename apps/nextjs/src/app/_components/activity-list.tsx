"use client";

import type { RouterOutputs } from "@acme/api";
import { api } from "~/trpc/react";

export function ActivityList() {
  const [activities] = api.activity.getActivityByType.useSuspenseQuery("refill_water_container");
console.log(activities);
  if (activities.length === 0) {
    return (
      <div className="relative flex w-full flex-col gap-4">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
          <p className="text-2xl font-bold text-white">No refill activities yet</p>
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

interface RefillWaterContainer {
  proofUrl: string;
}

function ActivityCard(props: {
  activity: RouterOutputs["activity"]["getActivityByType"][number] & {
    RefillWaterContainer?: RefillWaterContainer;
  };
}) {
  const { activity } = props;
  
  return (
    <div className="flex flex-row rounded-lg bg-muted p-4">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-primary">{activity.type}</h2>
        <p className="mt-2 text-sm">
          Date: {new Date(activity.date).toLocaleDateString()}
        </p>
        <p>Limit per day: {activity.limitPerDay}</p>
        {activity.RefillWaterContainer.proofUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={activity.RefillWaterContainer.proofUrl} 
            alt="Proof of refill"
            width={128}
            height={128}
            className="mt-4 object-cover rounded-lg"
          />
        )}
      </div>
    </div>
  );
} 