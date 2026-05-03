import FamilyTab from "@/components/profile/FamilyTab";
import PasswordTab from "@/components/profile/PaswordTab";
import ProfileTab from "@/components/profile/ProfileTab";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, KeyRound, User, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type TabType = "profile" | "password" | "family";

const TABS: {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "password", label: "Password", icon: KeyRound },
  { id: "family", label: "Family", icon: Users },
];

const ProfilePage = (): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-8 md:px-8 md:py-12">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Account
            </p>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Back to Todos
          </Button>
        </div>

        <div className="mb-8 inline-flex w-full rounded-2xl border border-border/60 bg-card/70 p-1 shadow-sm backdrop-blur-sm sm:w-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all sm:flex-initial",
                activeTab === id
                  ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-500/25"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        <div>
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "password" && <PasswordTab />}
          {activeTab === "family" && <FamilyTab />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
