import { useEffect } from "react";
import { getRatingColor, getRatingTitle } from "../../utils/rating";
import { useAuth } from "../../context/AuthContext";
import type { useDuel } from "../../hooks/useDuel";

interface MatchmakingScreenProps {
  duelState: ReturnType<typeof useDuel>;
}

export default function MatchmakingScreen({ duelState }: MatchmakingScreenProps) {
  const { user } = useAuth();
  const { mmStatus, duel, error, waited, joinQueue, leaveQueue } = duelState;

  // Join queue on mount
  useEffect(() => {
    joinQueue();
    return () => { leaveQueue(); };
  }, []);

  const found    = mmStatus === 'matched';
  const opponent = duel?.players.opponent;

  const formatWaited = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const band = waited < 30 ? 200 : waited < 60 ? 300 : 400;

  return (
    <div className="relative flex-1 flex items-center justify-center overflow-hidden min-h-[calc(100vh-60px)]">
      <div className="absolute inset-0 bg-grid opacity-35 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, transparent 40%, #0a0a0f 100%)" }} />

      <div className="relative z-10 flex flex-col items-center w-full max-w-[680px] px-6">
        <p className="text-[11px] font-bold tracking-[3px] uppercase text-white/25 mb-9">
          Blitz Duel · Rated
        </p>

        <div className="flex items-stretch w-full">
          {/* You */}
          <div className="flex-1 flex flex-col gap-3.5 p-7 bg-card border border-accent/40 rounded-l-2xl relative overflow-hidden">
            <div className="relative w-fit">
              <div className="w-[76px] h-[76px] rounded-full flex items-center justify-center text-[22px] font-extrabold text-white z-10 relative"
                style={{ background: "linear-gradient(135deg, #3b30a0, #7c6af7)" }}>
                {user?.cfHandle?.slice(0, 2).toUpperCase() ?? 'ME'}
              </div>
              <div className="absolute inset-[-5px] rounded-full border border-accent/50 animate-spinSlow" />
            </div>
            <div>
              <p className="text-[16px] font-bold text-white">{user?.cfHandle ?? 'You'}</p>
              <p className="text-[13px] font-mono" style={{ color: getRatingColor(user?.cfRating ?? 0) }}>
                {user?.cfRating ?? '—'}
              </p>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border w-fit"
              style={{ color: "#c084fc", borderColor: "rgba(192,132,252,0.3)", background: "rgba(192,132,252,0.08)" }}>
              {getRatingTitle(user?.cfRating ?? 0)}
            </span>
          </div>

          {/* VS */}
          <div className="flex flex-col items-center justify-center px-3 z-10 flex-shrink-0 gap-2.5">
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-accent to-transparent" />
            <span className="text-[26px] font-extrabold font-mono text-accent tracking-[4px] animate-vsPulse">VS</span>
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-accent to-transparent" />
          </div>

          {/* Opponent */}
          <div className={`flex-1 flex flex-col gap-3.5 p-7 bg-card border rounded-r-2xl items-end relative overflow-hidden transition-colors duration-300 ${found ? "border-success/50" : "border-border"}`}>
            {!found ? (
              <>
                <div className="relative w-fit">
                  <div className="w-[76px] h-[76px] rounded-full border-2 border-dashed border-border-bright flex items-center justify-center bg-elevated">
                    <span className="text-[28px] text-white/20">?</span>
                  </div>
                  <div className="absolute inset-[-5px] rounded-full border border-border-bright/50 animate-spinSlow" style={{ animationDirection: 'reverse' }} />
                </div>
                <div className="text-right">
                  <p className="text-[16px] font-bold text-white/30">searching...</p>
                  <p className="text-[13px] font-mono text-white/20">????</p>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border border-border text-white/25 w-fit">
                  ~±{band}
                </span>
              </>
            ) : (
              <div className="flex flex-col gap-3.5 items-end">
                <div className="relative w-fit">
                  <div className="w-[76px] h-[76px] rounded-full flex items-center justify-center text-[22px] font-extrabold text-white"
                    style={{ background: "linear-gradient(135deg, #0f3d27, #1d9e75)" }}>
                    {opponent?.handle?.slice(0, 2).toUpperCase() ?? 'BO'}
                  </div>
                  <div className="absolute inset-[-5px] rounded-full border border-success/50 animate-spinSlow" style={{ animationDirection: 'reverse' }} />
                </div>
                <div className="text-right">
                  <p className="text-[16px] font-bold text-white">{opponent?.handle ?? 'BlitzBot'}</p>
                  <p className="text-[13px] font-mono" style={{ color: getRatingColor(opponent?.rating ?? 0) }}>
                    {opponent?.rating ?? '—'}
                  </p>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border border-success/30 w-fit"
                  style={{ color: "#4ade80", background: "rgba(74,222,128,0.08)" }}>
                  {getRatingTitle(opponent?.rating ?? 0)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col items-center gap-3.5 mt-9 w-full">
          {error && (
            <p className="text-danger text-[13px] font-mono">{error}</p>
          )}
          {!found ? (
            <>
              <div className="w-[360px] h-[3px] bg-border rounded-full overflow-hidden relative">
                <div className="absolute inset-0 animate-barFill rounded-full"
                  style={{ background: "linear-gradient(90deg, #4f43b3, #7c6af7, #a78bfa)" }} />
              </div>
              <p className="text-[12px] font-semibold tracking-[1.5px] uppercase text-white/40">
                Searching{['.','..','.'][Math.floor(waited / 2) % 3]}
              </p>
              <p className="text-[11px] font-mono text-white/20">{formatWaited(waited)}</p>
              <button onClick={leaveQueue}
                className="text-[12px] text-white/25 hover:text-danger transition-colors mt-1">
                Cancel
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2.5">
              <span className="text-[44px] leading-none">⚔️</span>
              <p className="text-[22px] font-extrabold text-accent tracking-tight">Match found!</p>
              <p className="text-[13px] text-white/30">Entering battle arena...</p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 justify-center mt-5">
          {[`ELO band ±${band}`, `Problem ~${user?.cfRating ?? 1500}`, "Rated · Normal mode"].map(tag => (
            <span key={tag} className="text-[10px] font-mono px-2.5 py-1 bg-elevated border border-border rounded-full text-white/25">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
