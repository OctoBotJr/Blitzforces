import { useState, useMemo } from "react";
import Navbar from "../components/layout/Navbar";
import {
  notificationsData,
  type Notification,
  type NotifCategory,
} from "../data/notificationsData";

// ── Relative time helper ──────────────────────────────────────────────────────

function relativeTime(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function groupLabel(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 3600) return "Just now";
  if (diff < 86400) return "Today";
  if (diff < 86400 * 2) return "Yesterday";
  if (diff < 86400 * 7) return "This week";
  return "Older";
}

const GROUP_ORDER = ["Just now", "Today", "Yesterday", "This week", "Older"];

// ── Category config ───────────────────────────────────────────────────────────

interface CategoryConfig {
  icon: React.ReactNode;
  color: string; // hex accent
  bg: string; // icon bg
  label: string;
}

function getCategoryConfig(category: NotifCategory): CategoryConfig {
  switch (category) {
    case "friend_request":
      return {
        label: "Friend request",
        color: "#7c6af7",
        bg: "rgba(124,106,247,0.12)",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
        ),
      };
    case "friend_accepted":
      return {
        label: "Friend joined",
        color: "#4ade80",
        bg: "rgba(74,222,128,0.12)",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <polyline points="16 11 18 13 22 9" />
          </svg>
        ),
      };
    case "duel_challenge":
      return {
        label: "Duel",
        color: "#f87171",
        bg: "rgba(248,113,113,0.12)",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="m14.5 17.5-5-5 5-5" />
            <path d="m9.5 6.5 5 5-5 5" />
          </svg>
        ),
      };
    case "rating_milestone":
      return {
        label: "Rating milestone",
        color: "#fbbf24",
        bg: "rgba(251,191,36,0.12)",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        ),
      };
    case "rank_milestone":
      return {
        label: "Rank up",
        color: "#f7c06a",
        bg: "rgba(247,192,106,0.12)",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
          </svg>
        ),
      };
    case "win_streak":
      return {
        label: "Streak",
        color: "#fb923c",
        bg: "rgba(251,146,60,0.12)",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        ),
      };
    case "game_result":
      return {
        label: "Game result",
        color: "#60a5fa",
        bg: "rgba(96,165,250,0.12)",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <path d="M12 12h.01M7 12h.01M17 12h.01" />
          </svg>
        ),
      };
    case "bet_result":
      return {
        label: "Bet settled",
        color: "#34d399",
        bg: "rgba(52,211,153,0.12)",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        ),
      };
    case "leaderboard":
      return {
        label: "Leaderboard",
        color: "#a78bfa",
        bg: "rgba(167,139,250,0.12)",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M18 20V10M12 20V4M6 20v-6" />
          </svg>
        ),
      };
    case "system":
    default:
      return {
        label: "System",
        color: "#94a3b8",
        bg: "rgba(148,163,184,0.10)",
        icon: (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        ),
      };
  }
}

// ── Filter tab config ─────────────────────────────────────────────────────────

type TabFilter =
  | "all"
  | "unread"
  | "friends"
  | "duels"
  | "milestones"
  | "system";

const TAB_FILTERS: {
  key: TabFilter;
  label: string;
  categories?: NotifCategory[];
}[] = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  {
    key: "friends",
    label: "Friends",
    categories: ["friend_request", "friend_accepted"],
  },
  {
    key: "duels",
    label: "Duels",
    categories: ["duel_challenge", "game_result", "bet_result"],
  },
  {
    key: "milestones",
    label: "Milestones",
    categories: [
      "rating_milestone",
      "rank_milestone",
      "win_streak",
      "leaderboard",
    ],
  },
  { key: "system", label: "System", categories: ["system"] },
];

// ── Single notification card ──────────────────────────────────────────────────

interface NotifCardProps {
  notif: Notification;
  onRead: (id: string) => void;
  onDismiss: (id: string) => void;
}

