# Dad

> "That's nice, honey." - Dad

The cheerful Dependency Analysis & Grounding agent. Audits outdated deps, CVEs, license compatibility, unused deps, and lock file health. Delivers findings with terrible puns.

## What it does

- Runs every Monday at 9am UTC
- Audits all dependency manifests (package.json, requirements.txt, Cargo.toml, etc.)
- Creates a structured issue report with findings
- Skips if an open `[dad]` issue already exists

## Setup

```bash
gh extension install github/gh-aw
gh aw add tomsiwik/laboratory/dad
```

## Usage

Dad runs automatically on a weekly schedule. You can also invoke him:

```
/dad Run a dependency audit now
/dad Check for CVEs in our Python dependencies
```

## Manual trigger

```bash
gh aw run dad
```

## CLI shortcut

```bash
dad --install   # Install the workflow
dad             # Run manually
dad --help      # Show help
```
