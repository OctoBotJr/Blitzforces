import { useState, useEffect } from "react";
import { formatTime } from "../../hooks/useTimer";

interface ConfettiPiece {
  id: number;
  color: string;
  left: number;
  delay: number;
  duration: number;
  endX: number;
  rotation: number;
  isCircle: boolean;
}

interface ResultBannerProps {
  winnerHandle: string | null;
  myHandle: string;
  elapsedSeconds: number;
  ratingDelta: number;
  onRematch: () => void;
  onHome: () => void;
}

const CONFETTI_COLORS = [
  "#7c6af7",
  "#4ade80",
  "#f7c06a",
  "#f87171",
  "#60a5fa",
  "#c084fc",
];

export default function ResultBanner({
  winnerHandle,
  myHandle,
  elapsedSeconds,
  ratingDelta,
  onRematch,
  onHome,
}: ResultBannerProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const isDraw = !winnerHandle;

  const isWin = winnerHandle === myHandle;
  useEffect(() => {
    setConfetti(
      Array.from({ length: 55 }, (_, i) => ({
        id: i,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2.2 + Math.random() * 1.8,
        endX: (Math.random() - 0.5) * 220,
        rotation: Math.random() * 900,
        isCircle: Math.random() > 0.4,
      })),
    );
  }, []);

  return (
    <>
      {/* Confetti pieces */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="fixed top-[-12px] pointer-events-none z-[201] animate-confetti"
          style={
            {
              left: `${piece.left}%`,
              width: piece.isCircle ? "9px" : "6px",
              height: piece.isCircle ? "9px" : "12px",
              background: piece.color,
              borderRadius: piece.isCircle ? "50%" : "2px",
              animationDuration: `${piece.duration}s`,
              animationDelay: `${piece.delay}s`,
              "--end-transform": `translateX(${piece.endX}px) translateY(110vh) rotate(${piece.rotation}deg)`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Overlay */}
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 animate-fadeIn">
        {/* Card */}
        <div className="relative bg-card border border-border-bright rounded-3xl px-14 py-11 flex flex-col items-center gap-4 overflow-hidden animate-cardPop min-w-[360px]">
          {/* Glow blob */}
          <div
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-[220px] h-[220px] rounded-full pointer-events-none"
            style={{
              background: isWin
                ? "radial-gradient(circle, rgba(74,222,128,0.28) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(248,113,113,0.2) 0%, transparent 70%)",
            }}
          />

          {/* Emoji */}
          {/* <span className="text-[52px] leading-none"> */}
          {/*   {isWin ? "👑" : "😤"} */}
          {/* </span> */}

          {/* Result label */}
          <p
            className="text-[11px] font-bold tracking-[3px] uppercase"
            style={{
              color: isDraw ? "#f7c06a" : isWin ? "#4ade80" : "#f87171",
            }}
          >
            {isDraw ? "Draw" : isWin ? "Victory!" : "Defeat"}{" "}
          </p>

          {/* Winner name */}
          <p className="text-[34px] font-extrabold tracking-tight text-white">
            {winnerHandle ?? "Nobody"}
          </p>

          {/* Solve detail */}
          <p className="text-[13px] font-mono text-white/40">
            Accepted · solved in {formatTime(elapsedSeconds)}
          </p>

          <div className="w-full h-px bg-border my-1" />

          {/* Rating delta */}
          <p
            className="text-[32px] font-extrabold font-mono"
            style={{
              color: isDraw ? "#f7c06a" : isWin ? "#4ade80" : "#f87171",
            }}
          >
            {isDraw ? "±" : isWin ? "+" : "−"} {Math.abs(ratingDelta)} rating
          </p>

          {/* Action buttons */}
          <div className="flex gap-2.5 mt-1">
            <button
              onClick={onRematch}
              className="px-7 py-3 bg-accent text-white text-[13px] font-bold rounded-xl hover:opacity-85 hover:-translate-y-px transition-all"
            >
              Rematch
            </button>
            <button
              onClick={onHome}
              className="px-7 py-3 bg-elevated text-white/50 text-[13px] font-bold rounded-xl border border-border hover:text-white hover:-translate-y-px transition-all"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
