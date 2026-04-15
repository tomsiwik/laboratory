"use workflow";

import { Sandbox } from "@vercel/sandbox";
import { getInstallationOctokit } from "@/lib/github";
import { characters, type CharacterName } from "@/lib/characters";
import { runCharacterAgent } from "@/lib/agent";
import { formatResponse } from "@/lib/format";

export interface WorkflowParams {
  baseBranch: string;
  prBranch: string;
  prNumber: number;
  repoFullName: string;
  threadId: string;
  characterName: string;
  instruction: string;
}

async function getGitHubToken(): Promise<string> {
  const octokit = await getInstallationOctokit();
  const { data } = await octokit.request(
    "POST /app/installations/{installation_id}/access_tokens",
    { installation_id: Number(process.env.GITHUB_APP_INSTALLATION_ID) }
  );
  return data.token;
}

async function postComment(
  repoFullName: string,
  prNumber: number,
  body: string
): Promise<void> {
  const octokit = await getInstallationOctokit();
  const [owner, repo] = repoFullName.split("/");
  await octokit.request(
    "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
    { owner, repo, issue_number: prNumber, body }
  );
}

const CWD = "/vercel/sandbox";

export async function laboratoryWorkflow(params: WorkflowParams) {
  const {
    prBranch,
    baseBranch,
    prNumber,
    repoFullName,
    threadId,
    characterName,
    instruction,
  } = params;

  const character = characters[characterName as CharacterName];
  let sandbox: Awaited<ReturnType<typeof Sandbox.create>> | null = null;

  try {
    const token = await getGitHubToken();

    sandbox = await Sandbox.create({
      source: {
        type: "git",
        url: `https://x-access-token:${token}@github.com/${repoFullName}.git`,
        revision: prBranch,
      },
      timeout: 5 * 60 * 1000,
    });

    // Install dependencies
    const pkgCheck = await sandbox
      .runCommand({ cmd: "test", args: ["-f", `${CWD}/package.json`] })
      .catch(() => null);

    if (pkgCheck?.exitCode === 0) {
      const bunCheck = await sandbox
        .runCommand({ cmd: "test", args: ["-f", `${CWD}/bun.lock`] })
        .catch(() => null);

      const installCmd = bunCheck?.exitCode === 0 ? "bun" : "npm";
      await sandbox.runCommand({ cmd: installCmd, args: ["install"], cwd: CWD });
    }

    // Configure git identity
    await sandbox.runCommand({
      cmd: "git",
      args: ["config", "user.name", "dexters-lab[bot]"],
      cwd: CWD,
    });
    await sandbox.runCommand({
      cmd: "git",
      args: ["config", "user.email", "dexters-lab[bot]@users.noreply.github.com"],
      cwd: CWD,
    });

    // Extend sandbox timeout
    await sandbox.extendTimeout(3 * 60 * 1000);

    // Run character agent
    const response = await runCharacterAgent(character, instruction, {
      repoFullName,
      prNumber,
      prBranch,
      baseBranch,
      threadId,
    });

    // Post response
    await postComment(repoFullName, prNumber, response);

    // Check for uncommitted changes and push
    const statusResult = await sandbox.runCommand({
      cmd: "git",
      args: ["status", "--porcelain"],
      cwd: CWD,
    });

    const statusOutput = await statusResult.stdout();
    if (statusOutput.trim()) {
      await sandbox.runCommand({ cmd: "git", args: ["add", "-A"], cwd: CWD });
      await sandbox.runCommand({
        cmd: "git",
        args: ["commit", "-m", `lab(${character.name}): apply changes`],
        cwd: CWD,
      });
      await sandbox.runCommand({
        cmd: "git",
        args: ["push", "origin", prBranch],
        cwd: CWD,
      });
    }
  } catch (error) {
    try {
      const errorMsg =
        error instanceof Error ? error.message : "Unknown error occurred";
      await postComment(
        repoFullName,
        prNumber,
        formatResponse(
          character,
          `Something went wrong:\n\n\`\`\`\n${errorMsg}\n\`\`\``
        )
      );
    } catch {
      // Silently fail comment posting
    }
    throw error;
  } finally {
    if (sandbox) {
      await sandbox.stop();
    }
  }
}
