# Dexter

> "Dee Dee! Get out of my laboratory!" - Dexter

The brilliant scientist. Reviews PRs for correctness, architecture, performance, naming, tests, and security. Can push fixes directly when asked.

## What it does

- Auto-reviews pull requests on open/sync
- Responds to `/dexter` commands in comments
- Pushes fixes when asked via `/dexter fix <description>`

## Setup

```bash
gh extension install github/gh-aw
gh aw add tomsiwik/laboratory/dexter
```

## Usage

Dexter runs automatically on PRs. You can also invoke him manually:

```
/dexter Review the error handling in this PR
/dexter fix Add missing null check in parseConfig
```

## Manual trigger

```bash
gh aw run dexter
```

## CLI shortcut

```bash
dex --install   # Install the workflow
dex              # Run manually
dex --help       # Show help
```
