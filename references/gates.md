# Gate Contract

A gate ledger is a machine-checked completion contract. It proves only the declared command oracle and manual evidence; it cannot prove that the English gate title is honest.

## Minimal Format

```markdown
# Gates: account import

OWNS: src/import/**, tests/import/**

Scope: import valid records and reject malformed records

- [ ] G1: valid fixture imports completely
  CHECK: node scripts/check-import.mjs fixtures/valid.json
  EXPECT: import verification passed
  EVIDENCE: pending

- [ ] G2: package-level integration succeeds
  CHECK: node ../../scripts/check-package.mjs
  EXPECT: package verification passed
  CWD: packages/importer
  EVIDENCE: pending

- [ ] G3: migration wording is reviewed against the product decision
  EVIDENCE: pending
```

## Strict Rules

- Start each gate with `- [ ] ID: outcome` or `- [x] ID: outcome`. IDs must be explicit and unique in the file.
- Indent `CHECK:`, `EXPECT:`, `CWD:`, and `EVIDENCE:` beneath the gate.
- A runnable gate has both `CHECK:` and `EXPECT:`. A manual gate has neither.
- A checked gate with missing or pending evidence remains unmet.
- `ABANDON: <id> <reason>` is a file-level handoff for a gate in the same file. It is terminal but not successful completion.
- `OWNS:` paths are repository-relative globs for coordination only. They are not a sandbox.
- Do not create a zero-gate ledger.

## Running Gates

Use the local scripts:

```text
node <skill-dir>/scripts/gate-check.mjs --status GATES.md
node <skill-dir>/scripts/gate-lint.mjs GATES.md
node <skill-dir>/scripts/gate-check.mjs --approve GATES.md
node <skill-dir>/scripts/gate-check.mjs --reverify GATES.md
```

`--status` parses and reports historical ledger state without executing a command. Use `--reverify` for parent verification because it executes every runnable gate, including gates already checked.

A runnable gate passes only when:

1. the process exits with status `0`;
2. `EXPECT:` matches combined standard output and standard error.

Evidence records resolved shell, working directory, exit status, a PATH fingerprint, match state, and a successful-output fingerprint. Raw successful output is not persisted.

## Approval Boundary

`CHECK:` is executable shell code with the permissions and inherited environment of the checker. Before running inherited checks:

1. Run `--status`.
2. Read every `CHECK:`, `EXPECT:`, and `CWD:`.
3. Inspect any script called by a check.
4. Determine the shell and inherited `PATH`.
5. Run with `--approve` only when the resolved oracle is expected and understood.

Approval is consent to execute. It does not prove that the command measures the English outcome and does not hash called scripts, fixtures, dependencies, or other transitive inputs.

## Author Gates That Can Fail

- Observe the artifact, service, or measurement named by the gate title.
- Emit a success-only marker after every assertion passes.
- Test absence checks against a known positive control.
- Measure supplied numbers from source data rather than copying them into `EXPECT:`.
- Prefer repository-owned Node scripts for portable checks.
- Treat manual gates as real risk, not a convenient escape hatch. Cite exact evidence and seek independent review when consequences warrant it.

## Linting

The linter is advisory by default:

```text
node <skill-dir>/scripts/gate-lint.mjs GATES.md
node <skill-dir>/scripts/gate-lint.mjs --strict .unlazy/<scope>/gates/leaf-1.1.1.md
```

Fix errors. Treat warnings as prompts to sharpen weak gates before they certify the wrong thing.
