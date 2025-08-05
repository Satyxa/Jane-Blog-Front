import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const AuthContext = createContext<{
    isAuthenticated: boolean;
    setAuthenticated: (value: boolean) => void;
    logout: () => void;
}>({
    isAuthenticated: false,
    setAuthenticated: () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // добавим индикатор

    const checkAuth = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/auth/me`, {
                withCredentials: true,
            });
            if (res.status === 200) {
                setIsAuthenticated(true);
            }
        } catch (err) {
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const logout = async () => {
        try {
            await axios.post(`${SERVER_URL}/auth/logout`, {}, { withCredentials: true });
        } catch (err) {
            console.warn("Logout error, maybe already logged out:", err);
        } finally {
            setIsAuthenticated(false); // всегда сбрасывай
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated: setIsAuthenticated, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);