function NotifCard({ notif, onRead, onDismiss }: NotifCardProps) {
  const cfg = getCategoryConfig(notif.category);

  return (
    <div
      className={`relative flex items-start gap-4 px-5 py-4 border-b border-border/50 last:border-b-0 transition-colors group ${
        notif.read
          ? "hover:bg-elevated/50"
          : "bg-accent/[0.03] hover:bg-accent/[0.06]"
      }`}
      onClick={() => !notif.read && onRead(notif.id)}
    >
      {/* Unread indicator dot */}
      {!notif.read && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
      )}

      {/* Icon or avatar */}
      <div className="flex-shrink-0 mt-0.5">
        {notif.avatarInitials ? (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold relative"
            style={{
              background: (notif.avatarColor ?? cfg.color) + "22",
              color: notif.avatarColor ?? cfg.color,
            }}
          >
            {notif.avatarInitials}
            {/* Category badge overlay */}
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-surface"
              style={{ background: cfg.bg, color: cfg.color }}
            >
              {cfg.icon}
            </div>
          </div>
        ) : (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: cfg.bg, color: cfg.color }}
          >
            {cfg.icon}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Category label + time */}
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                style={{ color: cfg.color, background: cfg.bg }}
              >
                {cfg.label}
              </span>
              <span className="text-[11px] text-white/25 font-mono">
                {relativeTime(notif.timestamp)}
              </span>
            </div>

            <p
              className={`text-[14px] font-semibold leading-snug ${notif.read ? "text-white/70" : "text-white"}`}
            >
              {notif.title}
            </p>
            <p className="text-[12px] text-white/40 mt-0.5 leading-relaxed">
              {notif.body}
            </p>

            {/* Meta line */}
            {notif.meta && (
              <p
                className="text-[11px] font-mono mt-1.5"
                style={{ color: cfg.color }}
              >
                {notif.meta}
              </p>
            )}

            {/* Action button */}
            {notif.actionLabel && (
              <button
                {...(notif.actionNav
                  ? { [`data-nav-${notif.actionNav}`]: "true" }
                  : {})}
                className="mt-2.5 px-3.5 py-1.5 text-[12px] font-bold rounded-lg border transition-colors"
                style={{
                  color: cfg.color,
                  borderColor: cfg.color + "44",
                  background: cfg.bg,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onRead(notif.id);
                }}
              >
                {notif.actionLabel}
              </button>
            )}
          </div>

          {/* Dismiss button — appears on hover */}
          <button
            className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 p-1.5 rounded-lg text-white/20 hover:text-white/60 hover:bg-elevated mt-0.5"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss(notif.id);
            }}
            title="Dismiss"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({ tab }: { tab: TabFilter }) {
  const messages: Partial<Record<TabFilter, { icon: string; text: string }>> = {
    unread: { icon: "✓", text: "You're all caught up!" },
    friends: { icon: "👥", text: "No friend notifications" },
    duels: { icon: "⚔️", text: "No duel notifications" },
    milestones: { icon: "🏆", text: "No milestone notifications" },
    system: { icon: "ℹ️", text: "No system notifications" },
    all: { icon: "🔔", text: "No notifications yet" },
  };
  const { icon, text } = messages[tab] ?? messages.all!;

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-white/20">
      <span className="text-[40px]">{icon}</span>
      <p className="text-[14px] font-semibold">{text}</p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>(notificationsData);
  const [tab, setTab] = useState<TabFilter>("all");

  const unreadCount = items.filter((n) => !n.read).length;

  function markRead(id: string) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function dismiss(id: string) {
    setItems((prev) => prev.filter((n) => n.id !== id));
  }

  function dismissAll() {
    const cfg = TAB_FILTERS.find((t) => t.key === tab);
    if (tab === "all") {
      setItems([]);
    } else if (tab === "unread") {
      setItems((prev) => prev.filter((n) => n.read));
    } else if (cfg?.categories) {
      setItems((prev) =>
        prev.filter((n) => !cfg.categories!.includes(n.category)),
      );
    }
  }

  const filtered = useMemo(() => {
    const cfg = TAB_FILTERS.find((t) => t.key === tab);
    if (tab === "unread") return items.filter((n) => !n.read);
    if (cfg?.categories)
      return items.filter((n) => cfg.categories!.includes(n.category));
    return items;
  }, [items, tab]);

  // Group by relative day
  const grouped = useMemo(() => {
    const map: Record<string, Notification[]> = {};
    for (const n of filtered) {
      const label = groupLabel(n.timestamp);
      if (!map[label]) map[label] = [];
      map[label].push(n);
    }
    return GROUP_ORDER.filter((g) => map[g]).map((g) => ({
      label: g,
      items: map[g],
    }));
  }, [filtered]);

  const tabUnreadCounts = useMemo(() => {
    const out: Partial<Record<TabFilter, number>> = {};
    for (const t of TAB_FILTERS) {
      if (t.key === "all") {
        out.all = unreadCount;
        continue;
      }
      if (t.key === "unread") {
        out.unread = unreadCount;
        continue;
      }
      if (t.categories)
        out[t.key] = items.filter(
          (n) => !n.read && t.categories!.includes(n.category),
        ).length;
    }
    return out;
  }, [items, unreadCount]);

  return (
    <div className="flex flex-col min-h-screen bg-base font-syne">
      <Navbar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[780px] mx-auto px-6 py-8">
          {/* Page header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-[28px] font-extrabold tracking-tight text-white">
                Notifications
              </h1>
              <p className="text-[14px] text-white/40 mt-1 font-mono">
                {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
              </p>
            </div>

            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[12px] font-semibold text-white/40 px-3.5 py-2 border border-border rounded-xl hover:text-white hover:border-border-bright transition-colors"
                >
                  Mark all read
                </button>
              )}
              {filtered.length > 0 && (
                <button
                  onClick={dismissAll}
                  className="text-[12px] font-semibold text-danger/60 px-3.5 py-2 border border-border rounded-xl hover:text-danger hover:border-danger/30 transition-colors"
                >
                  Clear {tab === "all" ? "all" : tab}
                </button>
              )}
            </div>
          </div>

          {/* Tab filters */}
          <div className="flex gap-1.5 flex-wrap mb-5">
            {TAB_FILTERS.map(({ key, label }) => {
              const count = tabUnreadCounts[key] ?? 0;
              return (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-semibold rounded-xl border transition-colors ${
                    tab === key
                      ? "text-accent bg-accent/10 border-accent/30"
                      : "text-white/40 border-border hover:text-white/70 hover:border-border-bright"
                  }`}
                >
                  {label}
                  {count > 0 && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                      style={{
                        background:
                          tab === key
                            ? "rgba(124,106,247,0.25)"
                            : "rgba(124,106,247,0.15)",
                        color: "#7c6af7",
                      }}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Notification groups */}
          {grouped.length === 0 ? (
            <EmptyState tab={tab} />
          ) : (
            <div className="flex flex-col gap-5">
              {grouped.map(({ label, items: groupItems }) => (
                <div key={label}>
                  {/* Group header */}
                  <div className="flex items-center gap-3 mb-2 px-1">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-white/25">
                      {label}
                    </span>
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-[11px] font-mono text-white/20">
                      {groupItems.length}
                    </span>
                  </div>

                  {/* Cards container */}
                  <div className="bg-card border border-border rounded-2xl overflow-hidden">
                    {groupItems.map((notif) => (
                      <NotifCard
                        key={notif.id}
                        notif={notif}
                        onRead={markRead}
                        onDismiss={dismiss}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer note */}
          {items.length > 0 && (
            <p className="text-center text-[11px] text-white/15 font-mono mt-8">
              Notifications are kept for 30 days
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
