import { useState, useEffect } from "react";

export interface RankingEntry {
  rank: number;
  handle: string;
  initials: string;
  rating: number;
  cfRating: number;
  tier: string;
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  winRate: number;
  winStreak: number;
  joinedDate: string;
}

export interface TopGainer {
  rank: number;
  handle: string;
  initials: string;
  rating: number;
  cfRating: number;
  tier: string;
  pointsGained: number;
  duelsPlayed: number;
}

export interface RankingsData {
  rankings: RankingEntry[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    limit: number;
  };
}

export function useRankings(page: number = 1, tier: string | null = null) {
  const [data, setData] = useState<RankingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
    const params = new URLSearchParams({ page: page.toString() });
    if (tier) params.append("tier", tier);

    fetch(`${API}/rankings?${params}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load rankings");
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [page, tier]);

  return { data, loading, error };
}

export function useTopGainers() {
  const [gainers, setGainers] = useState<TopGainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

    fetch(`${API}/rankings/top-gainers`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load top gainers");
        return r.json();
      })
      .then(setGainers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { gainers, loading, error };
}
