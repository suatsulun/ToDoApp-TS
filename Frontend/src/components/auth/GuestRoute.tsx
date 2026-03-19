import { type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom"

interface GuestRouteProps {
    children: ReactNode;
}

export const GuestRoute = ({ children }: GuestRouteProps) => {
    const {isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
        return <div>Loading...</div>
    } 
    if (isAuthenticated) {
        return<Navigate to="/" replace/>
    }
    return children;

};