export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { getDb, saveDb, Activity } from '@tn/shared/data/db';
import { currentUser } from '@tn/shared/data/mock';

export async function GET() {
  const db = getDb();
  // Return activities for the current user
  const userActivities = db.activities.filter(a => a.userId === currentUser.id);
  return NextResponse.json(userActivities);
}

export async function POST(request: Request) {
  const body = await request.json();
  const db = getDb();
  
  const newActivity: Activity = {
    ...body,
    id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    timestamp: Date.now(),
    userId: currentUser.id,
  };
  
  db.activities.unshift(newActivity); // Add to beginning
  saveDb(db);
  
  return NextResponse.json(newActivity);
}
