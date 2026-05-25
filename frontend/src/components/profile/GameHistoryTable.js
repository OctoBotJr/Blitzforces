import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { getRatingColor } from "../../utils/rating";
const FILTER_LABELS = [
    { key: "all", label: "All" },
    { key: "won", label: "Wins" },
    { key: "lost", label: "Losses" },
    { key: "rated", label: "Rated" },
    { key: "bet", label: "Bets" },
    { key: "quick", label: "Quick" },
];
function getDifficultyStyle(rating) {
    if (rating >= 2400)
        return { color: "#ff3333", bg: "rgba(255,51,51,0.10)" };
    if (rating >= 2000)
        return { color: "#c084fc", bg: "rgba(192,132,252,0.10)" };
    if (rating >= 1800)
        return { color: "#60a5fa", bg: "rgba(96,165,250,0.10)" };
    if (rating >= 1600)
        return { color: "#4ade80", bg: "rgba(74,222,128,0.10)" };
    return { color: "#888888", bg: "rgba(136,136,136,0.08)" };
}
function GameTypePill({ type }) {
    const styles = {
        rated: "text-accent   bg-accent/10   border-accent/25",
        bet: "text-warn     bg-warn/10     border-warn/25",
        quick: "text-info     bg-info/10     border-info/25",
    };
    const labels = { rated: "Rated", bet: "Bet", quick: "Quick" };
    return (_jsx("span", { className: `text-[10px] font-bold font-mono px-2 py-0.5 rounded border ${styles[type]}`, children: labels[type] }));
}
export default function GameHistoryTable({ entries }) {
    const [filter, setFilter] = useState("all");
    const [page, setPage] = useState(0);
    const PAGE_SIZE = 8;
    const filtered = entries.filter((e) => {
        if (filter === "won")
            return e.result === "won";
        if (filter === "lost")
            return e.result === "lost";
        if (filter === "bet")
            return e.gameType === "bet";
        if (filter === "rated")
            return e.gameType === "rated";
        if (filter === "quick")
            return e.gameType === "quick";
        return true;
    });
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const visible = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
    function handleFilter(f) {
        setFilter(f);
        setPage(0);
    }
    return (_jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-[15px] font-bold text-white", children: "Game history" }), _jsxs("p", { className: "text-[12px] text-white/30 mt-0.5 font-mono", children: [entries.length, " games total"] })] }), _jsx("div", { className: "flex items-center gap-1.5 flex-wrap", children: FILTER_LABELS.map(({ key, label }) => (_jsx("button", { onClick: () => handleFilter(key), className: `text-[12px] font-semibold px-3 py-1.5 rounded-lg border transition-colors ${filter === key
                                ? "text-accent bg-accent/10 border-accent/30"
                                : "text-white/40 border-border hover:text-white/70 hover:border-border-bright"}`, children: label }, key))) })] }), _jsx("div", { className: "grid grid-cols-[32px_1fr_1fr_90px_80px_70px_64px] gap-x-4 px-5 py-2.5 border-b border-border", children: ["", "Opponent", "Problem", "Type", "Time", "Δ Rating", "Date"].map((h) => (_jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-white/25", children: h }, h))) }), _jsx("div", { className: "divide-y divide-border/60", children: visible.length === 0 ? (_jsx("div", { className: "py-12 text-center text-[13px] text-white/25", children: "No games match this filter" })) : (visible.map((entry) => {
                    const oppColor = getRatingColor(entry.opponentRating);
                    const diffStyle = getDifficultyStyle(entry.problemRating);
                    const won = entry.result === "won";
                    return (_jsxs("div", { className: "grid grid-cols-[32px_1fr_1fr_90px_80px_70px_64px] gap-x-4 items-center px-5 py-3 hover:bg-elevated transition-colors group", children: [_jsx("div", { className: "flex items-center justify-center", children: _jsx("span", { className: "w-6 h-6 rounded flex items-center justify-center text-[11px] font-extrabold font-mono", style: {
                                        color: won ? "#4ade80" : "#f87171",
                                        background: won
                                            ? "rgba(74,222,128,0.12)"
                                            : "rgba(248,113,113,0.12)",
                                    }, children: won ? "W" : "L" }) }), _jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [_jsx("div", { className: "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0", style: { background: oppColor + "22", color: oppColor }, children: entry.opponentInitials }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-[13px] font-semibold text-white truncate group-hover:text-white/90", children: entry.opponent }), _jsx("p", { className: "text-[11px] font-mono", style: { color: oppColor }, children: entry.opponentRating })] })] }), _jsxs("div", { className: "min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-[11px] font-mono text-accent flex-shrink-0", children: entry.problemId }), _jsx("span", { className: "text-[10px] font-bold font-mono px-1.5 py-0.5 rounded flex-shrink-0", style: {
                                                    color: diffStyle.color,
                                                    background: diffStyle.bg,
                                                }, children: entry.problemRating })] }), _jsx("p", { className: "text-[12px] text-white/40 truncate mt-0.5", children: entry.problemName })] }), _jsxs("div", { children: [_jsx(GameTypePill, { type: entry.gameType }), entry.isBet && entry.betAmount && (_jsxs("p", { className: "text-[10px] font-mono text-warn/60 mt-0.5", children: ["\u00B1", entry.betAmount, " pts"] }))] }), _jsx("div", { children: entry.solveTime ? (_jsx("span", { className: "text-[13px] font-mono text-white/60", children: entry.solveTime })) : (_jsx("span", { className: "text-[12px] text-white/20 italic", children: "\u2014" })) }), _jsx("div", { children: _jsxs("span", { className: "text-[14px] font-bold font-mono", style: {
                                        color: entry.ratingDelta > 0 ? "#4ade80" : "#f87171",
                                    }, children: [entry.ratingDelta > 0 ? "+" : "", entry.ratingDelta] }) }), _jsx("div", { children: _jsx("span", { className: "text-[11px] font-mono text-white/25", children: entry.date.slice(5) }) })] }, entry.id));
                })) }), totalPages > 1 && (_jsxs("div", { className: "flex items-center justify-between px-5 py-3 border-t border-border", children: [_jsxs("span", { className: "text-[12px] font-mono text-white/25", children: [page * PAGE_SIZE + 1, "\u2013", Math.min((page + 1) * PAGE_SIZE, filtered.length), " of", " ", filtered.length] }), _jsxs("div", { className: "flex gap-1.5", children: [_jsx("button", { onClick: () => setPage((p) => Math.max(0, p - 1)), disabled: page === 0, className: "px-3 py-1.5 text-[12px] font-semibold text-white/40 border border-border rounded-lg disabled:opacity-25 hover:text-white hover:border-border-bright transition-colors", children: "\u2190 Prev" }), Array.from({ length: totalPages }, (_, i) => (_jsx("button", { onClick: () => setPage(i), className: `w-8 h-8 text-[12px] font-mono rounded-lg border transition-colors ${page === i
                                    ? "text-accent border-accent/40 bg-accent/10"
                                    : "text-white/30 border-border hover:text-white hover:border-border-bright"}`, children: i + 1 }, i))), _jsx("button", { onClick: () => setPage((p) => Math.min(totalPages - 1, p + 1)), disabled: page === totalPages - 1, className: "px-3 py-1.5 text-[12px] font-semibold text-white/40 border border-border rounded-lg disabled:opacity-25 hover:text-white hover:border-border-bright transition-colors", children: "Next \u2192" })] })] }))] }));
}
