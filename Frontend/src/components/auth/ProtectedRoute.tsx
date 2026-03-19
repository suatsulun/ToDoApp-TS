import { type ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const {isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
        return <div>Loading...</div>
    } 
    if (!isAuthenticated) {
        return<Navigate to="/login" replace/>
    }
    return children;

};