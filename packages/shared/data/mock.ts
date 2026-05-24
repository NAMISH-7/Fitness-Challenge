// ============================================
// TN Fitness Challenge — Mock Data
// ============================================
// This file contains all static/mock data used
// throughout the application. In the future, this
// will be replaced with real API calls.
// TODO: [FUTURE] Replace with Firebase/Firestore queries
// TODO: [FUTURE] Add real-time subscriptions for leaderboard
// ============================================

export interface Participant {
  id: string;
  name: string;
  district: string;
  college?: string;
  avatar: string;
  distanceKm: number;
  steps: number;
  streak: number;
  rank: number;
  previousRank: number;
  badges: string[];
  joinedDate: string;
  isVerified: boolean;
}

export interface College {
  id: string;
  name: string;
  district: string;
  totalDistanceKm: number;
  participantCount: number;
  rank: number;
  previousRank: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  type: "marathon" | "campus" | "awareness" | "virtual";
  image?: string;
  participantCount: number;
  maxParticipants?: number;
  isFeatured: boolean;
  status: "upcoming" | "ongoing" | "completed";
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface ActivityEntry {
  id: string;
  type: "run" | "walk" | "cycling";
  distanceKm: number;
  duration: string;
  date: string;
  calories: number;
  pace: string;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalDistanceKm: number;
  totalEvents: number;
  growthPercent: number;
  newUsersThisMonth: number;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: "platinum" | "gold" | "silver";
  logo: string;
  status: "active" | "pending" | "expired";
  joinDate: string;
  duration: string;
  description: string;
  contribution: string;
}

// --- Tamil Nadu Districts ---
const districts = [
  "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
  "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Dindigul",
  "Thanjavur", "Ranipet", "Sivaganga", "Karur", "Namakkal",
  "Tiruppur", "Cuddalore", "Kanchipuram", "Villupuram", "Nagapattinam"
];

const colleges = [
  "Anna University", "IIT Madras", "PSG College of Technology",
  "NIT Trichy", "VIT Vellore", "SRM University", "Loyola College",
  "Madras Christian College", "SSN College", "Amrita University",
  "Thiagarajar College", "Kongu Engineering College", "Karunya University",
  "SASTRA University", "Bharathiar University"
];

const firstNames = [
  "Arun", "Priya", "Karthik", "Divya", "Surya", "Meena", "Ravi",
  "Lakshmi", "Vijay", "Nithya", "Ganesh", "Deepa", "Raj", "Anitha",
  "Mukesh", "Kavitha", "Suresh", "Bharathi", "Prasad", "Revathi",
  "Senthil", "Vani", "Kumar", "Sangeetha", "Manoj", "Pavithra",
  "Ashok", "Janani", "Dinesh", "Ramya", "Bala", "Sathya", "Hari",
  "Thenmozhi", "Vignesh", "Saranya", "Prabhu", "Nandhini", "Arul",
  "Gayathri", "Logesh", "Swathi", "Mohan", "Keerthana", "Naveen",
  "Pooja", "Siva", "Suganya", "Harish", "Madhu"
];

const lastNames = [
  "Krishnan", "Subramanian", "Rajan", "Murugan", "Pandian",
  "Narayanan", "Venkatesh", "Sundaram", "Pillai", "Iyer",
  "Kumar", "Selvam", "Babu", "Durai", "Nathan"
];

const badgePool = [
  "🔥 Streak Master", "🏃 Marathon Runner", "⭐ Top 10", "💎 Diamond Walker",
  "🎯 Goal Crusher", "🏆 Champion", "🌟 Rising Star", "💪 Iron Will",
  "🦅 Eagle Pacer", "👑 District King", "🎖️ Veteran", "⚡ Speed Demon"
];

let seed = 42;
function prng() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(prng() * arr.length)];
}

function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - prng());
  return shuffled.slice(0, n);
}

