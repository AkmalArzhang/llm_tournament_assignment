import type { ReactNode } from "react";
import { Box, Title, Text, Center, Flex } from "@mantine/core";

interface AuthLayoutProps {
  leftTitle?: string;
  leftText?: string;
  children: ReactNode;
}

export function AuthLayout({
  leftTitle = "Welcome to Promptement",
  leftText = "Practice prompt engineering, compare model outputs, and learn by playing tournaments.",
  children,
}: AuthLayoutProps) {
  return (
    <Flex mih="100vh" align="center" justify="center" p={20}>
      <Flex
        w="100%"
        maw={920}
        style={{
          boxShadow: "0 8px 30px rgba(16,24,40,0.06)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <Flex
          flex={1}
          bg="#3b82f6"
          c="white"
          p={36}
          direction="column"
          justify="center"
        >
          <Center>
            <Box>
              <Title order={2} c="white" mb={12}>
                {leftTitle}
              </Title>
              <Text c="rgba(255,255,255,0.9)" maw={360}>
                {leftText}
              </Text>
            </Box>
          </Center>
        </Flex>

        <Box w={420} bg="white" p={28}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}

export default AuthLayout;
