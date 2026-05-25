import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Tab = "login" | "register" | "guest";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

// ── Shared input style ────────────────────────────────────────────────────────
const inputCls =
  "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl " +
  "text-white text-[14px] placeholder-white/25 font-mono " +
  "focus:outline-none focus:border-cyan/60 focus:bg-white/8 transition-all";

const labelCls =
  "block text-[11px] font-bold tracking-[1.5px] uppercase text-white/40 mb-2";

export default function AuthPage() {
  const [tab, setTab] = useState<Tab>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register fields
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regHandle, setRegHandle] = useState("");

  // Guest fields
  const [guestHandle, setGuestHandle] = useState("");

  const { login, loginAsGuest } = useAuth();
  const navigate = useNavigate();

  // ── Handlers ────────────────────────────────────────────────────────────────

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Login failed");
      login(data.user, data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: regEmail,
          password: regPassword,
          cfHandle: regHandle,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? "Registration failed");
      login(data.user, data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGuest(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Verify handle exists on CF
      const res = await fetch(
        `https://codeforces.com/api/user.info?handles=${guestHandle.trim()}`,
      );
      const data = await res.json();
      if (data.status !== "OK") throw new Error("CF handle not found");
      const cfRating = data.result[0].rating ?? 0;
      loginAsGuest(guestHandle.trim(), cfRating);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ── UI ───────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-base font-syne flex items-center justify-center px-4">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-cyan/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-[420px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-syne text-[28px] font-extrabold tracking-tight">
            Blitz<span className="text-accent">Forces</span>
          </h1>
          <p className="text-white/30 text-[13px] mt-1 tracking-wide">
            1v1 Competitive Programming Duels
          </p>
        </div>

        {/* Card */}
        <div className="glass-card p-6">
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-white/5 rounded-xl mb-6">
            {(["login", "register", "guest"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setError(null);
                }}
                className={`flex-1 py-2 rounded-lg text-[12px] font-bold tracking-wide uppercase transition-all ${tab === t
                    ? "bg-cyan text-black"
                    : "text-white/40 hover:text-white/70"
                  }`}
              >
                {t === "guest" ? "Guest" : t === "login" ? "Login" : "Register"}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-danger/10 border border-danger/30 rounded-xl text-danger text-[13px]">
              {error}
            </div>
          )}

          {/* ── LOGIN ── */}
          {tab === "login" && (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className={labelCls}>Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className={inputCls}
                  required
                />
              </div>
              <div>
                <label className={labelCls}>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className={inputCls}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          )}

          {/* ── REGISTER ── */}
          {tab === "register" && (
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <div>
                <label className={labelCls}>Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className={inputCls}
                  required
                />
              </div>
              <div>
                <label className={labelCls}>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className={inputCls}
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className={labelCls}>Codeforces Handle</label>
                <input
                  type="text"
                  placeholder="your_cf_handle"
                  value={regHandle}
                  onChange={(e) => setRegHandle(e.target.value)}
                  className={inputCls}
                  required
                />
                <p className="mt-1.5 text-[11px] text-white/25">
                  Your CF rating and solved problems will be synced
                  automatically.
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>
          )}

          {/* ── GUEST ── */}
          {tab === "guest" && (
            <form onSubmit={handleGuest} className="flex flex-col gap-4">
              <div className="px-4 py-3 bg-warn/10 border border-warn/20 rounded-xl">
                <p className="text-warn text-[12px] font-medium leading-relaxed">
                  Guest mode: no points, no leaderboard. Your CF handle is
                  required to validate submissions during a duel.
                </p>
              </div>
              <div>
                <label className={labelCls}>Codeforces Handle</label>
                <input
                  type="text"
                  placeholder="your_cf_handle"
                  value={guestHandle}
                  onChange={(e) => setGuestHandle(e.target.value)}
                  className={inputCls}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-secondary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying handle..." : "Play as Guest"}
              </button>
            </form>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-white/20 text-[11px] mt-6">
          By continuing you agree that this platform uses your public CF data.
        </p>
      </div>
    </div>
  );
}