// === Generate Participants ===
export const participants: Participant[] = Array.from({ length: 50 }, (_, i) => {
  const firstName = firstNames[i % firstNames.length];
  const lastName = pick(lastNames);
  const name = `${firstName} ${lastName}`;
  const rank = i + 1;
  const previousRank = rank + Math.floor(prng() * 5) - 2;
  return {
    id: `user-${i + 1}`,
    name,
    district: districts[i % districts.length],
    college: i < 35 ? colleges[i % colleges.length] : undefined,
    avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    distanceKm: Math.round((300 - i * 4.5 + prng() * 20) * 10) / 10,
    steps: Math.round((450000 - i * 7000 + prng() * 30000)),
    streak: Math.max(1, Math.round(30 - i * 0.5 + prng() * 5)),
    rank,
    previousRank: Math.max(1, previousRank),
    badges: pickN(badgePool, Math.min(1 + Math.floor(prng() * 4), badgePool.length)),
    joinedDate: `2025-${String(Math.floor(prng() * 12) + 1).padStart(2, "0")}-${String(Math.floor(prng() * 28) + 1).padStart(2, "0")}`,
    isVerified: prng() > 0.3,
  };
});

// === Generate College Rankings ===
export const collegeRankings: College[] = colleges.map((name, i) => ({
  id: `college-${i + 1}`,
  name,
  district: districts[i % districts.length],
  totalDistanceKm: Math.round((5000 - i * 280 + prng() * 500) * 10) / 10,
  participantCount: Math.round(80 - i * 4 + prng() * 20),
  rank: i + 1,
  previousRank: Math.max(1, i + 1 + Math.floor(prng() * 3) - 1),
}));

// === Events ===
export const events: Event[] = [
  {
    id: "evt-1",
    title: "Chennai Coastal Marathon 2026",
    description: "Run along the iconic Marina Beach in this flagship 21K and 42K marathon event. Open to all fitness levels with separate categories.",
    date: "2026-07-15",
    location: "Marina Beach, Chennai",
    type: "marathon",
    participantCount: 2400,
    maxParticipants: 5000,
    isFeatured: true,
    status: "upcoming",
  },
  {
    id: "evt-2",
    title: "VIT Campus Challenge",
    description: "Inter-department fitness challenge at VIT Vellore. Track your steps, compete with peers, and win exclusive merch.",
    date: "2026-06-10",
    endDate: "2026-06-17",
    location: "VIT Vellore Campus",
    type: "campus",
    participantCount: 680,
    isFeatured: false,
    status: "upcoming",
  },
  {
    id: "evt-3",
    title: "World Health Day Walkathon",
    description: "A statewide awareness walkathon on World Health Day. Walk 5K in your city and be part of Tamil Nadu's biggest fitness movement.",
    date: "2026-04-07",
    location: "All Districts",
    type: "awareness",
    participantCount: 12000,
    isFeatured: false,
    status: "completed",
  },
  {
    id: "evt-4",
    title: "Virtual 100K Challenge",
    description: "Cover 100 kilometers in 30 days. Track via Google Fit or Apple Health. Complete the challenge and earn a digital NFT badge.",
    date: "2026-06-01",
    endDate: "2026-06-30",
    location: "Virtual — Anywhere in TN",
    type: "virtual",
    participantCount: 3200,
    maxParticipants: 10000,
    isFeatured: true,
    status: "ongoing",
  },
  {
    id: "evt-5",
    title: "Anna University Fitness Fest",
    description: "A week-long fitness festival featuring running, cycling, yoga, and nutrition workshops at Anna University.",
    date: "2026-08-20",
    endDate: "2026-08-27",
    location: "Anna University, Chennai",
    type: "campus",
    participantCount: 450,
    isFeatured: false,
    status: "upcoming",
  },
  {
    id: "evt-6",
    title: "Coimbatore City Run 10K",
    description: "A scenic 10K run through Coimbatore's green corridors. Chip-timed, certified course, medals for all finishers.",
    date: "2026-09-12",
    location: "VOC Park, Coimbatore",
    type: "marathon",
    participantCount: 1800,
    maxParticipants: 3000,
    isFeatured: false,
    status: "upcoming",
  },
  {
    id: "evt-7",
    title: "Diabetes Awareness Walk",
    description: "Join hands with health organizations for a 3K awareness walk promoting diabetes prevention through active living.",
    date: "2026-11-14",
    location: "Madurai",
    type: "awareness",
    participantCount: 0,
    isFeatured: false,
    status: "upcoming",
  },
  {
    id: "evt-8",
    title: "NIT Trichy Sprint Series",
    description: "Weekly sprint challenges for NIT Trichy students. 400m, 800m, and 1500m categories with live timing.",
    date: "2026-07-01",
    endDate: "2026-07-31",
    location: "NIT Trichy Stadium",
    type: "campus",
    participantCount: 320,
    isFeatured: false,
    status: "upcoming",
  },
];

