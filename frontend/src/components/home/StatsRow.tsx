import type { ProfileData } from "../../hooks/useProfile";

interface StatsRowProps {
  profile: ProfileData | null;
}

export default function StatsRow({ profile }: StatsRowProps) {
  const winRate =
    profile && profile.gamesPlayed > 0
      ? Math.round((profile.gamesWon / profile.gamesPlayed) * 100)
      : 0;

  const stats = [
    {
      label: "BF Points",
      value: String(profile?.blitzforcePoints ?? "—"),
      sub: `CF Rating: ${profile?.cfRating ?? "—"}`,
      color: "#7c6af7",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      label: "Win rate",
      value: `${winRate}%`,
      sub: `${profile?.gamesWon ?? 0} / ${profile?.gamesPlayed ?? 0} games`,
      color: "#4ade80",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
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
      label: "Win streak",
      value: String(profile?.winStreak ?? 0),
      sub: `${profile?.gamesPlayed ?? 0} total games`,
      color: "#fbbf24",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
    {
      label: "Problems solved",
      value: String(profile?.solvedCount ?? "—"),
      sub: `on Codeforces`,
      color: "#60a5fa",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  return (
    <section className="border-b border-border bg-surface">
      <div className="max-w-[1200px] mx-auto px-10 py-6">
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="relative flex flex-col gap-3 px-6 py-5 rounded-2xl bg-card border border-border hover:border-border-bright transition-colors overflow-hidden group"
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ background: stat.color }}
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[1.2px] text-white/30">
                  {stat.label}
                </span>
                <span
                  className="p-1.5 rounded-lg"
                  style={{ color: stat.color, background: stat.color + "18" }}
                >
                  {stat.icon}
                </span>
              </div>
              <span
                className="text-[32px] font-extrabold font-mono leading-none tracking-tight"
                style={{ color: stat.color }}
              >
                {stat.value}
              </span>
              <span className="text-[12px] text-white/40">{stat.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
