---
name: deterministic-evaluation
description: Evaluate whether a proposed agent skill or AGENTS.md instruction should instead be a deterministic lint rule, CI pipeline check, or other automated enforcement. Use when creating, modifying, or reviewing agent skills and AI instructions.
---

# Deterministic Evaluation

Before adding or modifying any agent skill (`.cursor/skills/*/SKILL.md`) or AI instruction in `AGENTS.md`, first evaluate whether the desired behavior can be enforced deterministically through automated tooling. Agent instructions should be reserved for guidance that **cannot** be expressed as a deterministic, automated check.

## Evaluation Checklist

For every proposed instruction, ask:

1. **Can a Dart lint rule enforce this?** Check the full catalog: <https://dart.dev/tools/linter-rules/all>
2. **Can a DCM rule enforce this?** Check the DCM catalog: <https://dcm.dev/docs/rules/>
3. **Can an analyzer plugin enforce this?** Dart analyzer plugins allow project-specific lint rules with auto-fixes: <https://dart.dev/tools/analyzer-plugins>
4. **Can `dart format` handle this?** Formatting preferences belong in `analysis_options.yaml` under the `formatter:` key, not in agent instructions.
5. **Can a CI pipeline check enforce this?** Consider adding a step to `.github/workflows/continuous-integration-checks.yaml`.
6. **Can a Melos script enforce this?** Workspace-level automation can be defined as Melos scripts in the root `pubspec.yaml`.
7. **Can a git hook enforce this?** Pre-commit or pre-push hooks can catch issues before code is even pushed.
8. **Can a code generation check enforce this?** The existing CI generated-files check validates that generated code is up to date.
9. **Can a GitHub Actions workflow enforce this?** PR title formats, label requirements, and other PR-level checks can be automated via workflows.
10. **Can dependency constraints enforce this?** `pubspec.yaml` version constraints, dependency overrides, or resolution settings can prevent unwanted packages.

## Decision Framework

| If the behavior is...                              | Then enforce it with...                            | NOT with an agent instruction |
| -------------------------------------------------- | -------------------------------------------------- | ----------------------------- |
| A code style or formatting preference              | `dart format` / `analysis_options.yaml`            | Yes                           |
| A banned API or pattern                            | DCM `banned-usage` / Dart lint rule                | Yes                           |
| A required import style                            | Dart lint rules (e.g. `always_use_package_imports`) | Yes                          |
| A naming convention                                | Dart lint rules or DCM rules                       | Yes                           |
| A code complexity threshold                        | DCM metrics                                        | Yes                           |
| A file organization requirement                    | Analyzer plugin or CI script                       | Yes                           |
| A PR title or commit message format                | GitHub Actions workflow                            | Yes                           |
| A test coverage threshold                          | CI pipeline check                                  | Yes                           |
| A dependency version constraint                    | `pubspec.yaml` constraints                         | Yes                           |
| Generated files must be up-to-date                 | CI generated-files check                           | Yes                           |
| An architectural decision or design pattern choice | Agent skill                                        | No (keep as agent skill)      |
| Context about project structure or conventions     | Agent skill                                        | No (keep as agent skill)      |
| Workflow guidance (when to run codegen, etc.)       | Agent skill                                        | No (keep as agent skill)      |
| Subjective judgment (code review quality, etc.)    | Agent skill                                        | No (keep as agent skill)      |

## When Creating or Modifying Agent Skills

1. **Audit the instruction**: For each bullet point or rule, run through the evaluation checklist above.
2. **Propose the deterministic alternative**: If a lint rule, DCM rule, CI check, or other automated mechanism can enforce the behavior, recommend adding that instead of (or in addition to) the agent instruction.
3. **Document the gap**: If no deterministic tool can enforce the behavior, proceed with the agent instruction and briefly note why it cannot be automated (e.g., "requires subjective judgment" or "context-dependent decision").
4. **Avoid duplication**: Do NOT add agent instructions that merely restate what an existing lint rule, DCM rule, or CI check already enforces. The quality gates in `quality-gates.mdc` already ensure these tools run on every task.

## Examples

### Bad: Agent instruction for something a lint rule handles

```markdown
<!-- DON'T: This is already enforced by the `always_use_package_imports` lint rule -->
Always use package imports instead of relative imports.
```

### Good: Agent instruction for something that requires judgment

```markdown
<!-- DO: No lint rule can determine widget decomposition boundaries -->
Extract complex child widgets into their own private or public widget classes
instead of using builder methods.
```

### Good: Recommending a deterministic alternative

When asked to add an instruction like "never use `print()` in production code", instead recommend adding a DCM rule:

```yaml
# In analysis_options.yaml
dart_code_metrics:
  rules:
    avoid-banned-usage:
      entries:
        - ident: print
          message: "Use the logger instead of print()"
```
