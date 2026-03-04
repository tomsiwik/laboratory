<p align="center">
  <img src="assets/logo_placeholder.svg?sanitize=1" alt="Laboratory" width="100" height="100" />
</p>

<h2 align="center">Laboratory</h2>

<p align="center">
  <em>/l&#601;&#712;b&#594;r&#601;tri/</em> — Welcome to Dexter's Laboratory!
</p>

---

## Introduction

Laboratory is a collection of shareable [GitHub Agentic Workflows](https://github.github.com/gh-aw/) themed around Dexter's Laboratory. Each character brings a unique perspective to your development workflow.

- **Shareable Templates.** Install workflows with a single `gh aw add` command.
- **CLI Tools.** Quick shell wrappers for every workflow.

## Table of Contents

- [Workflows](#workflows)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [CLI Tools](#cli-tools)
- [Development](#development)
- [Community](#community)
- [Contributing](#contributing)
- [License](#license)

## Workflows

| Workflow | Trigger | CLI | Description |
|----------|---------|-----|-------------|
| [Dexter](packages/dexter/doc.md) | PRs, `/dexter` | `dex` | Code review & implementation |
| [Dee Dee](packages/deedee/doc.md) | PRs, `/deedee` | `dd` | Simplification & complexity challenge |
| [Mandark](packages/mandark/doc.md) | `/mandark` | `mand` | Adversarial & security review |
| [Dad](packages/dad/doc.md) | Weekly Mon, `/dad` | `dad` | Dependency Analysis & Grounding |
| [Mom](packages/mom/doc.md) | Weekly Wed, `/mom` | `mom` | Maintain, Organize, Minimize |
| [Computress](packages/computress/doc.md) | Issues, `/computress` | `computer` | Triage & orchestration |

## Getting Started

### Prerequisites

- [GitHub CLI](https://cli.github.com) (v2.0+)
- [gh-aw extension](https://github.com/github/gh-aw)

### Installation

Install the gh-aw extension and add any workflow:

```sh
gh extension install github/gh-aw
```

Then pick the workflows you want:

```sh
gh aw add tomsiwik/laboratory/dexter
gh aw add tomsiwik/laboratory/deedee
gh aw add tomsiwik/laboratory/mandark
gh aw add tomsiwik/laboratory/dad
gh aw add tomsiwik/laboratory/mom
gh aw add tomsiwik/laboratory/computress
```

## CLI Tools

Each character is an installable bun package with a CLI:

```sh
bunx @dexters-lab/dexter --help
bunx @dexters-lab/deedee --help
bunx @dexters-lab/mandark --help
bunx @dexters-lab/dad --help
bunx @dexters-lab/mom --help
bunx @dexters-lab/computress --help
```

Or use the short bin names after `bun install`:

```sh
dex              # Run Dexter
dd               # Run Dee Dee
mand             # Run Mandark
dad              # Run Dad
mom              # Run Mom
computer         # Run Computress ("Computer!" - Dexter)
```

Each CLI supports `--install`, `--run` (default), and `--help`.

## Development

```sh
bun install      # Install dependencies & link workspace bins
bun run compile  # Compile all workflows (gh aw compile)
```

## Community

- [GitHub Issues](https://github.com/tomsiwik/laboratory/issues) — Bug reports and feature requests

## Contributing

Contributions of all sizes are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a pull request.

<a href="https://github.com/tomsiwik/laboratory/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=tomsiwik/laboratory" />
</a>

## License

[MIT](./LICENSE)

<br />

<p align="center">Made with &#10084;&#65039; by <a href="https://github.com/tomsiwik">tomsiwik</a></p>
