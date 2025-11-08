import { useEffect, useState } from "react";
import { Text, Container, Alert, Flex, Stack, Box } from "@mantine/core";
import HeaderBar from "@/components/HeaderBar";
import QuestionCard from "@/components/QuestionCard";
import api from "@/api/axios";
import type { Question } from "@/types";

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .get<Question[]>("/questions")
      .then((res) => {
        if (mounted) setQuestions(res.data);
      })
      .catch((err) => {
        setError(
          err?.response?.data?.detail ||
            err.message ||
            "Failed to load questions"
        );
      })
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Flex justify="center">
      <Box w="100%" maw={800}>
        <Flex mih="calc(100vh - 60px)" align="center" justify="center">
          <Container size={800}>
            <Stack align="center" gap={20}>
              <Box w="100%">
                <HeaderBar />
                <Alert
                  title="Welcome to Promptement"
                  color="blue"
                  variant="light"
                  mt={25}
                >
                  <Text size="sm" m={0}>
                    Select a question below to view details and submit a prompt.
                    Compete by submitting concise prompts and learn from the
                    community.
                  </Text>
                </Alert>
                {loading && (
                  <Text c="dimmed" size="sm" mt={8} ta="center">
                    Loading questions...
                  </Text>
                )}
              </Box>

              <Stack w="100%" gap={20} mt={8}>
                {error && (
                  <Text c="red" size="sm">
                    {error}
                  </Text>
                )}

                {questions.map((q) => (
                  <QuestionCard key={q.id} question={q} />
                ))}
              </Stack>
            </Stack>
          </Container>
        </Flex>
      </Box>
    </Flex>
  );
}
