import type { Submission, Verdict } from "../../types";

interface VerdictMeta {
  chipClass: string;
  rowClass: string;
  label: string;
  fullText: string;
}

const VERDICT_META: Record<Verdict, VerdictMeta> = {
  AC: {
    chipClass: "chip chip-ac",
    rowClass: "sub-ac",
    label: "AC",
    fullText: "Accepted",
  },
  WA: {
    chipClass: "chip chip-wa",
    rowClass: "sub-wa",
    label: "WA",
    fullText: "Wrong Answer",
  },
  TLE: {
    chipClass: "chip chip-tle",
    rowClass: "sub-tle",
    label: "TLE",
    fullText: "Time Limit",
  },
  RE: {
    chipClass: "chip chip-re",
    rowClass: "sub-re",
    label: "RE",
    fullText: "Runtime Error",
  },
  CE: {
    chipClass: "chip chip-ce",
    rowClass: "sub-ce",
    label: "CE",
    fullText: "Compile Error",
  },
  MLE: {
    chipClass: "chip chip-mle",
    rowClass: "sub-mle",
    label: "MLE",
    fullText: "Memory Limit",
  },
};

interface SubmissionPanelProps {
  handle: string;
  submissions: Submission[];
  isMe?: boolean;
  isTyping?: boolean;
  /** Avatar dot color */
  dotColor: string;
  /** Animation direction: left = you, right = opponent */
  side: "left" | "right";
}

function EmptyState({ isMe }: { isMe?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-2 text-white/20 p-8 text-center">
      <span className="text-[30px] opacity-25">{isMe ? "⌨" : "👁"}</span>
      <p className="text-[13px] font-semibold">
        {isMe ? "No submissions yet" : "Watching opponent"}
      </p>
      <p className="text-[12px] leading-relaxed">
        {isMe
          ? "Your verdicts appear here in real-time"
          : "Their verdicts appear here live"}
      </p>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 text-white/30 text-[12px]">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[5px] h-[5px] rounded-full bg-white/30 animate-tBounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <span>submitting...</span>
    </div>
  );
}

export default function SubmissionPanel({
  handle,
  submissions,
  isMe,
  isTyping,
  dotColor,
  side,
}: SubmissionPanelProps) {
  const dotStyle =
    submissions[submissions.length - 1]?.verdict === "AC"
      ? "#4ade80"
      : dotColor;

  return (
    <div className="flex flex-col border-r border-border last:border-r-0">
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface border-b border-border">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: dotStyle }}
          />
          <span className="text-[13px] font-bold text-white">{handle}</span>
          {isMe && <span className="badge-you">you</span>}
        </div>
        <span className="text-[12px] font-mono text-white/25">
          {submissions.length} / —
        </span>
      </div>

      {/* Submissions list */}
      <div className="flex-1 flex flex-col gap-1.5 p-3.5 overflow-y-auto min-h-[280px]">
        {isTyping && <TypingIndicator />}

        {submissions.length === 0 && !isTyping && <EmptyState isMe={isMe} />}

        {submissions.map((sub) => {
          const meta = VERDICT_META[sub.verdict];
          const animClass =
            side === "left" ? "animate-subIn" : "animate-subInR";

          return (
            <div
              key={sub.id}
              className={`flex items-center gap-2.5 px-3 py-3 rounded-xl border ${meta.rowClass} ${animClass}`}
            >
              {/* Verdict chip */}
              <span className={meta.chipClass}>{meta.label}</span>

              {/* Body */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-white">
                  {meta.fullText}
                </p>
                <p className="text-[11px] text-white/30">{sub.language}</p>
              </div>

              {/* Stats */}
              <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                {sub.timeMs && (
                  <span className="text-[11px] font-mono text-white/30">
                    {sub.timeMs}
                  </span>
                )}
                {sub.memoryMb && (
                  <span className="text-[11px] font-mono text-white/30">
                    {sub.memoryMb}
                  </span>
                )}
                <span className="text-[10px] font-mono text-white/20">
                  {sub.submittedAt.toLocaleTimeString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
