import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
// ── Shared input style ────────────────────────────────────────────────────────
const inputCls = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl " +
    "text-white text-[14px] placeholder-white/25 font-mono " +
    "focus:outline-none focus:border-cyan/60 focus:bg-white/8 transition-all";
const labelCls = "block text-[11px] font-bold tracking-[1.5px] uppercase text-white/40 mb-2";
export default function AuthPage() {
    const [tab, setTab] = useState("login");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
    async function handleLogin(e) {
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
            if (!res.ok)
                throw new Error(data.message ?? "Login failed");
            login(data.user, data.token);
            navigate("/");
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }
    async function handleRegister(e) {
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
            if (!res.ok)
                throw new Error(data.message ?? "Registration failed");
            login(data.user, data.token);
            navigate("/");
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }
    async function handleGuest(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            // Verify handle exists on CF
            const res = await fetch(`https://codeforces.com/api/user.info?handles=${guestHandle.trim()}`);
            const data = await res.json();
            if (data.status !== "OK")
                throw new Error("CF handle not found");
            const cfRating = data.result[0].rating ?? 0;
            loginAsGuest(guestHandle.trim(), cfRating);
            navigate("/");
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }
    // ── UI ───────────────────────────────────────────────────────────────────────
    return (_jsxs("div", { className: "min-h-screen bg-base font-syne flex items-center justify-center px-4", children: [_jsxs("div", { className: "pointer-events-none fixed inset-0 overflow-hidden", children: [_jsx("div", { className: "absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan/5 rounded-full blur-[120px]" }), _jsx("div", { className: "absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-cyan/3 rounded-full blur-[100px]" })] }), _jsxs("div", { className: "relative w-full max-w-[420px]", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsxs("h1", { className: "font-syne text-[28px] font-extrabold tracking-tight", children: ["Blitz", _jsx("span", { className: "text-accent", children: "Forces" })] }), _jsx("p", { className: "text-white/30 text-[13px] mt-1 tracking-wide", children: "1v1 Competitive Programming Duels" })] }), _jsxs("div", { className: "glass-card p-6", children: [_jsx("div", { className: "flex gap-1 p-1 bg-white/5 rounded-xl mb-6", children: ["login", "register", "guest"].map((t) => (_jsx("button", { onClick: () => {
                                        setTab(t);
                                        setError(null);
                                    }, className: `flex-1 py-2 rounded-lg text-[12px] font-bold tracking-wide uppercase transition-all ${tab === t
                                        ? "bg-cyan text-black"
                                        : "text-white/40 hover:text-white/70"}`, children: t === "guest" ? "Guest" : t === "login" ? "Login" : "Register" }, t))) }), error && (_jsx("div", { className: "mb-4 px-4 py-3 bg-danger/10 border border-danger/30 rounded-xl text-danger text-[13px]", children: error })), tab === "login" && (_jsxs("form", { onSubmit: handleLogin, className: "flex flex-col gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelCls, children: "Email" }), _jsx("input", { type: "email", placeholder: "you@example.com", value: loginEmail, onChange: (e) => setLoginEmail(e.target.value), className: inputCls, required: true })] }), _jsxs("div", { children: [_jsx("label", { className: labelCls, children: "Password" }), _jsx("input", { type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: loginPassword, onChange: (e) => setLoginPassword(e.target.value), className: inputCls, required: true })] }), _jsx("button", { type: "submit", disabled: loading, className: "btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed", children: loading ? "Signing in..." : "Sign In" })] })), tab === "register" && (_jsxs("form", { onSubmit: handleRegister, className: "flex flex-col gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: labelCls, children: "Email" }), _jsx("input", { type: "email", placeholder: "you@example.com", value: regEmail, onChange: (e) => setRegEmail(e.target.value), className: inputCls, required: true })] }), _jsxs("div", { children: [_jsx("label", { className: labelCls, children: "Password" }), _jsx("input", { type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: regPassword, onChange: (e) => setRegPassword(e.target.value), className: inputCls, required: true, minLength: 6 })] }), _jsxs("div", { children: [_jsx("label", { className: labelCls, children: "Codeforces Handle" }), _jsx("input", { type: "text", placeholder: "your_cf_handle", value: regHandle, onChange: (e) => setRegHandle(e.target.value), className: inputCls, required: true }), _jsx("p", { className: "mt-1.5 text-[11px] text-white/25", children: "Your CF rating and solved problems will be synced automatically." })] }), _jsx("button", { type: "submit", disabled: loading, className: "btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed", children: loading ? "Creating account..." : "Create Account" })] })), tab === "guest" && (_jsxs("form", { onSubmit: handleGuest, className: "flex flex-col gap-4", children: [_jsx("div", { className: "px-4 py-3 bg-warn/10 border border-warn/20 rounded-xl", children: _jsx("p", { className: "text-warn text-[12px] font-medium leading-relaxed", children: "Guest mode: no points, no leaderboard. Your CF handle is required to validate submissions during a duel." }) }), _jsxs("div", { children: [_jsx("label", { className: labelCls, children: "Codeforces Handle" }), _jsx("input", { type: "text", placeholder: "your_cf_handle", value: guestHandle, onChange: (e) => setGuestHandle(e.target.value), className: inputCls, required: true })] }), _jsx("button", { type: "submit", disabled: loading, className: "btn-secondary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed", children: loading ? "Verifying handle..." : "Play as Guest" })] }))] }), _jsx("p", { className: "text-center text-white/20 text-[11px] mt-6", children: "By continuing you agree that this platform uses your public CF data." })] })] }));
}
