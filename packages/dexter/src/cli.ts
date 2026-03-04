#!/usr/bin/env bun

const WORKFLOW = "dexter";
const REPO = "tomsiwik/laboratory";
const CHARACTER = "Dexter";
const ROLE = "Code review & implementation";
const QUOTE = "Dee Dee! Get out of my laboratory!";
const BIN = "dex";

const args = process.argv.slice(2);
const command = args[0];

if (command === "--help" || command === "-h") {
  console.log(`${CHARACTER} - ${ROLE}`);
  console.log(`"${QUOTE}"\n`);
  console.log(`Usage: ${BIN} [--install|--run|--help] [instructions...]\n`);
  console.log("  --install   Install the workflow via gh aw add");
  console.log("  --run       Run the workflow (default)");
  console.log("  --help      Show this help");
  console.log("  <text>      Pass instructions to the workflow");
  process.exit(0);
}

if (command === "--install") {
  console.log(`Installing ${CHARACTER} workflow...`);
  const proc = Bun.spawn(["gh", "aw", "add", `${REPO}/${WORKFLOW}`, ...args.slice(1)], {
    stdout: "inherit",
    stderr: "inherit",
  });
  process.exit(await proc.exited);
}

const runArgs = command === "--run" ? args.slice(1) : args;
const proc = Bun.spawn(["gh", "aw", "run", WORKFLOW, ...runArgs], {
  stdout: "inherit",
  stderr: "inherit",
});
process.exit(await proc.exited);
