import { useState } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "../../config/constants";
import { useAuth } from "../hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { KeyRound } from "lucide-react";

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
    <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur-sm md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-500/25">
          <KeyRound className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Change Password
          </h2>
          <p className="text-sm text-muted-foreground">
            Use a strong, unique password.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleChangePassword}
        className="max-w-sm"
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="current-password">Current Password</FieldLabel>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="new-password">New Password</FieldLabel>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Field>

          <Button type="submit" className="w-full">
            Update Password
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};

export default PasswordTab;
