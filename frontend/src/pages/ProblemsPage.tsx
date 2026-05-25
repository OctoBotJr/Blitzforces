import { useState, useMemo } from "react";
import Navbar from "../components/layout/Navbar";
import {
  problemsData,
  getProblemStats,
  type ProblemAttempt,
} from "../data/problemsData";
import type { Verdict } from "../types";

// ── Verdict chip (inline) ─────────────────────────────────────────────────────

const VERDICT_STYLE: Record<Verdict, { color: string; bg: string }> = {
  AC: { color: "#4ade80", bg: "rgba(74,222,128,0.15)" },
  WA: { color: "#f87171", bg: "rgba(248,113,113,0.15)" },
  TLE: { color: "#fbbf24", bg: "rgba(251,191,36,0.15)" },
  RE: { color: "#c084fc", bg: "rgba(192,132,252,0.15)" },
  CE: { color: "#94a3b8", bg: "rgba(148,163,184,0.12)" },
  MLE: { color: "#60a5fa", bg: "rgba(96,165,250,0.15)" },
};

function VerdictChip({ verdict, count }: { verdict: Verdict; count: number }) {
  const s = VERDICT_STYLE[verdict];
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-bold font-mono px-2 py-0.5 rounded"
      style={{ color: s.color, background: s.bg }}
    >
      {verdict}
      {count > 1 && <span className="opacity-70">×{count}</span>}
    </span>
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ProblemAttempt["status"] }) {
  if (status === "solved") {
    return (
      <div className="w-7 h-7 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4ade80"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-7 h-7 rounded-full bg-warn/15 flex items-center justify-center flex-shrink-0">
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    </div>
  );
}

// ── Difficulty color ──────────────────────────────────────────────────────────

function diffColor(rating: number) {
  if (rating >= 2400) return { text: "#ff3333", bg: "rgba(255,51,51,0.10)" };
  if (rating >= 2000) return { text: "#c084fc", bg: "rgba(192,132,252,0.10)" };
  if (rating >= 1800) return { text: "#60a5fa", bg: "rgba(96,165,250,0.10)" };
  if (rating >= 1600) return { text: "#4ade80", bg: "rgba(74,222,128,0.10)" };
  return { text: "#888888", bg: "rgba(136,136,136,0.08)" };
}

// ── Difficulty breakdown bar chart ────────────────────────────────────────────

function DifficultyBars({
  stats,
}: {
  stats: ReturnType<typeof getProblemStats>;
}) {
  const maxCount = Math.max(
    ...stats.bands.map((b) => {
      const d = stats.byRating[b];
      return d ? d.solved + d.attempted : 0;
    }),
    1,
  );

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <h3 className="text-[13px] font-bold text-white mb-4">By difficulty</h3>
      <div className="flex flex-col gap-2.5">
        {stats.bands.map((band) => {
          const d = stats.byRating[band] ?? { solved: 0, attempted: 0 };
          const total = d.solved + d.attempted;
          const solvedPct = total > 0 ? (d.solved / maxCount) * 100 : 0;
          const attemptPct = total > 0 ? (d.attempted / maxCount) * 100 : 0;

          return (
            <div key={band} className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-white/30 w-20 flex-shrink-0 text-right">
                {band}
              </span>
              <div className="flex-1 flex gap-0.5 h-5 rounded-md overflow-hidden bg-elevated">
                {d.solved > 0 && (
                  <div
                    className="h-full rounded-l flex items-center justify-end pr-1 transition-all duration-500"
                    style={{
                      width: `${solvedPct}%`,
                      background: "rgba(74,222,128,0.4)",
                    }}
                  >
                    {d.solved > 0 && (
                      <span className="text-[9px] font-bold text-success">
                        {d.solved}
                      </span>
                    )}
                  </div>
                )}
                {d.attempted > 0 && (
                  <div
                    className="h-full flex items-center justify-end pr-1 transition-all duration-500"
                    style={{
                      width: `${attemptPct}%`,
                      background: "rgba(251,191,36,0.25)",
                      borderRadius:
                        d.solved === 0 ? "0.375rem 0 0 0.375rem" : "0",
                    }}
                  >
                    <span className="text-[9px] font-bold text-warn/70">
                      {d.attempted}
                    </span>
                  </div>
                )}
                {total === 0 && (
                  <div className="h-full w-full flex items-center pl-2">
                    <span className="text-[9px] text-white/15">—</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-success/40" />
          <span className="text-[10px] text-white/30">Solved</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-warn/25" />
          <span className="text-[10px] text-white/30">Attempted</span>
        </div>
      </div>
    </div>
  );
}

// ── Problem row ───────────────────────────────────────────────────────────────

function ProblemRow({ problem }: { problem: ProblemAttempt }) {
  const [expanded, setExpanded] = useState(false);
  const dc = diffColor(problem.rating);

  return (
    <>
      <div
        className="grid items-center px-5 py-3 gap-x-4 border-b border-border/50 last:border-b-0 hover:bg-elevated transition-colors cursor-pointer group"
        style={{ gridTemplateColumns: "28px 90px 1fr 80px 80px 120px 60px" }}
        onClick={() => setExpanded((e) => !e)}
      >
        {/* Status icon */}
        <StatusBadge status={problem.status} />

        {/* Problem ID */}
        <div className="flex items-center gap-2">
          <a
            href={problem.cfUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[12px] font-mono font-bold text-accent hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {problem.id}
          </a>
        </div>

        {/* Name + tags */}
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-white truncate">
            {problem.name}
          </p>
          <div className="flex gap-1 flex-wrap mt-0.5">
            {problem.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-white/30 bg-elevated px-1.5 py-0.5 rounded border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <span
          className="text-[12px] font-bold font-mono px-2 py-1 rounded w-fit"
          style={{ color: dc.text, background: dc.bg }}
        >
          {problem.rating}
        </span>

        {/* Attempts */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[12px] font-mono text-white/60">
            {problem.attempts} tries
          </span>
          {problem.solveTime && (
            <span className="text-[10px] font-mono text-success/70">
              {problem.solveTime}
            </span>
          )}
        </div>

        {/* Verdict breakdown */}
        <div className="flex gap-1 flex-wrap">
          {(
            Object.entries(problem.verdictBreakdown) as [Verdict, number][]
          ).map(([v, n]) => (
            <VerdictChip key={v} verdict={v} count={n} />
          ))}
        </div>

        {/* Game indicator */}
        <div className="flex items-center justify-end gap-1">
          {problem.solvedInGame && problem.gameOpponent && (
            <span
              className="text-[10px] font-mono text-white/30"
              title={`vs ${problem.gameOpponent}`}
            >
              ⚔ {problem.gameOpponent}
            </span>
          )}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`text-white/20 transition-transform ${expanded ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Expanded detail row */}
      {expanded && (
        <div className="px-5 py-3 bg-elevated border-b border-border/50 animate-slideDown">
          <div className="flex items-start gap-8 flex-wrap">
            <div>
              <p className="text-[11px] text-white/30 mb-1 uppercase tracking-wider">
                First attempt
              </p>
              <p className="text-[13px] font-mono text-white/60">
                {problem.firstAttempt}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-white/30 mb-1 uppercase tracking-wider">
                Last attempt
              </p>
              <p className="text-[13px] font-mono text-white/60">
                {problem.lastAttempt}
              </p>
            </div>
            {problem.solveTime && (
              <div>
                <p className="text-[11px] text-white/30 mb-1 uppercase tracking-wider">
                  Solve time
                </p>
                <p className="text-[13px] font-mono text-success">
                  {problem.solveTime}
                </p>
              </div>
            )}
            {problem.gameOpponent && (
              <div>
                <p className="text-[11px] text-white/30 mb-1 uppercase tracking-wider">
                  Dueled against
                </p>
                <p className="text-[13px] font-mono text-white/60">
                  {problem.gameOpponent}
                </p>
              </div>
            )}
            <div>
              <p className="text-[11px] text-white/30 mb-1 uppercase tracking-wider">
                All verdicts
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {(
                  Object.entries(problem.verdictBreakdown) as [
                    Verdict,
                    number,
                  ][]
                ).map(([v, n]) => (
                  <div key={v} className="flex items-center gap-1">
                    <VerdictChip verdict={v} count={n} />
                  </div>
                ))}
              </div>
            </div>
            <a
              href={problem.cfUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-auto flex items-center gap-1.5 text-[12px] font-semibold text-accent/70 hover:text-accent transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Open on Codeforces →
            </a>
          </div>
        </div>
      )}
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

type StatusFilter = "all" | "solved" | "attempted";
type SortKey = "date" | "rating" | "attempts";

export default function ProblemsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("date");

  const stats = useMemo(() => getProblemStats(problemsData), []);

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    problemsData.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    let list = [...problemsData];

    if (statusFilter !== "all")
      list = list.filter((p) => p.status === statusFilter);
    if (tagFilter) list = list.filter((p) => p.tags.includes(tagFilter));
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.id.toLowerCase().includes(q) || p.name.toLowerCase().includes(q),
      );
    }

    list.sort((a, b) => {
      if (sortKey === "rating") return b.rating - a.rating;
      if (sortKey === "attempts") return b.attempts - a.attempts;
      return b.lastAttempt.localeCompare(a.lastAttempt);
    });

    return list;
  }, [statusFilter, search, tagFilter, sortKey]);

  return (
    <div className="flex flex-col min-h-screen bg-base font-syne">
      <Navbar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-6 py-8">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-[28px] font-extrabold tracking-tight text-white">
              Problems
            </h1>
            <p className="text-[14px] text-white/40 mt-1 font-mono">
              {stats.solved} solved · {stats.attempted} attempted ·{" "}
              {stats.total} total on BlitzForces
            </p>
          </div>

          {/* Top row: summary + difficulty chart */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {/* Summary cards */}
            <div className="col-span-3 grid grid-cols-3 gap-4">
              {[
                {
                  label: "Solved",
                  value: stats.solved,
                  sub: `${Math.round((stats.solved / stats.total) * 100)}% of attempted`,
                  color: "#4ade80",
                  icon: (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ),
                },
                {
                  label: "Attempted",
                  value: stats.attempted,
                  sub: "Not yet solved",
                  color: "#fbbf24",
                  icon: (
                    <svg
                      width="22"
                      height="22"
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
                },
                {
                  label: "Total",
                  value: stats.total,
                  sub: "Seen in BlitzForces",
                  color: undefined,
                  icon: (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <line x1="3" y1="9" x2="21" y2="9" />
                      <line x1="3" y1="15" x2="21" y2="15" />
                      <line x1="9" y1="3" x2="9" y2="21" />
                    </svg>
                  ),
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 hover:border-border-bright transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-white/30">
                      {card.label}
                    </span>
                    <span
                      style={
                        card.color
                          ? { color: card.color }
                          : { color: "var(--color-text-muted)" }
                      }
                      className="text-white/20"
                    >
                      {card.icon}
                    </span>
                  </div>
                  <p
                    className="text-[32px] font-extrabold font-mono leading-none tracking-tight"
                    style={card.color ? { color: card.color } : {}}
                  >
                    {card.value}
                  </p>
                  <p className="text-[12px] text-white/30">{card.sub}</p>
                </div>
              ))}
            </div>

            {/* Difficulty bars */}
            <DifficultyBars stats={stats} />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px]">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by ID or name..."
                className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-[13px] text-white placeholder:text-white/25 focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Status filter */}
            <div className="flex gap-1 bg-card border border-border rounded-xl p-1">
              {(["all", "solved", "attempted"] as StatusFilter[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 text-[12px] font-semibold rounded-lg capitalize transition-colors ${
                    statusFilter === s
                      ? "bg-accent/15 text-accent"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="px-3.5 py-2.5 bg-card border border-border rounded-xl text-[13px] text-white/60 focus:outline-none focus:border-accent transition-colors cursor-pointer"
            >
              <option value="date">Sort: Recent</option>
              <option value="rating">Sort: Difficulty</option>
              <option value="attempts">Sort: Most attempts</option>
            </select>
          </div>

          {/* Tag pills */}
          <div className="flex gap-1.5 flex-wrap mb-4">
            <button
              onClick={() => setTagFilter(null)}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                tagFilter === null
                  ? "text-accent bg-accent/10 border-accent/30"
                  : "text-white/30 border-border hover:text-white/60"
              }`}
            >
              All tags
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setTagFilter(tag === tagFilter ? null : tag)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                  tagFilter === tag
                    ? "text-accent bg-accent/10 border-accent/30"
                    : "text-white/30 border-border hover:text-white/60"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Problems table */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Column headers */}
            <div
              className="grid px-5 py-2.5 border-b border-border"
              style={{
                gridTemplateColumns: "28px 90px 1fr 80px 80px 120px 60px",
              }}
            >
              {["", "ID", "Problem", "Rating", "Attempts", "Verdicts", ""].map(
                (h, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-bold uppercase tracking-widest text-white/25"
                  >
                    {h}
                  </span>
                ),
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="py-16 text-center text-[13px] text-white/25">
                No problems match this filter
              </div>
            ) : (
              filtered.map((problem) => (
                <ProblemRow key={problem.id} problem={problem} />
              ))
            )}
          </div>

          <p className="text-center text-[11px] text-white/20 font-mono mt-4">
            Showing {filtered.length} of {problemsData.length} problems · Click
            any row to expand
          </p>
        </div>
      </main>
    </div>
  );
}
