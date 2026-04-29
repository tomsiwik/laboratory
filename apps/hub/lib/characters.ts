import { agent as dexter } from "@dexters-lab/dexter";
import { agent as deedee } from "@dexters-lab/deedee";
import { agent as mandark } from "@dexters-lab/mandark";
import { agent as dad } from "@dexters-lab/dad";
import { agent as mom } from "@dexters-lab/mom";
import { agent as computress } from "@dexters-lab/computress";

const BASE_URL =
  "https://raw.githubusercontent.com/tomsiwik/laboratory/main/assets";

interface AgentConfig {
  name: string;
  character: string;
  role: string;
  command: string;
  bin: string;
  repo: string;
  quote: string;
}

export type Character = AgentConfig & { avatar: string };

function withAvatar(agent: AgentConfig): Character {
  return { ...agent, avatar: `${BASE_URL}/${agent.name}.svg` };
}

export const characters = {
  dexter: withAvatar(dexter),
  deedee: withAvatar(deedee),
  mandark: withAvatar(mandark),
  dad: withAvatar(dad),
  mom: withAvatar(mom),
  computress: withAvatar(computress),
} as const;

export type CharacterName = keyof typeof characters;

export const defaultCharacter = characters.computress;
