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

    const checkAuth = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/auth/me`, {
                withCredentials: true // важно!
            });
            if (res.status === 200) {
                setIsAuthenticated(true);
            }
        } catch (err) {
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const logout = async () => {
        await axios.post(`${SERVER_URL}/auth/logout`, {}, { withCredentials: true });
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated: setIsAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);