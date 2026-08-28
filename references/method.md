# Hybrid Method

Gauntlet Loop Unlazy uses a tree only when the split creates real verification value. Depth is not an arithmetic promise about effort.

## Rules

1. **Make layer 1 the user's requested outcome.** Re-read the original request and current amendments before planning and before reporting.
2. **Select COMPARATIVE or THRESHOLD mode.** A comparative run needs an admitted bar. A threshold run needs measurable finish criteria.
3. **Write gates before implementation.** Each required outcome and acceptance-changing constraint needs a gate, manual review, or explicit handoff.
4. **Split at natural boundaries.** Use leaves for coherent deliverables with exact ownership, dependencies, and gates.
5. **Give branches integration gates.** Reverify child ledgers, then test interfaces, end-to-end behavior, regressions, and whole-artifact consistency.
6. **Use four passes per leaf.** Implement completely, reread as a domain expert, hunt defects, and apply low-cost polish until a pass finds no material improvement.
7. **Use critics for judgment.** Gates prove declared outcomes; independent critics judge comparative quality, threshold adequacy, risk, and integration.

## Choose Depth

- Use a solo ledger for a feature, contained bug hunt, document, or one-session artifact.
- Use an orchestrated tree when several deliverables benefit from fresh contexts or independent ownership.
- Use deeper trees only where additional branches map to real integration boundaries.
- Honor an explicit `tree N` request while keeping leaves meaningful. If the requested depth creates filler, state the mismatch and use the closest honest decomposition.

When no depth is requested, choose the smallest tree that exposes every independent deliverable and integration point.

## Contract Checklist

Before dispatch, make these decisions explicit:

- stable contract item ids mapped to an owner and observing gate or manual review;
- exact files or relative globs each leaf owns;
- interfaces and schemas shared between leaves;
- dependency ids and readiness states;
- toolchain, shell, and working-directory requirements;
- comparison dimensions or threshold criteria;
- critic count and aggregation rule;
- branch gates proving integration;
- manual review owner for high-risk outcomes.

Optional ideas are not requirements. Paraphrase only acceptance-relevant facts; never copy credentials, private request text, or unrelated context into repository state. Increment the contract revision when the user changes scope, reconcile every affected mapping before new dispatch, and use `REMOVED_BY_USER` only with explicit user authority.

Do not let concurrent leaves own the same path. If shared work cannot be separated, make it an earlier dependency or a dedicated integration leaf.

## Completion Hierarchy

| Layer | Proof |
|---|---|
| Leaf | Current runnable evidence plus reviewed manual evidence |
| Branch | Reverified children plus cross-child integration checks |
| Critic | Fresh review of actual artifacts against bar or threshold |
| Root | Current request reread, every contract row reconciled, every branch integrated, regressions checked, final claims remeasured |

Local completion does not imply integration. Verify from leaves upward and report only after the root ledger and current contract inventory are satisfied.
