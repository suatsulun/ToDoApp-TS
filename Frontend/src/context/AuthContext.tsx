import {createContext, useState, useEffect, type ReactNode } from "react";
import { type User, type AuthContextType } from "../types/auth";
import { API_BASE_URL } from "../config/constants"

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) =>{
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isAuthenticated = user !== null;


    const login = (userData: User, token: string) => {
        localStorage.setItem("token", token);
        setToken(token);
        setUser(userData)
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    useEffect (() => {
        const checkToken = async () =>{
            const token = localStorage.getItem("token");
            if(!token) {
                setIsLoading(false);
                return;
            }
            try {
                const response = await fetch(`${API_BASE_URL}/me`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    localStorage.removeItem("token");
                    setUser(null);    
                }
            } catch(error) {
                console.error("Failed to fetch user:", error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }

        };
        checkToken();
    }, []);

    return (<AuthContext.Provider value={{user, token, isAuthenticated, isLoading, login, logout}}>
        {children}
    </AuthContext.Provider>);
};