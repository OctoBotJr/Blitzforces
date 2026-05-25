import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { intensityLevel, groupIntoWeeks } from "../../utils/graphUtils";
const MONTH_LABELS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
// Only label Mon / Wed / Fri rows (indices 1, 3, 5)
const ROW_LABELS = { 1: "Mon", 3: "Wed", 5: "Fri" };
// Cell + gap dimensions
const CELL = 14; // px — cell size
const GAP = 3; // px — gap between cells
const STEP = CELL + GAP; // 17px per cell slot
const DOW_W = 28; // left margin for day-of-week labels
const TOP_H = 22; // top margin for month labels
const ROWS = 7;
const INTENSITY_COLORS = [
    "rgba(124,106,247,0.07)", // 0 — empty
    "rgba(124,106,247,0.22)", // 1
    "rgba(124,106,247,0.44)", // 2
    "rgba(124,106,247,0.70)", // 3
    "rgba(124,106,247,1.00)", // 4
];
export default function ActivityGrid({ days }) {
    const [tooltip, setTooltip] = useState(null);
    const weeks = groupIntoWeeks(days);
    const total = days.reduce((s, d) => s + d.count, 0);
    const activeDays = days.filter((d) => d.count > 0).length;
    const numWeeks = weeks.length;
    // SVG dimensions — fills the card width via viewBox + width="100%"
    const svgW = DOW_W + numWeeks * STEP - GAP;
    const svgH = TOP_H + ROWS * STEP - GAP;
    // Build month label positions
    const monthMarks = [];
    let lastMonth = -1;
    weeks.forEach((week, wi) => {
        const first = week[0];
        if (!first)
            return;
        const m = new Date(first.date + "T00:00:00").getMonth();
        if (m !== lastMonth) {
            monthMarks.push({ label: MONTH_LABELS[m], x: DOW_W + wi * STEP });
            lastMonth = m;
        }
    });
    return (_jsxs("div", { className: "bg-card border border-border rounded-2xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-5", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-[15px] font-bold text-white", children: "Submission activity" }), _jsxs("p", { className: "text-[12px] text-white/30 mt-0.5 font-mono", children: [total, " submissions \u00B7 ", activeDays, " active days in the last year"] })] }), _jsxs("div", { className: "flex items-center gap-2 text-[11px] text-white/30", children: [_jsx("span", { children: "Less" }), INTENSITY_COLORS.map((color, i) => (_jsx("span", { className: "inline-block rounded-sm", style: {
                                    width: CELL,
                                    height: CELL,
                                    background: color,
                                    flexShrink: 0,
                                } }, i))), _jsx("span", { children: "More" })] })] }), _jsx("div", { className: "w-full overflow-x-auto", children: _jsxs("svg", { width: "100%", viewBox: `0 0 ${svgW} ${svgH}`, style: { display: "block", minWidth: 600 }, children: [monthMarks.map(({ label, x }) => (_jsx("text", { x: x, y: TOP_H - 6, fontSize: "10", fontFamily: "'Space Mono', monospace", fill: "rgba(255,255,255,0.28)", children: label }, label + x))), [0, 1, 2, 3, 4, 5, 6].map((dow) => {
                            const label = ROW_LABELS[dow];
                            if (!label)
                                return null;
                            const cy = TOP_H + dow * STEP + CELL / 2;
                            return (_jsx("text", { x: DOW_W - 6, y: cy, fontSize: "10", fontFamily: "'Space Mono', monospace", fill: "rgba(255,255,255,0.25)", textAnchor: "end", dominantBaseline: "central", children: label }, dow));
                        }), weeks.map((week, wi) => {
                            const colX = DOW_W + wi * STEP;
                            return Array.from({ length: 7 }, (_, dow) => {
                                const day = week.find((d) => new Date(d.date + "T00:00:00").getDay() === dow);
                                const level = day ? intensityLevel(day.count) : 0;
                                const cellY = TOP_H + dow * STEP;
                                const color = INTENSITY_COLORS[level];
                                return (_jsx("rect", { x: colX, y: cellY, width: CELL, height: CELL, rx: 3, fill: color, style: {
                                        cursor: day ? "pointer" : "default",
                                        transition: "opacity 0.1s",
                                    }, onMouseEnter: (e) => {
                                        if (!day)
                                            return;
                                        const svgEl = e.currentTarget.closest("svg");
                                        const rect = svgEl.getBoundingClientRect();
                                        const scaleX = rect.width / svgW;
                                        const scaleY = rect.height / svgH;
                                        setTooltip({
                                            day,
                                            x: colX * scaleX +
                                                rect.left -
                                                svgEl.getBoundingClientRect().left,
                                            y: cellY * scaleY,
                                        });
                                    }, onMouseLeave: () => setTooltip(null) }, `${wi}-${dow}`));
                            });
                        })] }) }), _jsx("div", { className: "h-6 mt-2 flex items-center justify-center", children: tooltip ? (_jsx("span", { className: "text-[12px] font-mono text-white/50 animate-fadeIn", children: tooltip.day.count === 0
                        ? `No submissions on ${tooltip.day.date}`
                        : `${tooltip.day.count} submission${tooltip.day.count > 1 ? "s" : ""} on ${tooltip.day.date}` })) : (_jsx("span", { className: "text-[11px] font-mono text-white/15", children: "Hover a cell" })) })] }));
}
