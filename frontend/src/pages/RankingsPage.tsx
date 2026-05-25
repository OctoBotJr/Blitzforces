import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { useRankings, useTopGainers } from "../hooks/useRankings";
import { getRatingColor, getRatingTitle } from "../utils/rating";

const TIER_FILTERS = [
  { key: null, label: "All Tiers" },
  { key: "newbie", label: "Newbie" },
  { key: "pupil", label: "Pupil" },
  { key: "specialist", label: "Specialist" },
  { key: "expert", label: "Expert" },
  { key: "master", label: "Master" },
  { key: "grandmaster", label: "Grandmaster" },
];

function getRankMedal(rank: number): string | null {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return null;
}

function RankBadge({ rank }: { rank: number }) {
  const medal = getRankMedal(rank);
  
  if (medal) {
    return (
      <div className="flex items-center justify-center w-10 h-10">
        <span className="text-[24px]">{medal}</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center w-10 h-10">
      <span className="text-[14px] font-bold font-mono text-white/40">
        #{rank}
      </span>
    </div>
  );
}

export default function RankingsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [tierFilter, setTierFilter] = useState<string | null>(null);
  
  const { data, loading, error } = useRankings(currentPage, tierFilter);
  const { gainers, loading: gainersLoading } = useTopGainers();

  return (
    <div className="flex flex-col min-h-screen bg-base font-syne">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {/* Hero Section */}
          <div className="relative border-b border-border">
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
            <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-gradient-to-br from-accent to-accent-dim opacity-[0.06] rounded-full pointer-events-none" />
            
            <div className="relative z-10 max-w-[1400px] mx-auto px-8 py-12">
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-[36px] font-extrabold tracking-tight mb-2">
                    Global Rankings
                  </h1>
                  <p className="text-[14px] text-white/40 font-mono">
                    Compete globally · Sorted by Blitzforce Points
                  </p>
                </div>
                
                {data && (
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[24px] font-bold font-mono text-accent">
                        {data.pagination.totalUsers.toLocaleString()}
                      </p>
                      <p className="text-[11px] text-white/30 uppercase tracking-wider">
                        Total Players
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto px-8 py-8">
            {/* Top Gainers Section */}
            {!gainersLoading && gainers.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-success"
                  >
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                  <h3 className="text-[15px] font-bold text-white">
                    Top Gainers (Last 7 Days)
                  </h3>
                </div>
                
                <div className="grid grid-cols-5 gap-3">
                  {gainers.map((gainer) => {
                    const color = getRatingColor(gainer.rating);
                    return (
                      <div
                        key={gainer.handle}
                        className="bg-elevated border border-border rounded-xl p-4 hover:border-border-bright transition-colors"
                      >
                        <div className="flex items-center gap-2.5 mb-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                            style={{ background: color + "22", color }}
                          >
                            {gainer.initials}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[13px] font-semibold text-white truncate">
                              {gainer.handle}
                            </p>
                            <p className="text-[11px] font-mono" style={{ color }}>
                              {gainer.rating}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-white/30 font-mono">
                            {gainer.duelsPlayed} duels
                          </span>
                          <span className="text-[14px] font-bold font-mono text-success">
                            +{gainer.pointsGained}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Main Rankings Table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {/* Header with filters */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h3 className="text-[15px] font-bold text-white">
                  Leaderboard
                </h3>
                
                {/* Tier filters */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {TIER_FILTERS.map(({ key, label }) => (
                    <button
                      key={label}
                      onClick={() => {
                        setTierFilter(key);
                        setCurrentPage(1);
                      }}
                      className={`text-[12px] font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                        tierFilter === key
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
              <div className="grid grid-cols-[60px_1fr_120px_100px_100px_100px_100px] gap-x-4 px-6 py-3 border-b border-border bg-elevated/50">
                {["Rank", "Player", "Points", "CF Rating", "Win Rate", "Streak", "Joined"].map(
                  (h) => (
                    <span
                      key={h}
                      className="text-[11px] font-bold uppercase tracking-widest text-white/30"
                    >
                      {h}
                    </span>
                  )
                )}
              </div>

              {/* Loading State */}
              {loading && (
                <div className="py-20 text-center">
                  <div className="inline-block w-10 h-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin mb-3" />
                  <p className="text-white/30 text-[13px] font-mono">
                    Loading rankings...
                  </p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-danger/10 flex items-center justify-center">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-danger"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>
                  <p className="text-danger text-[14px] font-semibold mb-1">
                    Failed to load rankings
                  </p>
                  <p className="text-white/30 text-[12px] font-mono">{error}</p>
                </div>
              )}

              {/* Rankings Rows */}
              {!loading && !error && data && (
                <>
                  <div className="divide-y divide-border/60">
                    {data.rankings.map((entry) => {
                      const color = getRatingColor(entry.rating);
                      const cfColor = getRatingColor(entry.cfRating);
                      
                      return (
                        <div
                          key={entry.handle}
                          className="grid grid-cols-[60px_1fr_120px_100px_100px_100px_100px] gap-x-4 items-center px-6 py-4 hover:bg-elevated transition-colors group cursor-pointer"
                        >
                          {/* Rank */}
                          <div>
                            <RankBadge rank={entry.rank} />
                          </div>

                          {/* Player */}
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                              style={{ background: color + "22", color }}
                            >
                              {entry.initials}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[14px] font-semibold text-white truncate group-hover:text-accent transition-colors">
                                {entry.handle}
                              </p>
                              <p className="text-[11px] text-white/40">
                                {getRatingTitle(entry.cfRating)}
                              </p>
                            </div>
                          </div>

                          {/* Points */}
                          <div>
                            <span
                              className="text-[16px] font-bold font-mono"
                              style={{ color }}
                            >
                              {entry.rating.toLocaleString()}
                            </span>
                          </div>

                          {/* CF Rating */}
                          <div>
                            <span
                              className="text-[14px] font-mono"
                              style={{ color: cfColor }}
                            >
                              {entry.cfRating}
                            </span>
                          </div>

                          {/* Win Rate */}
                          <div>
                            {entry.gamesPlayed > 0 ? (
                              <div className="flex items-center gap-2">
                                <span className="text-[14px] font-bold font-mono text-white/70">
                                  {entry.winRate}%
                                </span>
                                <span className="text-[11px] text-white/30 font-mono">
                                  {entry.gamesWon}W
                                </span>
                              </div>
                            ) : (
                              <span className="text-[12px] text-white/20 italic">
                                No games
                              </span>
                            )}
                          </div>

                          {/* Streak */}
                          <div>
                            {entry.winStreak > 0 ? (
                              <span className="text-[13px] font-bold font-mono text-success">
                                {entry.winStreak} 🔥
                              </span>
                            ) : (
                              <span className="text-[12px] text-white/20">—</span>
                            )}
                          </div>

                          {/* Joined */}
                          <div>
                            <span className="text-[12px] font-mono text-white/30">
                              {entry.joinedDate}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  {data.pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                      <span className="text-[12px] font-mono text-white/30">
                        Page {data.pagination.currentPage} of{" "}
                        {data.pagination.totalPages} · Showing{" "}
                        {data.rankings.length} of {data.pagination.totalUsers}{" "}
                        players
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                          disabled={currentPage === 1}
                          className="px-4 py-2 text-[12px] font-semibold text-white/40 border border-border rounded-lg disabled:opacity-30 hover:text-white hover:border-border-bright transition-colors disabled:hover:text-white/40 disabled:hover:border-border"
                        >
                          ← Previous
                        </button>
                        
                        {/* Page numbers */}
                        {Array.from(
                          { length: Math.min(5, data.pagination.totalPages) },
                          (_, i) => {
                            let pageNum;
                            if (data.pagination.totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (
                              currentPage >=
                              data.pagination.totalPages - 2
                            ) {
                              pageNum = data.pagination.totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                            
                            return (
                              <button
                                key={i}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-10 h-10 text-[12px] font-mono rounded-lg border transition-colors ${
                                  currentPage === pageNum
                                    ? "text-accent border-accent/40 bg-accent/10"
                                    : "text-white/30 border-border hover:text-white hover:border-border-bright"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                        )}
                        
                        <button
                          onClick={() =>
                            setCurrentPage((p) =>
                              Math.min(data.pagination.totalPages, p + 1)
                            )
                          }
                          disabled={
                            currentPage === data.pagination.totalPages
                          }
                          className="px-4 py-2 text-[12px] font-semibold text-white/40 border border-border rounded-lg disabled:opacity-30 hover:text-white hover:border-border-bright transition-colors disabled:hover:text-white/40 disabled:hover:border-border"
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
