import fs from 'fs';
import path from 'path';
import { participants, currentUser, Participant, Event, Sponsor } from './mock';

export interface Activity {
  id: string;
  type: string;
  distance: number;
  date: string;
  timestamp: number;
  userId: string;
}

export interface Database {
  users: Participant[];
  activities: Activity[];
}

const DB_PATH = path.join(process.cwd(), '../../packages/shared/data/db.json');

const ACTIVITIES_FILE = path.join(process.cwd(), '../../packages/shared/data/activities.json');
const PROPOSALS_FILE = path.join(process.cwd(), '../../packages/shared/data/proposals.json');
const USER_STATE_FILE = path.join(process.cwd(), '../../packages/shared/data/userState.json');
const EVENTS_FILE = path.join(process.cwd(), '../../packages/shared/data/events.json');
const SPONSORS_FILE = path.join(process.cwd(), '../../packages/shared/data/sponsors.json');

import { events as mockEvents, sponsors as mockSponsors } from "./mock";

export function getDb(): Database {
  if (!fs.existsSync(DB_PATH)) {
    // Initialize DB with sorted users
    const rawInitial = participants.filter((p) => p.id !== currentUser.id).concat(currentUser);
    rawInitial.sort((a, b) => b.distanceKm - a.distanceKm);
    const initialParticipants = rawInitial.map((p, index) => ({
      ...p,
      rank: index + 1,
    }));
    
    const initialDb: Database = {
      users: initialParticipants,
      activities: [],
    };
    
    // Ensure directory exists
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(DB_PATH, JSON.stringify(initialDb, null, 2), 'utf-8');
    return initialDb;
  }
  
  const fileContent = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(fileContent) as Database;
}

// === User State Management ===

export interface UserState {
  registeredEventIds: string[];
  readNotificationIds: string[];
}

const defaultUserState: UserState = {
  registeredEventIds: [],
  readNotificationIds: []
};

export function readUserState(): UserState {
  try {
    if (!fs.existsSync(USER_STATE_FILE)) {
      writeUserState(defaultUserState);
      return defaultUserState;
    }
    const data = fs.readFileSync(USER_STATE_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading user state:", err);
    return defaultUserState;
  }
}

export function writeUserState(state: UserState) {
  try {
    fs.writeFileSync(USER_STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing user state:", err);
  }
}

// === Events Management ===

export function readEvents(): Event[] {
  try {
    if (!fs.existsSync(EVENTS_FILE)) {
      writeEvents(mockEvents);
      return mockEvents;
    }
    const data = fs.readFileSync(EVENTS_FILE, "utf-8");
    return JSON.parse(data) as Event[];
  } catch (err) {
    console.error("Error reading events:", err);
    return mockEvents;
  }
}

export function writeEvents(events: Event[]) {
  try {
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(events, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing events:", err);
  }
}

// === Sponsors Management ===

export function readSponsors(): Sponsor[] {
  try {
    if (!fs.existsSync(SPONSORS_FILE)) {
      writeSponsors(mockSponsors);
      return mockSponsors;
    }
    const data = fs.readFileSync(SPONSORS_FILE, "utf-8");
    return JSON.parse(data) as Sponsor[];
  } catch (err) {
    console.error("Error reading sponsors:", err);
    return mockSponsors;
  }
}

export function writeSponsors(sponsors: Sponsor[]) {
  try {
    fs.writeFileSync(SPONSORS_FILE, JSON.stringify(sponsors, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing sponsors:", err);
  }
}

export function saveDb(data: Database): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
