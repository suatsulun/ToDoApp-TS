export interface User {
    id: number;
    username: string;
    email: string;
    family_id: number | null;
}

export interface AuthContextType{
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (userData: User, token: string) => void;
    logout: () =>void;
}