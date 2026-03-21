import { useState } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "../../config/constants"; 
import { useAuth } from "../hooks/useAuth"; 
import EditableField from "./EditableField"; 

type ProfileType = "username" | "email" | null;

const ProfileTab = () => {
  const { user, token, login } = useAuth();
  const [activeField, setActiveField] = useState<ProfileType>(null);

  const handleSave = async (field: ProfileType, value: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field!]: value }),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        login(updatedUser, token!);
        toast.success(`${field} updated successfully!`);
      } else {
        const errorData = await response.json();
        toast.error(errorData.detail || `Failed to update ${field}.`);
      }
    } catch (error) {
      toast.error("Could not connect to the server.");
    } finally {
      setActiveField(null);
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl border shadow-sm">
      <h2 className="text-xl font-bold mb-4">Account Information</h2>

      <div className="flex flex-col">
        <EditableField
          label="Username"
          currentValue={user?.username || ""}
          isEditing={activeField === "username"}
          onEdit={() => setActiveField("username")}
          onCancel={() => setActiveField(null)}
          onSave={(newValue) => handleSave("username", newValue)}
        />

        <EditableField
          label="Email Address"
          currentValue={user?.email || ""}
          isEditing={activeField === "email"}
          onEdit={() => setActiveField("email")}
          onCancel={() => setActiveField(null)}
          onSave={(newValue) => handleSave("email", newValue)}
        />
      </div>
    </div>
  );
};

export default ProfileTab;