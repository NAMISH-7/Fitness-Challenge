export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { readSponsors, writeSponsors } from "@tn/shared/data/db";

export async function GET() {
  try {
    const sponsors = readSponsors();
    return NextResponse.json(sponsors);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load sponsors" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sponsors = readSponsors();
    const index = sponsors.findIndex((s) => s.id === body.id);
    if (index !== -1) {
      sponsors[index] = { ...sponsors[index], ...body };
    } else {
      sponsors.push(body);
    }
    writeSponsors(sponsors);
    return NextResponse.json({ success: true, sponsor: body });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create sponsor" }, { status: 500 });
  }
}
