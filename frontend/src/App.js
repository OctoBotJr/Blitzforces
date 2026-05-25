import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import ProfilePage from "./pages/ProfilePage";
import FriendsPage from "./pages/FriendsPage";
import RankingsPage from "./pages/RankingsPage";
import ProblemsPage from "./pages/ProblemsPage";
import NotificationsPage from "./pages/NotificationsPage";
function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? _jsx(_Fragment, { children: children }) : _jsx(Navigate, { to: "/auth", replace: true });
}
function AppRoutes() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/auth", element: _jsx(AuthPage, {}) }), _jsx(Route, { path: "/", element: _jsx(ProtectedRoute, { children: _jsx(HomePage, {}) }) }), _jsx(Route, { path: "/game", element: _jsx(ProtectedRoute, { children: _jsx(GamePage, {}) }) }), _jsx(Route, { path: "/profile", element: _jsx(ProtectedRoute, { children: _jsx(ProfilePage, {}) }) }), _jsx(Route, { path: "/friends", element: _jsx(ProtectedRoute, { children: _jsx(FriendsPage, {}) }) }), _jsx(Route, { path: "/rankings", element: _jsx(ProtectedRoute, { children: _jsx(RankingsPage, {}) }) }), _jsx(Route, { path: "/problems", element: _jsx(ProtectedRoute, { children: _jsx(ProblemsPage, {}) }) }), _jsx(Route, { path: "/notifications", element: _jsx(ProtectedRoute, { children: _jsx(NotificationsPage, {}) }) })] }));
}
export default function App() {
    return (_jsx(ThemeProvider, { children: _jsx(AuthProvider, { children: _jsx(AppRoutes, {}) }) }));
}
