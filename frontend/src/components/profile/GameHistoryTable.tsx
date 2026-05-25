import { useState } from "react";
import { getRatingColor } from "../../utils/rating";

interface GameHistoryTableProps {
  entries: GameHistoryEntry[];
}
type GameHistoryEntry = any;

type Filter = "all" | "won" | "lost" | "bet" | "rated" | "quick";

const FILTER_LABELS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "won", label: "Wins" },
  { key: "lost", label: "Losses" },
  { key: "rated", label: "Rated" },
  { key: "bet", label: "Bets" },
  { key: "quick", label: "Quick" },
];

function getDifficultyStyle(rating: number): { color: string; bg: string } {
  if (rating >= 2400) return { color: "#ff3333", bg: "rgba(255,51,51,0.10)" };
  if (rating >= 2000) return { color: "#c084fc", bg: "rgba(192,132,252,0.10)" };
  if (rating >= 1800) return { color: "#60a5fa", bg: "rgba(96,165,250,0.10)" };
  if (rating >= 1600) return { color: "#4ade80", bg: "rgba(74,222,128,0.10)" };
  return { color: "#888888", bg: "rgba(136,136,136,0.08)" };
}

function GameTypePill({ type }: { type: GameHistoryEntry["gameType"] }) {
  const styles = {
    rated: "text-accent   bg-accent/10   border-accent/25",
    bet: "text-warn     bg-warn/10     border-warn/25",
    quick: "text-info     bg-info/10     border-info/25",
  };
  const labels = { rated: "Rated", bet: "Bet", quick: "Quick" };
  return (
    <span
      className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded border ${styles[type]}`}
    >
      {labels[type]}
    </span>
  );
}

export default function GameHistoryTable({ entries }: GameHistoryTableProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 8;

  const filtered = entries.filter((e) => {
    if (filter === "won") return e.result === "won";
    if (filter === "lost") return e.result === "lost";
    if (filter === "bet") return e.gameType === "bet";
    if (filter === "rated") return e.gameType === "rated";
    if (filter === "quick") return e.gameType === "quick";
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );

  function handleFilter(f: Filter) {
    setFilter(f);
    setPage(0);
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h3 className="text-[15px] font-bold text-white">Game history</h3>
          <p className="text-[12px] text-white/30 mt-0.5 font-mono">
            {entries.length} games total
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {FILTER_LABELS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleFilter(key)}
              className={`text-[12px] font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                filter === key
                  ? "text-accent bg-accent/10 border-accent/30"
                  : "text-white/40 border-border hover:text-white/70 hover:border-border-bright"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[32px_1fr_1fr_90px_80px_70px_64px] gap-x-4 px-5 py-2.5 border-b border-border">
        {["", "Opponent", "Problem", "Type", "Time", "Δ Rating", "Date"].map(
          (h) => (
            <span
              key={h}
              className="text-[11px] font-bold uppercase tracking-widest text-white/25"
            >
              {h}
            </span>
          ),
        )}
      </div>

      {/* Rows */}
      <div className="divide-y divide-border/60">
        {visible.length === 0 ? (
          <div className="py-12 text-center text-[13px] text-white/25">
            No games match this filter
          </div>
        ) : (
          visible.map((entry) => {
            const oppColor = getRatingColor(entry.opponentRating);
            const diffStyle = getDifficultyStyle(entry.problemRating);
            const won = entry.result === "won";

            return (
              <div
                key={entry.id}
                className="grid grid-cols-[32px_1fr_1fr_90px_80px_70px_64px] gap-x-4 items-center px-5 py-3 hover:bg-elevated transition-colors group"
              >
                {/* Result indicator */}
                <div className="flex items-center justify-center">
                  <span
                    className="w-6 h-6 rounded flex items-center justify-center text-[11px] font-extrabold font-mono"
                    style={{
                      color: won ? "#4ade80" : "#f87171",
                      background: won
                        ? "rgba(74,222,128,0.12)"
                        : "rgba(248,113,113,0.12)",
                    }}
                  >
                    {won ? "W" : "L"}
                  </span>
                </div>

                {/* Opponent */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                    style={{ background: oppColor + "22", color: oppColor }}
                  >
                    {entry.opponentInitials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-white truncate group-hover:text-white/90">
                      {entry.opponent}
                    </p>
                    <p
                      className="text-[11px] font-mono"
                      style={{ color: oppColor }}
                    >
                      {entry.opponentRating}
                    </p>
                  </div>
                </div>

                {/* Problem */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-accent flex-shrink-0">
                      {entry.problemId}
                    </span>
                    <span
                      className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded flex-shrink-0"
                      style={{
                        color: diffStyle.color,
                        background: diffStyle.bg,
                      }}
                    >
                      {entry.problemRating}
                    </span>
                  </div>
                  <p className="text-[12px] text-white/40 truncate mt-0.5">
                    {entry.problemName}
                  </p>
                </div>

                {/* Game type */}
                <div>
                  <GameTypePill type={entry.gameType} />
                  {entry.isBet && entry.betAmount && (
                    <p className="text-[10px] font-mono text-warn/60 mt-0.5">
                      ±{entry.betAmount} pts
                    </p>
                  )}
                </div>

                {/* Solve time */}
                <div>
                  {entry.solveTime ? (
                    <span className="text-[13px] font-mono text-white/60">
                      {entry.solveTime}
                    </span>
                  ) : (
                    <span className="text-[12px] text-white/20 italic">—</span>
                  )}
                </div>

                {/* Rating delta */}
                <div>
                  <span
                    className="text-[14px] font-bold font-mono"
                    style={{
                      color: entry.ratingDelta > 0 ? "#4ade80" : "#f87171",
                    }}
                  >
                    {entry.ratingDelta > 0 ? "+" : ""}
                    {entry.ratingDelta}
                  </span>
                </div>

                {/* Date */}
                <div>
                  <span className="text-[11px] font-mono text-white/25">
                    {entry.date.slice(5)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-border">
          <span className="text-[12px] font-mono text-white/25">
            {page * PAGE_SIZE + 1}–
            {Math.min((page + 1) * PAGE_SIZE, filtered.length)} of{" "}
            {filtered.length}
          </span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-3 py-1.5 text-[12px] font-semibold text-white/40 border border-border rounded-lg disabled:opacity-25 hover:text-white hover:border-border-bright transition-colors"
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-8 h-8 text-[12px] font-mono rounded-lg border transition-colors ${
                  page === i
                    ? "text-accent border-accent/40 bg-accent/10"
                    : "text-white/30 border-border hover:text-white hover:border-border-bright"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="px-3 py-1.5 text-[12px] font-semibold text-white/40 border border-border rounded-lg disabled:opacity-25 hover:text-white hover:border-border-bright transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
