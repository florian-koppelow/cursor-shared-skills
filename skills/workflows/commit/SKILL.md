---
name: commit
description: Commit current work. ALWAYS use this skill when committing changes to the repository.
---

# Commit

Commit staged changes with a conventional commit message.

## Conventional Commit Types

- `feat:` New features or capabilities
- `fix:` Bug fixes
- `refactor:` Code refactoring without behavior changes
- `test:` Adding or updating tests
- `chore:` Maintenance tasks, dependency updates
- `docs:` Documentation changes
- `style:` Code style/formatting changes
- `perf:` Performance improvements
- `ci:` CI/CD changes

## Steps

1. **Ensure relevant changes are staged** if the user didn't specify which changes to commit, use `git add -A` to stage all changes
2. **Verify staged changes** by running `git diff --staged --stat`. If empty, inform the user there is nothing to commit and stop
3. **Branch setup**: Get current branch with `git rev-parse --abbrev-ref HEAD`. If on `main`, create a new branch (requires: `git_write`): `git checkout -b <type>/<short-kebab-case-description>`
4. **Generate an appropriate commit message**: `<type>: <short description>` (lowercase, no period, imperative mood, under 50 characters)
5. **Commit the changes** using `git commit -m "your message"` (requires: `all` for GPG signing via 1Password)

## Example Usage
User didn't specify which changes to commit, so we stage all changes.
```bash
git add -A
git status
git commit -m "feat: add user authentication with JWT tokens"
```

User specified which changes to commit, so we stage only the relevant changes.
```bash
git add packages/common_ui/lib/src/harmonized/analytics/harmonized_tracking.dart
git status
git commit -m "feat: add harmonized tracking"
```

User already staged the changes, so we skip the staging step.
```bash
git status
git commit -m "feat: add harmonized tracking"
```

## Error Handling

- **Nothing to commit**: If `git diff --staged --stat` is empty, inform the user and stop.
- **Commit fails**: If GPG signing fails (1Password not running), inform the user to unlock 1Password and retry.
- **On `main` with no clear description**: Ask the user for a branch name before proceeding.
