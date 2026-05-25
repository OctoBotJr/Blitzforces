import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import MatchmakingScreen from "../components/matchmaking/MatchmakingScreen";
import PlayerHeader from "../components/game/PlayerHeader";
import ProblemBar from "../components/game/ProblemBar";
import SubmissionPanel from "../components/game/SubmissionPanel";
import ResultBanner from "../components/game/ResultBanner";
import { useTimer } from "../hooks/useTimer";
import { useAuth } from "../context/AuthContext";
import { useDuel } from "../hooks/useDuel";
import type { Problem } from "../types";

type Screen = "matchmaking" | "game";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export default function GamePage() {
  // Lift useDuel to top so both screens share the same state
  const duelState = useDuel();

  const [screen, setScreen] = useState<Screen>(
    duelState.duelId ? "game" : "matchmaking",
  );

  useEffect(() => {
    if (duelState.mmStatus === "matched" && duelState.duelId) {
      setScreen("game");
    }
  }, [duelState.mmStatus, duelState.duelId]);

  return screen === "matchmaking" ? (
    <div className="flex flex-col min-h-screen bg-base font-syne">
      <Navbar centerLabel="Finding match" />
      <MatchmakingScreen duelState={duelState} />
    </div>
  ) : (
    <div className="flex flex-col min-h-screen bg-base font-syne">
      <Navbar centerLabel="Rated Battle" />
      <BattleArena duelState={duelState} />
    </div>
  );
}

function BattleArena({ duelState }: { duelState: ReturnType<typeof useDuel> }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { duel } = duelState;

  const { remainingSeconds } = useTimer(duel?.endsAt);

  // Watch for duel finish
  const isDone = duel?.status === "finished";
  const didIWin = duel?.winnerHandle === user?.cfHandle;
  // Use real duel data if available, fallback to loading state
  const problem: Problem | null = duel
    ? {
        id: duel.problem.id,
        name: duel.problem.title,
        contest: `CF Problem ${duel.problem.id}`,
        rating: duel.problem.rating,
        cfUrl: duel.problem.cfUrl,
      }
    : null;

  const ratingDelta = 10; // normal mode fixed

  if (!problem) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-white/30 font-mono animate-pulse">Loading duel...</p>
      </div>
    );
  }
  async function handleForfeit() {
    if (!duel) return;

    const token = localStorage.getItem("bf-token");
    try {
      await fetch(`${API}/duel/${duel.id}/forfeit`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="flex flex-col flex-1">
      <PlayerHeader
        elapsed={remainingSeconds}
        playerLeft={{
          handle: duel!.players.me.handle,
          rating: duel!.players.me.rating,
          initials: duel!.players.me.handle.slice(0, 2).toUpperCase(),
          avatarGradient: "linear-gradient(135deg, #3b30a0, #7c6af7)",
          submissionCount:
            duel?.submissions?.filter(
              (s) => s.handle === duel.players.me.handle,
            ).length ?? 0,
          isMe: true,
        }}
        playerRight={{
          handle: duel!.players.opponent.handle,
          rating: duel!.players.opponent.rating,
          initials: duel!.players.opponent.handle.slice(0, 2).toUpperCase(),
          avatarGradient: "linear-gradient(135deg, #0f3d27, #1d9e75)",
          submissionCount:
            duel?.submissions?.filter(
              (s) => s.handle === duel.players.opponent.handle,
            ).length ?? 0,
        }}
      />

      <ProblemBar problem={problem} />

      <div className="flex flex-1 divide-x divide-border overflow-hidden">
        <div className="flex-1 flex flex-col">
          <SubmissionPanel
            handle={duel!.players.me.handle}
            submissions={
              duel?.submissions
                ?.filter((s) => s.handle === duel.players.me.handle)
                .map((s) => ({
                  id: String(s.id),
                  verdict: s.verdict,
                  language: "GNU C++17",
                  timeMs: null,
                  memoryMb: null,
                  submittedAt: new Date(s.submittedAt),
                })) ?? []
            }
            isMe
            dotColor="#7c6af7"
            side="left"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <SubmissionPanel
            handle={duel!.players.opponent.handle}
            submissions={
              duel?.submissions
                ?.filter((s) => s.handle === duel.players.opponent.handle)
                .map((s) => ({
                  id: String(s.id),
                  verdict: s.verdict,
                  language: "GNU C++17",
                  timeMs: null,
                  memoryMb: null,
                  submittedAt: new Date(s.submittedAt),
                })) ?? []
            }
            dotColor="#1d9e75"
            side="right"
          />
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-2.5 bg-surface border-t border-border">
        <div className="flex items-center gap-2 text-[12px] text-white/30">
          <span className="w-[7px] h-[7px] rounded-full bg-success animate-pulse2" />
          Live · polling every 5s
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-mono text-white/30">
            Rated · ±{ratingDelta} pts
          </span>
          <button
            onClick={handleForfeit}
            className="text-[12px] font-semibold text-danger px-3.5 py-1.5 border border-danger/20 bg-danger/5 rounded-md hover:bg-danger/10 transition-colors"
          >
            Forfeit
          </button>
        </div>
      </div>

      {isDone && (
        <ResultBanner
          winnerHandle={duel?.winnerHandle ?? null}
          myHandle={user?.cfHandle ?? ""}
          elapsedSeconds={remainingSeconds}
          ratingDelta={ratingDelta}
          onRematch={() => navigate("/game")}
          onHome={() => navigate("/")}
        />
      )}
    </div>
  );
}
