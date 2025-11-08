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

export default function Register() {
  const navigate = useNavigate();
  const signup = useAuthStore((s) => s.signup);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirm = confirm.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError("Username and password cannot be empty or only whitespace");
      return;
    }

    if (trimmedPassword !== trimmedConfirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await signup(trimmedUsername, trimmedPassword);
      navigate("/");
    } catch (err: any) {
      console.error("Registration error:", err);
      let errorMessage = "Registration failed";

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
      leftTitle="Join Promptement"
      leftText="Sign up to start participating in short prompt tournaments and learn by doing."
    >
      <Title ta="center">Create an Account</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <Anchor component={RouterLink} to="/login">
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Username"
              placeholder="Username"
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

            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.currentTarget.value.trim())}
            />

            {error && (
              <Text c="red" size="sm">
                {error}
              </Text>
            )}

            <Button type="submit" fullWidth mt="xl" loading={loading}>
              Register
            </Button>
          </Stack>
        </form>
      </Paper>
    </AuthLayout>
  );
}
