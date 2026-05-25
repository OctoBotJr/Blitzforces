import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function StatsRow({ profile }) {
    const winRate = profile && profile.gamesPlayed > 0
        ? Math.round((profile.gamesWon / profile.gamesPlayed) * 100)
        : 0;
    const stats = [
        {
            label: "BF Points",
            value: String(profile?.blitzforcePoints ?? "—"),
            sub: `CF Rating: ${profile?.cfRating ?? "—"}`,
            color: "#7c6af7",
            icon: (_jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: _jsx("polyline", { points: "22 12 18 12 15 21 9 3 6 12 2 12" }) })),
        },
        {
            label: "Win rate",
            value: `${winRate}%`,
            sub: `${profile?.gamesWon ?? 0} / ${profile?.gamesPlayed ?? 0} games`,
            color: "#4ade80",
            icon: (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [_jsx("path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6" }), _jsx("path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18" }), _jsx("path", { d: "M4 22h16" }), _jsx("path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" }), _jsx("path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" }), _jsx("path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2z" })] })),
        },
        {
            label: "Win streak",
            value: String(profile?.winStreak ?? 0),
            sub: `${profile?.gamesPlayed ?? 0} total games`,
            color: "#fbbf24",
            icon: (_jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: _jsx("path", { d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" }) })),
        },
        {
            label: "Problems solved",
            value: String(profile?.solvedCount ?? "—"),
            sub: `on Codeforces`,
            color: "#60a5fa",
            icon: (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("polyline", { points: "12 6 12 12 16 14" })] })),
        },
    ];
    return (_jsx("section", { className: "border-b border-border bg-surface", children: _jsx("div", { className: "max-w-[1200px] mx-auto px-10 py-6", children: _jsx("div", { className: "grid grid-cols-4 gap-4", children: stats.map((stat) => (_jsxs("div", { className: "relative flex flex-col gap-3 px-6 py-5 rounded-2xl bg-card border border-border hover:border-border-bright transition-colors overflow-hidden group", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity", style: { background: stat.color } }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-[11px] font-bold uppercase tracking-[1.2px] text-white/30", children: stat.label }), _jsx("span", { className: "p-1.5 rounded-lg", style: { color: stat.color, background: stat.color + "18" }, children: stat.icon })] }), _jsx("span", { className: "text-[32px] font-extrabold font-mono leading-none tracking-tight", style: { color: stat.color }, children: stat.value }), _jsx("span", { className: "text-[12px] text-white/40", children: stat.sub })] }, stat.label))) }) }) }));
}
