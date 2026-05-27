export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.resolve("d:/College/Sem 2/Fitness_Challenge/packages/shared/data/proposals.json");

function getProposals() {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]", "utf-8");
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error reading proposals file:", error);
    return [];
  }
}

export async function GET() {
  return NextResponse.json(getProposals());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const proposals = getProposals();

    const newProposal = {
      id: `prop-${Date.now()}`,
      title: body.title || "",
      description: body.description || "",
      date: body.date || "",
      location: body.location || "",
      type: body.type || "virtual",
      organizer: body.organizer || "Student Athlete",
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    proposals.push(newProposal);
    fs.writeFileSync(filePath, JSON.stringify(proposals, null, 2), "utf-8");

    return NextResponse.json({ success: true, proposal: newProposal });
  } catch (error) {
    console.error("Error writing proposal:", error);
    return NextResponse.json({ error: "Failed to write proposal" }, { status: 500 });
  }
}
