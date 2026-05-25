import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import Navbar from "../components/layout/Navbar";
import { problemsData, getProblemStats, } from "../data/problemsData";
// ── Verdict chip (inline) ─────────────────────────────────────────────────────
const VERDICT_STYLE = {
    AC: { color: "#4ade80", bg: "rgba(74,222,128,0.15)" },
    WA: { color: "#f87171", bg: "rgba(248,113,113,0.15)" },
    TLE: { color: "#fbbf24", bg: "rgba(251,191,36,0.15)" },
    RE: { color: "#c084fc", bg: "rgba(192,132,252,0.15)" },
    CE: { color: "#94a3b8", bg: "rgba(148,163,184,0.12)" },
    MLE: { color: "#60a5fa", bg: "rgba(96,165,250,0.15)" },
};
function VerdictChip({ verdict, count }) {
    const s = VERDICT_STYLE[verdict];
    return (_jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] font-bold font-mono px-2 py-0.5 rounded", style: { color: s.color, background: s.bg }, children: [verdict, count > 1 && _jsxs("span", { className: "opacity-70", children: ["\u00D7", count] })] }));
}
// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
    if (status === "solved") {
        return (_jsx("div", { className: "w-7 h-7 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0", children: _jsx("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "#4ade80", strokeWidth: "2.5", strokeLinecap: "round", children: _jsx("polyline", { points: "20 6 9 17 4 12" }) }) }));
    }
    return (_jsx("div", { className: "w-7 h-7 rounded-full bg-warn/15 flex items-center justify-center flex-shrink-0", children: _jsxs("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "#fbbf24", strokeWidth: "2.5", strokeLinecap: "round", children: [_jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }), _jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })] }) }));
}
// ── Difficulty color ──────────────────────────────────────────────────────────
function diffColor(rating) {
    if (rating >= 2400)
        return { text: "#ff3333", bg: "rgba(255,51,51,0.10)" };
    if (rating >= 2000)
        return { text: "#c084fc", bg: "rgba(192,132,252,0.10)" };
    if (rating >= 1800)
        return { text: "#60a5fa", bg: "rgba(96,165,250,0.10)" };
    if (rating >= 1600)
        return { text: "#4ade80", bg: "rgba(74,222,128,0.10)" };
    return { text: "#888888", bg: "rgba(136,136,136,0.08)" };
}
// ── Difficulty breakdown bar chart ────────────────────────────────────────────
function DifficultyBars({ stats, }) {
    const maxCount = Math.max(...stats.bands.map((b) => {
        const d = stats.byRating[b];
        return d ? d.solved + d.attempted : 0;
    }), 1);
    return (_jsxs("div", { className: "bg-card border border-border rounded-2xl p-5", children: [_jsx("h3", { className: "text-[13px] font-bold text-white mb-4", children: "By difficulty" }), _jsx("div", { className: "flex flex-col gap-2.5", children: stats.bands.map((band) => {
                    const d = stats.byRating[band] ?? { solved: 0, attempted: 0 };
                    const total = d.solved + d.attempted;
                    const solvedPct = total > 0 ? (d.solved / maxCount) * 100 : 0;
                    const attemptPct = total > 0 ? (d.attempted / maxCount) * 100 : 0;
                    return (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-[10px] font-mono text-white/30 w-20 flex-shrink-0 text-right", children: band }), _jsxs("div", { className: "flex-1 flex gap-0.5 h-5 rounded-md overflow-hidden bg-elevated", children: [d.solved > 0 && (_jsx("div", { className: "h-full rounded-l flex items-center justify-end pr-1 transition-all duration-500", style: {
                                            width: `${solvedPct}%`,
                                            background: "rgba(74,222,128,0.4)",
                                        }, children: d.solved > 0 && (_jsx("span", { className: "text-[9px] font-bold text-success", children: d.solved })) })), d.attempted > 0 && (_jsx("div", { className: "h-full flex items-center justify-end pr-1 transition-all duration-500", style: {
                                            width: `${attemptPct}%`,
                                            background: "rgba(251,191,36,0.25)",
                                            borderRadius: d.solved === 0 ? "0.375rem 0 0 0.375rem" : "0",
                                        }, children: _jsx("span", { className: "text-[9px] font-bold text-warn/70", children: d.attempted }) })), total === 0 && (_jsx("div", { className: "h-full w-full flex items-center pl-2", children: _jsx("span", { className: "text-[9px] text-white/15", children: "\u2014" }) }))] })] }, band));
                }) }), _jsxs("div", { className: "flex gap-4 mt-3", children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "w-3 h-3 rounded-sm bg-success/40" }), _jsx("span", { className: "text-[10px] text-white/30", children: "Solved" })] }), _jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "w-3 h-3 rounded-sm bg-warn/25" }), _jsx("span", { className: "text-[10px] text-white/30", children: "Attempted" })] })] })] }));
}
// ── Problem row ───────────────────────────────────────────────────────────────
function ProblemRow({ problem }) {
    const [expanded, setExpanded] = useState(false);
    const dc = diffColor(problem.rating);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grid items-center px-5 py-3 gap-x-4 border-b border-border/50 last:border-b-0 hover:bg-elevated transition-colors cursor-pointer group", style: { gridTemplateColumns: "28px 90px 1fr 80px 80px 120px 60px" }, onClick: () => setExpanded((e) => !e), children: [_jsx(StatusBadge, { status: problem.status }), _jsx("div", { className: "flex items-center gap-2", children: _jsx("a", { href: problem.cfUrl, target: "_blank", rel: "noreferrer", className: "text-[12px] font-mono font-bold text-accent hover:underline", onClick: (e) => e.stopPropagation(), children: problem.id }) }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-[13px] font-semibold text-white truncate", children: problem.name }), _jsx("div", { className: "flex gap-1 flex-wrap mt-0.5", children: problem.tags.slice(0, 3).map((tag) => (_jsx("span", { className: "text-[10px] text-white/30 bg-elevated px-1.5 py-0.5 rounded border border-border", children: tag }, tag))) })] }), _jsx("span", { className: "text-[12px] font-bold font-mono px-2 py-1 rounded w-fit", style: { color: dc.text, background: dc.bg }, children: problem.rating }), _jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsxs("span", { className: "text-[12px] font-mono text-white/60", children: [problem.attempts, " tries"] }), problem.solveTime && (_jsx("span", { className: "text-[10px] font-mono text-success/70", children: problem.solveTime }))] }), _jsx("div", { className: "flex gap-1 flex-wrap", children: Object.entries(problem.verdictBreakdown).map(([v, n]) => (_jsx(VerdictChip, { verdict: v, count: n }, v))) }), _jsxs("div", { className: "flex items-center justify-end gap-1", children: [problem.solvedInGame && problem.gameOpponent && (_jsxs("span", { className: "text-[10px] font-mono text-white/30", title: `vs ${problem.gameOpponent}`, children: ["\u2694 ", problem.gameOpponent] })), _jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", className: `text-white/20 transition-transform ${expanded ? "rotate-180" : ""}`, children: _jsx("polyline", { points: "6 9 12 15 18 9" }) })] })] }), expanded && (_jsx("div", { className: "px-5 py-3 bg-elevated border-b border-border/50 animate-slideDown", children: _jsxs("div", { className: "flex items-start gap-8 flex-wrap", children: [_jsxs("div", { children: [_jsx("p", { className: "text-[11px] text-white/30 mb-1 uppercase tracking-wider", children: "First attempt" }), _jsx("p", { className: "text-[13px] font-mono text-white/60", children: problem.firstAttempt })] }), _jsxs("div", { children: [_jsx("p", { className: "text-[11px] text-white/30 mb-1 uppercase tracking-wider", children: "Last attempt" }), _jsx("p", { className: "text-[13px] font-mono text-white/60", children: problem.lastAttempt })] }), problem.solveTime && (_jsxs("div", { children: [_jsx("p", { className: "text-[11px] text-white/30 mb-1 uppercase tracking-wider", children: "Solve time" }), _jsx("p", { className: "text-[13px] font-mono text-success", children: problem.solveTime })] })), problem.gameOpponent && (_jsxs("div", { children: [_jsx("p", { className: "text-[11px] text-white/30 mb-1 uppercase tracking-wider", children: "Dueled against" }), _jsx("p", { className: "text-[13px] font-mono text-white/60", children: problem.gameOpponent })] })), _jsxs("div", { children: [_jsx("p", { className: "text-[11px] text-white/30 mb-1 uppercase tracking-wider", children: "All verdicts" }), _jsx("div", { className: "flex gap-1.5 flex-wrap", children: Object.entries(problem.verdictBreakdown).map(([v, n]) => (_jsx("div", { className: "flex items-center gap-1", children: _jsx(VerdictChip, { verdict: v, count: n }) }, v))) })] }), _jsx("a", { href: problem.cfUrl, target: "_blank", rel: "noreferrer", className: "ml-auto flex items-center gap-1.5 text-[12px] font-semibold text-accent/70 hover:text-accent transition-colors", onClick: (e) => e.stopPropagation(), children: "Open on Codeforces \u2192" })] }) }))] }));
}
export default function ProblemsPage() {
    const [statusFilter, setStatusFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [tagFilter, setTagFilter] = useState(null);
    const [sortKey, setSortKey] = useState("date");
    const stats = useMemo(() => getProblemStats(problemsData), []);
    // Collect all unique tags
    const allTags = useMemo(() => {
        const set = new Set();
        problemsData.forEach((p) => p.tags.forEach((t) => set.add(t)));
        return Array.from(set).sort();
    }, []);
    const filtered = useMemo(() => {
        let list = [...problemsData];
        if (statusFilter !== "all")
            list = list.filter((p) => p.status === statusFilter);
        if (tagFilter)
            list = list.filter((p) => p.tags.includes(tagFilter));
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter((p) => p.id.toLowerCase().includes(q) || p.name.toLowerCase().includes(q));
        }
        list.sort((a, b) => {
            if (sortKey === "rating")
                return b.rating - a.rating;
            if (sortKey === "attempts")
                return b.attempts - a.attempts;
            return b.lastAttempt.localeCompare(a.lastAttempt);
        });
        return list;
    }, [statusFilter, search, tagFilter, sortKey]);
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-base font-syne", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-1 overflow-y-auto", children: _jsxs("div", { className: "max-w-[1200px] mx-auto px-6 py-8", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-[28px] font-extrabold tracking-tight text-white", children: "Problems" }), _jsxs("p", { className: "text-[14px] text-white/40 mt-1 font-mono", children: [stats.solved, " solved \u00B7 ", stats.attempted, " attempted \u00B7", " ", stats.total, " total on BlitzForces"] })] }), _jsxs("div", { className: "grid grid-cols-4 gap-4 mb-6", children: [_jsx("div", { className: "col-span-3 grid grid-cols-3 gap-4", children: [
                                        {
                                            label: "Solved",
                                            value: stats.solved,
                                            sub: `${Math.round((stats.solved / stats.total) * 100)}% of attempted`,
                                            color: "#4ade80",
                                            icon: (_jsx("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: _jsx("polyline", { points: "20 6 9 17 4 12" }) })),
                                        },
                                        {
                                            label: "Attempted",
                                            value: stats.attempted,
                                            sub: "Not yet solved",
                                            color: "#fbbf24",
                                            icon: (_jsxs("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }), _jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })] })),
                                        },
                                        {
                                            label: "Total",
                                            value: stats.total,
                                            sub: "Seen in BlitzForces",
                                            color: undefined,
                                            icon: (_jsxs("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [_jsx("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }), _jsx("line", { x1: "3", y1: "9", x2: "21", y2: "9" }), _jsx("line", { x1: "3", y1: "15", x2: "21", y2: "15" }), _jsx("line", { x1: "9", y1: "3", x2: "9", y2: "21" })] })),
                                        },
                                    ].map((card) => (_jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 hover:border-border-bright transition-colors", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-white/30", children: card.label }), _jsx("span", { style: card.color
                                                            ? { color: card.color }
                                                            : { color: "var(--color-text-muted)" }, className: "text-white/20", children: card.icon })] }), _jsx("p", { className: "text-[32px] font-extrabold font-mono leading-none tracking-tight", style: card.color ? { color: card.color } : {}, children: card.value }), _jsx("p", { className: "text-[12px] text-white/30", children: card.sub })] }, card.label))) }), _jsx(DifficultyBars, { stats: stats })] }), _jsxs("div", { className: "flex items-center gap-3 mb-4 flex-wrap", children: [_jsxs("div", { className: "relative flex-1 min-w-[180px]", children: [_jsxs("svg", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-white/25", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("circle", { cx: "11", cy: "11", r: "8" }), _jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })] }), _jsx("input", { type: "text", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search by ID or name...", className: "w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-[13px] text-white placeholder:text-white/25 focus:outline-none focus:border-accent transition-colors" })] }), _jsx("div", { className: "flex gap-1 bg-card border border-border rounded-xl p-1", children: ["all", "solved", "attempted"].map((s) => (_jsx("button", { onClick: () => setStatusFilter(s), className: `px-3 py-1.5 text-[12px] font-semibold rounded-lg capitalize transition-colors ${statusFilter === s
                                            ? "bg-accent/15 text-accent"
                                            : "text-white/40 hover:text-white/70"}`, children: s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1) }, s))) }), _jsxs("select", { value: sortKey, onChange: (e) => setSortKey(e.target.value), className: "px-3.5 py-2.5 bg-card border border-border rounded-xl text-[13px] text-white/60 focus:outline-none focus:border-accent transition-colors cursor-pointer", children: [_jsx("option", { value: "date", children: "Sort: Recent" }), _jsx("option", { value: "rating", children: "Sort: Difficulty" }), _jsx("option", { value: "attempts", children: "Sort: Most attempts" })] })] }), _jsxs("div", { className: "flex gap-1.5 flex-wrap mb-4", children: [_jsx("button", { onClick: () => setTagFilter(null), className: `text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-colors ${tagFilter === null
                                        ? "text-accent bg-accent/10 border-accent/30"
                                        : "text-white/30 border-border hover:text-white/60"}`, children: "All tags" }), allTags.map((tag) => (_jsx("button", { onClick: () => setTagFilter(tag === tagFilter ? null : tag), className: `text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-colors ${tagFilter === tag
                                        ? "text-accent bg-accent/10 border-accent/30"
                                        : "text-white/30 border-border hover:text-white/60"}`, children: tag }, tag)))] }), _jsxs("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: [_jsx("div", { className: "grid px-5 py-2.5 border-b border-border", style: {
                                        gridTemplateColumns: "28px 90px 1fr 80px 80px 120px 60px",
                                    }, children: ["", "ID", "Problem", "Rating", "Attempts", "Verdicts", ""].map((h, i) => (_jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-white/25", children: h }, i))) }), filtered.length === 0 ? (_jsx("div", { className: "py-16 text-center text-[13px] text-white/25", children: "No problems match this filter" })) : (filtered.map((problem) => (_jsx(ProblemRow, { problem: problem }, problem.id))))] }), _jsxs("p", { className: "text-center text-[11px] text-white/20 font-mono mt-4", children: ["Showing ", filtered.length, " of ", problemsData.length, " problems \u00B7 Click any row to expand"] })] }) })] }));
}
