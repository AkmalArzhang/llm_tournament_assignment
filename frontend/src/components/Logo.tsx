import { Group, ThemeIcon, Text } from "@mantine/core";
import { Link as RouterLink } from "react-router-dom";

export function Logo() {
  return (
    <RouterLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
      <Group style={{ gap: 8, alignItems: "center" }}>
        <ThemeIcon radius="xl" size={36} color="blue">
          <Text size="sm" fw={700} style={{ lineHeight: 1 }}>
            P
          </Text>
        </ThemeIcon>
        <Text fw={700} size="lg">
          Promptement
        </Text>
      </Group>
    </RouterLink>
  );
}

export default Logo;
