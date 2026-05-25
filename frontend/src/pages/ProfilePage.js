import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import Navbar from "../components/layout/Navbar";
// import ProfileHero from "../components/profile/ProfileHero";
// import RatingGraph from "../components/profile/RatingGraph";
// import ActivityGrid from "../components/profile/ActivityGrid";
// import StatCards from "../components/profile/StatCards";
// import GameHistoryTable from "../components/profile/GameHistoryTable";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useProfile } from "../hooks/useProfile";
// import type { ProfileStats } from "../types";
//
// // Fill today's date gaps in activity grid so the heatmap always covers 1 year
// function fillActivityGrid(raw: { date: string; count: number }[]) {
//   const map = new Map(raw.map((d) => [d.date, d.count]));
//   const days: { date: string; count: number }[] = [];
//   const end = new Date();
//   const start = new Date(end);
//   start.setFullYear(start.getFullYear() - 1);
//   for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
//     const key = d.toISOString().slice(0, 10);
//     days.push({ date: key, count: map.get(key) ?? 0 });
//   }
//   return days;
// }
//
// export default function ProfilePage() {
//   const location = useLocation();
//   const { profile, loading, error } = useProfile();
//
//   useEffect(() => {
//     if (location.state?.scrollToBottom) {
//       window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
//     }
//   }, [location]);
//
//   if (loading) {
//     return (
//       <div className="flex flex-col min-h-screen bg-base font-syne">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center">
//           <p className="text-white/30 text-[14px] font-mono animate-pulse">
//             Loading profile...
//           </p>
//         </div>
//       </div>
//     );
//   }
//
//   if (error || !profile) {
//     return (
//       <div className="flex flex-col min-h-screen bg-base font-syne">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center">
//           <p className="text-danger text-[14px] font-mono">
//             {error ?? "Profile not found"}
//           </p>
//         </div>
//       </div>
//     );
//   }
//
//   // Map backend profile → ProfileStats shape your components expect
//   const profileStats: ProfileStats = {
//     handle: profile.handle,
//     displayName: profile.handle, // no displayName yet, use handle
//     email: profile.email,
//     country: "",
//     countryFlag: "",
//     joinedDate: profile.joinedDate,
//     cfHandle: profile.cfHandle,
//     rating: profile.blitzforcePoints, // Blitzforce points as "rating"
//     maxRating: profile.blitzforcePoints, // will track properly later
//     rank: profile.cfTier,
//     gamesPlayed: profile.gamesPlayed,
//     gamesWon: profile.gamesWon,
//     gamesLost: profile.gamesLost,
//     winStreak: profile.winStreak,
//     maxWinStreak: profile.winStreak, // will track properly later
//     bestTime: "—", // derive from gameHistory later
//     bestRank: 1,
//     totalBets: profile.totalBets,
//     betsWon: profile.betsWon,
//     betsLost: profile.betsLost,
//     ratingHistory: profile.ratingHistory,
//     activityGrid: fillActivityGrid(profile.activityGrid),
//     bestWins: profile.bestWins,
//   };
//
//   return (
//     <div className="flex flex-col min-h-screen bg-base font-syne">
//       <Navbar />
//       <main className="flex-1 overflow-y-auto">
//         <ProfileHero profile={profileStats} />
//         <div className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col gap-6">
//           <StatCards profile={profileStats} />
//           {profile.ratingHistory.length > 0 ? (
//             <RatingGraph history={profileStats.ratingHistory} />
//           ) : (
//             <div className="bg-card border border-border rounded-2xl p-6 text-center text-white/25 text-[13px] font-mono">
//               Play your first duel to see your rating graph.
//             </div>
//           )}
//           <ActivityGrid days={profileStats.activityGrid} />
//           <GameHistoryTable entries={profile.gameHistory} />
//         </div>
//       </main>
//     </div>
//   );
//}
//
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import ProfileHero from "../components/profile/ProfileHero";
import RatingGraph from "../components/profile/RatingGraph";
import ActivityGrid from "../components/profile/ActivityGrid";
import StatCards from "../components/profile/StatCards";
import GameHistoryTable from "../components/profile/GameHistoryTable";
import BestWins from "../components/profile/BestWins";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
// Fill today's date gaps in activity grid so the heatmap always covers 1 year
function fillActivityGrid(raw) {
    const map = new Map(raw.map((d) => [d.date, d.count]));
    const days = [];
    const end = new Date();
    const start = new Date(end);
    start.setFullYear(start.getFullYear() - 1);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const key = d.toISOString().slice(0, 10);
        days.push({ date: key, count: map.get(key) ?? 0 });
    }
    return days;
}
export default function ProfilePage() {
    const location = useLocation();
    const { profile, loading, error } = useProfile();
    useEffect(() => {
        if (location.state?.scrollToBottom) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }
    }, [location]);
    if (loading) {
        return (_jsxs("div", { className: "flex flex-col min-h-screen bg-base font-syne", children: [_jsx(Navbar, {}), _jsxs("div", { className: "flex flex-1 overflow-hidden", children: [_jsx(Sidebar, {}), _jsx("main", { className: "flex-1 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "inline-block w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin mb-4" }), _jsx("p", { className: "text-white/40 text-[14px] font-mono", children: "Loading profile..." })] }) })] })] }));
    }
    if (error || !profile) {
        return (_jsxs("div", { className: "flex flex-col min-h-screen bg-base font-syne", children: [_jsx(Navbar, {}), _jsxs("div", { className: "flex flex-1 overflow-hidden", children: [_jsx(Sidebar, {}), _jsx("main", { className: "flex-1 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 rounded-full bg-danger/10 flex items-center justify-center", children: _jsxs("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", className: "text-danger", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("line", { x1: "15", y1: "9", x2: "9", y2: "15" }), _jsx("line", { x1: "9", y1: "9", x2: "15", y2: "15" })] }) }), _jsx("p", { className: "text-danger text-[14px] font-semibold mb-1", children: "Failed to load profile" }), _jsx("p", { className: "text-white/30 text-[12px] font-mono", children: error ?? "Profile not found" })] }) })] })] }));
    }
    // Map backend profile → ProfileStats shape your components expect
    const profileStats = {
        handle: profile.handle,
        displayName: profile.handle,
        email: profile.email,
        country: "",
        countryFlag: "",
        joinedDate: profile.joinedDate,
        cfHandle: profile.cfHandle,
        rating: profile.blitzforcePoints,
        maxRating: profile.blitzforcePoints, // TODO: track max rating properly
        rank: profile.cfTier,
        gamesPlayed: profile.gamesPlayed,
        gamesWon: profile.gamesWon,
        gamesLost: profile.gamesLost,
        winStreak: profile.winStreak,
        maxWinStreak: profile.winStreak, // TODO: track max properly
        bestTime: "—", // TODO: derive from gameHistory
        bestRank: 1,
        totalBets: profile.totalBets,
        betsWon: profile.betsWon,
        betsLost: profile.betsLost,
        ratingHistory: profile.ratingHistory,
        activityGrid: fillActivityGrid(profile.activityGrid),
        bestWins: profile.bestWins,
    };
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-base font-syne", children: [_jsx(Navbar, {}), _jsxs("div", { className: "flex flex-1 overflow-hidden", children: [_jsx(Sidebar, {}), _jsxs("main", { className: "flex-1 overflow-y-auto", children: [_jsx(ProfileHero, { profile: profileStats }), _jsxs("div", { className: "max-w-[1400px] mx-auto px-8 py-8", children: [_jsx("div", { className: "mb-6", children: _jsx(StatCards, { profile: profileStats }) }), _jsxs("div", { className: "grid grid-cols-2 gap-6 mb-6", children: [_jsx("div", { children: profile.ratingHistory.length > 0 ? (_jsx(RatingGraph, { history: profileStats.ratingHistory })) : (_jsx("div", { className: "bg-card border border-border rounded-2xl p-8 h-full flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center", children: _jsx("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", className: "text-accent/40", children: _jsx("polyline", { points: "22 12 18 12 15 21 9 3 6 12 2 12" }) }) }), _jsx("p", { className: "text-white/30 text-[13px] font-semibold mb-1", children: "No rating history yet" }), _jsx("p", { className: "text-white/20 text-[12px] font-mono", children: "Play your first duel to see your graph" })] }) })) }), _jsx("div", { children: profile.bestWins.length > 0 ? (_jsx(BestWins, { wins: profileStats.bestWins })) : (_jsx("div", { className: "bg-card border border-border rounded-2xl p-8 h-full flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center", children: _jsxs("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", className: "text-success/40", children: [_jsx("path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6" }), _jsx("path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18" }), _jsx("path", { d: "M4 22h16" }), _jsx("path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" }), _jsx("path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" }), _jsx("path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2z" })] }) }), _jsx("p", { className: "text-white/30 text-[13px] font-semibold mb-1", children: "No best wins yet" }), _jsx("p", { className: "text-white/20 text-[12px] font-mono", children: "Win duels to see your achievements" })] }) })) })] }), _jsx("div", { className: "mb-6", children: _jsx(ActivityGrid, { days: profileStats.activityGrid }) }), _jsx("div", { children: profile.gameHistory.length > 0 ? (_jsx(GameHistoryTable, { entries: profile.gameHistory })) : (_jsx("div", { className: "bg-card border border-border rounded-2xl p-12", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-20 h-20 mx-auto mb-4 rounded-full bg-info/10 flex items-center justify-center", children: _jsxs("svg", { width: "36", height: "36", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", className: "text-info/40", children: [_jsx("rect", { x: "2", y: "6", width: "20", height: "12", rx: "2" }), _jsx("path", { d: "M12 12h.01" }), _jsx("path", { d: "M7 12h.01" }), _jsx("path", { d: "M17 12h.01" })] }) }), _jsx("p", { className: "text-white/35 text-[15px] font-semibold mb-2", children: "No game history yet" }), _jsx("p", { className: "text-white/25 text-[13px] font-mono mb-6", children: "Your completed duels will appear here" }), _jsx("button", { className: "px-6 py-3 bg-accent hover:bg-accent-dim text-white text-[13px] font-bold rounded-lg transition-colors", children: "Play your first duel \u2192" })] }) })) })] })] })] })] }));
} //
