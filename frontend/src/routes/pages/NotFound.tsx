import { Text, Container, Title, Button } from "@mantine/core";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container size="md" style={{ textAlign: "center", paddingTop: "4rem" }}>
      <Title order={1}>404: Page Not Found</Title>
      <Text c="dimmed" mt="md" mb="xl">
        The page you're looking for doesn't exist or has been moved.
      </Text>
      <Button component={Link} to="/" variant="light">
        Back to Home
      </Button>
    </Container>
  );
}
