import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const VERDICT_META = {
    AC: {
        chipClass: "chip chip-ac",
        rowClass: "sub-ac",
        label: "AC",
        fullText: "Accepted",
    },
    WA: {
        chipClass: "chip chip-wa",
        rowClass: "sub-wa",
        label: "WA",
        fullText: "Wrong Answer",
    },
    TLE: {
        chipClass: "chip chip-tle",
        rowClass: "sub-tle",
        label: "TLE",
        fullText: "Time Limit",
    },
    RE: {
        chipClass: "chip chip-re",
        rowClass: "sub-re",
        label: "RE",
        fullText: "Runtime Error",
    },
    CE: {
        chipClass: "chip chip-ce",
        rowClass: "sub-ce",
        label: "CE",
        fullText: "Compile Error",
    },
    MLE: {
        chipClass: "chip chip-mle",
        rowClass: "sub-mle",
        label: "MLE",
        fullText: "Memory Limit",
    },
};
function EmptyState({ isMe }) {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center flex-1 gap-2 text-white/20 p-8 text-center", children: [_jsx("span", { className: "text-[30px] opacity-25", children: isMe ? "⌨" : "👁" }), _jsx("p", { className: "text-[13px] font-semibold", children: isMe ? "No submissions yet" : "Watching opponent" }), _jsx("p", { className: "text-[12px] leading-relaxed", children: isMe
                    ? "Your verdicts appear here in real-time"
                    : "Their verdicts appear here live" })] }));
}
function TypingIndicator() {
    return (_jsxs("div", { className: "flex items-center gap-2 px-4 py-3 text-white/30 text-[12px]", children: [_jsx("div", { className: "flex gap-1", children: [0, 1, 2].map((i) => (_jsx("span", { className: "w-[5px] h-[5px] rounded-full bg-white/30 animate-tBounce", style: { animationDelay: `${i * 0.15}s` } }, i))) }), _jsx("span", { children: "submitting..." })] }));
}
export default function SubmissionPanel({ handle, submissions, isMe, isTyping, dotColor, side, }) {
    const dotStyle = submissions[submissions.length - 1]?.verdict === "AC"
        ? "#4ade80"
        : dotColor;
    return (_jsxs("div", { className: "flex flex-col border-r border-border last:border-r-0", children: [_jsxs("div", { className: "flex items-center justify-between px-4 py-3 bg-surface border-b border-border", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "w-2 h-2 rounded-full flex-shrink-0", style: { background: dotStyle } }), _jsx("span", { className: "text-[13px] font-bold text-white", children: handle }), isMe && _jsx("span", { className: "badge-you", children: "you" })] }), _jsxs("span", { className: "text-[12px] font-mono text-white/25", children: [submissions.length, " / \u2014"] })] }), _jsxs("div", { className: "flex-1 flex flex-col gap-1.5 p-3.5 overflow-y-auto min-h-[280px]", children: [isTyping && _jsx(TypingIndicator, {}), submissions.length === 0 && !isTyping && _jsx(EmptyState, { isMe: isMe }), submissions.map((sub) => {
                        const meta = VERDICT_META[sub.verdict];
                        const animClass = side === "left" ? "animate-subIn" : "animate-subInR";
                        return (_jsxs("div", { className: `flex items-center gap-2.5 px-3 py-3 rounded-xl border ${meta.rowClass} ${animClass}`, children: [_jsx("span", { className: meta.chipClass, children: meta.label }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-[13px] font-semibold text-white", children: meta.fullText }), _jsx("p", { className: "text-[11px] text-white/30", children: sub.language })] }), _jsxs("div", { className: "flex flex-col items-end gap-0.5 flex-shrink-0", children: [sub.timeMs && (_jsx("span", { className: "text-[11px] font-mono text-white/30", children: sub.timeMs })), sub.memoryMb && (_jsx("span", { className: "text-[11px] font-mono text-white/30", children: sub.memoryMb })), _jsx("span", { className: "text-[10px] font-mono text-white/20", children: sub.submittedAt.toLocaleTimeString() })] })] }, sub.id));
                    })] })] }));
}
