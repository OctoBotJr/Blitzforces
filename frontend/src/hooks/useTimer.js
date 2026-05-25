import { useEffect, useState } from "react";
export function useTimer(endsAt) {
    const calculateRemaining = () => {
        if (!endsAt)
            return 0;
        const end = new Date(endsAt).getTime();
        return Math.max(0, Math.floor((end - Date.now()) / 1000));
    };
    const [remainingSeconds, setRemainingSeconds] = useState(calculateRemaining());
    useEffect(() => {
        if (!endsAt)
            return;
        setRemainingSeconds(calculateRemaining());
        const interval = setInterval(() => {
            setRemainingSeconds(calculateRemaining());
        }, 1000);
        return () => clearInterval(interval);
    }, [endsAt]);
    return {
        remainingSeconds,
        isExpired: remainingSeconds <= 0,
    };
}
export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
