import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getRatingColor } from "../../utils/rating";

interface NavbarProps {
  centerLabel?: string;
}

function CFIcon() {
  return (
    <div className="flex items-end gap-[2px]">
      <span className="w-[3px] h-[10px] bg-current opacity-70 rounded-sm" />
      <span className="w-[3px] h-[14px] bg-current opacity-85 rounded-sm" />
      <span className="w-[3px] h-[18px] bg-current rounded-sm" />
    </div>
  );
}

export default function Navbar({ centerLabel }: NavbarProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const initials = user?.cfHandle?.slice(0, 2).toUpperCase() ?? "U";
  const handle = user?.cfHandle ?? "Guest";
  const points = user?.blitzforcePoints ?? 0;
  const ratingColor = getRatingColor(user?.cfRating ?? 0);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between h-[60px] px-6 bg-surface border-b border-border">
      {/* Logo */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => navigate("/")}
          className="font-syne text-[18px] font-extrabold tracking-tight"
        >
          Blitz<span className="text-accent">Forces</span>
        </button>
      </div>

      {/* Center label */}
      {centerLabel && (
        <span className="text-[11px] font-bold tracking-[2px] uppercase text-white/40">
          {centerLabel}
        </span>
      )}

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Rankings */}
        {!centerLabel && (
          <button
            onClick={() => navigate("/rankings")}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-white/50 text-[13px] font-medium hover:text-white hover:bg-elevated transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
            </svg>
            Rankings
          </button>
        )}

        {/* Profile */}
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 bg-elevated border border-border rounded-full cursor-pointer hover:border-accent transition-colors"
        >
          <div
            className="relative w-[30px] h-[30px] rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${ratingColor}66, ${ratingColor})`,
            }}
          >
            {initials}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-semibold text-white">
              {handle}
            </span>
            <span
              className="text-[11px] font-mono"
              style={{ color: ratingColor }}
            >
              {points}
            </span>
          </div>
        </button>

        {/* Logout */}
        {!centerLabel && (
          <button
            onClick={logout}
            className="p-2 rounded-lg text-white/30 hover:text-danger hover:bg-elevated transition-colors"
            title="Logout"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        )}
      </div>
    </nav>
  );
}
