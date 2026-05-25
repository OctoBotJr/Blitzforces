import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import Navbar from "../components/layout/Navbar";
import { getRatingColor, getRatingTitle } from "../utils/rating";
const ALL_FRIENDS = [
    {
        handle: "algo_beast",
        initials: "AB",
        rating: 2100,
        maxRating: 2241,
        online: true,
        lastSeen: "In battle",
        country: "Russia",
        countryFlag: "🇷🇺",
        gamesPlayed: 12,
        myWins: 4,
        myLosses: 8,
        isMutual: true,
    },
    {
        handle: "code_ninja",
        initials: "CN",
        rating: 1920,
        maxRating: 1988,
        online: true,
        lastSeen: "Browsing",
        country: "India",
        countryFlag: "🇮🇳",
        gamesPlayed: 8,
        myWins: 5,
        myLosses: 3,
        isMutual: true,
    },
    {
        handle: "cp_grinder",
        initials: "CG",
        rating: 1650,
        maxRating: 1720,
        online: false,
        lastSeen: "3h ago",
        country: "China",
        countryFlag: "🇨🇳",
        gamesPlayed: 15,
        myWins: 10,
        myLosses: 5,
        isMutual: true,
    },
    {
        handle: "debug_lord",
        initials: "DL",
        rating: 2350,
        maxRating: 2400,
        online: false,
        lastSeen: "1d ago",
        country: "USA",
        countryFlag: "🇺🇸",
        gamesPlayed: 6,
        myWins: 1,
        myLosses: 5,
        isMutual: false,
    },
    {
        handle: "petr_fan",
        initials: "PF",
        rating: 2341,
        maxRating: 2341,
        online: false,
        lastSeen: "2d ago",
        country: "Poland",
        countryFlag: "🇵🇱",
        gamesPlayed: 3,
        myWins: 1,
        myLosses: 2,
        isMutual: false,
    },
    {
        handle: "algo_queen",
        initials: "AQ",
        rating: 1988,
        maxRating: 2050,
        online: true,
        lastSeen: "Online",
        country: "Japan",
        countryFlag: "🇯🇵",
        gamesPlayed: 4,
        myWins: 3,
        myLosses: 1,
        isMutual: true,
    },
    {
        handle: "fast_typer",
        initials: "FT",
        rating: 1780,
        maxRating: 1810,
        online: false,
        lastSeen: "5h ago",
        country: "Germany",
        countryFlag: "🇩🇪",
        gamesPlayed: 7,
        myWins: 4,
        myLosses: 3,
        isMutual: true,
    },
    {
        handle: "null_ptr",
        initials: "NP",
        rating: 1560,
        maxRating: 1600,
        online: false,
        lastSeen: "1w ago",
        country: "Brazil",
        countryFlag: "🇧🇷",
        gamesPlayed: 5,
        myWins: 4,
        myLosses: 1,
        isMutual: true,
    },
    {
        handle: "master_coder",
        initials: "MC",
        rating: 2109,
        maxRating: 2200,
        online: true,
        lastSeen: "In battle",
        country: "South Korea",
        countryFlag: "🇰🇷",
        gamesPlayed: 3,
        myWins: 1,
        myLosses: 2,
        isMutual: false,
    },
    {
        handle: "recursion_k",
        initials: "RK",
        rating: 1840,
        maxRating: 1900,
        online: false,
        lastSeen: "2h ago",
        country: "India",
        countryFlag: "🇮🇳",
        gamesPlayed: 6,
        myWins: 4,
        myLosses: 2,
        isMutual: true,
    },
];
function StatPill({ label, value, color, }) {
    return (_jsxs("div", { className: "flex flex-col items-center gap-0.5", children: [_jsx("span", { className: "text-[14px] font-bold font-mono", style: color ? { color } : {}, children: value }), _jsx("span", { className: "text-[10px] uppercase tracking-wider text-white/25", children: label })] }));
}
function FriendCard({ friend }) {
    const ratingColor = getRatingColor(friend.rating);
    const winRate = friend.gamesPlayed > 0
        ? Math.round((friend.myWins / friend.gamesPlayed) * 100)
        : 0;
    return (_jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 flex flex-col gap-4 hover:border-border-bright transition-colors group", children: [_jsxs("div", { className: "flex items-start gap-3.5", children: [_jsxs("div", { className: "relative flex-shrink-0", children: [_jsx("div", { className: "w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-bold", style: { background: ratingColor + "22", color: ratingColor }, children: friend.initials }), _jsx("span", { className: "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card", style: { background: friend.online ? "#4ade80" : "#2a2a38" } })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [_jsx("span", { className: "text-[14px] font-bold text-white", children: friend.handle }), _jsx("span", { className: "text-[13px]", children: friend.countryFlag }), !friend.isMutual && (_jsx("span", { className: "text-[10px] font-bold text-white/30 border border-border px-1.5 py-0.5 rounded", children: "following" }))] }), _jsxs("p", { className: "text-[12px] mt-0.5", style: { color: ratingColor }, children: [getRatingTitle(friend.rating), " \u00B7 ", friend.rating] }), _jsx("p", { className: "text-[11px] text-white/25 mt-0.5", children: friend.online ? (_jsx("span", { className: "text-success font-semibold", children: friend.lastSeen })) : (friend.lastSeen) })] })] }), _jsx("div", { className: "h-px bg-border" }), _jsxs("div", { className: "flex items-center justify-around", children: [_jsx(StatPill, { label: "W\u2013L", value: `${friend.myWins}–${friend.myLosses}` }), _jsx(StatPill, { label: "Win rate", value: `${winRate}%`, color: winRate >= 50 ? "#4ade80" : "#f87171" }), _jsx(StatPill, { label: "Games", value: `${friend.gamesPlayed}` }), _jsx(StatPill, { label: "Max", value: `${friend.maxRating}`, color: getRatingColor(friend.maxRating) })] }), _jsx("div", { className: "h-1 bg-border rounded-full overflow-hidden", children: _jsx("div", { className: "h-full rounded-full transition-all duration-500", style: {
                        width: `${winRate}%`,
                        background: winRate >= 50
                            ? "linear-gradient(90deg, #16a34a, #4ade80)"
                            : "linear-gradient(90deg, #dc2626, #f87171)",
                    } }) }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { className: "flex-1 py-2 text-[12px] font-bold text-accent border border-accent/30 bg-accent/5 rounded-lg hover:bg-accent hover:text-white transition-colors", children: "\u2694 Duel" }), _jsx("button", { className: "flex-1 py-2 text-[12px] font-semibold text-white/40 border border-border rounded-lg hover:text-white hover:border-border-bright transition-colors", children: "View profile" })] })] }));
}
export default function FriendsPage() {
    const [search, setSearch] = useState("");
    const [tab, setTab] = useState("all");
    const [sortBy, setSortBy] = useState("rating");
    const filtered = useMemo(() => {
        let list = [...ALL_FRIENDS];
        if (tab === "online")
            list = list.filter((f) => f.online);
        if (tab === "mutual")
            list = list.filter((f) => f.isMutual);
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter((f) => f.handle.toLowerCase().includes(q));
        }
        list.sort((a, b) => {
            if (sortBy === "rating")
                return b.rating - a.rating;
            if (sortBy === "games")
                return b.gamesPlayed - a.gamesPlayed;
            if (sortBy === "winrate") {
                const wa = a.gamesPlayed > 0 ? a.myWins / a.gamesPlayed : 0;
                const wb = b.gamesPlayed > 0 ? b.myWins / b.gamesPlayed : 0;
                return wb - wa;
            }
            return 0;
        });
        return list;
    }, [search, tab, sortBy]);
    const onlineCount = ALL_FRIENDS.filter((f) => f.online).length;
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-base font-syne", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-1 overflow-y-auto", children: _jsxs("div", { className: "max-w-[1200px] mx-auto px-6 py-8", children: [_jsxs("div", { className: "flex items-end justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-[28px] font-extrabold tracking-tight text-white", children: "Friends" }), _jsxs("p", { className: "text-[14px] text-white/40 mt-1 font-mono", children: [ALL_FRIENDS.length, " friends \u00B7 ", onlineCount, " online now"] })] }), _jsxs("button", { className: "flex items-center gap-2 px-4 py-2.5 bg-accent text-white text-[13px] font-bold rounded-xl hover:opacity-90 transition-opacity", children: [_jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [_jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }), _jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })] }), "Add friend"] })] }), _jsxs("div", { className: "flex items-center gap-4 mb-6 flex-wrap", children: [_jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [_jsxs("svg", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-white/25", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("circle", { cx: "11", cy: "11", r: "8" }), _jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })] }), _jsx("input", { type: "text", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search by handle...", className: "w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-[13px] text-white placeholder:text-white/25 focus:outline-none focus:border-accent transition-colors" })] }), _jsx("div", { className: "flex gap-1 bg-card border border-border rounded-xl p-1", children: ["all", "online", "mutual"].map((t) => (_jsx("button", { onClick: () => setTab(t), className: `px-3.5 py-1.5 text-[12px] font-semibold rounded-lg capitalize transition-colors ${tab === t
                                            ? "bg-accent/15 text-accent"
                                            : "text-white/40 hover:text-white/70"}`, children: t === "online"
                                            ? `Online (${onlineCount})`
                                            : t.charAt(0).toUpperCase() + t.slice(1) }, t))) }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "px-3.5 py-2.5 bg-card border border-border rounded-xl text-[13px] text-white/60 focus:outline-none focus:border-accent transition-colors cursor-pointer", children: [_jsx("option", { value: "rating", children: "Sort: Rating" }), _jsx("option", { value: "games", children: "Sort: Games played" }), _jsx("option", { value: "winrate", children: "Sort: Win rate" })] })] }), filtered.length === 0 ? (_jsxs("div", { className: "flex flex-col items-center justify-center py-24 text-white/20", children: [_jsx("span", { className: "text-[40px] mb-3", children: "\uD83D\uDD0D" }), _jsx("p", { className: "text-[15px] font-semibold", children: "No friends found" }), _jsx("p", { className: "text-[13px] mt-1", children: "Try a different search or filter" })] })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: filtered.map((friend) => (_jsx(FriendCard, { friend: friend }, friend.handle))) })), _jsxs("div", { className: "mt-8 flex flex-col items-center gap-3 py-10 border border-dashed border-border rounded-2xl", children: [_jsx("span", { className: "text-[28px]", children: "\uD83D\uDC65" }), _jsx("p", { className: "text-[14px] font-semibold text-white/50", children: "Find more players to duel" }), _jsx("button", { className: "text-[13px] font-bold text-accent px-5 py-2 border border-accent/30 bg-accent/5 rounded-xl hover:bg-accent hover:text-white transition-colors", children: "Browse leaderboard \u2192" })] })] }) })] }));
}
