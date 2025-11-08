import { useState, useEffect, useMemo } from "react";
import {
  Container,
  Title,
  Text,
  Card,
  Button,
  Alert,
  Flex,
  Stack,
  Box,
} from "@mantine/core";
import { Link as RouterLink, useParams } from "react-router-dom";
import HeaderBar from "@/components/HeaderBar";
import PromptCard from "@/components/PromptCard";
import api from "@/api/axios";
import type { Prompt } from "@/types";

export default function Tournament() {
  const { question_id } = useParams();

  const [selectedPromptId, setSelectedPromptId] = useState<number | null>(null);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [questionText, setQuestionText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVoted, setIsVoted] = useState(false);
  const [votedPromptId, setVotedPromptId] = useState<number | null>(null);

  const maxCount = useMemo(() => {
    if (prompts.length === 0) return 0;
    return Math.max(...prompts.map((a) => a.win_count), 0);
  }, [prompts]);

  useEffect(() => {
    if (!question_id) return;
    setLoading(true);
    api
      .get(`/questions/${question_id}`)
      .then((res) => {
        const data = res.data as any;
        setQuestionText(data.question_text);
        setPrompts(data.prompts || []);
        setIsVoted(Boolean(data.is_voted));
        setVotedPromptId(data.voted_prompt_id || null);
      })
      .catch((err) =>
        setError(
          err?.response?.data?.detail ||
            err.message ||
            "Failed to load question"
        )
      )
      .finally(() => setLoading(false));
  }, [question_id]);

  async function handleSubmit() {
    if (!question_id) {
      alert("Missing question id");
      return;
    }
    if (selectedPromptId === null) {
      alert("No prompt selected");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await api.post("/tournaments", null, {
        params: {
          question_id: Number(question_id),
          winning_prompt_id: selectedPromptId,
        },
      });
      setIsVoted(true);
      setVotedPromptId(selectedPromptId);
      alert("Your vote was submitted");

      const res = await api.get(`/questions/${question_id}`);
      setPrompts(res.data.prompts || []);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail || err?.message || "Failed to submit vote"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Flex justify="center">
      <Box w="100%" maw={800}>
        <Flex mih="calc(100vh - 60px)" align="center" justify="center">
          <Container size={800}>
            <Stack align="center" gap={20}>
              <Box w="100%">
                <HeaderBar />
                {isVoted ? (
                  <Alert
                    title="Vote recorded"
                    color="green"
                    variant="light"
                    mt={16}
                  >
                    <Text size="sm" m={0}>
                      You have already submitted your response for this
                      question. Thank you for participating — you can still
                      review prompts and results.
                    </Text>
                  </Alert>
                ) : (
                  <Alert
                    title="How to play"
                    color="blue"
                    variant="light"
                    mt={16}
                  >
                    <Text size="sm" m={0}>
                      Choose the prompt you think performs best for the
                      question, then submit your vote. Votes are anonymous.
                    </Text>
                  </Alert>
                )}
                {error && (
                  <Text c="red" size="sm" mt={16} ta="center">
                    {error}
                  </Text>
                )}
                <Card
                  shadow="sm"
                  p="xl"
                  radius="md"
                  withBorder
                  className="fancy-card"
                  ta="center"
                  mt={16}
                >
                  <Text size="xs" c="dimmed" mb={6}>
                    QUESTION
                  </Text>
                  <Title order={3} m={0}>
                    {questionText || "Loading question..."}
                  </Title>
                  <Text c="dimmed" size="sm" mt={6}>
                    {loading ? "Loading prompts..." : ""}
                  </Text>
                </Card>
              </Box>

              <Stack w="100%" gap={16} mt={8}>
                {prompts.length === 0 && (
                  <Text c="dimmed">
                    No prompts available for this question yet.
                  </Text>
                )}

                {prompts.map((p, idx) => {
                  const isSelected = selectedPromptId === p.id;
                  const isWinner = maxCount > 0 && p.win_count === maxCount;
                  const isUserVote = isVoted && votedPromptId === p.id;
                  return (
                    <PromptCard
                      key={p.id}
                      prompt={p}
                      index={idx}
                      isSelected={isSelected}
                      isVoted={isVoted}
                      isWinner={isWinner}
                      isUserVote={isUserVote}
                      onClick={() => !isVoted && setSelectedPromptId(p.id)}
                    />
                  );
                })}
              </Stack>

              <Flex w="100%" justify="space-between" align="center">
                <Button component={RouterLink} to="/" variant="subtle">
                  Back to Home
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={selectedPromptId === null || isVoted || submitting}
                  loading={submitting}
                >
                  {isVoted ? "Voted" : "Submit"}
                </Button>
              </Flex>
            </Stack>
          </Container>
        </Flex>
      </Box>
    </Flex>
  );
}
