import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import type { Character } from "@/lib/characters";
import { loadSkills } from "@/lib/skills";
import { formatResponse } from "@/lib/format";

export interface AgentContext {
  repoFullName: string;
  prNumber?: number;
  prBranch?: string;
  baseBranch?: string;
  threadId: string;
}

function buildSystemPrompt(
  character: Character,
  skills: { workflow: string | null; doc: string | null },
  context: AgentContext
): string {
  const parts = [
    `You are ${character.character}, a character agent in the Laboratory.`,
    `Role: ${character.role}`,
    `Personality quote: "${character.quote}"`,
    "",
    "Stay in character. Be concise and helpful.",
    "",
    `Repository: ${context.repoFullName}`,
  ];

  if (context.prNumber) {
    parts.push(`PR #${context.prNumber} (${context.prBranch} → ${context.baseBranch})`);
  }

  if (skills.workflow) {
    parts.push("", "## Workflow", skills.workflow);
  }

  if (skills.doc) {
    parts.push("", "## Documentation", skills.doc);
  }

  return parts.join("\n");
}

export async function runCharacterAgent(
  character: Character,
  instruction: string,
  context: AgentContext
): Promise<string> {
  const skills = await loadSkills(character);
  const systemPrompt = buildSystemPrompt(character, skills, context);

  const { text } = await generateText({
    model: anthropic("claude-sonnet-4-6"),
    system: systemPrompt,
    prompt: instruction,
    maxOutputTokens: 4096,
  });

  return formatResponse(character, text);
}
