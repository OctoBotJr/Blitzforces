import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect, } from "react";
const ThemeContext = createContext({
    theme: "dark",
    toggle: () => { },
});
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem("bf-theme") ?? "dark";
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
    return (_jsx(ThemeContext.Provider, { value: { theme, toggle }, children: children }));
}
export function useTheme() {
    return useContext(ThemeContext);
}
