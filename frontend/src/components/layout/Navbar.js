import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getRatingColor } from "../../utils/rating";
function CFIcon() {
    return (_jsxs("div", { className: "flex items-end gap-[2px]", children: [_jsx("span", { className: "w-[3px] h-[10px] bg-current opacity-70 rounded-sm" }), _jsx("span", { className: "w-[3px] h-[14px] bg-current opacity-85 rounded-sm" }), _jsx("span", { className: "w-[3px] h-[18px] bg-current rounded-sm" })] }));
}
export default function Navbar({ centerLabel }) {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const initials = user?.cfHandle?.slice(0, 2).toUpperCase() ?? "U";
    const handle = user?.cfHandle ?? "Guest";
    const points = user?.blitzforcePoints ?? 0;
    const ratingColor = getRatingColor(user?.cfRating ?? 0);
    return (_jsxs("nav", { className: "sticky top-0 z-50 flex items-center justify-between h-[60px] px-6 bg-surface border-b border-border", children: [_jsx("div", { className: "flex items-center gap-5", children: _jsxs("button", { onClick: () => navigate("/"), className: "font-syne text-[18px] font-extrabold tracking-tight", children: ["Blitz", _jsx("span", { className: "text-accent", children: "Forces" })] }) }), centerLabel && (_jsx("span", { className: "text-[11px] font-bold tracking-[2px] uppercase text-white/40", children: centerLabel })), _jsxs("div", { className: "flex items-center gap-2", children: [!centerLabel && (_jsxs("button", { onClick: () => navigate("/rankings"), className: "flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-white/50 text-[13px] font-medium hover:text-white hover:bg-elevated transition-colors", children: [_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6" }), _jsx("path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18" }), _jsx("path", { d: "M4 22h16" }), _jsx("path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" }), _jsx("path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" }), _jsx("path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2z" })] }), "Rankings"] })), _jsxs("button", { onClick: () => navigate("/profile"), className: "flex items-center gap-2 pl-1.5 pr-3 py-1.5 bg-elevated border border-border rounded-full cursor-pointer hover:border-accent transition-colors", children: [_jsx("div", { className: "relative w-[30px] h-[30px] rounded-full flex items-center justify-center text-[10px] font-bold text-white", style: {
                                    background: `linear-gradient(135deg, ${ratingColor}66, ${ratingColor})`,
                                }, children: initials }), _jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("span", { className: "text-[13px] font-semibold text-white", children: handle }), _jsx("span", { className: "text-[11px] font-mono", style: { color: ratingColor }, children: points })] })] }), !centerLabel && (_jsx("button", { onClick: logout, className: "p-2 rounded-lg text-white/30 hover:text-danger hover:bg-elevated transition-colors", title: "Logout", children: _jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }), _jsx("polyline", { points: "16 17 21 12 16 7" }), _jsx("line", { x1: "21", y1: "12", x2: "9", y2: "12" })] }) }))] })] }));
}
