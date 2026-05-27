export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { readSponsors } from "@tn/shared/data/db";

export async function GET() {
  try {
    const sponsors = readSponsors();
    return NextResponse.json(sponsors);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load sponsors" }, { status: 500 });
  }
}
