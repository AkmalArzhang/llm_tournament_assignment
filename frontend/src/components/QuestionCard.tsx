import { Card, Flex, Title, Badge, Text, Button } from "@mantine/core";
import { Link as RouterLink } from "react-router-dom";
import type { Question } from "@/types";

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <Card
      shadow="sm"
      radius="md"
      p="xl"
      withBorder
      className="fancy-card"
      w="100%"
      mih={120}
    >
      <Flex justify="space-between" align="flex-start" mb={8}>
        <Title order={5} m={0}>
          {question.question_text}
        </Title>
        <Badge>{question.prompts?.length ?? 0} prompts</Badge>
      </Flex>

      <Text size="md" c="dimmed" mb={12} lh={1.4}>
        {question.prompts && question.prompts.length > 0
          ? `Top prompt: ${question.prompts[0].prompt_text.slice(0, 120)}...`
          : "No prompts yet — be the first to submit one."}
      </Text>

      <Flex justify="flex-end">
        <Button
          component={RouterLink}
          to={`/tournament/${question.id}`}
          variant="light"
          size="sm"
        >
          View
        </Button>
      </Flex>
    </Card>
  );
}

export default QuestionCard;
