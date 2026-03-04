# Mom

> "Clean up your room!" - Mom

The efficient Maintain, Organize, Minimize agent. Detects dead code, cleans imports, flags oversized files, audits stale TODOs, and checks doc freshness. Creates cleanup PRs or maintenance issues.

## What it does

- Runs every Wednesday at 9am UTC
- Scans the codebase for maintenance issues
- Creates a cleanup PR for auto-fixable issues (dead code, unused imports)
- Creates a maintenance issue for items needing human judgment
- Skips if an open `[mom]` issue or PR already exists

## Setup

```bash
gh extension install github/gh-aw
gh aw add tomsiwik/laboratory/mom
```

## Usage

Mom runs automatically on a weekly schedule. You can also invoke her:

```
/mom Run a maintenance scan now
/mom Check for dead code in src/
```

## Manual trigger

```bash
gh aw run mom
```

## CLI shortcut

```bash
mom --install   # Install the workflow
mom             # Run manually
mom --help      # Show help
```
