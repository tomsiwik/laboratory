import {
  characters,
  defaultCharacter,
  type Character,
} from "@/lib/characters";

const COMMAND_RE = /\/(dexter|deedee|mandark|dad|mom|computress)\b/i;

export interface RouteResult {
  character: Character;
  instruction: string;
}

export function routeMessage(body: string): RouteResult {
  const match = body.match(COMMAND_RE);

  if (match) {
    const name = match[1].toLowerCase() as keyof typeof characters;
    const character = characters[name];
    const instruction = body.slice(match.index! + match[0].length).trim();
    return { character, instruction };
  }

  return { character: defaultCharacter, instruction: body.trim() };
}
