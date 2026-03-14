import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login.jsx';
import HomePage from './pages/Home.jsx';
import GameLoaderPage from './pages/GameLoader.jsx';
import NotFoundPage from './pages/NotFound.jsx';
import { useAuth } from './context/AuthContext.jsx';

function RequireAuth({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-500 font-semibold">
                Đang tải...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

function PublicOnly({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-500 font-semibold">
                Đang tải...
            </div>
        );
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default function App() {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <PublicOnly>
                        <LoginPage />
                    </PublicOnly>
                }
            />
            <Route
                path="/"
                element={
                    <RequireAuth>
                        <HomePage />
                    </RequireAuth>
                }
            />
            <Route
                path="/:slug"
                element={
                    <RequireAuth>
                        <GameLoaderPage />
                    </RequireAuth>
                }
            />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}
