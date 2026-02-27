---
name: wip-commit
description: Create a work-in-progress commit. Use when the user wants to save intermediate progress without triggering CI.
---

# WIP Commit

Read and follow the `commit` skill for staging, branch setup, and committing. Override the commit message format to: `<type>: wip <short description> [skip ci]`

Error handling is inherited from the `commit` skill.

## Example commit messages

```
feat: wip add user authentication with JWT tokens [skip ci]
fix: wip resolve null check in auth flow [skip ci]
```
