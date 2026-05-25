import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export interface ProfileData {
  handle: string;
  email: string;
  cfHandle: string;
  cfRating: number;
  cfTier: string;
  blitzforcePoints: number;
  joinedDate: string;
  solvedCount: number;
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  winStreak: number;
  totalBets: number;
  betsWon: number;
  betsLost: number;
  ratingHistory: {
    date: string;
    rating: number;
    contestName: string;
    delta: number;
  }[];
  activityGrid: { date: string; count: number }[];
  bestWins: any[];
  gameHistory: any[];
}

export function useProfile() {
  const { token } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

    fetch(`${API}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load profile");
        return r.json();
      })
      .then(setProfile)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  return { profile, loading, error };
}
