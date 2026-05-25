import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
export function useProfile() {
    const { token } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!token)
            return;
        const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
        fetch(`${API}/user/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((r) => {
            if (!r.ok)
                throw new Error("Failed to load profile");
            return r.json();
        })
            .then(setProfile)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [token]);
    return { profile, loading, error };
}
