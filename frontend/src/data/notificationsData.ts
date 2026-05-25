export type NotifCategory =
  | "friend_request"
  | "friend_accepted"
  | "duel_challenge"
  | "rating_milestone"
  | "rank_milestone"
  | "win_streak"
  | "game_result"
  | "bet_result"
  | "leaderboard"
  | "system";

export interface Notification {
  id: string;
  category: NotifCategory;
  title: string;
  body: string;
  timestamp: string; // ISO string
  read: boolean;
  actionLabel?: string;
  actionNav?: string; // data-nav-* value to emit on action click
  avatarInitials?: string; // for person-based notifs
  avatarColor?: string; // hex
  meta?: string; // small secondary line e.g. "+24 rating"
}

// ── Helper ────────────────────────────────────────────────────────────────────

function ago(minutes: number): string {
  const d = new Date(Date.now() - minutes * 60 * 1000);
  return d.toISOString();
}

// ── Data ──────────────────────────────────────────────────────────────────────

export const notificationsData: Notification[] = [
  // ── Unread / recent ──────────────────────────────────────────────────────────
  {
    id: "n01",
    category: "friend_request",
    title: "Friend request from dp_wizard",
    body: "dp_wizard (2280) wants to add you as a friend.",
    timestamp: ago(5),
    read: false,
    actionLabel: "Accept",
    actionNav: "friends",
    avatarInitials: "DW",
    avatarColor: "#c084fc",
    meta: "Rating 2280 · Master",
  },
  {
    id: "n02",
    category: "duel_challenge",
    title: "Duel challenge from algo_beast",
    body: "algo_beast is challenging you to a Rated Battle right now.",
    timestamp: ago(12),
    read: false,
    actionLabel: "Accept duel",
    actionNav: "game",
    avatarInitials: "AB",
    avatarColor: "#60a5fa",
    meta: "Rating 2341 · Rated",
  },
  {
    id: "n03",
    category: "rating_milestone",
    title: "New personal best rating!",
    body: "You reached 1847 — your highest rating ever on BlitzForces.",
    timestamp: ago(40),
    read: false,
    meta: "↑ 1800 milestone crossed",
  },
  {
    id: "n04",
    category: "win_streak",
    title: "Win streak: 3 in a row 🔥",
    body: "You've won 3 consecutive rated duels. Keep it going!",
    timestamp: ago(90),
    read: false,
    meta: "Best ever: 7",
  },
  {
    id: "n05",
    category: "friend_request",
    title: "Friend request from recursion_k",
    body: "recursion_k (1840) sent you a friend request.",
    timestamp: ago(130),
    read: false,
    actionLabel: "Accept",
    actionNav: "friends",
    avatarInitials: "RK",
    avatarColor: "#4ade80",
    meta: "Rating 1840 · Expert",
  },

  // ── Read / older ─────────────────────────────────────────────────────────────
  {
    id: "n06",
    category: "game_result",
    title: "You defeated debug_lord",
    body: "Solved 1900D (Balanced String) in 31:15. Great performance!",
    timestamp: ago(60 * 6),
    read: true,
    meta: "+38 rating",
  },
  {
    id: "n07",
    category: "friend_accepted",
    title: "code_ninja accepted your request",
    body: "You and code_ninja are now friends.",
    timestamp: ago(60 * 8),
    read: true,
    actionLabel: "View profile",
    actionNav: "profile",
    avatarInitials: "CN",
    avatarColor: "#4ade80",
  },
  {
    id: "n08",
    category: "bet_result",
    title: "Bet won vs code_ninja",
    body: "You won the 100-point bet on problem 1912E.",
    timestamp: ago(60 * 10),
    read: true,
    meta: "+100 bet pts · +18 rating",
  },
  {
    id: "n09",
    category: "leaderboard",
    title: "You entered the top 20!",
    body: "You are now ranked #20 on the BlitzForces leaderboard.",
    timestamp: ago(60 * 24),
    read: true,
    meta: "#20 / 247 players",
  },
  {
    id: "n10",
    category: "game_result",
    title: "Defeat against cp_grinder",
    body: "cp_grinder solved 1850G before you. Better luck next time.",
    timestamp: ago(60 * 26),
    read: true,
    meta: "−12 rating",
  },
  {
    id: "n11",
    category: "rating_milestone",
    title: "1800 milestone reached!",
    body: "Your rating crossed 1800 for the first time. You're an Expert.",
    timestamp: ago(60 * 48),
    read: true,
    meta: "1800+ Expert tier",
  },
  {
    id: "n12",
    category: "duel_challenge",
    title: "Duel challenge from master_coder",
    body: "master_coder challenged you to a Bet Duel (200 pts) on problem 1850H.",
    timestamp: ago(60 * 50),
    read: true,
    meta: "Bet: 200 pts",
    avatarInitials: "MC",
    avatarColor: "#fbbf24",
  },
  {
    id: "n13",
    category: "win_streak",
    title: "Win streak broken",
    body: "Your 4-game win streak ended after the loss to cp_grinder.",
    timestamp: ago(60 * 52),
    read: true,
  },
  {
    id: "n14",
    category: "friend_request",
    title: "Friend request from algo_queen",
    body: "algo_queen (1988) wants to connect.",
    timestamp: ago(60 * 72),
    read: true,
    actionLabel: "View",
    actionNav: "friends",
    avatarInitials: "AQ",
    avatarColor: "#f87171",
    meta: "Rating 1988 · Expert",
  },
  {
    id: "n15",
    category: "system",
    title: "BlitzForces v1.2 update",
    body: "Bet duels are now available. Wager rating points against friends in invite-only matches.",
    timestamp: ago(60 * 96),
    read: true,
    actionLabel: "Learn more",
  },
  {
    id: "n16",
    category: "rank_milestone",
    title: "Rank up: Specialist → Expert",
    body: "Congratulations! You are now ranked Expert (1600+).",
    timestamp: ago(60 * 120),
    read: true,
    meta: "Expert · 1600+",
  },
  {
    id: "n17",
    category: "game_result",
    title: "You defeated master_coder",
    body: "Solved 1850H (The Third Magic) in 31:07. Impressive win!",
    timestamp: ago(60 * 124),
    read: true,
    meta: "+29 rating · Bet won",
  },
];
