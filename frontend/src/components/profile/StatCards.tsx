// import type { ProfileStats } from "../../types";
//
// interface StatCardProps {
//   label: string;
//   value: string;
//   sub?: string;
//   accent?: string;   // hex color
//   icon: React.ReactNode;
// }
//
// function StatCard({ label, value, sub, accent, icon }: StatCardProps) {
//   return (
//     <div className="relative bg-card border border-border rounded-xl p-5 flex flex-col gap-3 overflow-hidden group hover:border-border-bright transition-colors">
//       {/* Subtle glow on hover */}
//       {accent && (
//         <div
//           className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl"
//           style={{ background: `radial-gradient(circle at 0% 0%, ${accent}10 0%, transparent 60%)` }}
//         />
//       )}
//
//       <div className="flex items-start justify-between">
//         <span className="text-[11px] font-bold uppercase tracking-widest text-white/30">{label}</span>
//         <span className="text-white/20">{icon}</span>
//       </div>
//
//       <div>
//         <p
//           className="text-[26px] font-extrabold font-mono leading-none tracking-tight"
//           style={accent ? { color: accent } : { color: "inherit" }}
//         >
//           {value}
//         </p>
//         {sub && <p className="text-[12px] text-white/30 mt-1">{sub}</p>}
//       </div>
//     </div>
//   );
// }
//
// interface StatCardsProps {
//   profile: ProfileStats;
// }
//
// export default function StatCards({ profile }: StatCardsProps) {
//   const winRate  = Math.round((profile.gamesWon / profile.gamesPlayed) * 100);
//   const betRate  = Math.round((profile.betsWon / (profile.totalBets || 1)) * 100);
//
//   const cards: StatCardProps[] = [
//     {
//       label:  "Win streak",
//       value:  `${profile.winStreak}`,
//       sub:    `Best: ${profile.maxWinStreak}`,
//       accent: "#4ade80",
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
//         </svg>
//       ),
//     },
//     {
//       label:  "Win rate",
//       value:  `${winRate}%`,
//       sub:    `${profile.gamesWon}W · ${profile.gamesLost}L`,
//       accent: "#7c6af7",
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
//         </svg>
//       ),
//     },
//     {
//       label:  "Best solve time",
//       value:  profile.bestTime,
//       sub:    "Fastest AC",
//       accent: "#fbbf24",
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <circle cx="12" cy="12" r="10" />
//           <polyline points="12 6 12 12 16 14" />
//         </svg>
//       ),
//     },
//     {
//       label:  "Best rank",
//       value:  `#${profile.bestRank}`,
//       sub:    "App leaderboard",
//       accent: "#f7c06a",
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
//           <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
//           <path d="M4 22h16" />
//           <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
//           <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
//           <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
//         </svg>
//       ),
//     },
//     {
//       label:  "Total games",
//       value:  `${profile.gamesPlayed}`,
//       sub:    `${profile.gamesWon} won · ${profile.gamesLost} lost`,
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <rect x="2" y="6" width="20" height="12" rx="2" />
//           <path d="M12 12h.01" />
//           <path d="M7 12h.01" />
//           <path d="M17 12h.01" />
//         </svg>
//       ),
//     },
//     {
//       label:  "Bets record",
//       value:  `${profile.betsWon}–${profile.betsLost}`,
//       sub:    `${betRate}% success · ${profile.totalBets} total`,
//       accent: "#f87171",
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <line x1="12" y1="1" x2="12" y2="23" />
//           <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
//         </svg>
//       ),
//     },
//     {
//       label:  "CF Rating",
//       value:  `${profile.rating}`,
//       sub:    `Max: ${profile.maxRating}`,
//       accent: "#c084fc",
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <circle cx="12" cy="12" r="10" />
//           <path d="M8 14s1.5 2 4 2 4-2 4-2" />
//           <line x1="9" y1="9" x2="9.01" y2="9" />
//           <line x1="15" y1="9" x2="15.01" y2="9" />
//         </svg>
//       ),
//     },
//     {
//       label:  "Active days",
//       value:  "214",
//       sub:    "in the last year",
//       accent: "#60a5fa",
//       icon: (
//         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
//           <line x1="16" y1="2" x2="16" y2="6" />
//           <line x1="8"  y1="2" x2="8"  y2="6" />
//           <line x1="3"  y1="10" x2="21" y2="10" />
//         </svg>
//       ),
//     },
//   ];
//
//   return (
//     <div className="grid grid-cols-4 gap-3">
//       {cards.map((card) => (
//         <StatCard key={card.label} {...card} />
//       ))}
//     </div>
//   );
// }

