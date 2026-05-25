import type { Verdict } from "../types";

export interface ProblemAttempt {
  id: string; // e.g. "1923C"
  name: string;
  rating: number;
  tags: string[];
  status: "solved" | "attempted" | "unsolved";
  bestVerdict: Verdict | null;
  attempts: number; // total submission count
  solveTime: string | null; // time to first AC
  solvedInGame: boolean; // solved during a BlitzForces duel
  gameOpponent: string | null; // opponent handle if in game
  firstAttempt: string; // date
  lastAttempt: string; // date
  verdictBreakdown: Partial<Record<Verdict, number>>; // verdict → count
  cfUrl: string;
}

export const problemsData: ProblemAttempt[] = [
  {
    id: "1923C",
    name: "Find the Median",
    rating: 1800,
    tags: ["binary search", "greedy"],
    status: "solved",
    bestVerdict: "AC",
    attempts: 3,
    solveTime: "14:32",
    solvedInGame: true,
    gameOpponent: "algo_beast",
    firstAttempt: "2024-06-08",
    lastAttempt: "2024-06-08",
    verdictBreakdown: { CE: 1, WA: 1, AC: 1 },
    cfUrl: "https://codeforces.com/problemset/problem/1923/C",
  },
  {
    id: "1923E",
    name: "Count Paths",
    rating: 2300,
    tags: ["dfs", "trees", "dp"],
    status: "solved",
    bestVerdict: "AC",
    attempts: 5,
    solveTime: "28:14",
    solvedInGame: true,
    gameOpponent: "petr_fan",
    firstAttempt: "2024-05-25",
    lastAttempt: "2024-05-25",
    verdictBreakdown: { WA: 2, TLE: 1, WA: 1, AC: 1 },
    cfUrl: "https://codeforces.com/problemset/problem/1923/E",
  },
  {
    id: "1900D",
    name: "Balanced String",
    rating: 2000,
    tags: ["constructive", "strings"],
    status: "solved",
    bestVerdict: "AC",
    attempts: 4,
    solveTime: "31:15",
    solvedInGame: true,
    gameOpponent: "debug_lord",
    firstAttempt: "2024-06-01",
    lastAttempt: "2024-06-01",
    verdictBreakdown: { WA: 2, RE: 1, AC: 1 },
    cfUrl: "https://codeforces.com/problemset/problem/1900/D",
  },
  {
    id: "1912E",
    name: "Careful Caretaker",
    rating: 1900,
    tags: ["graphs", "dfs"],
    status: "solved",
    bestVerdict: "AC",
    attempts: 2,
    solveTime: "22:41",
    solvedInGame: true,
    gameOpponent: "code_ninja",
    firstAttempt: "2024-05-28",
    lastAttempt: "2024-05-28",
    verdictBreakdown: { WA: 1, AC: 1 },
    cfUrl: "https://codeforces.com/problemset/problem/1912/E",
  },
  {
    id: "1900C",
    name: "Median String",
    rating: 1900,
    tags: ["constructive", "implementation"],
    status: "solved",
    bestVerdict: "AC",
    attempts: 2,
    solveTime: "19:44",
    solvedInGame: true,
    gameOpponent: "algo_queen",
    firstAttempt: "2024-05-21",
    lastAttempt: "2024-05-21",
    verdictBreakdown: { WA: 1, AC: 1 },
    cfUrl: "https://codeforces.com/problemset/problem/1900/C",
  },
  {
    id: "1870C",
    name: "Colorful Graph",
    rating: 1600,
    tags: ["graphs", "dsu"],
    status: "solved",
    bestVerdict: "AC",
    attempts: 1,
    solveTime: "11:03",
    solvedInGame: true,
    gameOpponent: "null_ptr",
    firstAttempt: "2024-05-14",
    lastAttempt: "2024-05-14",
    verdictBreakdown: { AC: 1 },
    cfUrl: "https://codeforces.com/problemset/problem/1870/C",
  },
  {
    id: "1850H",
    name: "The Third Magic",
    rating: 2100,
    tags: ["math", "number theory"],
    status: "solved",
    bestVerdict: "AC",
    attempts: 6,
    solveTime: "31:07",
    solvedInGame: true,
    gameOpponent: "master_coder",
    firstAttempt: "2024-05-10",
    lastAttempt: "2024-05-10",
    verdictBreakdown: { WA: 3, TLE: 1, MLE: 1, AC: 1 },
    cfUrl: "https://codeforces.com/problemset/problem/1850/H",
  },
  {
    id: "1840C",
    name: "Ski Resort",
    rating: 1800,
    tags: ["dp", "greedy"],
    status: "solved",
    bestVerdict: "AC",
    attempts: 3,
    solveTime: "25:19",
    solvedInGame: true,
    gameOpponent: "recursion_k",
    firstAttempt: "2024-05-02",
    lastAttempt: "2024-05-02",
    verdictBreakdown: { WA: 1, TLE: 1, AC: 1 },
    cfUrl: "https://codeforces.com/problemset/problem/1840/C",
  },
  {
    id: "1826E",
    name: "Walk the Runway",
    rating: 2000,
    tags: ["sortings", "dp"],
    status: "solved",
    bestVerdict: "AC",
    attempts: 4,
    solveTime: "33:51",
    solvedInGame: true,
    gameOpponent: "stack_pop",
    firstAttempt: "2024-04-22",
    lastAttempt: "2024-04-22",
    verdictBreakdown: { WA: 2, RE: 1, AC: 1 },
    cfUrl: "https://codeforces.com/problemset/problem/1826/E",
  },
  {
    id: "1811F",
    name: "Is It Flower?",
    rating: 1800,
    tags: ["dfs", "trees", "graphs"],
    status: "solved",
    bestVerdict: "AC",
    attempts: 2,
    solveTime: "18:22",
    solvedInGame: true,
    gameOpponent: "greedy_g",
    firstAttempt: "2024-04-18",
    lastAttempt: "2024-04-18",
    verdictBreakdown: { WA: 1, AC: 1 },
    cfUrl: "https://codeforces.com/problemset/problem/1811/F",
  },
  // Attempted (WA — never solved)
  {
    id: "1850G",
    name: "Icy Perimeter",
    rating: 1600,
    tags: ["bfs", "implementation"],
    status: "attempted",
    bestVerdict: "WA",
    attempts: 4,
    solveTime: null,
    solvedInGame: false,
    gameOpponent: "cp_grinder",
    firstAttempt: "2024-06-05",
    lastAttempt: "2024-06-05",
    verdictBreakdown: { WA: 4 },
    cfUrl: "https://codeforces.com/problemset/problem/1850/G",
  },
  {
    id: "1884D",
    name: "Counting Rhyme",
    rating: 1800,
    tags: ["number theory", "math"],
    status: "attempted",
    bestVerdict: "TLE",
    attempts: 5,
    solveTime: null,
    solvedInGame: false,
    gameOpponent: "fast_typer",
    firstAttempt: "2024-05-18",
    lastAttempt: "2024-05-19",
    verdictBreakdown: { WA: 2, TLE: 3 },
    cfUrl: "https://codeforces.com/problemset/problem/1884/D",
  },
  {
    id: "1862E",
    name: "Kolya and Movie Theatre",
    rating: 1700,
    tags: ["greedy", "dp"],
    status: "attempted",
    bestVerdict: "WA",
    attempts: 3,
    solveTime: null,
    solvedInGame: false,
    gameOpponent: "binary_gg",
    firstAttempt: "2024-05-06",
    lastAttempt: "2024-05-07",
    verdictBreakdown: { CE: 1, WA: 2 },
    cfUrl: "https://codeforces.com/problemset/problem/1862/E",
  },
  {
    id: "1832D",
    name: "Mana Crystals",
    rating: 1700,
    tags: ["dp", "graphs"],
    status: "attempted",
    bestVerdict: "WA",
    attempts: 6,
    solveTime: null,
    solvedInGame: false,
    gameOpponent: "tle_machine",
    firstAttempt: "2024-04-28",
    lastAttempt: "2024-04-29",
    verdictBreakdown: { WA: 4, RE: 2 },
    cfUrl: "https://codeforces.com/problemset/problem/1832/D",
  },
  {
    id: "1798D",
    name: "Surprising Clocks",
    rating: 2100,
    tags: ["math", "number theory", "combinatorics"],
    status: "attempted",
    bestVerdict: "WA",
    attempts: 7,
    solveTime: null,
    solvedInGame: false,
    gameOpponent: "dp_wizard",
    firstAttempt: "2024-04-12",
    lastAttempt: "2024-04-15",
    verdictBreakdown: { WA: 5, TLE: 1, MLE: 1 },
    cfUrl: "https://codeforces.com/problemset/problem/1798/D",
  },
  {
    id: "1750D",
    name: "Challenging Valleys",
    rating: 1600,
    tags: ["implementation", "greedy"],
    status: "attempted",
    bestVerdict: "WA",
    attempts: 3,
    solveTime: null,
    solvedInGame: false,
    gameOpponent: null,
    firstAttempt: "2024-03-20",
    lastAttempt: "2024-03-20",
    verdictBreakdown: { WA: 3 },
    cfUrl: "https://codeforces.com/problemset/problem/1750/D",
  },
  {
    id: "1777C",
    name: "Flexible String",
    rating: 1700,
    tags: ["bitmask", "brute force"],
    status: "attempted",
    bestVerdict: "RE",
    attempts: 4,
    solveTime: null,
    solvedInGame: false,
    gameOpponent: null,
    firstAttempt: "2024-03-10",
    lastAttempt: "2024-03-12",
    verdictBreakdown: { WA: 2, RE: 2 },
    cfUrl: "https://codeforces.com/problemset/problem/1777/C",
  },
  {
    id: "1900F",
    name: "Rare Coins",
    rating: 2200,
    tags: ["combinatorics", "math"],
    status: "attempted",
    bestVerdict: "WA",
    attempts: 8,
    solveTime: null,
    solvedInGame: false,
    gameOpponent: null,
    firstAttempt: "2024-02-18",
    lastAttempt: "2024-02-22",
    verdictBreakdown: { WA: 6, TLE: 2 },
    cfUrl: "https://codeforces.com/problemset/problem/1900/F",
  },
  // Solved outside game
  {
    id: "1760C",
    name: "Advantage",
    rating: 1500,
    tags: ["sortings", "greedy"],
    status: "solved",
    bestVerdict: "AC",
    attempts: 1,
    solveTime: "08:45",
    solvedInGame: false,
    gameOpponent: null,
    firstAttempt: "2024-01-15",
    lastAttempt: "2024-01-15",
    verdictBreakdown: { AC: 1 },
    cfUrl: "https://codeforces.com/problemset/problem/1760/C",
  },
  {
    id: "1742D",
    name: "Coprime",
    rating: 1500,
    tags: ["number theory", "brute force"],
    status: "solved",
    bestVerdict: "AC",
    attempts: 2,
    solveTime: "12:30",
    solvedInGame: false,
    gameOpponent: null,
    firstAttempt: "2024-01-05",
    lastAttempt: "2024-01-05",
    verdictBreakdown: { WA: 1, AC: 1 },
    cfUrl: "https://codeforces.com/problemset/problem/1742/D",
  },
];

