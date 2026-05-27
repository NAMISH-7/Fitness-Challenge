export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { readEvents, writeEvents } from "@tn/shared/data/db";

export async function GET() {
  try {
    const events = readEvents();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load events" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const events = readEvents();
    events.push(body);
    writeEvents(events);
    return NextResponse.json({ success: true, event: body });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    let events = readEvents();
    events = events.filter((e) => e.id !== id);
    writeEvents(events);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
