---
name: create-issue
description: Create a new Linear issue (also called ticket) with structured context. Gathers team, description (What/Why/How to verify), priority, labels, assignee, and project. Use when the user asks to create a Linear issue, ticket, or task.
---

# Create Linear Issue

Create a well-structured Linear issue by gathering context and using the Linear MCP tools.

## Prerequisite: Linear MCP

This skill requires the **Linear MCP server** to be enabled. If the Linear tools (e.g. `create_issue`, `get_user`, `list_teams`) are not available, stop immediately and tell the user:

> The Linear MCP server is not enabled. Please enable it in your Cursor MCP settings (`.cursor/mcp.json`) before using this skill.

Do NOT proceed without the Linear MCP tools.

## Step 1: Determine the Team

Get the current user via `get_user` with query `"me"`.

If the user explicitly mentioned a team, use that. Otherwise, determine the team from context (e.g. current project, recent conversation). If ambiguous or the user belongs to multiple teams, ask them to pick one using `AskQuestion`.

**Important -- Project/Team alignment:** If a project is specified (Step 6), the issue's team MUST match the project's team. To find the correct team, call `list_issues` with the project and `limit: 1` to inspect an existing issue's `teamId`. Use that team ID when creating the issue. This avoids "Project not in same team" errors.

## Step 2: Gather Issue Context

You need three pieces of information. Extract them from the conversation if already provided, otherwise ask the user:

1. **What?** -- A clear description of what the issue is about
2. **Why?** -- Why this issue is needed (business value, user impact, technical reason)
3. **How to verify?** -- Acceptance criteria; how to know the issue is done

Use these to compose the issue **title** (concise summary of the "What") and **description** using this template:

```markdown
## What

[What the issue is about]

## Why

[Why this issue is needed]

## How to verify

- [ ] [Verification criterion 1]
- [ ] [Verification criterion 2]
```

## Step 3: Determine Priority

Linear priorities: `1` = Urgent, `2` = High, `3` = Normal, `4` = Low.

If the user indicated urgency or priority, map it. If unclear, ask:

```
AskQuestion: "What priority should this issue have?"
Options: Urgent, High, Normal, Low
```

Default to `3` (Normal) if the user says "not sure" or "default".

## Step 4: Determine Labels

### issue-type

Available values (label group `issue-type`):
- `bug` -- Something is broken
- `feature` -- New functionality
- `tech-debt` -- Technical improvement, refactoring
- `request` -- Request from another team or stakeholder
- `toil_` -- Repetitive manual work

Infer from context. If ambiguous, ask the user to pick one.

### issue-source

Available values (label group `issue-source`):
- `own-team` -- Created by our own team
- `internal-team` -- From another internal team
- `customer` -- From a customer report
- `partner` -- From an external partner

Infer from context. If ambiguous, ask the user to pick one.

### Resolve label IDs

The `create_issue` tool does NOT reliably match labels by display name. You MUST look up the label IDs before creating the issue:

1. Call `list_issue_labels` with `name` set to the short value (e.g. `"tech-debt"`, `"own-team"`) to find each label.
2. Collect the `id` field from each result.
3. Pass the array of IDs to the `labels` field in `create_issue`.

Do this for both labels in parallel to avoid extra roundtrips.

## Step 5: Determine Assignee (Optional)

If the user mentioned who should work on the issue, set the `assignee` field (name, email, or `"me"`).

If not mentioned, leave it unset -- do NOT ask unless the user brought it up.

## Step 6: Determine Project and Milestone (Optional)

### Project

If the user mentioned a project, use `list_projects` to find it and set the `project` field.

If not mentioned, skip it -- do NOT ask. Adding a project can always be done later in Linear.

### Milestone

If the user mentioned a milestone, use `list_milestones` (with the project) to find the matching milestone and note its name for Step 8.

**Important:** The `create_issue` tool does NOT support setting a milestone. Milestones can only be set via `update_issue` after the issue is created (see Step 8).

## Step 7: Create the Issue

Use the Linear MCP `create_issue` tool with:

| Field         | Value                                           |
|---------------|------------------------------------------------|
| `title`       | Concise summary from the "What"                |
| `description` | Formatted markdown from Step 2                 |
| `team`        | Team ID from Step 1 (use ID, not name, to avoid matching issues) |
| `state`       | `"Triage"` (default unless user specified otherwise) |
| `priority`    | Numeric value from Step 3                      |
| `labels`      | Array of label **IDs** resolved in Step 4      |
| `assignee`    | From Step 5, if provided                       |
| `project`     | From Step 6, if provided                       |

## Step 8: Set Milestone (if applicable)

If a milestone was determined in Step 6, immediately call `update_issue` with the newly created issue's `id` and the `milestone` name to assign it. This is required because `create_issue` does not support the `milestone` field.

## Step 9: Confirm

After creation (and milestone assignment), show the user:
- Issue identifier and title
- Link to the issue
- Summary of labels, priority, milestone, and status set

## Error Handling

- **Linear MCP not available**: Tell the user to enable the Linear MCP server in Cursor settings.
- **Team not found**: List available teams with `list_teams` and ask the user to pick.
- **Label not found**: Fall back to listing labels with `list_issue_labels` for the team and let the user pick.
- **Project not found**: List available projects with `list_projects` and let the user pick.
