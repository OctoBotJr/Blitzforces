import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import HeroSection from "../components/home/HeroSection";
import BattleCards from "../components/home/BattleCards";
import StatsRow from "../components/home/StatsRow";
import RecentBattles from "../components/home/RecentBattles";
import { useProfile } from "../hooks/useProfile";
export default function HomePage() {
    const { profile } = useProfile();
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-base font-syne", children: [_jsx(Navbar, {}), _jsxs("div", { className: "flex flex-1 overflow-hidden", children: [_jsx(Sidebar, {}), _jsxs("main", { className: "flex-1 overflow-y-auto", children: [_jsx(HeroSection, { profile: profile }), _jsx(BattleCards, {}), _jsx(StatsRow, { profile: profile }), _jsx(RecentBattles, { profile: profile })] })] })] }));
}
