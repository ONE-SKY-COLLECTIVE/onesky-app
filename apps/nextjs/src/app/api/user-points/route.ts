import { auth } from "@acme/auth";
import { db } from "@acme/db/client";
import { User } from "@acme/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = auth(async (req) => {
  // Check if user is authenticated
  if (!req.auth?.user.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const userId = req.auth.user.id;
    
    // Query the database directly for the user's points
    const user = await db.query.User.findFirst({
      where: eq(User.id, userId),
      columns: {
        points: true
      }
    });

    // Return the points or 0 if not found
    return NextResponse.json({
      points: user?.points ?? 0
    });
  } catch (error) {
    console.error("Failed to fetch user points:", 
      error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Failed to fetch user points" },
      { status: 500 }
    );
  }
}); 