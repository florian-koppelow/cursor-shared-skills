---
name: review-pr
description: Gather PR context and review it against Linear issue (also called ticket) requirements. Use when the user asks to review a PR, validate an implementation against a ticket, or prepare for code review.
---

# PR Review Context

Gather complete context for reviewing or validating the current branch implementation against ticket requirements.

## When to Use

- Before requesting code review
- When reviewing someone else's implementation
- Validating implementation matches ticket requirements
- Preparing to address review comments

## Step 1: Get Issue Context

Read and follow the `summarize-issue` skill to fetch the issue summary.

If on `main` branch or no issue ID can be determined, skip this step and proceed with code changes only.

## Step 2: Get Code Changes

### 2.1 Changes Summary
```bash
git diff main...HEAD --stat
```

### 2.2 Commit History
```bash
git log main..HEAD --oneline
```

### 2.3 Full Diff (for detailed review)
```bash
git diff main...HEAD
```

## Step 3: Categorize Changes

Group modified files by type:
- **Features:** `lib/features/**`
- **Tests:** `test/**`
- **UI Components:** `lib/**/ui/**`, `packages/common_ui/**`
- **State/Logic:** `lib/**/state/**`, `lib/**/repository/**`
- **Configuration:** `pubspec.yaml`, `*.arb`, `*.json`

## Step 4: Cross-Reference Implementation vs Requirements

Compare what was implemented against the ticket's acceptance criteria:

| Requirement | Status | Evidence |
|-------------|--------|----------|
| [From ticket] | ✅/❌/⚠️ | [File or commit reference] |

Status legend:
- ✅ Implemented and verified
- ⚠️ Partially implemented or unclear
- ❌ Not implemented

## Step 5: Output Complete Context

```markdown
# PR Review Context

## Ticket: [ID] - [Title]
**Status:** [state] | **Assignee:** [assignee]

### Description
[From Linear]

### Acceptance Criteria
- [ ] [criterion 1]
- [ ] [criterion 2]

---

## Implementation Summary

**Branch:** `[branch-name]`
**Commits:** [count] commits
**Files changed:** [count] files (+[insertions], -[deletions])

### Changes by Category
- **Features:** [list]
- **Tests:** [list]
- **UI:** [list]
- **Config:** [list]

### Key Commits
1. `[hash]` - [message]
2. `[hash]` - [message]

---

## Requirements Coverage

| Requirement | Status | Notes |
|-------------|--------|-------|
| [AC 1] | ✅ | Implemented in `path/to/file.dart` |
| [AC 2] | ⚠️ | Partially done, missing X |
| [AC 3] | ❌ | Not found in changes |

### Gaps / Concerns
- [Any missing requirements]
- [Any scope creep - work done but not in ticket]

### Test Coverage
- [New test files added]
- [Test cases covering requirements]
```

## Error Handling

- **Issue context unavailable** (no ID, not found, auth failure): Proceed with code changes only, note that issue context is unavailable
- **On main branch**: Show only git status, no diff or issue context

## Shell Permission Notes

Git commands require read access to the repository. No special permissions needed for basic diff and log operations.
