// ── User / Rating ────────────────────────────────────────────────────────────

export interface Player {
  handle: string;
  rating: number;
  initials: string;
  country?: string;
  isMe?: boolean;
}

export interface Friend extends Player {
  online: boolean;
  lastSeen: string;
}

export interface LeaderboardEntry extends Player {
  rank: number;
  delta: number;
  flag: string;
}

// ── Game ─────────────────────────────────────────────────────────────────────

export type Verdict = "AC" | "WA" | "TLE" | "RE" | "CE" | "MLE";

export interface Submission {
  id: string;
  verdict: Verdict;
  language: string;
  timeMs: string | null;
  memoryMb: string | null;
  submittedAt: Date;
}

export interface Problem {
  id: string;          // e.g. "1923C"
  name: string;
  contest: string;
  rating: number;
  cfUrl: string;
}

export type BattleType = "quick" | "rated" | "bet";

export interface RecentBattle {
  opponent: string;
  result: "won" | "lost";
  opponentRating: number;
  ratingDelta: number;
  problemId: string;
  difficulty: number;
  duration: string;
}

// ── Profile ───────────────────────────────────────────────────────────────────

export interface RatingPoint {
  date: string;        // ISO date string
  rating: number;
  contestName: string;
  delta: number;
}

export interface ActivityDay {
  date: string;        // ISO date string  e.g. "2024-03-15"
  count: number;       // 0–8+ submissions that day
}

export interface BestWin {
  opponent: string;
  opponentRating: number;
  opponentInitials: string;
  problemId: string;
  problemRating: number;
  solveTime: string;
  ratingGained: number;
  date: string;
}

export interface ProfileStats {
  handle: string;
  displayName: string;
  email: string;
  country: string;
  countryFlag: string;
  joinedDate: string;
  cfHandle: string;
  rating: number;
  maxRating: number;
  rank: string;
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  winStreak: number;
  maxWinStreak: number;
  bestTime: string;           // fastest AC e.g. "4:12"
  bestRank: number;           // best leaderboard rank
  totalBets: number;
  betsWon: number;
  betsLost: number;
  ratingHistory: RatingPoint[];
  activityGrid: ActivityDay[];
  bestWins: BestWin[];
}

// ── Theme ─────────────────────────────────────────────────────────────────────

export type Theme = "dark" | "light";
