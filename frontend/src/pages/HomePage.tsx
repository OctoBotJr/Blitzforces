import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import HeroSection from "../components/home/HeroSection";
import BattleCards from "../components/home/BattleCards";
import StatsRow from "../components/home/StatsRow";
import RecentBattles from "../components/home/RecentBattles";
import { useProfile } from "../hooks/useProfile";

export default function HomePage() {
  const { profile } = useProfile();

  return (
    <div className="flex flex-col min-h-screen bg-base font-syne">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <HeroSection profile={profile} />
          <BattleCards />
          <StatsRow profile={profile} />
          <RecentBattles profile={profile} />
        </main>
      </div>
    </div>
  );
}
