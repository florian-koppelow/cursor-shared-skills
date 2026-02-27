---
name: summarize-issue
description: Summarize a Linear issue (also called ticket) for the current branch. Use when the user asks about a ticket, wants to see the current issue, or needs context for implementing features or reviewing code.
---

# Summarize Issue

Pull issue details from Linear based on the current git branch.

## When to Use

- Starting work on a new feature branch
- Understanding acceptance criteria before implementation
- Reviewing code to validate it meets requirements
- Onboarding to existing work in progress

## Step 1: Get Issue ID

If the issue ID is already known (provided by the user or available from prior context), use it directly. Otherwise, extract it from the current branch:

```bash
git rev-parse --abbrev-ref HEAD
```

Parse the issue ID using this pattern:
- Branch format: `<type>/<issue-id>-<description>`
- Example: `feature/enda-1702-ssq-system-info-make-off-peak-hours-editable`
- Issue ID: `ENDA-1702` (uppercase)

The issue ID follows the pattern: letters followed by a hyphen and numbers (e.g., `ENDA-1702`, `DX-523`).

**Important**: Convert the issue ID to uppercase before querying Linear.

### Edge Cases

1. **On `main` branch**: Inform the user there's no issue context for the main branch
2. **No issue ID found**: Ask the user to provide the issue ID manually
3. **Branch doesn't match pattern**: Ask for manual issue ID input

## Step 2: Fetch from Linear

**Prerequisite**: The Linear MCP server must be enabled. If Linear tools are not available, inform the user that they need to enable the Linear MCP server in their Cursor settings before proceeding.

1. Call `list_issues` with `query` set to the issue ID (e.g., `"ENDA-1702"`)
2. Call `get_issue` with the returned issue's ID and `includeRelations: true` to retrieve full details: title, description, state, priority, labels, assignee, parent issue, attachments, and relations
3. Call `list_issues` with `parentId` set to the issue ID to fetch sub-issues
4. Call `list_comments` with the issue ID to fetch comments for additional context

## Step 3: Output Summary

Present the issue summary in this format:

```markdown
## Issue: [ISSUE-ID] - [Title]

**Status:** [state]
**Priority:** [priority]
**Assignee:** [assignee or "Unassigned"]
**Labels:** [labels, comma-separated]

### Description
[Full description from Linear]

### Acceptance Criteria
- [ ] [criterion 1]
- [ ] [criterion 2]
(Extract from description or list "Not specified" if absent)

### Sub-issues
- [sub-issue ID] - [title] ([state])
(List sub-issues or "None" if absent)

### Related
- **Parent:** [parent issue if any]
- **Blocking:** [blocking issues if any]

### Comments
[Summarize relevant comments — be exact on implementation details, or "None"]
```

## Error Handling

- **Issue not found**: Suggest checking the issue ID format or Linear workspace. The user may need to verify they have access to the issue.
- **Auth not configured**: Guide the user to complete the OAuth flow when prompted by Linear MCP.
- **Fetch failed (network error, timeout, empty response)**: Do NOT proceed with assumptions. Inform the user that you were unable to retrieve the issue context and ask them to either provide the relevant details manually or resolve the access issue. Never guess at requirements based on code alone — missing context leads to incorrect implementations.
