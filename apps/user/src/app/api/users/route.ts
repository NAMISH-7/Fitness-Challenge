import { NextResponse } from 'next/server';
import { getDb } from '@tn/shared/data/db';

export async function GET() {
  const db = getDb();
  return NextResponse.json(db.users);
}
