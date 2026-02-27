# Contributing Skills

Welcome! This guide explains how to contribute new skills to this repository.

## Who Can Contribute?

Anyone on the team can contribute skills - designers, developers, and anyone who has discovered effective ways to work with AI agents.

## Quick Start: Creating a Skill

### 1. Choose a Category

Pick the most appropriate category for your skill:

**Design Categories:**
- `animation/` - Motion, transitions, microinteractions
- `tailwind/` - Tailwind CSS patterns
- `ux/` - UX research, exploration
- `ui/` - UI components, interfaces
- `accessibility/` - WCAG, ARIA, a11y
- `design-systems/` - Tokens, component catalogs
- `illustration/` - Visual design
- `webdesign/` - Web standards, SEO
- `figma/` - Figma integration

**Development Categories:**
- `dev-process/` - TDD, code review, architecture
- `workflows/` - Git, PRs, issue tracking

**Platform Categories:**
- `wordpress/` - WordPress development
- `flutter/` - Flutter development
- `swiftui/` - SwiftUI development

### 2. Create the Skill Directory

```bash
mkdir skills/CATEGORY/your-skill-name
```

### 3. Create SKILL.md

Every skill needs a `SKILL.md` file with YAML frontmatter:

```markdown
---
name: your-skill-name
description: Brief description of what this skill does and when to use it. Include trigger phrases like "Use when..." or "Applies to..."
---

# Your Skill Name

## When to Use

Describe scenarios when this skill should be applied.

## Instructions

Step-by-step guidance for the agent.

## Examples

Concrete examples of using this skill.
```

### 4. Submit a Pull Request

```bash
git checkout -b add-skill/your-skill-name
git add skills/CATEGORY/your-skill-name/
git commit -m "Add your-skill-name skill"
git push origin add-skill/your-skill-name
```

Then create a PR on GitHub.

## Writing Effective Descriptions

The `description` field is **critical** - it determines when the agent will use your skill.

### Good Descriptions

```yaml
# Includes WHAT and WHEN
description: Review code for accessibility issues including ARIA labels, keyboard navigation, and color contrast. Use when reviewing UI code, fixing a11y bugs, or auditing WCAG compliance.

# Specific trigger phrases
description: Create Linear issues with structured context. Use when the user asks to create an issue, ticket, or task.
```

### Bad Descriptions

```yaml
# Too vague
description: Helps with code

# Missing trigger phrases
description: Processes files
```

## Skill Structure

### Basic Skill

```
your-skill/
└── SKILL.md
```

### Skill with References

For complex skills with additional documentation:

```
your-skill/
├── SKILL.md           # Main instructions (keep under 500 lines)
├── references/        # Detailed documentation
│   ├── api-guide.md
│   └── examples.md
└── scripts/           # Helper scripts (optional)
    └── validate.py
```

## Best Practices

1. **Keep SKILL.md concise** - Under 500 lines. Use `references/` for detailed docs.

2. **Write in third person** - The description appears in system prompts:
   - ✅ "Processes Excel files and generates reports"
   - ❌ "I can help you process Excel files"

3. **Include specific trigger terms** - Words that should activate the skill:
   - ✅ "Use when working with PDF files, forms, or document extraction"

4. **Provide concrete examples** - Show input/output pairs when helpful.

5. **Test locally first** - Copy your skill to a project's `.cursor/skills/` and verify it works.

## Questions?

If you're unsure about anything, open a PR as a draft and ask for feedback!