// === Achievements ===
export const achievements: Achievement[] = [
  { id: "ach-1", name: "First Steps", description: "Complete your first tracked walk", icon: "👟", unlocked: true, unlockedDate: "2025-03-15", rarity: "common" },
  { id: "ach-2", name: "10K Club", description: "Cover 10 kilometers total", icon: "🎯", unlocked: true, unlockedDate: "2025-03-22", rarity: "common" },
  { id: "ach-3", name: "50K Milestone", description: "Cover 50 kilometers total", icon: "🏅", unlocked: true, unlockedDate: "2025-04-10", rarity: "common" },
  { id: "ach-4", name: "Century Runner", description: "Cover 100 kilometers total", icon: "💯", unlocked: true, unlockedDate: "2025-05-01", rarity: "rare" },
  { id: "ach-5", name: "Streak Warrior", description: "Maintain a 7-day activity streak", icon: "🔥", unlocked: true, unlockedDate: "2025-04-18", rarity: "rare" },
  { id: "ach-6", name: "Month Master", description: "Stay active every day for a month", icon: "📅", unlocked: true, unlockedDate: "2025-06-01", rarity: "epic" },
  { id: "ach-7", name: "Speed Demon", description: "Run 1K under 5 minutes", icon: "⚡", unlocked: false, rarity: "rare" },
  { id: "ach-8", name: "Marathon Legend", description: "Complete a 42K marathon distance", icon: "🏆", unlocked: false, rarity: "legendary" },
  { id: "ach-9", name: "Top 10", description: "Reach top 10 on the leaderboard", icon: "⭐", unlocked: true, unlockedDate: "2025-05-20", rarity: "epic" },
  { id: "ach-10", name: "Diamond Walker", description: "Cover 500 kilometers total", icon: "💎", unlocked: false, rarity: "legendary" },
  { id: "ach-11", name: "Social Butterfly", description: "Invite 5 friends to join", icon: "🦋", unlocked: false, rarity: "rare" },
  { id: "ach-12", name: "District Champion", description: "Rank #1 in your district", icon: "👑", unlocked: false, rarity: "legendary" },
];

// === Activity Feed (for profile page) ===
export const recentActivities: ActivityEntry[] = [
  { id: "act-1", type: "run", distanceKm: 8.5, duration: "45:30", date: "2026-05-23", calories: 520, pace: "5:21/km" },
  { id: "act-2", type: "walk", distanceKm: 3.2, duration: "35:00", date: "2026-05-22", calories: 180, pace: "10:56/km" },
  { id: "act-3", type: "run", distanceKm: 12.0, duration: "1:02:15", date: "2026-05-21", calories: 740, pace: "5:11/km" },
  { id: "act-4", type: "walk", distanceKm: 5.0, duration: "52:00", date: "2026-05-20", calories: 285, pace: "10:24/km" },
  { id: "act-5", type: "run", distanceKm: 6.3, duration: "33:10", date: "2026-05-19", calories: 390, pace: "5:16/km" },
  { id: "act-6", type: "cycling", distanceKm: 22.5, duration: "58:00", date: "2026-05-18", calories: 610, pace: "2:35/km" },
  { id: "act-7", type: "walk", distanceKm: 4.1, duration: "43:00", date: "2026-05-17", calories: 230, pace: "10:29/km" },
  { id: "act-8", type: "run", distanceKm: 10.0, duration: "52:45", date: "2026-05-16", calories: 615, pace: "5:17/km" },
];

// === Weekly Chart Data (for profile) ===
export const weeklyChartData = [
  { day: "Mon", distance: 5.2, steps: 7800 },
  { day: "Tue", distance: 8.5, steps: 12400 },
  { day: "Wed", distance: 3.1, steps: 4500 },
  { day: "Thu", distance: 12.0, steps: 17200 },
  { day: "Fri", distance: 6.3, steps: 9100 },
  { day: "Sat", distance: 15.2, steps: 21800 },
  { day: "Sun", distance: 4.0, steps: 5800 },
];

