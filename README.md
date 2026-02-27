# Cursor Shared Skills

A curated collection of AI agent skills for Cursor, organized by category for easy discovery and project-curated installation.

## Quick Start

```bash
# Clone this repo
git clone git@github.com:YOUR-ORG/cursor-shared-skills.git ~/cursor-shared-skills

# Install skills to a project
cd ~/cursor-shared-skills
./install.sh --project ~/my-project --category workflows

# Or install specific skills
./install.sh --project ~/my-project --skills commit,create-pr,tdd
```

## Skill Categories

### Design (18 skills)

| Category | Skills | Description |
|----------|--------|-------------|
| `animation` | 1 | Motion design, performance-first animations |
| `tailwind` | 1 | Tailwind CSS patterns, UI baseline |
| `ux` | - | UX research and design exploration |
| `ui` | 1 | UI components, dashboards, interfaces |
| `accessibility` | 1 | WCAG audits, ARIA, keyboard navigation |
| `design-systems` | 3 | Tokens, component catalogs, design specs |
| `illustration` | - | Visual design, canvas artwork |
| `webdesign` | 1 | Web standards, SEO, metadata |
| `figma` | 1 | Figma MCP integration |

### Development (23 skills)

| Category | Skills | Description |
|----------|--------|-------------|
| `dev-process` | 21 | TDD, code review, architecture decisions, debugging |
| `workflows` | 9 | Git, PRs, Linear integration |

### Platform (14 skills)

| Category | Skills | Description |
|----------|--------|-------------|
| `wordpress` | 12 | WordPress plugin/theme/block development |
| `flutter` | 2 | Flutter testing and CI |
| `swiftui` | - | SwiftUI patterns |

## Installation

### Install by Category

```bash
# Install all design skills
./install.sh --project ~/my-project --group design

# Install specific categories
./install.sh --project ~/my-project --category animation,accessibility,workflows
```

### Install Specific Skills

```bash
./install.sh --project ~/my-project --skills tdd,code-review,commit
```

### List Available Skills

```bash
./install.sh --list
./install.sh --list --category dev-process
```

## How It Works

The install script creates **symlinks** from your project's `.cursor/skills/` directory to this shared repository. This means:

- Skills are always up-to-date (just `git pull` this repo)
- Changes propagate to all projects automatically
- Each project only has the skills it needs (project-curated)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding new skills.

## Sources & Attribution

This repository includes skills from multiple open-source projects. See [SOURCES.md](SOURCES.md) for full attribution.

## License

Skills in this repository come from various sources with different licenses:
- MIT License (ui-skills)
- CC0-1.0 (jwilger/agent-skills)
- Original skills by contributors

See individual skill directories and SOURCES.md for specific license information.
