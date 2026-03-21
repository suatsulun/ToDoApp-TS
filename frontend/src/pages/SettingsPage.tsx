import FamilyTab from "@/components/profile/FamilyTab";
import PasswordTab from "@/components/profile/PaswordTab";
import ProfileTab from "@/components/profile/ProfileTab";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type TabType = "profile" | "password" | "family";

const ProfilePage = (): React.JSX.Element => {
    const [activeTab, setActiveTab] = useState<TabType>("profile");
    const navigate = useNavigate();


return (
  <div className="max-w-3xl mx-auto p-8">
    <div className="flex justify-between mb-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <Button onClick={() => navigate("/")} className="">
        Return to Todos
      </Button>
    </div>
    <div className="flex space-x-1 border-b mb-8">
      <button
        onClick={() => setActiveTab("profile")}
        className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
          activeTab === "profile"
            ? "bg-gray-100 text-black border-b-2 border-black"
            : "text-gray-500 hover:text-black hover:bg-gray-50"
        }`}
      >
        Profile
      </button>
      <button
        onClick={() => setActiveTab("password")}
        className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
          activeTab === "password"
            ? "bg-gray-100 text-black border-b-2 border-black"
            : "text-gray-500 hover:text-black hover:bg-gray-50"
        }`}
      >
        Password
      </button>
      <button
        onClick={() => setActiveTab("family")}
        className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
          activeTab === "family"
            ? "bg-gray-100 text-black border-b-2 border-black"
            : "text-gray-500 hover:text-black hover:bg-gray-50"
        }`}
      >
        Family
      </button>
    </div>
    <div className="mt-4">
      {activeTab === "profile" && <ProfileTab />}

      {activeTab === "password" && <PasswordTab />}

      {activeTab === "family" && <FamilyTab />}
    </div>
  </div>
);
};

export default ProfilePage;