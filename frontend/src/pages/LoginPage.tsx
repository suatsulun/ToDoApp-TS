import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../components/hooks/useAuth";
import { toast } from "sonner";
import { API_BASE_URL } from "../config/constants";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.detail || "Invalid credentials");
        setIsSubmitting(false);
        return;
      }
      const data = await response.json();
      const token = data.access_token;
      const userResponse = await fetch(`${API_BASE_URL}/api/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (userResponse.ok) {
        const userData = await userResponse.json();
        login(userData, token);
        toast.success(`Welcome back, ${userData.username}!`);
        navigate("/");
      }
    } catch (error) {
      toast.error("Could not connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to keep on top of your todos.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-xl shadow-black/[0.04] backdrop-blur-sm"
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">Username / Email</FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="you@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FieldDescription>
                Enter your username or your email.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FieldDescription>Enter your password.</FieldDescription>
            </Field>
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </Button>
          </FieldGroup>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-primary hover:underline"
            >
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
