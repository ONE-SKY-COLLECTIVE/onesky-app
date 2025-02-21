import { Suspense } from "react";
import { ActivityList } from "~/app/_components/activity-list";
import { HydrateClient } from "~/trpc/server";

export default function ActivitiesPage() {
  return (
    <HydrateClient>
      <main className="container h-screen py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-5xl font-extrabold tracking-tight">Activities</h1>
          <Suspense fallback={<div>Loading activities...</div>}>
            <ActivityList />
          </Suspense>
        </div>
      </main>
    </HydrateClient>
  );
} 