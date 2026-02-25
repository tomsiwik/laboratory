<p align="center">
  <img src="assets/logo_placeholder.svg?sanitize=1" alt="Laboratory" />
</p>

<h2 align="center">Laboratory</h2>

<p align="center">
  <em>/ləˈbɒrətri/</em> — Welcome to Dexter's Laboratory!
</p>

<p align="center">
  <a href="https://github.com/tomsiwik/laboratory/issues">Issues</a>
</p>

---

## Introduction

Laboratory is a collection of shareable [GitHub Agentic Workflows](https://github.github.com/gh-aw/).

- **Shareable Templates.** Install workflows with a single `gh aw add` command.
- **Self-Maintaining.** This repo dogfoods its own workflows.

## Table of Contents

- [Workflows](#workflows)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development](#development)
- [Community](#community)
- [Contributing](#contributing)
- [License](#license)

## Workflows

| Workflow | Trigger | Description |
|----------|---------|-------------|
| [Computer!](docs/computer.md) | `/computer` in issue comments | Intelligent repo assistant that answers questions about your codebase |

## Getting Started

### Prerequisites

- [GitHub CLI](https://cli.github.com) (v2.0+)
- [gh-aw extension](https://github.com/github/gh-aw)

### Installation

```sh
gh extension install github/gh-aw
gh aw add tomsiwik/laboratory/computer
```

## Development

```sh
make setup
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

<p align="center">Made with ❤️ by <a href="https://github.com/tomsiwik">tomsiwik</a></p>
