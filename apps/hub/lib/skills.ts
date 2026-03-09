import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Character } from "@/lib/characters";

const PACKAGES_DIR = join(process.cwd(), "../../packages");

async function tryRead(path: string): Promise<string | null> {
  try {
    return await readFile(path, "utf-8");
  } catch {
    return null;
  }
}

export async function loadSkills(
  character: Character
): Promise<{ workflow: string | null; doc: string | null }> {
  const dir = join(PACKAGES_DIR, character.name);
  const [workflow, doc] = await Promise.all([
    tryRead(join(dir, "workflow.md")),
    tryRead(join(dir, "doc.md")),
  ]);
  return { workflow, doc };
}
