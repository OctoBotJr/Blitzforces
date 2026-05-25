import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function StatCard({ label, value, sub, accent, icon, trend }) {
    return (_jsxs("div", { className: "relative bg-card border border-border rounded-xl p-5 flex flex-col gap-3 overflow-hidden group hover:border-border-bright transition-all duration-300 hover:shadow-lg hover:shadow-accent/5", children: [accent && (_jsx("div", { className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl", style: {
                    background: `radial-gradient(circle at 30% 30%, ${accent}12 0%, transparent 70%)`,
                } })), trend === "up" && (_jsx("div", { className: "absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse", style: { background: accent || "#4ade80" } })), _jsxs("div", { className: "flex items-start justify-between relative z-10", children: [_jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white/40 transition-colors", children: label }), _jsx("span", { className: "text-white/20 group-hover:text-white/30 transition-colors group-hover:scale-110 duration-300", children: icon })] }), _jsxs("div", { className: "relative z-10", children: [_jsx("p", { className: "text-[26px] font-extrabold font-mono leading-none tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left", style: accent ? { color: accent } : { color: "inherit" }, children: value }), sub && (_jsx("p", { className: "text-[12px] text-white/30 group-hover:text-white/40 mt-1.5 transition-colors", children: sub }))] })] }));
}
export default function StatCards({ profile }) {
    const winRate = Math.round((profile.gamesWon / profile.gamesPlayed) * 100);
    const betRate = Math.round((profile.betsWon / (profile.totalBets || 1)) * 100);
    const isOnStreak = profile.winStreak > 0;
    // Calculate if user is improving (would need historical data, using streak as proxy)
    const streakTrend = profile.winStreak >= 3 ? "up" : "neutral";
    const cards = [
        {
            label: "Win streak",
            value: `${profile.winStreak}`,
            sub: `Best: ${profile.maxWinStreak}`,
            accent: isOnStreak ? "#4ade80" : "#888888",
            trend: streakTrend,
            icon: (_jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("polyline", { points: "22 12 18 12 15 21 9 3 6 12 2 12" }) })),
        },
        {
            label: "Win rate",
            value: `${winRate}%`,
            sub: `${profile.gamesWon}W · ${profile.gamesLost}L`,
            accent: "#7c6af7",
            trend: winRate > 60 ? "up" : "neutral",
            icon: (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M18 20V10" }), _jsx("path", { d: "M12 20V4" }), _jsx("path", { d: "M6 20v-6" })] })),
        },
        {
            label: "Best solve time",
            value: profile.bestTime,
            sub: "Fastest AC",
            accent: "#fbbf24",
            icon: (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("polyline", { points: "12 6 12 12 16 14" })] })),
        },
        {
            label: "Best rank",
            value: `#${profile.bestRank}`,
            sub: "App leaderboard",
            accent: "#f7c06a",
            icon: (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6" }), _jsx("path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18" }), _jsx("path", { d: "M4 22h16" }), _jsx("path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" }), _jsx("path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" }), _jsx("path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2z" })] })),
        },
        {
            label: "Total games",
            value: `${profile.gamesPlayed}`,
            sub: `${profile.gamesWon} won · ${profile.gamesLost} lost`,
            icon: (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("rect", { x: "2", y: "6", width: "20", height: "12", rx: "2" }), _jsx("path", { d: "M12 12h.01" }), _jsx("path", { d: "M7 12h.01" }), _jsx("path", { d: "M17 12h.01" })] })),
        },
        {
            label: "Bets record",
            value: `${profile.betsWon}–${profile.betsLost}`,
            sub: `${betRate}% success · ${profile.totalBets} total`,
            accent: betRate > 50 ? "#4ade80" : "#f87171",
            trend: betRate > 60 ? "up" : "neutral",
            icon: (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("line", { x1: "12", y1: "1", x2: "12", y2: "23" }), _jsx("path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" })] })),
        },
        {
            label: "Blitzforce Points",
            value: `${profile.rating}`,
            sub: `Max: ${profile.maxRating}`,
            accent: "#7c6af7",
            icon: (_jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: _jsx("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }) })),
        },
        {
            label: "CF Rating",
            value: `${profile.rating}`,
            sub: profile.rank,
            accent: "#c084fc",
            icon: (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("path", { d: "M8 14s1.5 2 4 2 4-2 4-2" }), _jsx("line", { x1: "9", y1: "9", x2: "9.01", y2: "9" }), _jsx("line", { x1: "15", y1: "9", x2: "15.01", y2: "9" })] })),
        },
    ];
    return (_jsx("div", { className: "grid grid-cols-4 gap-4", children: cards.map((card) => (_jsx(StatCard, { ...card }, card.label))) }));
}
