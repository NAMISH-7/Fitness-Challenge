export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { readEvents } from "@tn/shared/data/db";

export async function GET() {
  try {
    const events = readEvents();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load events" }, { status: 500 });
  }
}
