import React from "react";
import { useNavigate } from "react-router-dom";
import TodosList from "../components/todos/TodosList";
import { useAuth } from "../components/hooks/useAuth";
import { LogOutIcon, Settings, CheckCircle2 } from "lucide-react";
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
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1300px] px-6 py-8 md:px-10 md:py-12">
        <header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Dashboard
              </p>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Welcome back,{" "}
                <button
                  onClick={handleProfile}
                  className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent hover:underline"
                >
                  {user?.username}
                </button>
                <span aria-hidden> 👋</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleProfile}
              className="gap-2"
            >
              <Settings size={16} />
              Settings
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="gap-2 border-rose-200 bg-rose-50/40 text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/20"
            >
              <LogOutIcon size={16} />
              Log Out
            </Button>
          </div>
        </header>

        <main className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-xl shadow-black/[0.03] backdrop-blur-sm md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Your Todos</h2>
              <p className="text-sm text-muted-foreground">
                Capture, organize and conquer your day.
              </p>
            </div>
          </div>
          <TodosList />
        </main>
      </div>
    </div>
  );
};
export default DashboardPage;
