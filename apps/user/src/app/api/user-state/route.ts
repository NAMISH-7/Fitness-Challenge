export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { readUserState, writeUserState } from "@tn/shared/data/db";

export async function GET() {
  try {
    const state = readUserState();
    return NextResponse.json(state);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load user state" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    writeUserState(body);
    return NextResponse.json({ success: true, state: body });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user state" }, { status: 500 });
  }
}
