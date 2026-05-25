import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getRatingColor } from "../../utils/rating";
const RANK_STRIPES = {
    "Legendary GM": "from-red-500   to-red-700",
    Grandmaster: "from-red-400   to-red-600",
    Master: "from-amber-400 to-orange-500",
    Expert: "from-accent    to-accent-dim",
    Specialist: "from-teal-400  to-teal-600",
    Pupil: "from-green-400 to-green-600",
    Newbie: "from-gray-400  to-gray-600",
};
export default function ProfileHero({ profile }) {
    const ratingColor = getRatingColor(profile.rating);
    const rankStripe = RANK_STRIPES[profile.rank] ?? "from-accent to-accent-dim";
    const winRate = Math.round((profile.gamesWon / profile.gamesPlayed) * 100);
    return (_jsxs("div", { className: "relative w-140 overflow-hidden border-b border-border", children: [_jsx("div", { className: "absolute inset-0 bg-grid opacity-20 pointer-events-none" }), _jsx("div", { className: `absolute -right-16 -top-10 w-[320px] h-[320px] bg-gradient-to-br ${rankStripe} opacity-[0.07] rotate-12 pointer-events-none rounded-full` }), _jsxs("div", { className: "relative z-10 flex items-end gap-8 px-10 pt-10 pb-8", children: [_jsxs("div", { className: "relative flex-shrink-0", children: [_jsx("div", { className: "absolute inset-[-6px] rounded-full border-2 opacity-40 animate-spinSlow", style: { borderColor: ratingColor } }), _jsx("div", { className: "absolute inset-[-12px] rounded-full border opacity-20 animate-spinSlow", style: {
                                    borderColor: ratingColor,
                                    animationDuration: "6s",
                                    animationDirection: "reverse",
                                } }), _jsx("div", { className: "w-24 h-24 rounded-full flex items-center justify-center text-[28px] font-extrabold text-white relative z-10", style: {
                                    background: `linear-gradient(135deg, ${ratingColor}66, ${ratingColor})`,
                                }, children: profile.handle.slice(0, 2).toUpperCase() }), _jsx("span", { className: "absolute bottom-1 right-1 w-4 h-4 rounded-full bg-success border-2 border-base z-20 animate-pulse2" })] }), _jsxs("div", { className: "flex-1 pb-1", children: [_jsxs("div", { className: "flex items-center gap-3 mb-1.5", children: [_jsx("h1", { className: "text-[28px] font-extrabold tracking-tight leading-none", children: profile.handle }), _jsx("span", { className: "text-[11px] font-bold px-3 py-1 rounded-full border", style: {
                                            color: ratingColor,
                                            borderColor: ratingColor + "44",
                                            background: ratingColor + "11",
                                        }, children: profile.rank }), _jsx("span", { className: "text-[13px]", children: profile.countryFlag })] }), _jsxs("p", { className: "text-[14px] text-white/40 mb-3", children: [profile.displayName, " \u00B7 ", profile.email] }), _jsx("div", { className: "flex items-center gap-6 flex-wrap", children: [
                                    {
                                        label: "Rating",
                                        value: profile.rating.toString(),
                                        color: ratingColor,
                                    },
                                    {
                                        label: "Max rating",
                                        value: profile.maxRating.toString(),
                                        color: ratingColor,
                                    },
                                    { label: "Win rate", value: `${winRate}%`, color: undefined },
                                    {
                                        label: "Games",
                                        value: profile.gamesPlayed.toString(),
                                        color: undefined,
                                    },
                                    { label: "Joined", value: profile.joinedDate, color: undefined },
                                ].map((s) => (_jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("span", { className: "text-[18px] font-bold font-mono leading-none", style: s.color ? { color: s.color } : { color: "inherit" }, children: s.value }), _jsx("span", { className: "text-[11px] text-white/30 uppercase tracking-wider", children: s.label })] }, s.label))) })] }), _jsxs("a", { href: `https://codeforces.com/profile/${profile.cfHandle}`, target: "_blank", rel: "noreferrer", className: "flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-[13px] font-semibold text-white/50 hover:text-white hover:border-border-bright transition-colors self-start flex-shrink-0", children: [_jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }), _jsx("polyline", { points: "15 3 21 3 21 9" }), _jsx("line", { x1: "10", y1: "14", x2: "21", y2: "3" })] }), "CF: ", profile.cfHandle] })] }), _jsxs("div", { className: "relative z-10 mx-10 mb-6", children: [_jsxs("div", { className: "flex items-center justify-between text-[11px] text-white/30 mb-1.5", children: [_jsxs("span", { children: [profile.gamesWon, " wins"] }), _jsxs("span", { children: [profile.gamesLost, " losses"] })] }), _jsx("div", { className: "h-1.5 bg-border rounded-full overflow-hidden", children: _jsx("div", { className: "h-full rounded-full transition-all duration-700", style: {
                                width: `${winRate}%`,
                                background: `linear-gradient(90deg, ${ratingColor}88, ${ratingColor})`,
                            } }) })] })] }));
}
