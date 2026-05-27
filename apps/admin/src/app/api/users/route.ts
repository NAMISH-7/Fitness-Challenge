export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@tn/shared/data/db';

export async function GET() {
  const db = getDb();
  
  // Calculate dynamic distances based on logged activities
  const dynamicUsers = db.users.map((user) => {
    const userActivities = db.activities.filter(a => a.userId === user.id);
    const totalLoggedDistance = userActivities.reduce((acc, curr) => acc + curr.distance, 0);
    
    return {
      ...user,
      distanceKm: user.distanceKm + totalLoggedDistance,
    };
  });
  
  // Re-sort and rank based on new total distance
  dynamicUsers.sort((a, b) => b.distanceKm - a.distanceKm);
  
  const rankedUsers = dynamicUsers.map((user, index) => ({
    ...user,
    rank: index + 1,
  }));
  
  return NextResponse.json(rankedUsers);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { action, id } = body;
  const db = getDb();
  
  if (action === 'delete') {
    db.users = db.users.filter(u => u.id !== id);
  } else if (action === 'toggleVerify') {
    db.users = db.users.map(u => u.id === id ? { ...u, isVerified: !u.isVerified } : u);
  }
  
  saveDb(db);
  
  return NextResponse.json({ success: true });
}
