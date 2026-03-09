import "server-only";
import { App } from "octokit";
import type { Octokit } from "octokit";
import { env } from "@/lib/env";

let app: App | null = null;

export function getGitHubApp(): App {
  if (app) return app;

  app = new App({
    appId: env.GITHUB_APP_ID,
    privateKey: env.GITHUB_APP_PRIVATE_KEY.replaceAll("\\n", "\n"),
    webhooks: { secret: env.GITHUB_APP_WEBHOOK_SECRET },
  });

  return app;
}

export async function getInstallationOctokit(): Promise<Octokit> {
  const githubApp = getGitHubApp();
  return githubApp.getInstallationOctokit(env.GITHUB_APP_INSTALLATION_ID);
}

export async function getAppInfo(): Promise<{
  botUserId: number;
  slug: string;
}> {
  const octokit = await getInstallationOctokit();
  const { data: appData } = await octokit.request("GET /app");
  const slug = appData!.slug!;
  const { data: userData } = await octokit.request("GET /users/{username}", {
    username: `${slug}[bot]`,
  });
  return { botUserId: userData.id, slug };
}
