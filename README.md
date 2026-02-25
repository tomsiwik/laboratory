# Laboratory

> "Welcome to Dexter's Laboratory!"

A collection of shareable [GitHub Agentic Workflows](https://github.github.com/gh-aw/).

## Workflows

| Workflow | Trigger | Description |
|----------|---------|-------------|
| [Computer!](docs/computer.md) | `/computer` in issue comments | Intelligent repo assistant that answers questions about your codebase |

## Quick Start

```bash
# Install the gh-aw extension
gh extension install github/gh-aw

# Add a workflow to your repo
gh aw add-wizard tomsiwik/laboratory/computer
```

## Creating Your Own

See the [gh-aw documentation](https://github.github.com/gh-aw/setup/creating-workflows/) for how to author workflows.

Each workflow in this repo follows the structure:

```
workflows/<name>.md   # The workflow definition (frontmatter + instructions)
docs/<name>.md        # Human-readable documentation
```

## License

MIT
