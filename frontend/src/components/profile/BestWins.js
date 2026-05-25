import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getRatingColor } from "../../utils/rating";
const MEDALS = ["🥇", "🥈", "🥉"];
function getDifficultyColor(rating) {
    if (rating >= 2400)
        return "#ff3333";
    if (rating >= 2000)
        return "#c084fc";
    if (rating >= 1800)
        return "#60a5fa";
    return "#4ade80";
}
export default function BestWins({ wins }) {
    return (_jsxs("div", { className: "bg-card border border-border rounded-2xl p-6", children: [_jsx("h3", { className: "text-[15px] font-bold text-white mb-4", children: "Best wins" }), _jsx("div", { className: "flex flex-col gap-3", children: wins.map((win, i) => {
                    const oppColor = getRatingColor(win.opponentRating);
                    const diffColor = getDifficultyColor(win.problemRating);
                    return (_jsxs("div", { className: "flex items-center gap-4 px-4 py-3.5 bg-elevated border border-border rounded-xl hover:border-border-bright transition-colors group", children: [_jsx("span", { className: "text-[20px] flex-shrink-0", children: MEDALS[i] }), _jsx("div", { className: "w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0", style: { background: oppColor + "22", color: oppColor }, children: win.opponentInitials }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [_jsx("span", { className: "text-[13px] font-bold text-white", children: win.opponent }), _jsx("span", { className: "text-[11px] font-mono", style: { color: oppColor }, children: win.opponentRating })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-[11px] font-mono text-white/30", children: win.problemId }), _jsx("span", { className: "text-[10px] font-bold px-1.5 py-0.5 rounded border font-mono", style: { color: diffColor, borderColor: diffColor + "33", background: diffColor + "11" }, children: win.problemRating }), _jsx("span", { className: "text-[11px] text-white/25", children: win.date })] })] }), _jsxs("div", { className: "flex flex-col items-end gap-1 flex-shrink-0", children: [_jsxs("span", { className: "text-[14px] font-bold font-mono text-success", children: ["+", win.ratingGained] }), _jsx("span", { className: "text-[11px] font-mono text-white/30", children: win.solveTime })] })] }, i));
                }) })] }));
}
