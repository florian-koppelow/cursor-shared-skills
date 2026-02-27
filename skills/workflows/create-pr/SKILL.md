---
name: create-pr
description: Push the current branch and create a Pull Request. Use when the user asks to create a PR, open a PR, or push and create a pull request.
---

# Create Pull Request

Push the current branch and create a PR with smart defaults.

### 1. Push

Requires: `all`
```bash
git push -u origin HEAD
```

### 2. Create Pull Request

You WILL only create draft PRs, if not otherwise prompted.

You WILL use the FULL template from [.github/pull_request_template.md](.github/pull_request_template.md) including the reminders at the end.

#### "Changes made & info"

Write 1-3 bullet points explaining **why** and **what** at a high level.

Good:
```
- add smart meter selection flow with recommended/standard options
- fix race condition in auth token refresh
```

Bad (don't do this):
- Listing files or directories modified
- Describing things visible in the diff (e.g., "add new widget class")
- Mentioning tests unless they're the primary change
- Implementation details (e.g., "use StatelessWidget")

#### "What/How to test this PR"

Write `N/A` unless **manual** testing is specifically required.

Do NOT write:
- "Run tests" - CI does this automatically
- "Run analyzer" - CI does this automatically
- Any automated checks the CI pipeline handles

Only include steps for manual verification that CI cannot do.

#### "Feature Flag Link(s)"

If the change involves a LaunchDarkly feature flag, provide a direct link (e.g., `https://app.launchdarkly.com/projects/<project-key>/flags/<flag-key>/targeting`).

Determine the `<project-key>` by matching the affected app directory to its project key in [.launchdarkly/coderefs.yaml](.launchdarkly/coderefs.yaml). Use the flag key as it appears in code (kebab-case).

Write `N/A` if no feature flag is involved.

#### "Ticket Link(s)"

If the change is associated with a Linear issue, provide a direct link to the issue (e.g., `https://linear.app/1komma5grad/issue/<issue-identifier>`). Extract the issue ID from the branch name if not already known. Write `N/A` if no ticket is associated.

#### Issue Summary

If an issue summary is available from prior context, or if a Linear issue ID can be extracted from the branch name, run the `summarize-issue` skill (if not already done). If a summary is available, append it at the end of the PR body in a collapsible section:

```markdown
<details>
<summary>Issue summary</summary>

[Full issue summary]

</details>
```

Skip this section if no issue is associated with the PR.

#### Title

Conventional commit format without scope: `<type>: <description>`

Requires: `all`
```bash
gh pr create --draft --title "<type>: <short description>" --body "$(cat <<'EOF'
<body content here>
EOF
)"
```

### 3. Complete

Return the PR URL as a markdown link and offer to prepare the PR for review.

```markdown
PR created: [PR URL](PR URL)

Would you like me to ensure the PR is ready for review? If yes, I'll:
1. Watch the PR checks until they finish
2. Investigate and fix any failures
3. Mark the PR as ready for review once all checks pass
```

If the user accepts, follow the `prepare-pr-for-review` skill.

## Error Handling

- **Push fails**: Verify SSH key access (1Password must be unlocked). Check that the branch exists locally with `git rev-parse --abbrev-ref HEAD`.
- **PR already exists**: If `gh pr create` fails because a PR already exists for the branch, inform the user and provide the existing PR URL via `gh pr view --web`.
- **No commits ahead of `main`**: If the branch has no new commits, inform the user there is nothing to create a PR for.

---

## Shell Permission Notes

- `all` - Required for `git push` (SSH key via 1Password) and `gh pr create`
