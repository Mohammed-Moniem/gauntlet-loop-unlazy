# Evaluation And Convergence Protocol

Read this reference in RUN mode before the first critique and whenever a verdict, retry, or terminal status is in question.

## Evaluation Order

1. **Objective gates:** run acceptance, safety, correctness, and regression checks against the actual artifact.
2. **Comparison or threshold packet:** package the candidate, bar or threshold evidence, shared constraints, and dimensions under neutral labels when practical.
3. **Independent critique:** use a fresh critic that did not build the candidate. Do not include effort, rationale, desired verdict, or praise.
4. **Iteration:** give the builder decisive evidence and the single highest-leverage gap. Preserve already-passing gates.
5. **Integration:** after component work, rerun the complete gate set and judge the integrated artifact.

Blinding reduces sympathy and anchoring but may be imperfect when a famous reference is recognizable. Record the limitation; do not claim stronger blinding than was achieved.

## Critic Output

For COMPARATIVE mode, require:

```text
Scope: component ID or INTEGRATED
Evidence adequate: YES or NO
Objective gates: PASS or FAIL, with failures
Verdict: OURS | BAR | TIE | NOT-COMPARABLE | INSUFFICIENT-EVIDENCE
Decisive evidence:
Highest-leverage remaining gap:
Confidence and limitations:
```

For THRESHOLD mode, require:

```text
Scope: component ID or INTEGRATED
Evidence adequate: YES or NO
Objective gates: PASS or FAIL, with failures
Threshold result: PASS | FAIL | INSUFFICIENT-EVIDENCE
Decisive evidence:
Highest-leverage remaining gap:
Confidence and limitations:
```

The critic is rigorous, specific, and artifact-focused. Harshness means refusing unsupported approval; it does not mean insulting the builder.

## Judge Count

Use at least one truly separate critic when collaboration capacity exists. Add independent critics when the decision is highly subjective, consequential, or unstable across reviews. Choose and record the aggregation rule before seeing verdicts. Preserve dissent rather than averaging it away.

## Win Gate

`WON` requires all of the following:

- every required gate passes with current evidence;
- no required gate is abandoned, deferred, or awaiting owner decision;
- evidence is adequate and the comparison or threshold remains fair;
- the predeclared critic rule selects `OURS` for every blocking comparative component or `PASS` for every blocking threshold component;
- the same rule selects `OURS` or `PASS` for the integrated artifact;
- no unresolved safety, authorization, independence, or scope blocker remains.

Scores can diagnose direction but cannot substitute for these gates.

## Iteration Record

For every cycle, record:

- the gap targeted;
- the change made;
- objective before/after evidence;
- gate result after change;
- critic verdict and limitations;
- regressions introduced or ruled out;
- next gap or terminal reason.

Material improvement must be visible in the admitted dimensions, threshold criteria, or objective measures.

## Non-Winning Exits

Stop and preserve the best verified artifact when:

- the user stops or redirects;
- a stated budget or deadline is reached;
- two consecutive cycles do not materially improve the decisive gap;
- the bar or threshold becomes invalid or evidence becomes inadequate;
- required authority, credentials, data, independence, or external state is missing;
- another iteration would require a materially different scope or risk.

Return the matching status: `PLATEAUED`, `BUDGET-EXHAUSTED`, `BAR-INVALID`, `BLOCKED`, or `STOPPED`. Include the strongest achieved result, unresolved gap, supporting evidence, abandoned gates, and the decision needed to continue.
