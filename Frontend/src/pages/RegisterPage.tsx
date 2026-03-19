import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { API_BASE_URL } from "../config/constants";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.detail || "Registration failed. Try a different username.");
        return;
      }

      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    } catch (error) {
      toast.error("Could not connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleRegister} 
      className="flex min-h-screen w-full items-center justify-center p-4"
    >
      <FieldSet className="w-full max-w-xs">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="email@***.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FieldDescription>At least 8 characters recommended.</FieldDescription>
          </Field>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Register"}
          </Button>

          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold hover:underline">
              Log in here
            </Link>
          </div>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};

export default RegisterPage;