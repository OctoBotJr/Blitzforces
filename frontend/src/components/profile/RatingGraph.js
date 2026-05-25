import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { toPoints } from "../../utils/graphUtils";
import { getRatingColor } from "../../utils/rating";
const W = 700;
const H = 180;
const PAD = 24;
export default function RatingGraph({ history }) {
    const [tooltip, setTooltip] = useState(null);
    const svgRef = useRef(null);
    const points = toPoints(history, W, H, PAD);
    const ratings = history.map((d) => d.rating);
    const minR = Math.min(...ratings);
    const maxR = Math.max(...ratings);
    // Build the polyline string
    const polyline = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    // Build the filled area path (close below the line)
    const areaPath = points.length > 1
        ? `M ${points[0].x.toFixed(1)},${H - PAD} ` +
            points.map((p) => `L ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") +
            ` L ${points[points.length - 1].x.toFixed(1)},${H - PAD} Z`
        : "";
    const lastRating = history[history.length - 1].rating;
    const accentColor = getRatingColor(lastRating);
    const gradientId = "rating-gradient";
    const areaGradId = "area-gradient";
    // Y-axis labels
    const yLabels = [minR, Math.round((minR + maxR) / 2), maxR];
    function handleMouseMove(e) {
        if (!svgRef.current)
            return;
        const rect = svgRef.current.getBoundingClientRect();
        const scaleX = W / rect.width;
        const mx = (e.clientX - rect.left) * scaleX;
        // Find closest point
        let closest = points[0];
        let minDist = Infinity;
        for (const p of points) {
            const d = Math.abs(p.x - mx);
            if (d < minDist) {
                minDist = d;
                closest = p;
            }
        }
        setTooltip({ x: closest.x, y: closest.y, point: closest.point });
    }
    return (_jsxs("div", { className: "bg-card border border-border rounded-2xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-5", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-[15px] font-bold text-white", children: "Rating history" }), _jsxs("p", { className: "text-[12px] text-white/30 mt-0.5 font-mono", children: [minR, " \u2192 ", maxR, " \u00B7 ", history.length, " contests"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-[22px] font-bold font-mono", style: { color: accentColor }, children: lastRating }), _jsxs("span", { className: "text-[12px] font-bold font-mono px-2 py-0.5 rounded", style: { color: accentColor, background: accentColor + "18" }, children: ["+", history[history.length - 1].delta] })] })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute left-0 top-0 h-full flex flex-col justify-between pointer-events-none pr-2", children: [...yLabels].reverse().map((r) => (_jsx("span", { className: "text-[10px] font-mono text-white/20", children: r }, r))) }), _jsxs("div", { className: "pl-8", children: [_jsxs("svg", { ref: svgRef, viewBox: `0 0 ${W} ${H}`, className: "w-full overflow-visible cursor-crosshair", onMouseMove: handleMouseMove, onMouseLeave: () => setTooltip(null), children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: gradientId, x1: "0", y1: "0", x2: "1", y2: "0", children: [_jsx("stop", { offset: "0%", stopColor: accentColor, stopOpacity: "0.4" }), _jsx("stop", { offset: "100%", stopColor: accentColor, stopOpacity: "1" })] }), _jsxs("linearGradient", { id: areaGradId, x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: accentColor, stopOpacity: "0.18" }), _jsx("stop", { offset: "100%", stopColor: accentColor, stopOpacity: "0" })] })] }), yLabels.map((r, i) => {
                                        const y = H - PAD - ((r - minR) / (maxR - minR || 1)) * (H - PAD * 2);
                                        return (_jsx("line", { x1: PAD, y1: y.toFixed(1), x2: W - PAD, y2: y.toFixed(1), stroke: "currentColor", strokeWidth: "0.5", className: "text-border", strokeDasharray: "4 4" }, i));
                                    }), areaPath && (_jsx("path", { d: areaPath, fill: `url(#${areaGradId})` })), _jsx("polyline", { points: polyline, fill: "none", stroke: `url(#${gradientId})`, strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round" }), points.map((p, i) => (_jsx("circle", { cx: p.x.toFixed(1), cy: p.y.toFixed(1), r: tooltip?.point === p.point ? "5" : "3", fill: p.point.delta >= 0 ? "#4ade80" : "#f87171", stroke: accentColor, strokeWidth: "1.5", className: "transition-all duration-100" }, i))), tooltip && (_jsx("line", { x1: tooltip.x.toFixed(1), y1: PAD, x2: tooltip.x.toFixed(1), y2: H - PAD, stroke: accentColor, strokeWidth: "1", strokeDasharray: "4 3", opacity: "0.5" }))] }), tooltip && (() => {
                                const svgEl = svgRef.current;
                                const rect = svgEl?.getBoundingClientRect();
                                const pctX = tooltip.x / W;
                                const pctY = tooltip.y / H;
                                const isRight = pctX > 0.65;
                                return (_jsxs("div", { className: "absolute pointer-events-none z-20 bg-elevated border border-border-bright rounded-xl px-3.5 py-2.5 min-w-[170px] shadow-lg", style: {
                                        top: `calc(${pctY * 100}% - 60px)`,
                                        left: isRight ? undefined : `calc(${pctX * 100}% + 12px)`,
                                        right: isRight ? `calc(${(1 - pctX) * 100}% + 12px)` : undefined,
                                    }, children: [_jsxs("p", { className: "text-[12px] font-bold font-mono", style: { color: getRatingColor(tooltip.point.rating) }, children: [tooltip.point.rating, _jsxs("span", { className: "ml-1.5 text-[11px]", style: { color: tooltip.point.delta >= 0 ? "#4ade80" : "#f87171" }, children: [tooltip.point.delta >= 0 ? "+" : "", tooltip.point.delta] })] }), _jsx("p", { className: "text-[11px] text-white/40 mt-0.5 leading-snug", children: tooltip.point.contestName }), _jsx("p", { className: "text-[10px] text-white/20 font-mono mt-1", children: tooltip.point.date })] }));
                            })()] })] })] }));
}
