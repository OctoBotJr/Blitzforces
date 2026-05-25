import type { BestWin } from "../../types";
import { getRatingColor } from "../../utils/rating";

interface BestWinsProps {
  wins: BestWin[];
}

const MEDALS = ["🥇", "🥈", "🥉"];

function getDifficultyColor(rating: number): string {
  if (rating >= 2400) return "#ff3333";
  if (rating >= 2000) return "#c084fc";
  if (rating >= 1800) return "#60a5fa";
  return "#4ade80";
}

export default function BestWins({ wins }: BestWinsProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h3 className="text-[15px] font-bold text-white mb-4">Best wins</h3>

      <div className="flex flex-col gap-3">
        {wins.map((win, i) => {
          const oppColor  = getRatingColor(win.opponentRating);
          const diffColor = getDifficultyColor(win.problemRating);

          return (
            <div
              key={i}
              className="flex items-center gap-4 px-4 py-3.5 bg-elevated border border-border rounded-xl hover:border-border-bright transition-colors group"
            >
              {/* Medal */}
              <span className="text-[20px] flex-shrink-0">{MEDALS[i]}</span>

              {/* Opponent avatar */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                style={{ background: oppColor + "22", color: oppColor }}
              >
                {win.opponentInitials}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[13px] font-bold text-white">{win.opponent}</span>
                  <span className="text-[11px] font-mono" style={{ color: oppColor }}>
                    {win.opponentRating}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-white/30">{win.problemId}</span>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded border font-mono"
                    style={{ color: diffColor, borderColor: diffColor + "33", background: diffColor + "11" }}
                  >
                    {win.problemRating}
                  </span>
                  <span className="text-[11px] text-white/25">{win.date}</span>
                </div>
              </div>

              {/* Right side: time + delta */}
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-[14px] font-bold font-mono text-success">
                  +{win.ratingGained}
                </span>
                <span className="text-[11px] font-mono text-white/30">{win.solveTime}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
