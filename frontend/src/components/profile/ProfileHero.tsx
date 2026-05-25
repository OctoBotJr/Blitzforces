import type { ProfileStats } from "../../types";
import { getRatingColor, getRatingTitle } from "../../utils/rating";

interface ProfileHeroProps {
  profile: ProfileStats;
}

const RANK_STRIPES: Record<string, string> = {
  "Legendary GM": "from-red-500   to-red-700",
  Grandmaster: "from-red-400   to-red-600",
  Master: "from-amber-400 to-orange-500",
  Expert: "from-accent    to-accent-dim",
  Specialist: "from-teal-400  to-teal-600",
  Pupil: "from-green-400 to-green-600",
  Newbie: "from-gray-400  to-gray-600",
};

export default function ProfileHero({ profile }: ProfileHeroProps) {
  const ratingColor = getRatingColor(profile.rating);
  const rankStripe = RANK_STRIPES[profile.rank] ?? "from-accent to-accent-dim";
  const winRate = Math.round((profile.gamesWon / profile.gamesPlayed) * 100);

  return (
    <div className="relative w-140 overflow-hidden border-b border-border">
      {/* Grid bg */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Diagonal rank stripe — the "creative" signature element */}
      <div
        className={`absolute -right-16 -top-10 w-[320px] h-[320px] bg-gradient-to-br ${rankStripe} opacity-[0.07] rotate-12 pointer-events-none rounded-full`}
      />

      <div className="relative z-10 flex items-end gap-8 px-10 pt-10 pb-8">
        {/* Avatar block */}
        <div className="relative flex-shrink-0">
          {/* Outer ring — animated */}
          <div
            className="absolute inset-[-6px] rounded-full border-2 opacity-40 animate-spinSlow"
            style={{ borderColor: ratingColor }}
          />
          <div
            className="absolute inset-[-12px] rounded-full border opacity-20 animate-spinSlow"
            style={{
              borderColor: ratingColor,
              animationDuration: "6s",
              animationDirection: "reverse",
            }}
          />

          {/* Avatar */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-[28px] font-extrabold text-white relative z-10"
            style={{
              background: `linear-gradient(135deg, ${ratingColor}66, ${ratingColor})`,
            }}
          >
            {profile.handle.slice(0, 2).toUpperCase()}
          </div>

          {/* Online dot */}
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-success border-2 border-base z-20 animate-pulse2" />
        </div>

        {/* Identity block */}
        <div className="flex-1 pb-1">
          <div className="flex items-center gap-3 mb-1.5">
            <h1 className="text-[28px] font-extrabold tracking-tight leading-none">
              {profile.handle}
            </h1>
            <span
              className="text-[11px] font-bold px-3 py-1 rounded-full border"
              style={{
                color: ratingColor,
                borderColor: ratingColor + "44",
                background: ratingColor + "11",
              }}
            >
              {profile.rank}
            </span>
            <span className="text-[13px]">{profile.countryFlag}</span>
          </div>

          <p className="text-[14px] text-white/40 mb-3">
            {profile.displayName} · {profile.email}
          </p>

          {/* Inline stats row */}
          <div className="flex items-center gap-6 flex-wrap">
            {[
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
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span
                  className="text-[18px] font-bold font-mono leading-none"
                  style={s.color ? { color: s.color } : { color: "inherit" }}
                >
                  {s.value}
                </span>
                <span className="text-[11px] text-white/30 uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CF handle link — top right */}
        <a
          href={`https://codeforces.com/profile/${profile.cfHandle}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-[13px] font-semibold text-white/50 hover:text-white hover:border-border-bright transition-colors self-start flex-shrink-0"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          CF: {profile.cfHandle}
        </a>
      </div>

      {/* Progress bar showing win rate */}
      <div className="relative z-10 mx-10 mb-6">
        <div className="flex items-center justify-between text-[11px] text-white/30 mb-1.5">
          <span>{profile.gamesWon} wins</span>
          <span>{profile.gamesLost} losses</span>
        </div>
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${winRate}%`,
              background: `linear-gradient(90deg, ${ratingColor}88, ${ratingColor})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
