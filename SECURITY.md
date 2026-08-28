# Security Model

Gauntlet Loop Unlazy executes repository-described checks. Its safety boundary is explicit review and approval, not command sandboxing.

## `CHECK:` Lines Are Code

`scripts/gate-check.mjs` runs each `CHECK:` through a shell with the checker's user permissions and inherited environment. A command can access files, network connections, credentials, and developer tools available to that process.

Before using an inherited ledger:

1. Run `node <skill-dir>/scripts/gate-check.mjs --status <gate-file>` to parse and display status without executing checks.
2. Read every `CHECK:`, `EXPECT:`, and `CWD:`.
3. Inspect any script called by a check, including generated or ignored files.
4. Determine the shell from `--shell`, `UNLAZY_SHELL`, or the platform default, and inspect inherited `PATH`.
5. Run with `--approve` only when the complete resolved oracle is expected and understood.

Approval records live under `~/.unlazy/approved` by default. An approval is consent to execute; it is not evidence that the command matches the English gate title and it does not hash transitive inputs.

## Scopes, Leases, And Dispatch

Scopes limit gate discovery, logs, hook association, dispatch waves, and lease labels. Ownership leases and dispatch launch barriers coordinate tools that voluntarily use the protocol. They do not prevent a process from reading or writing another path.

Use separate worktrees, containers, or stronger isolation for untrusted code. Do not bulk-delete lock directories while a run is active.

## Evidence Hygiene

Successful command output is represented by a fingerprint, not persisted as raw output. Failure diagnostics can still appear in the local terminal, so checks must not print secrets. Do not put credentials, private prompts, result bodies, or personal data in gates, dispatch handles, critic packets, or persistent ledgers.

## External Actions

This skill does not broaden user authorization. Reconfirm immediately before publication, production deployment, purchases, paid generation, submissions, destructive actions, or material external communication unless that exact action and scope is already authorized.

## Optional Hook

The optional Claude Code Stop hook is inherited from Unlazy and should be installed only with user consent. It scans ledgers and dispatch state; it does not execute checks or validate old evidence. Shared hook settings can expose local absolute paths and are usually not portable.