// ── Derived stats helpers ──────────────────────────────────────────────────────

export function getProblemStats(problems: ProblemAttempt[]) {
  const solved = problems.filter((p) => p.status === "solved").length;
  const attempted = problems.filter((p) => p.status === "attempted").length;
  const total = problems.length;

  const byTag: Record<string, number> = {};
  problems.forEach((p) =>
    p.tags.forEach((t) => {
      byTag[t] = (byTag[t] ?? 0) + 1;
    }),
  );

  const byRating: Record<string, { solved: number; attempted: number }> = {};
  const bands = [
    "≤1400",
    "1401–1600",
    "1601–1800",
    "1801–2000",
    "2001–2200",
    "2201+",
  ];
  bands.forEach((b) => {
    byRating[b] = { solved: 0, attempted: 0 };
  });

  problems.forEach((p) => {
    let band: string;
    if (p.rating <= 1400) band = "≤1400";
    else if (p.rating <= 1600) band = "1401–1600";
    else if (p.rating <= 1800) band = "1601–1800";
    else if (p.rating <= 2000) band = "1801–2000";
    else if (p.rating <= 2200) band = "2001–2200";
    else band = "2201+";
    if (p.status === "solved") byRating[band].solved++;
    if (p.status === "attempted") byRating[band].attempted++;
  });

  return { solved, attempted, total, byTag, byRating, bands };
}
