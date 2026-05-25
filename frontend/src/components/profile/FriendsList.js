import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getRatingColor, getRatingTitle } from "../../utils/rating";
const FRIENDS = [
    { handle: "algo_beast", initials: "AB", rating: 2100, online: true, gamesPlayed: 12, mutualWins: 4 },
    { handle: "code_ninja", initials: "CN", rating: 1920, online: true, gamesPlayed: 8, mutualWins: 5 },
    { handle: "cp_grinder", initials: "CG", rating: 1650, online: false, gamesPlayed: 15, mutualWins: 10 },
    { handle: "debug_lord", initials: "DL", rating: 2350, online: false, gamesPlayed: 6, mutualWins: 1 },
    { handle: "petr_fan", initials: "PF", rating: 2341, online: false, gamesPlayed: 3, mutualWins: 1 },
];
export default function FriendsList() {
    return (_jsxs("div", { className: "bg-card border border-border rounded-2xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-[15px] font-bold text-white", children: "Friends" }), _jsxs("span", { className: "text-[11px] font-mono text-white/30", children: [FRIENDS.filter((f) => f.online).length, " online"] })] }), _jsx("div", { className: "flex flex-col gap-2", children: FRIENDS.map((friend) => {
                    const color = getRatingColor(friend.rating);
                    const myWinRate = Math.round((friend.mutualWins / friend.gamesPlayed) * 100);
                    return (_jsxs("div", { className: "flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-elevated transition-colors cursor-pointer", children: [_jsxs("div", { className: "relative w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0", style: { background: color + "22", color }, children: [friend.initials, _jsx("span", { className: "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card", style: { background: friend.online ? "#4ade80" : "#44445a" } })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-[13px] font-semibold text-white truncate", children: friend.handle }), _jsxs("p", { className: "text-[11px]", style: { color }, children: [getRatingTitle(friend.rating), " \u00B7 ", friend.rating] })] }), _jsxs("div", { className: "flex flex-col items-end gap-0.5 flex-shrink-0", children: [_jsxs("span", { className: "text-[12px] font-mono text-white/40", children: [friend.mutualWins, "\u2013", friend.gamesPlayed - friend.mutualWins] }), _jsx("div", { className: "w-16 h-1 bg-border rounded-full overflow-hidden", children: _jsx("div", { className: "h-full rounded-full bg-success", style: { width: `${myWinRate}%` } }) })] })] }, friend.handle));
                }) }), _jsx("button", { className: "mt-3 w-full py-2.5 text-[12px] font-semibold text-white/25 border border-dashed border-border rounded-xl hover:text-accent hover:border-accent transition-colors", children: "Find more friends \u2192" })] }));
}
