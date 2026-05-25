import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function getDifficultyStyle(rating) {
    if (rating >= 2000)
        return { color: "#c084fc", border: "rgba(192,132,252,0.3)", bg: "rgba(192,132,252,0.08)" };
    if (rating >= 1800)
        return { color: "#60a5fa", border: "rgba(96,165,250,0.3)", bg: "rgba(96,165,250,0.08)" };
    return { color: "#4ade80", border: "rgba(74,222,128,0.3)", bg: "rgba(74,222,128,0.08)" };
}
export default function ProblemBar({ problem }) {
    const diff = getDifficultyStyle(problem.rating);
    return (_jsxs("div", { className: "flex items-center gap-3.5 px-6 py-3 bg-elevated border-b border-border flex-wrap", children: [_jsx("span", { className: "text-[12px] font-bold font-mono text-accent bg-accent/10 border border-accent/30 px-3 py-1 rounded-md flex-shrink-0", children: problem.id }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-[15px] font-bold text-white truncate", children: problem.name }), _jsx("p", { className: "text-[11px] text-white/30", children: problem.contest })] }), _jsx("span", { className: "text-[11px] font-bold font-mono px-2.5 py-1 rounded-full border flex-shrink-0", style: { color: diff.color, borderColor: diff.border, background: diff.bg }, children: problem.rating }), _jsxs("a", { href: problem.cfUrl, target: "_blank", rel: "noreferrer", className: "flex items-center gap-1.5 px-3.5 py-1.5 bg-card border border-border rounded-lg text-[12px] font-semibold text-white/50 hover:text-white hover:border-border-bright transition-colors flex-shrink-0", children: [_jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }), _jsx("polyline", { points: "15 3 21 3 21 9" }), _jsx("line", { x1: "10", y1: "14", x2: "21", y2: "3" })] }), "Open in CF"] })] }));
}
