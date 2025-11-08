import { Card, Group, ThemeIcon, Text, Badge, Box } from "@mantine/core";
import type { Prompt } from "@/types";

interface PromptCardProps {
  prompt: Prompt;
  index: number;
  isSelected?: boolean;
  isVoted?: boolean;
  isWinner?: boolean;
  isUserVote?: boolean;
  onClick?: () => void;
}

export function PromptCard({
  prompt,
  index,
  isSelected = false,
  isVoted = false,
  isWinner = false,
  isUserVote = false,
  onClick,
}: PromptCardProps) {
  return (
    <Card
      withBorder
      p="xl"
      className="fancy-card"
      onClick={onClick}
      style={{
        cursor: isVoted ? "default" : onClick ? "pointer" : "default",
        border: isSelected ? "2px solid #3b82f6" : undefined,
        boxShadow: isSelected ? "0 8px 20px rgba(59,130,246,0.08)" : undefined,
        opacity: isVoted ? 0.75 : 1,
      }}
      w="100%"
      mih={120}
      pos="relative"
    >
      <Badge variant="filled" size="sm" pos="absolute" top={12} right={12}>
        {prompt.win_count}
      </Badge>

      <Box pos="absolute" top={12} left={12}>
        <Group gap={6}>
          {isWinner && (
            <Badge size="xs" color="yellow" c="dark">
              ★ Winner
            </Badge>
          )}

          {isUserVote && (
            <Badge size="xs" color="blue" variant="light">
              ✓ Your Vote
            </Badge>
          )}
        </Group>
      </Box>

      <Group align="center">
        <ThemeIcon size={34} radius="xl" color={isSelected ? "blue" : "gray"}>
          <Text size="sm" fw={700} style={{ lineHeight: 1 }}>
            ✓
          </Text>
        </ThemeIcon>

        <Box style={{ flex: 1 }}>
          <Text fw={600}>{`Prompt ${index + 1}`}</Text>
          <Text c="dimmed" size="sm">
            {prompt.prompt_text}
          </Text>
        </Box>
      </Group>
    </Card>
  );
}

export default PromptCard;
