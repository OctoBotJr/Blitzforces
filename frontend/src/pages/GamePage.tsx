import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDuel } from "../hooks/useDuel";

export default function GamePage() {
  const { duelId } = useParams();
  const navigate = useNavigate();
  const { duel, fetchDuel } = useDuel();
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (duelId) {
      fetchDuel(duelId);
    }
  }, [duelId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!duel) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading duel...</p>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  async function handleForfeit() {
    if (!duel) return;

    const token = localStorage.getItem("bf-token");
    try {
      await fetch(`${import.meta.env.VITE_API_URL ?? "http://localhost:3000"}/duel/${duel.id}/forfeit`, {
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
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-4">{duel.player1_id === duel.player1_id ? "You vs" : ""}</h1>
        <p className="text-2xl mb-8">Time: {formatTime(time)}</p>

        <div className="flex gap-8 justify-center mb-8">
          <div className="text-left">
            <h2 className="text-xl font-semibold mb-2">Your Progress</h2>
            <p>Status: {duel.status}</p>
          </div>
          <div className="text-left">
            <h2 className="text-xl font-semibold mb-2">Problem</h2>
            <p>CF Contest: {duel.cf_contest_id}</p>
            <p>Index: {duel.cf_index}</p>
          </div>
        </div>

        <button
          onClick={handleForfeit}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Forfeit
        </button>
      </div>
    </div>
  );
}
