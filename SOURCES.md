# Skill Sources & Attribution

This repository consolidates skills from multiple open-source projects. Below is the full attribution for each source.

## External Sources

### ibelick/ui-skills & ui-skills.com

- **Repository**: https://github.com/ibelick/ui-skills
- **Website**: https://ui-skills.com
- **License**: MIT (and various from contributing authors)
- **Last synced**: 2026-02-27

**Skills included (from GitHub repo):**
- `baseline-ui` → `skills/tailwind/`
- `fixing-accessibility` → `skills/accessibility/`
- `fixing-metadata` → `skills/webdesign/`
- `fixing-motion-performance` → `skills/animation/`

**Skills included (from ui-skills.com aggregator):**
- `12-principles-of-animation` → `skills/animation/` (source: raphaelsalaja/userinterface-wiki)
- `canvas-design` → `skills/illustration/` (source: anthropics/skills)
- `design-lab` → `skills/ux/` (source: 0xdesign/design-plugin)
- `interaction-design` → `skills/ux/` (source: wshobson/agents)
- `interface-design` → `skills/ui/` (source: Dammyjay93/interface-design)
- `swiftui-ui-patterns` → `skills/swiftui/` (source: dimillian/skills)
- `tailwind-css-patterns` → `skills/tailwind/` (source: giuseppe-trisciuoglio/developer-kit)
- `ui-ux-pro-max` → `skills/ui/` (source: nextlevelbuilder/ui-ux-pro-max-skill)
- `wcag-audit-patterns` → `skills/accessibility/` (source: wshobson/agents)
- `web-design-guidelines` → `skills/webdesign/` (source: vercel-labs/agent-skills)
- `threejs-fundamentals` → `skills/animation/` (source: cloudai-x/threejs-skills via antigravity.codes)

### jwilger/agent-skills

- **Repository**: https://github.com/jwilger/agent-skills
- **License**: CC0-1.0 (Public Domain)
- **Last synced**: 2026-02-27

**Skills included:**
- `tdd`, `domain-modeling`, `code-review`, `architecture-decisions`, `event-modeling`, `ticket-triage`, `refactoring`, `debugging-protocol`, `ensemble-team`, `task-management`, `bootstrap`, `user-input-protocol`, `memory-protocol`, `error-recovery`, `mutation-testing`, `session-reflection`, `ci-integration`, `pipeline`, `factory-review`, `agent-coordination`, `atomic-design` → `skills/dev-process/`
- `design-system` → `skills/design-systems/`
- `pr-ship` → `skills/workflows/`

## Internal Sources

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
