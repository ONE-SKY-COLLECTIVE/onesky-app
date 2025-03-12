// Type definitions for activity router

export interface BaseActivity {
  id: string;
  userId: string;
  date: Date;
  type: string;
  limitPerDay: number;
}

export interface RefillActivity extends BaseActivity {
  type: "refill_water_container";
  RefillWaterContainer: {
    id: string; 
    proofUrl: string | null;
    activityId: string;
  };
}

export interface OtherActivity extends BaseActivity {
  type: string; // Any type except "refill_water_container"
}

export type UserActivity = RefillActivity | OtherActivity;

export interface ActivityWithRefill {
  id: string;
  userId: string;
  date: Date;
  type: string;
  limitPerDay: number;
  RefillWaterContainer: {
    id: string;
    proofUrl: string | null;
    activityId: string;
  };
} 