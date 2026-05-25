import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type AuthMode = "registered" | "guest";

export interface AuthUser {
  id: number;
  email: string;
  cfHandle: string;
  cfRating: number;
  cfTier: string;
  blitzforcePoints: number;
  mode: AuthMode;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  login: (user: AuthUser, token: string) => void;
  loginAsGuest: (cfHandle: string, cfRating: number) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  token: null,
  login: () => { },
  loginAsGuest: () => { },
  logout: () => { },
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem("bf-user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("bf-token"),
  );

  const login = (user: AuthUser, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("bf-user", JSON.stringify(user));
    localStorage.setItem("bf-token", token);
  };

  const loginAsGuest = (cfHandle: string, cfRating: number) => {
    const guest: AuthUser = {
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

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        loginAsGuest,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
