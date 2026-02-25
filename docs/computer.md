# Computer!

> "Dee Dee! Don't touch that!" - Dexter

An intelligent repository assistant that responds to `/computer` commands in issue comments. Like Dexter's trusty computer, it knows everything about your laboratory (repository).

## What it does

When someone writes `/computer <question>` in an issue comment, the workflow:

1. Analyzes the question
2. Searches your repository for relevant code, issues, and PRs
3. Replies with a detailed, actionable answer as a comment

## Setup

```bash
gh extension install github/gh-aw
gh aw add-wizard tomsiwik/laboratory/computer
```

The wizard will prompt you to:
- Choose an AI engine (Copilot, Claude, Codex, or Gemini)
- Configure the required API secret
- Add the workflow to your repository

## Usage

In any issue comment, write:

```
/computer Why is the login endpoint returning 500 errors?
```

```
/computer What's the architecture of the authentication system?
```

```
/computer How do I add a new API endpoint?
```

## Manual trigger

```bash
gh aw run computer
```

## Customization

Edit `.github/workflows/computer.md` in your repo to change the behavior, then:

```bash
gh aw compile
```