// === Monthly Chart Data (for admin) ===
export const monthlyUserGrowth = [
  { month: "Jan", users: 1200, active: 980 },
  { month: "Feb", users: 2100, active: 1750 },
  { month: "Mar", users: 3800, active: 3100 },
  { month: "Apr", users: 5200, active: 4300 },
  { month: "May", users: 7500, active: 6100 },
  { month: "Jun", users: 9800, active: 8200 },
  { month: "Jul", users: 12400, active: 10500 },
  { month: "Aug", users: 14200, active: 11800 },
  { month: "Sep", users: 16800, active: 14000 },
  { month: "Oct", users: 19500, active: 16200 },
  { month: "Nov", users: 22000, active: 18500 },
  { month: "Dec", users: 25000, active: 21000 },
];

// === Admin Stats ===
export const adminStats: AdminStats = {
  totalUsers: 25000,
  activeUsers: 21000,
  totalDistanceKm: 1250000,
  totalEvents: 48,
  growthPercent: 23.5,
  newUsersThisMonth: 3200,
};

// === Sponsors ===
export const sponsors: Sponsor[] = [
  { id: "sp-1", name: "TN Sports Authority", tier: "platinum", logo: "🏛️", status: "active", joinDate: "15 Jan 2025", duration: "5 Years", description: "Official government partner for all district-level sports events and marathons.", contribution: "₹1,50,00,000 + Infrastructure Support" },
  { id: "sp-2", name: "HealthFirst Insurance", tier: "platinum", logo: "🏥", status: "active", joinDate: "20 Feb 2025", duration: "3 Years", description: "Providing comprehensive health coverage and medical camps for all registered participants.", contribution: "₹75,00,000 + Medical Kits" },
  { id: "sp-3", name: "FitGear India", tier: "gold", logo: "👟", status: "active", joinDate: "10 Mar 2025", duration: "1 Year", description: "Supplying official merchandise, t-shirts, and running gear for marathon finishers.", contribution: "₹25,00,000 + Merchandise" },
  { id: "sp-4", name: "NutriLife Foods", tier: "gold", logo: "🥗", status: "active", joinDate: "05 Apr 2025", duration: "2 Years", description: "Providing energy bars, hydration stations, and nutritional guidance across all major events.", contribution: "₹30,00,000" },
  { id: "sp-5", name: "TechRun Wearables", tier: "silver", logo: "⌚", status: "active", joinDate: "12 May 2025", duration: "1 Year", description: "Offering discounted smartwatches to verified college participants to encourage daily tracking.", contribution: "₹10,00,000 + 500 Smartwatches" },
  { id: "sp-6", name: "Chennai Runners Club", tier: "silver", logo: "🏃", status: "pending", joinDate: "01 Jun 2025", duration: "1 Year", description: "A local community club organizing pacing teams and volunteer support for Sunday runs.", contribution: "Volunteer Support" },
  { id: "sp-7", name: "EcoSport Drinks", tier: "silver", logo: "🥤", status: "active", joinDate: "15 Jun 2025", duration: "6 Months", description: "Supplying eco-friendly, biodegradable water cups and electrolyte drinks for the summer series.", contribution: "₹5,00,000 + Beverages" },
  { id: "sp-8", name: "MedPlus Pharmacy", tier: "gold", logo: "💊", status: "expired", joinDate: "10 Jan 2024", duration: "1 Year", description: "Provided first-aid stations and emergency medical vehicles during the 2024 fitness drive.", contribution: "₹20,00,000" },
];

// === User Profile (current user mock) ===
export const currentUser: Participant = {
  id: "user-7",
  name: "Karthik Subramanian",
  district: "Chennai",
  college: "Anna University",
  avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Karthik%20Subramanian",
  distanceKm: 247.3,
  steps: 385000,
  streak: 23,
  rank: 7,
  previousRank: 9,
  badges: ["🔥 Streak Master", "⭐ Top 10", "🎯 Goal Crusher", "💪 Iron Will"],
  joinedDate: "2025-01-15",
  isVerified: true,
};

// === Profile Monthly Stats ===
export const monthlyStats = {
  distanceKm: 87.4,
  distanceGoal: 120,
  steps: 128500,
  stepsGoal: 200000,
  calories: 5430,
  caloriesGoal: 8000,
  activeDays: 23,
  activeDaysGoal: 30,
};

// === Platform-wide Statistics ===
export const platformStats = {
  totalParticipants: 25000,
  totalDistanceKm: 1250000,
  totalColleges: 150,
  totalDistricts: 38,
  totalEvents: 48,
  avgDailyActiveUsers: 8500,
};
