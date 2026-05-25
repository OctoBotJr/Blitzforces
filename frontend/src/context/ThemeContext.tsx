import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { Theme } from "../types";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = (localStorage.getItem("bf-theme") as Theme) ?? "dark";
    // Apply immediately so there's no flash before the useEffect runs
    document.documentElement.classList.toggle("dark", saved === "dark");
    return saved;
  });

  useEffect(() => {
    const root = document.documentElement;
    // Tailwind darkMode:"class" reads the `dark` class on <html>
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("bf-theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
