---
name: diagnose-ci-failures
description: Diagnose and fix CI check failures efficiently. Use when PR checks fail and you need to identify root causes and replicate locally.
---

# Diagnose CI Failures

Efficiently diagnose failing CI checks, replicate locally, and fix.

## Step 1: Get failing checks

Fetch CI status:
- Run `gh pr checks <PR> --repo 1K5-TECH/mobile-apps 2>&1 | grep -E "fail|pending"`
- If none failed, report "all checks passed". Otherwise, collect the name, URL, and run-id for each failing/pending check. The run-id is the number in the URL path `/actions/runs/<run-id>/`.

If all checks passed, stop here and report to the user.

## Step 2: Map to local commands

| CI Check | Local Equivalent |
|---|---|
| `✨ Format` | MCP `dart_format` for whole project |
| `🔎 Analyze` | MCP `analyze_files` for the affected app |
| `📊 DCM` | MCP `dcm_analyze` for the affected app |
| `⚙️ Generated files — <package>` | `MELOS_PACKAGES="<package>" melos build_runner:build` (shell, run from monorepo root) |
| `🧪 Test — <app> (shard N)` | `MELOS_PACKAGES="<app>" melos test` (shell, run from monorepo root) |
| `widgetbook-coverage` | MCP `run_tests` with path `test/widgetbook_test.dart` |
| `✅ Check CI success` | Meta-check — always fix upstream failures first |
| `🔒 Validate pubspec.lock` | MCP `pub` (get) |
| `🔒 Validate Podfile.lock` | `MELOS_PACKAGES="<app>" melos pod:install` (shell) |

## Step 3: Extract failure details

For test failures, use the `run-id` captured in Step 1 to list failed jobs and extract logs:

```bash
gh api repos/1K5-TECH/mobile-apps/actions/runs/{run-id}/jobs --jq '.jobs[] | select(.conclusion == "failure") | {name: .name, id: .id}'
```

Then fetch logs for each failed `job-id`:

```bash
gh api repos/1K5-TECH/mobile-apps/actions/jobs/{job-id}/logs 2>&1 | grep "FAILED" | head -20
```

## Step 4: Fix locally first

1. Replicate the failure using the local command from the table
2. Fix the issue
3. Re-run the local command to verify
4. Run the full pre-push quality gates before pushing

## Common failure patterns

- **Format failures** — run MCP `dart_format` before pushing.
- **Generated files mismatch** — run `melos build_runner:build` for the affected package before pushing.
