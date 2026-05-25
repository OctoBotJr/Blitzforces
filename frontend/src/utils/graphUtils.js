/** Maps rating history to SVG polyline points inside a given viewport. */
export function toPolylinePoints(data, width, height, padding = 20) {
    if (data.length < 2)
        return "";
    const ratings = data.map((d) => d.rating);
    const minR = Math.min(...ratings);
    const maxR = Math.max(...ratings);
    const rangeR = maxR - minR || 1;
    return data
        .map((point, i) => {
        const x = padding + (i / (data.length - 1)) * (width - padding * 2);
        const y = height - padding - ((point.rating - minR) / rangeR) * (height - padding * 2);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
        .join(" ");
}
/** Same as above but returns individual {x, y} objects for dot + tooltip placement. */
export function toPoints(data, width, height, padding = 20) {
    if (data.length < 2)
        return [];
    const ratings = data.map((d) => d.rating);
    const minR = Math.min(...ratings);
    const maxR = Math.max(...ratings);
    const rangeR = maxR - minR || 1;
    return data.map((point, i) => ({
        x: padding + (i / (data.length - 1)) * (width - padding * 2),
        y: height - padding - ((point.rating - minR) / rangeR) * (height - padding * 2),
        point,
    }));
}
/** Returns the activity intensity level (0–4) for heat-map cell coloring. */
export function intensityLevel(count) {
    if (count === 0)
        return 0;
    if (count <= 1)
        return 1;
    if (count <= 3)
        return 2;
    if (count <= 6)
        return 3;
    return 4;
}
/** Groups an array of ActivityDay into weeks (arrays of 7 days, Sunday-first). */
export function groupIntoWeeks(days) {
    const weeks = [];
    let week = [];
    for (const day of days) {
        const dow = new Date(day.date + "T00:00:00").getDay(); // 0 = Sunday
        if (dow === 0 && week.length > 0) {
            weeks.push(week);
            week = [];
        }
        week.push(day);
    }
    if (week.length > 0)
        weeks.push(week);
    return weeks;
}
