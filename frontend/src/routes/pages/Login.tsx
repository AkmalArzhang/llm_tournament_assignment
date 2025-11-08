import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Button,
  Text,
  Stack,
  Anchor,
} from "@mantine/core";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/userStore";
import { useState } from "react";
import AuthLayout from "@/components/layout/AuthLayout";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError("Username and password cannot be empty or only whitespace");
      return;
    }

    setLoading(true);
    try {
      await login(trimmedUsername, trimmedPassword);
      navigate("/");
    } catch (err: any) {
      console.error("Login error:", err);
      let errorMessage = "Login failed";

      if (err?.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail)) {
          errorMessage = err.response.data.detail
            .map((e: any) => e.msg || e.message || JSON.stringify(e))
            .join(", ");
        } else {
          errorMessage = err.response.data.detail;
        }
      } else if (err?.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      leftTitle="Welcome back to Promptement"
      leftText="A tiny app to learn prompt engineering through short tournaments and examples."
    >
      <Title ta="center">Welcome Back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Don't have an account yet?{" "}
        <Anchor component={RouterLink} to="/register">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Username"
              placeholder="Username or email"
              required
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value.trim())}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value.trim())}
            />

            {error && (
              <Text color="red" size="sm">
                {error}
              </Text>
            )}

            <Button type="submit" fullWidth mt="xl" loading={loading}>
              Sign in
            </Button>
          </Stack>
        </form>
      </Paper>
    </AuthLayout>
  );
}
