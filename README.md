# Gauntlet Loop Unlazy

**Quality-bar gauntlets with runnable completion gates.**

Gauntlet Loop Unlazy combines:

- Gauntlet Loop's concrete reference bar, independent builders, critics, and honest terminal states.
- Unlazy's gate ledgers, Depth Tree decomposition, runnable `CHECK:` / `EXPECT:` verification, re-verification, linting, and dispatch coordination.

The core rule is simple: a win needs current gate evidence and an independent whole-artifact verdict. Passing tests alone is not enough. A critic liking the work is not enough when gates are stale, unmet, or abandoned.

## Use It

Invoke the skill explicitly for substantial work:

```text
$gauntlet-loop-unlazy
Run a comparative gauntlet against <reference> and do not report WON until gates pass and the integrated critic selects ours.
```

For non-comparative work:

```text
$gauntlet-loop-unlazy
Use THRESHOLD mode to build <deliverable> until every acceptance gate is current and an independent critic returns PASS.
```

Do not use this for trivial edits, factual replies, or ordinary one-pass review. The overhead is intentional and belongs on work where silent incompletion is expensive.

## Install

With the skills CLI after this repository is public:

```text
npx skills add Mohammed-Moniem/gauntlet-loop-unlazy
```

Manual Codex install:

```text
git clone https://github.com/Mohammed-Moniem/gauntlet-loop-unlazy ~/.codex/skills/gauntlet-loop-unlazy
```

Manual Claude Code install:

```text
git clone https://github.com/Mohammed-Moniem/gauntlet-loop-unlazy ~/.claude/skills/gauntlet-loop-unlazy
```

The gate checker and optional hook require Node 16 or newer and use no third-party runtime packages.

## How It Works

1. Choose PREPARE, RUN, or AUDIT.
2. Choose COMPARATIVE mode with an admitted reference bar, or THRESHOLD mode with measurable criteria.
3. Write gates before implementation.
4. Capture baseline evidence.
5. Split with the Depth Tree only where leaves map to real ownership and integration boundaries.
6. Work leaves in four passes: implement, expert reread, defect hunt, polish.
7. Reverify returned work with `--reverify`.
8. Send verified artifacts to fresh critics.
9. Integrate bottom-up and rerun gates.
10. Report exactly one terminal state: `WON`, `PLATEAUED`, `BUDGET-EXHAUSTED`, `BAR-INVALID`, `BLOCKED`, or `STOPPED`.

## Gate Commands

```text
node scripts/gate-check.mjs --status GATES.md
node scripts/gate-lint.mjs GATES.md
node scripts/gate-check.mjs --approve GATES.md
node scripts/gate-check.mjs --reverify GATES.md
```

`CHECK:` lines are shell code. Read [SECURITY.md](SECURITY.md) before running inherited gates.

## Validate

```text
npm test
python3 /path/to/skill-creator/scripts/quick_validate.py .
```

`npm test` exercises the vendored gate checker, dispatch state, hardening behavior, linter, and hybrid skill contract.

## Repository Map

```text
SKILL.md                         skill entrypoint and mode routing
agents/openai.yaml               Codex discovery metadata
assets/GAUNTLET-UNLAZY-RUN.md    run-ledger template
templates/                       PLAN, leaf gates, and branch gates
references/                      bar, gates, method, orchestration, evaluation, attribution
scripts/                         zero-dependency Unlazy gate and dispatch runtime
tests/                           runtime and hybrid contract tests
SECURITY.md                      command approval and evidence safety model
LICENSE.md                       repository license summary
LICENSE-UNLAZY-MIT.txt           MIT license for vendored Unlazy code
```

## Attribution

This is a hybrid derivative of the local Codex Gauntlet Loop adaptation and Unlazy.

- Gauntlet Loop by Jay E at RoboNuggets: https://github.com/robonuggets/gauntlet-loop
- Unlazy by Leonxlnx: https://github.com/Leonxlnx/unlazy
- Claude of Duty by Matt Shumer: https://github.com/mshumer/Claude-of-Duty

See [references/attribution.md](references/attribution.md). No upstream endorsement is implied.
