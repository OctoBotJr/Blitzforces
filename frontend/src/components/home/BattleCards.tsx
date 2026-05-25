import { useState } from "react";
import type { BattleType } from "../../types";
import { useNavigate } from "react-router-dom";

interface CardConfig {
  id: BattleType;
  title: string;
  description: string;
  tag: string;
  featured?: boolean;
  hot?: boolean;
  iconBg: string;
  iconColor: string;
  tagStyle?: string;
  icon: React.ReactNode;
}

const CARDS: CardConfig[] = [
  {
    id: "rated",
    title: "Rated Battle",
    description: "ELO-matched · rating changes · climb the board",
    tag: "~1m queue",
    featured: true,
    hot: true,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    tagStyle: "text-accent border-accent/30 bg-accent/10",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
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
    id: "bet",
    title: "Bet Duel",
    description: "Wager rating points · winner takes all · coming soon",
    tag: "coming soon",
    iconBg: "bg-warn/10",
    iconColor: "text-warn",
    tagStyle: "text-warn border-warn/30 bg-warn/10",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export default function BattleCards() {
  const [selected, setSelected] = useState<BattleType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleFindMatch() {
    if (selected !== "rated") return; // only rated for now
    setLoading(true);
    setError(null);
    try {
      navigate("/game");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <section className="px-10 py-9 border-b border-border">
      <h2 className="text-[18px] font-bold tracking-tight text-white mb-5">
        Start a battle
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {CARDS.map((card) => (
          <button
            key={card.id}
            onClick={() =>
              card.id !== "bet" &&
              setSelected((prev) => (prev === card.id ? null : card.id))
            }
            disabled={card.id === "bet"}
            className={`relative flex items-center gap-4 p-5 rounded-[14px] border text-left overflow-hidden transition-all duration-150 group disabled:opacity-40 disabled:cursor-not-allowed ${selected === card.id
                ? "border-accent bg-accent/10"
                : card.featured
                  ? "border-accent-dim bg-card hover:bg-elevated hover:-translate-y-0.5"
                  : "border-border bg-card hover:bg-elevated hover:border-border-bright hover:-translate-y-0.5"
              }`}
          >
            {card.featured && (
              <div
                className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(124,106,247,0.2) 0%, transparent 70%)",
                }}
              />
            )}
            <div
              className={`w-[52px] h-[52px] rounded-xl flex items-center justify-center flex-shrink-0 ${card.iconBg} ${card.iconColor}`}
            >
              {card.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold text-white flex items-center gap-2 mb-1">
                {card.title}
                {card.hot && (
                  <span className="text-[9px] font-extrabold bg-accent text-white px-1.5 py-0.5 rounded tracking-wide">
                    HOT
                  </span>
                )}
              </p>
              <p className="text-[12px] text-white/30 leading-snug">
                {card.description}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span
                className={`text-[11px] font-bold font-mono px-2 py-1 rounded-md border ${card.tagStyle ?? "text-white/30 border-border"}`}
              >
                {card.tag}
              </span>
              <span className="text-[18px] text-white/25 transition-all group-hover:text-white group-hover:translate-x-1">
                →
              </span>
            </div>
          </button>
        ))}
      </div>

      {error && <p className="mt-3 text-danger text-[13px]">{error}</p>}

      {selected === "rated" && (
        <div className="mt-4 animate-slideDown">
          <div className="flex items-center gap-5 px-5 py-4 bg-card border border-accent rounded-xl">
            <div className="flex-1">
              <p className="text-[14px] font-bold text-white mb-1">
                Rated Battle — ELO at stake
              </p>
              <p className="text-[12px] text-white/30">
                Matched near your rating · +10 pts win / −5 pts loss
              </p>
            </div>
            <button
              onClick={handleFindMatch}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-accent text-white text-[14px] font-bold rounded-lg hover:opacity-90 hover:-translate-y-px transition-all flex-shrink-0 disabled:opacity-50"
            >
              {loading ? "Joining..." : "Find match"}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
