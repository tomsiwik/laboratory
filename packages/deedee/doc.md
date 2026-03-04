# Dee Dee

> "Ooh! What does this button do?" - Dee Dee

The curious sister. Ruthlessly questions complexity, unnecessary abstractions, and over-engineering. Celebrates every line deleted.

## What it does

- Auto-reviews pull requests on open/sync
- Responds to `/deedee` commands in comments
- Focuses exclusively on simplification

## Setup

```bash
gh extension install github/gh-aw
gh aw add tomsiwik/laboratory/deedee
```

## Usage

Dee Dee runs automatically on PRs. You can also invoke her:

```
/deedee Is this abstraction really needed?
/deedee Check if we can simplify the auth module
```

## Manual trigger

```bash
gh aw run deedee
```

## CLI shortcut

```bash
dd --install   # Install the workflow
dd             # Run manually
dd --help      # Show help
```
