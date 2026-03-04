# Computress

> "Yes, Dexter?" - Computress

The calm, precise supercomputer of the Laboratory. Triages new issues automatically and answers questions about the repository when invoked with `/computress`.

## What it does

- **Auto-triage**: Classifies new issues by type, applies labels, and suggests which agent to consult
- **Q&A mode**: Answers questions about the repository when invoked with `/computress <question>`
- Suggests delegating to the right Laboratory agent for follow-up work

## Setup

```bash
gh extension install github/gh-aw
gh aw add tomsiwik/laboratory/computress
```

## Usage

Computress runs automatically on new issues. You can also invoke her:

```
/computress What's the architecture of the auth system?
/computress Why is the login endpoint returning 500 errors?
/computress How do I add a new API endpoint?
```

## Manual trigger

```bash
gh aw run computress
```

## CLI shortcut

```bash
computer --install   # Install the workflow
computer             # Run manually
computer --help      # Show help
```

## Migration from Computer

This workflow replaces the original `computer` workflow. If you previously installed
`computer`, uninstall it and install `computress`:

```bash
gh aw remove computer
gh aw add tomsiwik/laboratory/computress
```
