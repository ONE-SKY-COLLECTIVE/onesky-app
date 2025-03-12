"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

interface PointsResponse {
  points: number;
}

export function UserPoints() {
  const { status } = useSession();
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (status === "authenticated") {
      setLoading(true);
      
      // Fetch the user points from our API endpoint
      fetch("/api/user-points")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch points");
          }
          return res.json();
        })
        .then((data: PointsResponse) => {
          // Set points with proper type checking
          setPoints(data.points);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch points:", err);
          setLoading(false);
        });
    }
  }, [status]);

  if (status !== "authenticated") {
    return null;
  }

  return (
    <div className="rounded-lg bg-primary/10 p-3 text-center">
      <h3 className="text-sm font-medium text-muted-foreground">Your Points</h3>
      <p className="text-2xl font-bold text-primary">
        {loading ? "Loading..." : points}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Earn points by adding activities with proof!
      </p>
      <div className="mt-2 text-xs text-primary">
        <p>10 points: Basic activity</p>
        <p>50 points: Activity with proof</p>
      </div>
    </div>
  );
} 