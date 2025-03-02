import { Suspense } from "react";
import { ActivityList } from "~/app/_components/activity-list";
import { AddActivityForm } from "~/app/_components/add-activity-form";
import { UserPoints } from "~/app/_components/user-points";
import { HydrateClient } from "~/trpc/server";

export default function ActivitiesPage() {
  return (
    <HydrateClient>
      <main className="container h-screen py-16">
        <div className="flex flex-col items-center justify-center gap-8">
          <h1 className="text-5xl font-extrabold tracking-tight">Activities</h1>
          
          <div className="flex gap-4 w-full justify-center">
            <div className="w-64">
              <UserPoints />
            </div>
          </div>
          
          <AddActivityForm />
          
          <Suspense fallback={<div>Loading activities...</div>}>
            <ActivityList />
          </Suspense>
        </div>
      </main>
    </HydrateClient>
  );
} 