---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Audit design, accessibility, and UX against Vercel's best practices.
---

# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Output findings in the terse `file:line` format
2. Check against all rules in the fetched guidelines
3. Read the specified files (or prompt user for files/pattern)
4. Fetch the latest guidelines from the source URL below

## Guidelines Source

Fetch fresh guidelines before each review:

```
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

Use WebFetch to retrieve the latest rules. The fetched content contains all the rules and output format instructions.

## Usage

When a user provides a file or pattern argument:

1. Output findings using the format specified in the guidelines
2. Apply all rules from the fetched guidelines
3. Read the specified files
4. Fetch guidelines from the source URL above

If no files specified, ask the user which files to review.
