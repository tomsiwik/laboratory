import type { Character } from "@/lib/characters";

export function formatResponse(character: Character, body: string): string {
  const avatar = `<img src="${character.avatar}" width="20" height="20" />`;
  return `${avatar} **${character.character}**\n\n${body}\n\n---\n*~ ${character.character}*`;
}