import type { ProfileStats } from "../../types";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
}

function StatCard({ label, value, sub, accent, icon, trend }: StatCardProps) {
  return (
    <div className="relative bg-card border border-border rounded-xl p-5 flex flex-col gap-3 overflow-hidden group hover:border-border-bright transition-all duration-300 hover:shadow-lg hover:shadow-accent/5">
      {/* Animated gradient glow on hover */}
      {accent && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${accent}12 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Subtle pulse animation for trending stats */}
      {trend === "up" && (
        <div
          className="absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse"
          style={{ background: accent || "#4ade80" }}
        />
      )}

      <div className="flex items-start justify-between relative z-10">
        <span className="text-[11px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white/40 transition-colors">
          {label}
        </span>
        <span className="text-white/20 group-hover:text-white/30 transition-colors group-hover:scale-110 duration-300">
          {icon}
        </span>
      </div>

      <div className="relative z-10">
        <p
          className="text-[26px] font-extrabold font-mono leading-none tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left"
          style={accent ? { color: accent } : { color: "inherit" }}
        >
          {value}
        </p>
        {sub && (
          <p className="text-[12px] text-white/30 group-hover:text-white/40 mt-1.5 transition-colors">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

interface StatCardsProps {
  profile: ProfileStats;
}

export default function StatCards({ profile }: StatCardsProps) {
  const winRate = Math.round((profile.gamesWon / profile.gamesPlayed) * 100);
  const betRate = Math.round(
    (profile.betsWon / (profile.totalBets || 1)) * 100,
  );
  const isOnStreak = profile.winStreak > 0;

  // Calculate if user is improving (would need historical data, using streak as proxy)
  const streakTrend = profile.winStreak >= 3 ? "up" : "neutral";

  const cards: StatCardProps[] = [
    {
      label: "Win streak",
      value: `${profile.winStreak}`,
      sub: `Best: ${profile.maxWinStreak}`,
      accent: isOnStreak ? "#4ade80" : "#888888",
      trend: streakTrend,
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      label: "Win rate",
      value: `${winRate}%`,
      sub: `${profile.gamesWon}W · ${profile.gamesLost}L`,
      accent: "#7c6af7",
      trend: winRate > 60 ? "up" : "neutral",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 20V10" />
          <path d="M12 20V4" />
          <path d="M6 20v-6" />
        </svg>
      ),
    },
    {
      label: "Best solve time",
      value: profile.bestTime,
      sub: "Fastest AC",
      accent: "#fbbf24",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      label: "Best rank",
      value: `#${profile.bestRank}`,
      sub: "App leaderboard",
      accent: "#f7c06a",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
        </svg>
      ),
    },
    {
      label: "Total games",
      value: `${profile.gamesPlayed}`,
      sub: `${profile.gamesWon} won · ${profile.gamesLost} lost`,
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M12 12h.01" />
          <path d="M7 12h.01" />
          <path d="M17 12h.01" />
        </svg>
      ),
    },
    {
      label: "Bets record",
      value: `${profile.betsWon}–${profile.betsLost}`,
      sub: `${betRate}% success · ${profile.totalBets} total`,
      accent: betRate > 50 ? "#4ade80" : "#f87171",
      trend: betRate > 60 ? "up" : "neutral",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      label: "Blitzforce Points",
      value: `${profile.rating}`,
      sub: `Max: ${profile.maxRating}`,
      accent: "#7c6af7",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      label: "CF Rating",
      value: `${profile.rating}`,
      sub: profile.rank,
      accent: "#c084fc",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}
