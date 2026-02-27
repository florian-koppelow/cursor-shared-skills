---
name: implement-issue
description: Implement a Linear issue (also called ticket) end-to-end. Fetches issue details, plans or implements changes, updates task progress in Linear, and creates a PR. Use when the user provides a Linear issue ID or asks to implement/work on a ticket.
---

# Implement Issue

Take a Linear issue from ticket to Pull Request. Fetch requirements, plan or implement changes, track progress in Linear, and commit.

## Step 1: Fetch Issue

Read and follow the `summarize-issue` skill to get the issue ID and fetch all details from Linear.

## Step 2: Claim the Issue in Linear

Before planning or implementation, claim the fetched issue in Linear:

1. Call `get_user` with query `"me"` to identify the current user.
2. Call `update_issue` on the fetched issue ID with:
   - `state` set to `"In Progress"`
   - `assignee` set to the current user from step 1
3. If the issue is already assigned to the current user and already in `"In Progress"`, do not update it.

## Step 3: Extract Tasks

Build a task list from the issue. Tasks can come from multiple sources:

1. **Markdown checklists** in the description (`- [ ] task`)
2. **Sub-issues** (each sub-issue is a task)
3. **Acceptance criteria** sections in the description
4. **Numbered lists** or bullet points describing requirements

Create a TodoWrite checklist mapping each task to its Linear source (description checkbox index or sub-issue ID) so progress can be tracked back.

## Step 4: Plan

Switch to Plan mode. Present a plan covering the extracted tasks and wait for user approval before implementing.

## Step 5: Agree on Completion Workflow

Before starting implementation, **ask the user** how they want to handle completion:

> Before I start, how should I handle things once implementation is done?
> 1. **Commit, push, and create a PR** (follows the `commit` and `create-pr` skills)
> 2. **Commit only** (no push, no PR)
> 3. **Do nothing** (leave changes uncommitted for me to review)

Remember the user's choice and apply it in Step 9.

## Step 6: Create Branch

If on `main`, create a branch (requires: `git_write`):

```bash
git checkout -b <type>/<issue-id-lowercase>-<short-kebab-description>
```

Use the appropriate type (`feat`, `fix`, `refactor`, etc.), the issue ID, and a short kebab-case summary of the title.

## Step 7: Implement

Work through the task list sequentially. For each task:

1. Mark the todo as `in_progress`
2. Implement the change
3. Run quality gates relevant to the change (analyze, format, test)
4. Mark the todo as `completed`
5. **Update Linear progress** (see "Tracking Progress in Linear" below)

### Tests Are Always Required

Even if the ticket does not explicitly mention tests, you MUST consider and write tests for the changes you make. Follow the **write-tests** skill for conventions and the testing philosophy:
→ Read and follow the `write-tests` skill

Only skip tests if the change is purely cosmetic (e.g., copy changes, spacing tweaks) or infrastructure-only (e.g., dependency version bumps) with no behavioral impact.

### Bug Fixes: Test-Driven Approach

When the issue is a bug fix — especially when a stacktrace, error message, or reproduction steps are provided — use a test-driven approach:

1. **Write a failing test first** that reproduces the exact bug (matching the error pattern, stacktrace, or described behavior).
2. **Verify the test fails** for the right reason.
3. **Implement the fix.**
4. **Verify the test passes.**

This proves the fix actually addresses the reported problem and prevents regressions.

## Step 8: Tracking Progress in Linear

After completing each meaningful task or group of tasks, update Linear:

### For sub-issues

Update the sub-issue state to "Done" using `update_issue`:
- Set `state` to `"Done"` for completed sub-issues

### For description checklists

Post a comment on the parent issue summarizing completed items using `create_comment`:

```markdown
Progress update:
- [x] <completed task 1>
- [x] <completed task 2>
- [ ] <remaining task>
```

**Do NOT** rewrite the full issue description just to toggle checkboxes — use comments instead to avoid overwriting human edits.

### On completion

When all tasks are done, move on to Step 9. GitHub automatically links the PR to the Linear issue when pushed.

## Step 9: Finalize

Once all tasks pass quality gates, proceed with the option the user chose in Step 5:

- **Commit, push, and create a PR**: Read and follow the `commit` skill, then the `create-pr` skill.
- **Commit only**: Read and follow the `commit` skill.
- **Do nothing**: Inform the user that changes are ready and stop.

## Error Handling

- **Issue fetch failed**: The `summarize-issue` skill handles Linear errors. Do NOT proceed with implementation if the issue could not be fetched — ask the user how to proceed.
- **Ambiguous requirements**: Ask the user for clarification before implementing. Do not guess.
- **Quality gate failures**: Fix issues before proceeding. Do not skip gates.

## Shell Permission Notes

- `git_write` — Required for branching and committing
- `all` — Required for `git push` and `gh pr create`
