# Mandark

> "Ha ha ha ha!" - Mandark

The adversarial nemesis. Hunts for security holes, edge cases, race conditions, injection vectors, and resource leaks. Invoked on-demand to avoid triple-review noise on every PR.

## What it does

- Responds to `/mandark` commands in comments
- Performs adversarial security review of PR diffs
- Rates findings by severity: Critical / High / Medium / Low

## Setup

```bash
gh extension install github/gh-aw
gh aw add tomsiwik/laboratory/mandark
```

## Usage

Mandark does **not** auto-run on PRs (to avoid triple-review with Dexter and Dee Dee). Invoke him when you want a security review:

```
/mandark Review this PR for security issues
/mandark Check the API endpoints for injection vectors
```

## Manual trigger

```bash
gh aw run mandark
```

## CLI shortcut

```bash
mand --install   # Install the workflow
mand             # Run manually
mand --help      # Show help
```
