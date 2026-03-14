import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const TOKEN_KEY = 'kidz_token';
const USER_KEY = 'kidz_user';

const getStoredToken = () => {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
};

const getTokenStore = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return localStorage;
    }
    if (sessionStorage.getItem(TOKEN_KEY)) {
        return sessionStorage;
    }
    return localStorage;
};

const saveToken = (token, remember) => {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, token);
};

const saveUser = (user) => {
    if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
};

const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem(USER_KEY);
        return stored ? JSON.parse(stored) : null;
    });
    const [loading, setLoading] = useState(true);

    const fetchMe = useCallback(async (token) => {
        return fetch('/api/me', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
    }, []);

    const refreshToken = useCallback(async (token) => {
        const response = await fetch('/api/refresh', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json().catch(() => ({}));
        return data.token || null;
    }, []);

    const bootstrap = useCallback(async () => {
        const token = getStoredToken();
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            let response = await fetchMe(token);
            if (!response.ok && response.status === 401) {
                const newToken = await refreshToken(token);
                if (newToken) {
                    const storage = getTokenStore();
                    storage.setItem(TOKEN_KEY, newToken);
                    response = await fetchMe(newToken);
                }
            }

            if (response.ok) {
                const data = await response.json().catch(() => ({}));
                if (data.user) {
                    setUser(data.user);
                    saveUser(data.user);
                }
            } else {
                clearAuth();
                setUser(null);
            }
        } catch (error) {
            clearAuth();
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [fetchMe, refreshToken]);

    useEffect(() => {
        bootstrap();
    }, [bootstrap]);

    const login = useCallback(async ({ username, password, remember }) => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            return { ok: false, message: data.message || 'Đăng nhập thất bại. Vui lòng thử lại.' };
        }

        if (data.token) {
            saveToken(data.token, remember);
        }
        if (data.user) {
            setUser(data.user);
            saveUser(data.user);
        }

        return { ok: true, message: data.message || 'Đăng nhập thành công.' };
    }, []);

    const logout = useCallback(async () => {
        const token = getStoredToken();
        try {
            if (token) {
                await fetch('/api/logout', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
            }
        } catch (error) {
            // Ignore API errors during logout.
        }

        clearAuth();
        setUser(null);
    }, []);

    const value = useMemo(() => ({
        user,
        loading,
        login,
        logout,
    }), [user, loading, login, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
