import { useState } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "../../config/constants";
import { useAuth } from "../hooks/useAuth";
import EditableField from "./EditableField";
import { User } from "lucide-react";

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
    <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur-sm md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-500/25">
          <User className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Account Information
          </h2>
          <p className="text-sm text-muted-foreground">
            Update your username and email.
          </p>
        </div>
      </div>

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
