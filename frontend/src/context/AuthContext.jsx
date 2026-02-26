import { createContext, useEffect, useMemo, useState } from 'react';
import { loginUser, registerUser } from '../services/authService';

export const AuthContext = createContext(null);

const TOKEN_KEY = 'codebazaar_token';
const USER_KEY = 'codebazaar_user';

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
    const [user, setUser] = useState(() => {
        const rawUser = localStorage.getItem(USER_KEY);
        return rawUser ? JSON.parse(rawUser) : null;
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
        } else {
            localStorage.removeItem(TOKEN_KEY);
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(USER_KEY);
        }
    }, [user]);

    const login = async (payload) => {
        setLoading(true);
        try {
            const response = await loginUser(payload);
            setToken(response.accessToken);
            setUser(response.user);
            return response;
        } finally {
            setLoading(false);
        }
    };

    const register = async (payload) => {
        setLoading(true);
        try {
            const response = await registerUser(payload);
            setToken(response.accessToken);
            setUser(response.user);
            return response;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    const value = useMemo(
        () => ({ token, user, isAuthenticated: Boolean(token), loading, login, register, logout }),
        [token, user, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
