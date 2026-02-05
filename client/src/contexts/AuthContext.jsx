import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('streamtube_token'));

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('streamtube_user');
        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.removeItem('streamtube_user');
                localStorage.removeItem('streamtube_token');
            }
        }
        setLoading(false);
    }, [token]);

    const signIn = async (email, password) => {
        const response = await fetch('http://127.0.0.1:3001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('streamtube_user', JSON.stringify(data.user));
        localStorage.setItem('streamtube_token', data.token);
        return data.user;
    };

    const signUp = async (email, password, name) => {
        const response = await fetch('http://127.0.0.1:3001/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('streamtube_user', JSON.stringify(data.user));
        localStorage.setItem('streamtube_token', data.token);
        return data.user;
    };

    const signOut = async () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('streamtube_user');
        localStorage.removeItem('streamtube_token');
    };

    const value = {
        user,
        token,
        loading,
        signIn,
        signUp,
        signOut
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
