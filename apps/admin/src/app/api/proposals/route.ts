export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { readEvents, writeEvents, readSponsors, writeSponsors } from "@tn/shared/data/db";

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

interface Proposal {
  id: string;
  type: string;
  status: string;
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  organizer?: string;
  repName?: string;
  companyName?: string;
  tier?: string;
}

export async function POST(request: Request) {
  try {
    const { id, status } = await request.json();
    const proposals: Proposal[] = getProposals();

    const approvedProposal = proposals.find((prop) => prop.id === id);

    const updated = proposals.map((prop) => {
      if (prop.id === id) {
        return { ...prop, status };
      }
      return prop;
    });

    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), "utf-8");

    // Auto-insert if approved
    if (status === "approved" && approvedProposal) {
      if (approvedProposal.type !== "sponsor") {
        const events = readEvents();
        events.push({
          id: `evt-${Date.now()}`,
          title: approvedProposal.title || "Untitled Event",
          date: approvedProposal.date || new Date().toISOString().split("T")[0],
          location: approvedProposal.location || "Virtual",
          type: (approvedProposal.type as "marathon" | "campus" | "awareness" | "virtual") || "virtual",
          participantCount: 0,
          status: "upcoming",
          isFeatured: false,
          image: "https://images.unsplash.com/photo-1552674605-15c37112ee11?auto=format&fit=crop&q=80",
          organizer: approvedProposal.organizer || approvedProposal.repName || "Student Representative",
          description: approvedProposal.description || "A new community event.",
        });
        writeEvents(events);
      } else if (approvedProposal.type === "sponsor") {
        const sponsors = readSponsors();
        sponsors.push({
          id: `sp-${Date.now()}`,
          name: approvedProposal.companyName || approvedProposal.title || "Unnamed Sponsor",
          tier: (approvedProposal.tier as "platinum" | "gold" | "silver") || "silver",
          logo: "🏢",
          status: "active",
          joinDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
          duration: "1 Year",
          description: approvedProposal.description || "Official Sponsor",
          contribution: "N/A",
        });
        writeSponsors(sponsors);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating proposal status:", error);
    return NextResponse.json({ error: "Failed to update proposal" }, { status: 500 });
  }
}
