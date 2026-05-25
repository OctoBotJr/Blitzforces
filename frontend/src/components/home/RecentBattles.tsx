import { useNavigate } from "react-router-dom";
import type { ProfileData } from "../../hooks/useProfile";

interface RecentBattlesProps {
  profile: ProfileData | null;
}

function getDifficultyStyle(rating: number) {
  if (rating >= 2000)
    return {
      color: "#c084fc",
      bg: "rgba(192,132,252,0.1)",
      border: "rgba(192,132,252,0.25)",
    };
  if (rating >= 1800)
    return {
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.1)",
      border: "rgba(96,165,250,0.25)",
    };
  return {
    color: "#4ade80",
    bg: "rgba(74,222,128,0.1)",
    border: "rgba(74,222,128,0.25)",
  };
}

export default function RecentBattles({ profile }: RecentBattlesProps) {
  const navigate = useNavigate();
  const battles = profile?.gameHistory?.slice(0, 5) ?? [];

  return (
    <section className="px-10 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-bold tracking-tight text-white">
          Recent battles
        </h2>
        <button
          className="text-[13px] font-semibold text-white/30 hover:text-accent transition-colors"
          onClick={() =>
            navigate("/profile", { state: { scrollToBottom: true } })
          }
        >
          View all →
        </button>
      </div>

      {battles.length === 0 ? (
        <div className="py-10 text-center text-[13px] text-white/25 font-mono">
          No battles yet — find a match to get started!
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          {battles.map((battle, i) => {
            const diff = getDifficultyStyle(battle.problemRating);
            const won = battle.result === "won";
            return (
              <div
                key={battle.id ?? i}
                className="flex items-center gap-4 px-4 py-3.5 bg-card border border-border rounded-xl hover:border-border-bright hover:bg-elevated transition-colors"
              >
                <div
                  className="flex items-center gap-1.5 text-[13px] font-bold font-mono w-8 flex-shrink-0"
                  style={{ color: won ? "#4ade80" : "#f87171" }}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: won ? "#4ade80" : "#f87171" }}
                  />
                  {won ? "W" : "L"}
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-white">
                    {battle.opponent}
                  </p>
                  <p className="text-[12px] font-mono text-white/30">
                    {battle.problemId}
                  </p>
                </div>
                <span
                  className="text-[11px] font-bold font-mono px-2.5 py-1 rounded-full border flex-shrink-0"
                  style={{
                    color: diff.color,
                    background: diff.bg,
                    borderColor: diff.border,
                  }}
                >
                  {battle.problemRating}
                </span>
                <span className="text-[12px] font-mono text-white/30 flex-shrink-0">
                  {battle.solveTime ?? "—"}
                </span>
                <span
                  className="text-[14px] font-bold font-mono w-11 text-right flex-shrink-0"
                  style={{ color: won ? "#4ade80" : "#f87171" }}
                >
                  {battle.ratingDelta > 0 ? "+" : ""}
                  {battle.ratingDelta}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
