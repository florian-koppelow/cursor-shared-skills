# Skill Sources & Attribution

This repository consolidates skills from multiple open-source projects. Below is the full attribution for each source.

## External Sources

### ibelick/ui-skills

- **Repository**: https://github.com/ibelick/ui-skills
- **Website**: https://ui-skills.com
- **License**: MIT
- **Last synced**: 2026-02-27

**Skills included:**
- `baseline-ui` → `skills/tailwind/`
- `fixing-accessibility` → `skills/accessibility/`
- `fixing-metadata` → `skills/webdesign/`
- `fixing-motion-performance` → `skills/animation/`

### jwilger/agent-skills

- **Repository**: https://github.com/jwilger/agent-skills
- **License**: CC0-1.0 (Public Domain)
- **Last synced**: 2026-02-27

**Skills included:**
- `tdd`, `domain-modeling`, `code-review`, `architecture-decisions`, `event-modeling`, `ticket-triage`, `refactoring`, `debugging-protocol`, `ensemble-team`, `task-management`, `bootstrap`, `user-input-protocol`, `memory-protocol`, `error-recovery`, `mutation-testing`, `session-reflection`, `ci-integration`, `pipeline`, `factory-review`, `agent-coordination`, `atomic-design` → `skills/dev-process/`
- `design-system` → `skills/design-systems/`
- `pr-ship` → `skills/workflows/`

## Internal Sources

### mobile-apps

- **Repository**: Internal 1K5 mobile-apps monorepo
- **License**: Proprietary

**Skills included:**
- `commit`, `create-pr`, `review-pr`, `wip-commit`, `create-issue`, `implement-issue`, `summarize-issue`, `deterministic-evaluation` → `skills/workflows/`
- `figma-mcp-tools` → `skills/figma/`
- `explain-for-designers` → `skills/design-systems/`
- `write-tests`, `diagnose-ci-failures` → `skills/flutter/`

### wordpress-dev

- **Repository**: Internal wordpress-dev repository
- **License**: Proprietary

**Skills included:**
- `wp-block-development`, `wp-block-themes`, `wp-interactivity-api`, `wp-plugin-development`, `wp-rest-api`, `wp-phpstan`, `wp-performance`, `wp-wpcli-and-ops`, `wp-playground`, `wp-project-triage`, `wordpress-router`, `wp-abilities-api` → `skills/wordpress/`
- `frontend-design` → `skills/ui/`
- `wpds` → `skills/design-systems/`

## Updating External Skills

To sync with upstream changes:

```bash
# ui-skills
git clone https://github.com/ibelick/ui-skills.git /tmp/ui-skills
cp -r /tmp/ui-skills/skills/* skills/  # (map to appropriate categories)

# jwilger/agent-skills
git clone https://github.com/jwilger/agent-skills.git /tmp/agent-skills
cp -r /tmp/agent-skills/skills/* skills/  # (map to appropriate categories)
```

After syncing, update the "Last synced" dates above.
