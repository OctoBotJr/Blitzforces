import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { formatTime } from "../../hooks/useTimer";
const CONFETTI_COLORS = [
    "#7c6af7",
    "#4ade80",
    "#f7c06a",
    "#f87171",
    "#60a5fa",
    "#c084fc",
];
export default function ResultBanner({ winnerHandle, myHandle, elapsedSeconds, ratingDelta, onRematch, onHome, }) {
    const [confetti, setConfetti] = useState([]);
    const isDraw = !winnerHandle;
    const isWin = winnerHandle === myHandle;
    useEffect(() => {
        setConfetti(Array.from({ length: 55 }, (_, i) => ({
            id: i,
            color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            left: Math.random() * 100,
            delay: Math.random() * 0.8,
            duration: 2.2 + Math.random() * 1.8,
            endX: (Math.random() - 0.5) * 220,
            rotation: Math.random() * 900,
            isCircle: Math.random() > 0.4,
        })));
    }, []);
    return (_jsxs(_Fragment, { children: [confetti.map((piece) => (_jsx("div", { className: "fixed top-[-12px] pointer-events-none z-[201] animate-confetti", style: {
                    left: `${piece.left}%`,
                    width: piece.isCircle ? "9px" : "6px",
                    height: piece.isCircle ? "9px" : "12px",
                    background: piece.color,
                    borderRadius: piece.isCircle ? "50%" : "2px",
                    animationDuration: `${piece.duration}s`,
                    animationDelay: `${piece.delay}s`,
                    "--end-transform": `translateX(${piece.endX}px) translateY(110vh) rotate(${piece.rotation}deg)`,
                } }, piece.id))), _jsx("div", { className: "fixed inset-0 z-[200] flex items-center justify-center bg-black/85 animate-fadeIn", children: _jsxs("div", { className: "relative bg-card border border-border-bright rounded-3xl px-14 py-11 flex flex-col items-center gap-4 overflow-hidden animate-cardPop min-w-[360px]", children: [_jsx("div", { className: "absolute -top-12 left-1/2 -translate-x-1/2 w-[220px] h-[220px] rounded-full pointer-events-none", style: {
                                background: isWin
                                    ? "radial-gradient(circle, rgba(74,222,128,0.28) 0%, transparent 70%)"
                                    : "radial-gradient(circle, rgba(248,113,113,0.2) 0%, transparent 70%)",
                            } }), _jsxs("p", { className: "text-[11px] font-bold tracking-[3px] uppercase", style: {
                                color: isDraw ? "#f7c06a" : isWin ? "#4ade80" : "#f87171",
                            }, children: [isDraw ? "Draw" : isWin ? "Victory!" : "Defeat", " "] }), _jsx("p", { className: "text-[34px] font-extrabold tracking-tight text-white", children: winnerHandle ?? "Nobody" }), _jsxs("p", { className: "text-[13px] font-mono text-white/40", children: ["Accepted \u00B7 solved in ", formatTime(elapsedSeconds)] }), _jsx("div", { className: "w-full h-px bg-border my-1" }), _jsxs("p", { className: "text-[32px] font-extrabold font-mono", style: {
                                color: isDraw ? "#f7c06a" : isWin ? "#4ade80" : "#f87171",
                            }, children: [isDraw ? "±" : isWin ? "+" : "−", " ", Math.abs(ratingDelta), " rating"] }), _jsxs("div", { className: "flex gap-2.5 mt-1", children: [_jsx("button", { onClick: onRematch, className: "px-7 py-3 bg-accent text-white text-[13px] font-bold rounded-xl hover:opacity-85 hover:-translate-y-px transition-all", children: "Rematch" }), _jsx("button", { onClick: onHome, className: "px-7 py-3 bg-elevated text-white/50 text-[13px] font-bold rounded-xl border border-border hover:text-white hover:-translate-y-px transition-all", children: "Home" })] })] }) })] }));
}
