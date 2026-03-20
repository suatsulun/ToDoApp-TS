import React from "react";
import { useNavigate } from "react-router-dom";
import TodosList from "../components/todos/TodosList";
import { useAuth } from "../components/hooks/useAuth";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardPage = (): React.JSX.Element => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = (): void => {
    logout();
    navigate("/login");
  };
  const handleProfile = (): void => {
    navigate("/me");
  };

  return (
    <div className="p-8 max-w-[1300px] mx-auto">
      <header className="flex mb-8 border-b pb-4 justify-between items-center">
        <div className= "">
          <h1 className="text-2xl font-bold">Welcome back, <a onClick={handleProfile} className="text-blue-600 hover:underline">{user?.username}</a>!</h1>
        </div>

        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="gap-2 items-center text-red-600 hover:text-red-700 hover:bg-red-50  border-red-600 hover:border-red-700 rounded-full p-2 justify-self-end"
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