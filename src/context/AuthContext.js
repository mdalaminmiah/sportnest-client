'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
    user: null,
    loading: true, // 🎯 Keeps track of the cookie background trip
    login: () => {},
    logout: () => {},
    refreshUser: () => {},
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Starts at null
    const [loading, setLoading] = useState(true); // Starts at true

    const fetchUser = async () => {
        try {
            const response = await fetch(
                `/api/auth/me`,
                {
                    method: 'GET',
                    credentials: 'include', // Sends your 7-day cookie token automatically
                    headers: { 'Content-Type': 'application/json' },
                },
            );
            const result = await response.json();

            // Match your backend envelope data wrapper
            let verifiedUser = null;
            if (result.success) {
                if (result.data?.user) verifiedUser = result.data.user;
                else if (result.user) verifiedUser = result.user;
                else if (result.data) verifiedUser = result.data;
            }

            if (verifiedUser) {
                setUser(verifiedUser); // Keep them logged in
            } else {
                setUser(null); // Cookie expired or invalid
            }
        } catch (error) {
            console.error('Session validation error:', error);
            setUser(null);
        } finally {
            setLoading(false); // 🎯 Stop loading once the cookie verification check settles
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = (authData) => {
        if (!authData) return;
        const activeUser =
            authData.user || authData.data?.user || authData.data;
        if (activeUser) setUser(activeUser);
    };

    const logout = async () => {
        try {
            await fetch(`/api/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, logout, refreshUser: fetchUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
