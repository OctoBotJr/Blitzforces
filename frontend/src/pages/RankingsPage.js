import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
function getRankMedal(rank) {
    if (rank === 1)
        return "🥇";
    if (rank === 2)
        return "🥈";
    if (rank === 3)
        return "🥉";
    return null;
}
function RankBadge({ rank }) {
    const medal = getRankMedal(rank);
    if (medal) {
        return (_jsx("div", { className: "flex items-center justify-center w-10 h-10", children: _jsx("span", { className: "text-[24px]", children: medal }) }));
    }
    return (_jsx("div", { className: "flex items-center justify-center w-10 h-10", children: _jsxs("span", { className: "text-[14px] font-bold font-mono text-white/40", children: ["#", rank] }) }));
}
export default function RankingsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [tierFilter, setTierFilter] = useState(null);
    const { data, loading, error } = useRankings(currentPage, tierFilter);
    const { gainers, loading: gainersLoading } = useTopGainers();
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-base font-syne", children: [_jsx(Navbar, {}), _jsxs("div", { className: "flex flex-1 overflow-hidden", children: [_jsx(Sidebar, {}), _jsxs("main", { className: "flex-1 overflow-y-auto", children: [_jsxs("div", { className: "relative border-b border-border", children: [_jsx("div", { className: "absolute inset-0 bg-grid opacity-20 pointer-events-none" }), _jsx("div", { className: "absolute -right-20 -top-20 w-[400px] h-[400px] bg-gradient-to-br from-accent to-accent-dim opacity-[0.06] rounded-full pointer-events-none" }), _jsx("div", { className: "relative z-10 max-w-[1400px] mx-auto px-8 py-12", children: _jsxs("div", { className: "flex items-end justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-[36px] font-extrabold tracking-tight mb-2", children: "Global Rankings" }), _jsx("p", { className: "text-[14px] text-white/40 font-mono", children: "Compete globally \u00B7 Sorted by Blitzforce Points" })] }), data && (_jsx("div", { className: "flex items-center gap-4", children: _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-[24px] font-bold font-mono text-accent", children: data.pagination.totalUsers.toLocaleString() }), _jsx("p", { className: "text-[11px] text-white/30 uppercase tracking-wider", children: "Total Players" })] }) }))] }) })] }), _jsxs("div", { className: "max-w-[1400px] mx-auto px-8 py-8", children: [!gainersLoading && gainers.length > 0 && (_jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 mb-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", className: "text-success", children: [_jsx("polyline", { points: "23 6 13.5 15.5 8.5 10.5 1 18" }), _jsx("polyline", { points: "17 6 23 6 23 12" })] }), _jsx("h3", { className: "text-[15px] font-bold text-white", children: "Top Gainers (Last 7 Days)" })] }), _jsx("div", { className: "grid grid-cols-5 gap-3", children: gainers.map((gainer) => {
                                                    const color = getRatingColor(gainer.rating);
                                                    return (_jsxs("div", { className: "bg-elevated border border-border rounded-xl p-4 hover:border-border-bright transition-colors", children: [_jsxs("div", { className: "flex items-center gap-2.5 mb-3", children: [_jsx("div", { className: "w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0", style: { background: color + "22", color }, children: gainer.initials }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: "text-[13px] font-semibold text-white truncate", children: gainer.handle }), _jsx("p", { className: "text-[11px] font-mono", style: { color }, children: gainer.rating })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-[11px] text-white/30 font-mono", children: [gainer.duelsPlayed, " duels"] }), _jsxs("span", { className: "text-[14px] font-bold font-mono text-success", children: ["+", gainer.pointsGained] })] })] }, gainer.handle));
                                                }) })] })), _jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border", children: [_jsx("h3", { className: "text-[15px] font-bold text-white", children: "Leaderboard" }), _jsx("div", { className: "flex items-center gap-1.5 flex-wrap", children: TIER_FILTERS.map(({ key, label }) => (_jsx("button", { onClick: () => {
                                                                setTierFilter(key);
                                                                setCurrentPage(1);
                                                            }, className: `text-[12px] font-semibold px-3 py-1.5 rounded-lg border transition-colors ${tierFilter === key
                                                                ? "text-accent bg-accent/10 border-accent/30"
                                                                : "text-white/40 border-border hover:text-white/70 hover:border-border-bright"}`, children: label }, label))) })] }), _jsx("div", { className: "grid grid-cols-[60px_1fr_120px_100px_100px_100px_100px] gap-x-4 px-6 py-3 border-b border-border bg-elevated/50", children: ["Rank", "Player", "Points", "CF Rating", "Win Rate", "Streak", "Joined"].map((h) => (_jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-white/30", children: h }, h))) }), loading && (_jsxs("div", { className: "py-20 text-center", children: [_jsx("div", { className: "inline-block w-10 h-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin mb-3" }), _jsx("p", { className: "text-white/30 text-[13px] font-mono", children: "Loading rankings..." })] })), error && (_jsxs("div", { className: "py-20 text-center", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 rounded-full bg-danger/10 flex items-center justify-center", children: _jsxs("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", className: "text-danger", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("line", { x1: "15", y1: "9", x2: "9", y2: "15" }), _jsx("line", { x1: "9", y1: "9", x2: "15", y2: "15" })] }) }), _jsx("p", { className: "text-danger text-[14px] font-semibold mb-1", children: "Failed to load rankings" }), _jsx("p", { className: "text-white/30 text-[12px] font-mono", children: error })] })), !loading && !error && data && (_jsxs(_Fragment, { children: [_jsx("div", { className: "divide-y divide-border/60", children: data.rankings.map((entry) => {
                                                            const color = getRatingColor(entry.rating);
                                                            const cfColor = getRatingColor(entry.cfRating);
                                                            return (_jsxs("div", { className: "grid grid-cols-[60px_1fr_120px_100px_100px_100px_100px] gap-x-4 items-center px-6 py-4 hover:bg-elevated transition-colors group cursor-pointer", children: [_jsx("div", { children: _jsx(RankBadge, { rank: entry.rank }) }), _jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [_jsx("div", { className: "w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0", style: { background: color + "22", color }, children: entry.initials }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-[14px] font-semibold text-white truncate group-hover:text-accent transition-colors", children: entry.handle }), _jsx("p", { className: "text-[11px] text-white/40", children: getRatingTitle(entry.cfRating) })] })] }), _jsx("div", { children: _jsx("span", { className: "text-[16px] font-bold font-mono", style: { color }, children: entry.rating.toLocaleString() }) }), _jsx("div", { children: _jsx("span", { className: "text-[14px] font-mono", style: { color: cfColor }, children: entry.cfRating }) }), _jsx("div", { children: entry.gamesPlayed > 0 ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-[14px] font-bold font-mono text-white/70", children: [entry.winRate, "%"] }), _jsxs("span", { className: "text-[11px] text-white/30 font-mono", children: [entry.gamesWon, "W"] })] })) : (_jsx("span", { className: "text-[12px] text-white/20 italic", children: "No games" })) }), _jsx("div", { children: entry.winStreak > 0 ? (_jsxs("span", { className: "text-[13px] font-bold font-mono text-success", children: [entry.winStreak, " \uD83D\uDD25"] })) : (_jsx("span", { className: "text-[12px] text-white/20", children: "\u2014" })) }), _jsx("div", { children: _jsx("span", { className: "text-[12px] font-mono text-white/30", children: entry.joinedDate }) })] }, entry.handle));
                                                        }) }), data.pagination.totalPages > 1 && (_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-t border-border", children: [_jsxs("span", { className: "text-[12px] font-mono text-white/30", children: ["Page ", data.pagination.currentPage, " of", " ", data.pagination.totalPages, " \u00B7 Showing", " ", data.rankings.length, " of ", data.pagination.totalUsers, " ", "players"] }), _jsxs("div", { className: "flex gap-1.5", children: [_jsx("button", { onClick: () => setCurrentPage((p) => Math.max(1, p - 1)), disabled: currentPage === 1, className: "px-4 py-2 text-[12px] font-semibold text-white/40 border border-border rounded-lg disabled:opacity-30 hover:text-white hover:border-border-bright transition-colors disabled:hover:text-white/40 disabled:hover:border-border", children: "\u2190 Previous" }), Array.from({ length: Math.min(5, data.pagination.totalPages) }, (_, i) => {
                                                                        let pageNum;
                                                                        if (data.pagination.totalPages <= 5) {
                                                                            pageNum = i + 1;
                                                                        }
                                                                        else if (currentPage <= 3) {
                                                                            pageNum = i + 1;
                                                                        }
                                                                        else if (currentPage >=
                                                                            data.pagination.totalPages - 2) {
                                                                            pageNum = data.pagination.totalPages - 4 + i;
                                                                        }
                                                                        else {
                                                                            pageNum = currentPage - 2 + i;
                                                                        }
                                                                        return (_jsx("button", { onClick: () => setCurrentPage(pageNum), className: `w-10 h-10 text-[12px] font-mono rounded-lg border transition-colors ${currentPage === pageNum
                                                                                ? "text-accent border-accent/40 bg-accent/10"
                                                                                : "text-white/30 border-border hover:text-white hover:border-border-bright"}`, children: pageNum }, i));
                                                                    }), _jsx("button", { onClick: () => setCurrentPage((p) => Math.min(data.pagination.totalPages, p + 1)), disabled: currentPage === data.pagination.totalPages, className: "px-4 py-2 text-[12px] font-semibold text-white/40 border border-border rounded-lg disabled:opacity-30 hover:text-white hover:border-border-bright transition-colors disabled:hover:text-white/40 disabled:hover:border-border", children: "Next \u2192" })] })] }))] }))] })] })] })] })] }));
}
