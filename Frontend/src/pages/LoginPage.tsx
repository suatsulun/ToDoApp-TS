import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
import { Button } from "@/components/ui/button"
 
const LoginPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const handleLogin = async (e:React.SubmitEvent) =>{
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formData = new URLSearchParams();
            formData.append("username", username)
            formData.append("password", password)
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
            const data = await response.json()
            const token = data.access_token;
            const userResponse = await fetch(`${API_BASE_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` }
            });
            if (userResponse.ok) {
                const userData = await userResponse.json();
                login(userData, token);
                toast.success(`Welcome back, ${userData.username}!`);
                navigate("/");
            }
        } catch (error) {
            toast.error("Could not connect to the server.");
        } finally{
            setIsSubmitting(false);
        }
    };
    return (
        <form onSubmit={handleLogin} className="flex min-h-screen w-full items-center justify-center p-4">
    <FieldSet className="w-full max-w-xs">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="username">Username / Email</FieldLabel>
          <Input id="username" type="text" placeholder="Username/Email" value={username} onChange={(e) => setUsername(e.target.value)} />
          <FieldDescription>
            Enter your Username or your Email
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password" >Password</FieldLabel>
          <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          <FieldDescription>
            Enter your password.
          </FieldDescription>
        </Field>
        <Field orientation="responsive">
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Logging In..." : "Log In" }</Button>
        </Field>
      </FieldGroup>
      <Field orientation="responsive">
        <div className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="font-semibold hover:underline">
        Register here
        </Link>
        </div>
        </Field>
    </FieldSet>
    </form>
    )
}

export default LoginPage