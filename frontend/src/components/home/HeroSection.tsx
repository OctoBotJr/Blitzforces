import type { ProfileData } from "../../hooks/useProfile";

interface HeroSectionProps {
  profile: ProfileData | null;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="relative flex items-center justify-between gap-8 px-10 py-12 border-b border-border overflow-hidden min-h-[260px]">
      <div className="absolute inset-0 bg-grid opacity-35 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, transparent 40%, #0a0a0f 100%)",
        }}
      />

      <div className="relative z-10 max-w-[460px]">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-elevated border border-border rounded-full text-[12px] text-white/50 font-mono mb-5">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse2" />
          Live duels in progress
        </div>
        <h1 className="text-[40px] font-extrabold leading-[1.1] tracking-[-1.5px] text-white mb-4">
          Prove you're the
          <br />
          <span className="text-accent">fastest coder</span>
        </h1>
        <p className="text-[15px] text-white/50 leading-relaxed max-w-[380px]">
          1v1 competitive programming duels. Solve the same problem, first AC
          wins. Your rating is on the line.
        </p>
      </div>

      {/* VS bracket card with real data */}
      <div className="relative z-10 flex-shrink-0 bg-card border border-border-bright rounded-2xl p-6 min-w-[220px] flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[14px] font-bold text-white">
            {profile?.cfHandle ?? "—"}
          </span>
          <span
            className="text-[14px] font-bold font-mono"
            style={{ color: "#c084fc" }}
          >
            {profile?.blitzforcePoints ?? "—"}
          </span>
        </div>
        <div className="text-center text-[20px] font-extrabold font-mono text-accent tracking-[4px] py-1 border-y border-border animate-vsPulse">
          VS
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-[14px] font-bold text-white/40">???</span>
          <span className="text-[14px] font-bold font-mono text-white/25">
            ????
          </span>
        </div>
        <div className="flex items-center justify-between bg-elevated rounded-lg px-3 py-2">
          <span className="text-[11px] text-white/30">Problem difficulty</span>
          <span className="text-[14px] font-bold font-mono text-accent">
            ~{profile?.cfRating ?? "—"}
          </span>
        </div>
      </div>
    </section>
  );
}
