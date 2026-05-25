import { getRatingColor } from "../../utils/rating";
import { formatTime } from "../../hooks/useTimer";

interface Player {
  handle: string;
  rating: number;
  initials: string;
  avatarGradient: string;
  submissionCount: number;
  isMe?: boolean;
}

interface PlayerHeaderProps {
  elapsed: number;
  playerLeft: Player;
  playerRight: Player;
}

export default function PlayerHeader({
  elapsed,
  playerLeft,
  playerRight,
}: PlayerHeaderProps) {
  const isUrgent = elapsed >= 25 * 60;

  return (
    <div className="flex items-stretch bg-surface border-b border-border">
      {/* Left player */}
      <div className="flex-1 flex items-center gap-3 px-6 py-3.5">
        <div
          className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-[13px] font-extrabold text-white flex-shrink-0"
          style={{ background: playerLeft.avatarGradient }}
        >
          {playerLeft.initials}
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-[15px] font-bold text-white">
            {playerLeft.handle}
            {playerLeft.isMe && <span className="badge-you">you</span>}
          </div>
          <p
            className="text-[12px] font-mono"
            style={{ color: getRatingColor(playerLeft.rating) }}
          >
            {playerLeft.rating}
          </p>
          <p className="text-[11px] font-mono text-white/25">
            {playerLeft.submissionCount} submission
            {playerLeft.submissionCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Timer */}
      <div className="flex flex-col items-center justify-center px-7 border-x border-border flex-shrink-0 gap-0.5">
        <span
          className={`text-[30px] font-bold font-mono tracking-[3px] leading-none ${
            isUrgent ? "text-danger animate-timerBlink" : "text-white"
          }`}
        >
          {formatTime(elapsed)}
        </span>
        <span className="text-[10px] text-white/25 uppercase tracking-[1.5px]">
          Time Left
        </span>
      </div>

      {/* Right player */}
      <div className="flex-1 flex items-center justify-end gap-3 px-6 py-3.5">
        <div className="flex flex-col items-end gap-0.5">
          <p className="text-[15px] font-bold text-white">
            {playerRight.handle}
          </p>
          <p
            className="text-[12px] font-mono"
            style={{ color: getRatingColor(playerRight.rating) }}
          >
            {playerRight.rating}
          </p>
          <p className="text-[11px] font-mono text-white/25">
            {playerRight.submissionCount} submission
            {playerRight.submissionCount !== 1 ? "s" : ""}
          </p>
        </div>

        <div
          className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-[13px] font-extrabold text-white flex-shrink-0"
          style={{ background: playerRight.avatarGradient }}
        >
          {playerRight.initials}
        </div>
      </div>
    </div>
  );
}
