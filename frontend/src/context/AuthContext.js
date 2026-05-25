import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, } from "react";
const AuthContext = createContext({
    user: null,
    token: null,
    login: () => { },
    loginAsGuest: () => { },
    logout: () => { },
    isAuthenticated: false,
});
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("bf-user");
        return saved ? JSON.parse(saved) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem("bf-token"));
    const login = (user, token) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("bf-user", JSON.stringify(user));
        localStorage.setItem("bf-token", token);
    };
    const loginAsGuest = (cfHandle, cfRating) => {
        const guest = {
            id: -1,
            email: "",
            cfHandle,
            cfRating,
            cfTier: "guest",
            blitzforcePoints: 0,
            mode: "guest",
        };
        setUser(guest);
        setToken(null);
        localStorage.setItem("bf-user", JSON.stringify(guest));
    };
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("bf-user");
        localStorage.removeItem("bf-token");
    };
    return (_jsx(AuthContext.Provider, { value: {
            user,
            token,
            login,
            loginAsGuest,
            logout,
            isAuthenticated: !!user,
        }, children: children }));
}
export function useAuth() {
    return useContext(AuthContext);
}
