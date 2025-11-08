import { Text, Avatar, Button, Box, Group, Flex } from "@mantine/core";
import { Link as RouterLink } from "react-router-dom";
import { useAuthStore } from "@/store/userStore";
import { Logo } from "./Logo";

export function HeaderBar() {
  const logout = useAuthStore((s) => s.logout);
  const username = useAuthStore((s) => s.username) || "User";

  return (
    <Box
      component="header"
      py="sm"
      bg="white"
      style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}
    >
      <Flex justify="space-between" align="center" maw={1200} mx="auto" px="md">
        <Box>
          <Logo />
        </Box>

        <Group>
          <Group gap="xs">
            <Avatar radius="xl" size={32} color="blue">
              {username?.[0]?.toUpperCase() ?? "U"}
            </Avatar>
            <Text fw={700} size="sm">
              Welcome, {username.toUpperCase()}
            </Text>
          </Group>

          <Button
            variant="outline"
            size="xs"
            component={RouterLink}
            to="/login"
            onClick={() => logout()}
            ml="md"
          >
            Logout
          </Button>
        </Group>
      </Flex>
    </Box>
  );
}

export default HeaderBar;
