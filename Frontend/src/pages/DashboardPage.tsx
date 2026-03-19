import React from "react";
import { useNavigate } from "react-router-dom";
import TodosList from "../components/todos/TodosList";
import { useAuth } from "../components/hooks/useAuth";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardPage = (): React.JSX.Element => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-8">
      <header className="flex items-center mb-8 border-b pb-4">
        <div className= "justify-center">
          <h1 className="text-2xl font-bold">Welcome back, {user?.username}!</h1>
        </div>

        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="ml-auto flex gap-2 items-center text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOutIcon size={16} />
          Log Out
        </Button>
      </header>
      <main>
        <h2 className="text-xl font-semibold mb-4">Your Todos</h2>
      <TodosList />
      </main>
    </div>
  );
};
export default DashboardPage