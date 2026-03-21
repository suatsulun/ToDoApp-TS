import { useState } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "../../config/constants";
import { useAuth } from "../hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PasswordTab = () => {
  const { token } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/me/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });
      if (response.ok) {
        toast.success("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        const errorData = await response.json();
        toast.error(errorData.detail || "Failed to change password.");
      }
    } catch (error) {
      toast.error("Could not connect to the server");
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl border shadow-sm">
      <h2 className="text-xl font-bold">Change Password</h2>

      <form onSubmit={handleChangePassword} className="space-y-4 max-w-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" variant="secondary" className="w-full">
          Update Password
        </Button>
      </form>
    </div>
  );
};

export default PasswordTab;
