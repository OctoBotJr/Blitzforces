import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import Navbar from "../components/layout/Navbar";
import { notificationsData, } from "../data/notificationsData";
// ── Relative time helper ──────────────────────────────────────────────────────
function relativeTime(iso) {
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (diff < 60)
        return "just now";
    if (diff < 3600)
        return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400)
        return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 86400 * 7)
        return `${Math.floor(diff / 86400)}d ago`;
    return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
}
function groupLabel(iso) {
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (diff < 3600)
        return "Just now";
    if (diff < 86400)
        return "Today";
    if (diff < 86400 * 2)
        return "Yesterday";
    if (diff < 86400 * 7)
        return "This week";
    return "Older";
}
const GROUP_ORDER = ["Just now", "Today", "Yesterday", "This week", "Older"];
function getCategoryConfig(category) {
    switch (category) {
        case "friend_request":
            return {
                label: "Friend request",
                color: "#7c6af7",
                bg: "rgba(124,106,247,0.12)",
                icon: (_jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [_jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }), _jsx("circle", { cx: "9", cy: "7", r: "4" }), _jsx("line", { x1: "19", y1: "8", x2: "19", y2: "14" }), _jsx("line", { x1: "22", y1: "11", x2: "16", y2: "11" })] })),
            };
        case "friend_accepted":
            return {
                label: "Friend joined",
                color: "#4ade80",
                bg: "rgba(74,222,128,0.12)",
                icon: (_jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [_jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }), _jsx("circle", { cx: "9", cy: "7", r: "4" }), _jsx("polyline", { points: "16 11 18 13 22 9" })] })),
            };
        case "duel_challenge":
            return {
                label: "Duel",
                color: "#f87171",
                bg: "rgba(248,113,113,0.12)",
                icon: (_jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [_jsx("path", { d: "m14.5 17.5-5-5 5-5" }), _jsx("path", { d: "m9.5 6.5 5 5-5 5" })] })),
            };
        case "rating_milestone":
            return {
                label: "Rating milestone",
                color: "#fbbf24",
                bg: "rgba(251,191,36,0.12)",
                icon: (_jsx("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: _jsx("polyline", { points: "22 12 18 12 15 21 9 3 6 12 2 12" }) })),
            };
        case "rank_milestone":
            return {
                label: "Rank up",
                color: "#f7c06a",
                bg: "rgba(247,192,106,0.12)",
                icon: (_jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [_jsx("path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6" }), _jsx("path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18" }), _jsx("path", { d: "M4 22h16" }), _jsx("path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" }), _jsx("path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" }), _jsx("path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2z" })] })),
            };
        case "win_streak":
            return {
                label: "Streak",
                color: "#fb923c",
                bg: "rgba(251,146,60,0.12)",
                icon: (_jsx("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: _jsx("path", { d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" }) })),
            };
        case "game_result":
            return {
                label: "Game result",
                color: "#60a5fa",
                bg: "rgba(96,165,250,0.12)",
                icon: (_jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [_jsx("rect", { x: "2", y: "6", width: "20", height: "12", rx: "2" }), _jsx("path", { d: "M12 12h.01M7 12h.01M17 12h.01" })] })),
            };
        case "bet_result":
            return {
                label: "Bet settled",
                color: "#34d399",
                bg: "rgba(52,211,153,0.12)",
                icon: (_jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [_jsx("line", { x1: "12", y1: "1", x2: "12", y2: "23" }), _jsx("path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" })] })),
            };
        case "leaderboard":
            return {
                label: "Leaderboard",
                color: "#a78bfa",
                bg: "rgba(167,139,250,0.12)",
                icon: (_jsx("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: _jsx("path", { d: "M18 20V10M12 20V4M6 20v-6" }) })),
            };
        case "system":
        default:
            return {
                label: "System",
                color: "#94a3b8",
                bg: "rgba(148,163,184,0.10)",
                icon: (_jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }), _jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })] })),
            };
    }
}
const TAB_FILTERS = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    {
        key: "friends",
        label: "Friends",
        categories: ["friend_request", "friend_accepted"],
    },
    {
        key: "duels",
        label: "Duels",
        categories: ["duel_challenge", "game_result", "bet_result"],
    },
    {
        key: "milestones",
        label: "Milestones",
        categories: [
            "rating_milestone",
            "rank_milestone",
            "win_streak",
            "leaderboard",
        ],
    },
    { key: "system", label: "System", categories: ["system"] },
];
function NotifCard({ notif, onRead, onDismiss }) {
    const cfg = getCategoryConfig(notif.category);
    return (_jsxs("div", { className: `relative flex items-start gap-4 px-5 py-4 border-b border-border/50 last:border-b-0 transition-colors group ${notif.read
            ? "hover:bg-elevated/50"
            : "bg-accent/[0.03] hover:bg-accent/[0.06]"}`, onClick: () => !notif.read && onRead(notif.id), children: [!notif.read && (_jsx("span", { className: "absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" })), _jsx("div", { className: "flex-shrink-0 mt-0.5", children: notif.avatarInitials ? (_jsxs("div", { className: "w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold relative", style: {
                        background: (notif.avatarColor ?? cfg.color) + "22",
                        color: notif.avatarColor ?? cfg.color,
                    }, children: [notif.avatarInitials, _jsx("div", { className: "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-surface", style: { background: cfg.bg, color: cfg.color }, children: cfg.icon })] })) : (_jsx("div", { className: "w-10 h-10 rounded-full flex items-center justify-center", style: { background: cfg.bg, color: cfg.color }, children: cfg.icon })) }), _jsx("div", { className: "flex-1 min-w-0", children: _jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded", style: { color: cfg.color, background: cfg.bg }, children: cfg.label }), _jsx("span", { className: "text-[11px] text-white/25 font-mono", children: relativeTime(notif.timestamp) })] }), _jsx("p", { className: `text-[14px] font-semibold leading-snug ${notif.read ? "text-white/70" : "text-white"}`, children: notif.title }), _jsx("p", { className: "text-[12px] text-white/40 mt-0.5 leading-relaxed", children: notif.body }), notif.meta && (_jsx("p", { className: "text-[11px] font-mono mt-1.5", style: { color: cfg.color }, children: notif.meta })), notif.actionLabel && (_jsx("button", { ...(notif.actionNav
                                        ? { [`data-nav-${notif.actionNav}`]: "true" }
                                        : {}), className: "mt-2.5 px-3.5 py-1.5 text-[12px] font-bold rounded-lg border transition-colors", style: {
                                        color: cfg.color,
                                        borderColor: cfg.color + "44",
                                        background: cfg.bg,
                                    }, onClick: (e) => {
                                        e.stopPropagation();
                                        onRead(notif.id);
                                    }, children: notif.actionLabel }))] }), _jsx("button", { className: "opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 p-1.5 rounded-lg text-white/20 hover:text-white/60 hover:bg-elevated mt-0.5", onClick: (e) => {
                                e.stopPropagation();
                                onDismiss(notif.id);
                            }, title: "Dismiss", children: _jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) })] }) })] }));
}
// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({ tab }) {
    const messages = {
        unread: { icon: "✓", text: "You're all caught up!" },
        friends: { icon: "👥", text: "No friend notifications" },
        duels: { icon: "⚔️", text: "No duel notifications" },
        milestones: { icon: "🏆", text: "No milestone notifications" },
        system: { icon: "ℹ️", text: "No system notifications" },
        all: { icon: "🔔", text: "No notifications yet" },
    };
    const { icon, text } = messages[tab] ?? messages.all;
    return (_jsxs("div", { className: "flex flex-col items-center justify-center py-20 gap-3 text-white/20", children: [_jsx("span", { className: "text-[40px]", children: icon }), _jsx("p", { className: "text-[14px] font-semibold", children: text })] }));
}
// ── Page ──────────────────────────────────────────────────────────────────────
export default function NotificationsPage() {
    const [items, setItems] = useState(notificationsData);
    const [tab, setTab] = useState("all");
    const unreadCount = items.filter((n) => !n.read).length;
    function markRead(id) {
        setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    }
    function markAllRead() {
        setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    }
    function dismiss(id) {
        setItems((prev) => prev.filter((n) => n.id !== id));
    }
    function dismissAll() {
        const cfg = TAB_FILTERS.find((t) => t.key === tab);
        if (tab === "all") {
            setItems([]);
        }
        else if (tab === "unread") {
            setItems((prev) => prev.filter((n) => n.read));
        }
        else if (cfg?.categories) {
            setItems((prev) => prev.filter((n) => !cfg.categories.includes(n.category)));
        }
    }
    const filtered = useMemo(() => {
        const cfg = TAB_FILTERS.find((t) => t.key === tab);
        if (tab === "unread")
            return items.filter((n) => !n.read);
        if (cfg?.categories)
            return items.filter((n) => cfg.categories.includes(n.category));
        return items;
    }, [items, tab]);
    // Group by relative day
    const grouped = useMemo(() => {
        const map = {};
        for (const n of filtered) {
            const label = groupLabel(n.timestamp);
            if (!map[label])
                map[label] = [];
            map[label].push(n);
        }
        return GROUP_ORDER.filter((g) => map[g]).map((g) => ({
            label: g,
            items: map[g],
        }));
    }, [filtered]);
    const tabUnreadCounts = useMemo(() => {
        const out = {};
        for (const t of TAB_FILTERS) {
            if (t.key === "all") {
                out.all = unreadCount;
                continue;
            }
            if (t.key === "unread") {
                out.unread = unreadCount;
                continue;
            }
            if (t.categories)
                out[t.key] = items.filter((n) => !n.read && t.categories.includes(n.category)).length;
        }
        return out;
    }, [items, unreadCount]);
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-base font-syne", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-1 overflow-y-auto", children: _jsxs("div", { className: "max-w-[780px] mx-auto px-6 py-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-[28px] font-extrabold tracking-tight text-white", children: "Notifications" }), _jsx("p", { className: "text-[14px] text-white/40 mt-1 font-mono", children: unreadCount > 0 ? `${unreadCount} unread` : "All caught up" })] }), _jsxs("div", { className: "flex gap-2", children: [unreadCount > 0 && (_jsx("button", { onClick: markAllRead, className: "text-[12px] font-semibold text-white/40 px-3.5 py-2 border border-border rounded-xl hover:text-white hover:border-border-bright transition-colors", children: "Mark all read" })), filtered.length > 0 && (_jsxs("button", { onClick: dismissAll, className: "text-[12px] font-semibold text-danger/60 px-3.5 py-2 border border-border rounded-xl hover:text-danger hover:border-danger/30 transition-colors", children: ["Clear ", tab === "all" ? "all" : tab] }))] })] }), _jsx("div", { className: "flex gap-1.5 flex-wrap mb-5", children: TAB_FILTERS.map(({ key, label }) => {
                                const count = tabUnreadCounts[key] ?? 0;
                                return (_jsxs("button", { onClick: () => setTab(key), className: `flex items-center gap-1.5 px-3.5 py-2 text-[12px] font-semibold rounded-xl border transition-colors ${tab === key
                                        ? "text-accent bg-accent/10 border-accent/30"
                                        : "text-white/40 border-border hover:text-white/70 hover:border-border-bright"}`, children: [label, count > 0 && (_jsx("span", { className: "text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center", style: {
                                                background: tab === key
                                                    ? "rgba(124,106,247,0.25)"
                                                    : "rgba(124,106,247,0.15)",
                                                color: "#7c6af7",
                                            }, children: count }))] }, key));
                            }) }), grouped.length === 0 ? (_jsx(EmptyState, { tab: tab })) : (_jsx("div", { className: "flex flex-col gap-5", children: grouped.map(({ label, items: groupItems }) => (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3 mb-2 px-1", children: [_jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-white/25", children: label }), _jsx("div", { className: "flex-1 h-px bg-border" }), _jsx("span", { className: "text-[11px] font-mono text-white/20", children: groupItems.length })] }), _jsx("div", { className: "bg-card border border-border rounded-2xl overflow-hidden", children: groupItems.map((notif) => (_jsx(NotifCard, { notif: notif, onRead: markRead, onDismiss: dismiss }, notif.id))) })] }, label))) })), items.length > 0 && (_jsx("p", { className: "text-center text-[11px] text-white/15 font-mono mt-8", children: "Notifications are kept for 30 days" }))] }) })] }));
}
