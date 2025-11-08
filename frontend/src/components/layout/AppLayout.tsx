import { AppShell, Container } from "@mantine/core";
import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppShell padding={0}>
      <AppShell.Main bg="#f5f7fa" mih="100vh">
        <Container size="xl" py="xl">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
