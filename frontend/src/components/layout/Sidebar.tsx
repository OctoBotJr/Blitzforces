import { useState } from "react";
import { useRankings } from "../../hooks/useRankings";
import { useAuth } from "../../context/AuthContext";
import { getRatingColor } from "../../utils/rating";

const RANK_MEDALS = ["🥇", "🥈", "🥉"];

type Tab = "leaderboard" | "friends";

export default function Sidebar() {
  const [tab, setTab] = useState<Tab>("leaderboard");

  const { data, loading, error } = useRankings(1);
  const { user } = useAuth();

  const leaderboard =
    data?.rankings.slice(0, 10).map((entry) => ({
      rank: entry.rank,
      handle: entry.handle,
      rating: entry.rating,
      initials: entry.initials,
      delta: 0,
      flag: "🌍",
      isMe: user?.cfHandle === entry.handle,
    })) ?? [];

  return (
    <aside className="w-[280px] flex-shrink-0 bg-surface border-r border-border flex flex-col h-[calc(100vh-60px)] sticky top-[60px]">
      {/* Tabs */}
      <div className="flex border-b border-border">
        {(["leaderboard", "friends"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[13px] font-semibold border-b-2 transition-colors ${tab === t
                ? "text-accent border-accent"
                : "text-white/30 border-transparent hover:text-white/60"
              }`}
          >
            {t === "leaderboard" ? (
              <>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                Rankings
              </>
            ) : (
              <>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Friends
              </>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-0.5">
        {tab === "leaderboard" && (
          <>
            <div className="flex items-center justify-between px-2 py-2">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/25">
                Global leaderboard
              </p>

              <button
                onClick={() => window.location.reload()}
                className="text-[10px] text-white/30 hover:text-accent transition-colors"
              >
                refresh
              </button>
            </div>

            {loading && (
              <div className="px-2 py-3 text-xs text-white/40">
                Loading rankings...
              </div>
            )}

            {error && (
              <div className="px-2 py-3 text-xs text-red-400">
                Failed to load rankings
              </div>
            )}

            {!loading &&
              !error &&
              leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-2 px-2 py-2 rounded-lg transition-colors ${entry.isMe
                      ? "bg-accent/10 border border-accent/20"
                      : "hover:bg-elevated"
                    }`}
                >
                  {/* Rank */}
                  <span className="w-7 text-center text-[12px] font-mono text-white/30 flex-shrink-0">
                    {entry.rank <= 3
                      ? RANK_MEDALS[entry.rank - 1]
                      : `#${entry.rank}`}
                  </span>

                  {/* Flag */}
                  <span className="text-[14px] flex-shrink-0">
                    {entry.flag}
                  </span>

                  {/* Handle */}
                  <span className="flex-1 text-[13px] font-semibold text-white truncate flex items-center gap-1.5">
                    {entry.handle}

                    {entry.isMe && <span className="badge-you">you</span>}
                  </span>

                  {/* Rating */}
                  <div className="flex flex-col items-end gap-0.5">
                    <span
                      className="text-[13px] font-bold font-mono"
                      style={{
                        color: getRatingColor(entry.rating),
                      }}
                    >
                      {entry.rating}
                    </span>
                  </div>
                </div>
              ))}

            {!loading && !error && (
              <button className="mt-2 w-full py-2.5 text-[12px] font-semibold text-white/25 border border-dashed border-border rounded-lg hover:text-accent hover:border-accent transition-colors">
                View full leaderboard →
              </button>
            )}
          </>
        )}

        {tab === "friends" && (
          <div className="flex items-center justify-center h-full text-sm text-white/40 px-4 text-center">
            Friends system coming soon.
          </div>
        )}
      </div>
    </aside>
  );
}
