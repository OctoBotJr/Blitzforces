import { useState, useEffect } from "react";
export function useRankings(page = 1, tier = null) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
        const params = new URLSearchParams({ page: page.toString() });
        if (tier)
            params.append("tier", tier);
        fetch(`${API}/rankings?${params}`)
            .then((r) => {
            if (!r.ok)
                throw new Error("Failed to load rankings");
            return r.json();
        })
            .then(setData)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [page, tier]);
    return { data, loading, error };
}
export function useTopGainers() {
    const [gainers, setGainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
        fetch(`${API}/rankings/top-gainers`)
            .then((r) => {
            if (!r.ok)
                throw new Error("Failed to load top gainers");
            return r.json();
        })
            .then(setGainers)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);
    return { gainers, loading, error };
}
