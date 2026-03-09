import "server-only";
import { Chat, emoji } from "chat";
import type { Thread } from "chat";
import { createGitHubAdapter } from "@chat-adapter/github";
import { createMemoryState } from "@chat-adapter/state-memory";
import { createRedisState } from "@chat-adapter/state-redis";
import { start } from "workflow/api";
import { env } from "@/lib/env";
import { getAppInfo } from "@/lib/github";
import { routeMessage } from "@/lib/router";
import { laboratoryWorkflow } from "@/workflow";

export interface ThreadMessage {
  content: string;
  role: "assistant" | "user";
}

export interface ThreadState {
  baseBranch: string;
  prBranch: string;
  prNumber: number;
  repoFullName: string;
}

async function collectMessages(thread: Thread<unknown>): Promise<ThreadMessage[]> {
  const messages: ThreadMessage[] = [];
  for await (const m of thread.allMessages) {
    messages.push({
      content: m.text,
      role: m.author.isMe ? "assistant" : "user",
    });
  }
  return messages;
}

let botInstance: Chat | null = null;

export async function getBot(): Promise<Chat> {
  if (botInstance) return botInstance;

  const appInfo = await getAppInfo();

  const state = env.REDIS_URL
    ? createRedisState({ url: env.REDIS_URL })
    : createMemoryState();

  const bot = new Chat({
    adapters: {
      github: createGitHubAdapter({
        appId: env.GITHUB_APP_ID,
        botUserId: appInfo.botUserId,
        installationId: env.GITHUB_APP_INSTALLATION_ID,
        privateKey: env.GITHUB_APP_PRIVATE_KEY.replaceAll("\\n", "\n"),
        userName: appInfo.slug,
        webhookSecret: env.GITHUB_APP_WEBHOOK_SECRET,
      }),
    },
    logger: "debug",
    state,
    userName: appInfo.slug,
  });

  bot.onNewMention(async (thread, message) => {
    const { character, instruction } = routeMessage(message.text);
    const messages = await collectMessages(thread);
    const threadState = (await thread.state) as ThreadState | null;

    await thread.subscribe();

    await start(laboratoryWorkflow, [
      {
        baseBranch: threadState?.baseBranch ?? "main",
        prBranch: threadState?.prBranch ?? "main",
        prNumber: threadState?.prNumber ?? 0,
        repoFullName: threadState?.repoFullName ?? "",
        messages,
        threadId: thread.channelId,
        characterName: character.name,
        instruction,
      },
    ]);
  });

  bot.onSubscribedMessage(async (thread, message) => {
    const { character, instruction } = routeMessage(message.text);
    const messages = await collectMessages(thread);
    const threadState = (await thread.state) as ThreadState | null;

    await start(laboratoryWorkflow, [
      {
        baseBranch: threadState?.baseBranch ?? "main",
        prBranch: threadState?.prBranch ?? "main",
        prNumber: threadState?.prNumber ?? 0,
        repoFullName: threadState?.repoFullName ?? "",
        messages,
        threadId: thread.channelId,
        characterName: character.name,
        instruction,
      },
    ]);
  });

  bot.onReaction([emoji.thumbs_up, emoji.heart], async (event) => {
    const messages = await collectMessages(event.thread);
    const threadState = (await event.thread.state) as ThreadState | null;
    const lastUserMsg = messages.findLast((m) => m.role === "user");
    if (!lastUserMsg) return;

    const { character, instruction } = routeMessage(lastUserMsg.content);

    await start(laboratoryWorkflow, [
      {
        baseBranch: threadState?.baseBranch ?? "main",
        prBranch: threadState?.prBranch ?? "main",
        prNumber: threadState?.prNumber ?? 0,
        repoFullName: threadState?.repoFullName ?? "",
        messages,
        threadId: event.thread.channelId,
        characterName: character.name,
        instruction,
      },
    ]);
  });

  bot.onReaction([emoji.thumbs_down, emoji.confused], async (event) => {
    await event.thread.post("Understood — skipping this one.");
  });

  botInstance = bot;
  return bot;
}
