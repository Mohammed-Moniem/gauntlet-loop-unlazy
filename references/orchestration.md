# Orchestration Protocol

Use orchestrated mode when one context cannot hold the task and its verification at full attention. Keep the driver responsible for planning, dispatch, independent verification, integration, and the root report.

## Declare States And Paths

Use these leaf states only:

- `WAITING`: one or more ids in Needs are not yet `VERIFIED`
- `READY`: dependencies are verified and ownership is available
- `IN-FLIGHT`: dispatched and not yet independently verified
- `VERIFIED`: parent `--reverify` passed and manual gates were reviewed
- `ABANDONED`: at least one required gate has a recorded handoff; never treat this as full completion

Use `OPEN`, `VERIFIED`, or `ABANDONED` for branches. Store leaf ledgers as `gates/leaf-<id>.md` and integration ledgers as `gates/node-<id>.md`. Do not label a branch path as `leaf-*`.

## Driver Loop

1. **Plan before fan-out.** Reread the original request and current amendments. Create `.unlazy/<scope>/PLAN.md`, `.unlazy/<scope>/GATES.md`, and one ledger per leaf and branch from the templates. Inventory every independently omittable outcome and acceptance-changing constraint with a stable id, owner, observing gate or manual review, disposition, and revision. Fix interfaces, naming, toolchain, dependencies, exact ownership, quality bar or threshold, and critic rule before dispatch.
2. **Inspect and approve checks.** Run `gate-check --status` on every inherited ledger. Review each `CHECK:`, `EXPECT:`, and `CWD:`, including called scripts. Determine the shell and inherited `PATH`; a new oracle with no exact approval prints resolved values during a normal run without executing. Use `--approve` only after inspection.
3. **Claim every concurrent leaf.** Run:
   ```text
   node <skill-dir>/scripts/gate-check.mjs --scope <scope> --leaf leaf-1.2.1 --claim
   ```
   A refused claim means the split is not safe for concurrent dispatch. Change the plan or run the work sequentially.
4. **Launch each ready wave.** Give each leaf only the shared contract, exact ownership, dependencies, bar or threshold criteria, own ledger, and four-pass completion rule. Open a dispatch wave for independent `READY` leaves, call the host's native nonblocking launch once per leaf, record every host handle, and seal the wave before the first wait or result read. Follow [dispatch.md](dispatch.md).
5. **Verify each return independently.** Record the native return in its wave, then re-run the returned leaf's runnable gates, including already checked gates:
   ```text
   node <skill-dir>/scripts/gate-check.mjs --root . --cwd . --reverify .unlazy/<scope>/gates/leaf-1.2.1.md
   ```
   `--status` alone is not re-verification. Review manual gates directly and try to refute at least one passed gate.
6. **Critique the verified artifact.** Send a fresh critic the artifact, gate result, bar dossier or threshold, constraints, known asymmetries, and requested verdict format. Exclude builder rationale and confidence. If independent context is unavailable, label the result `DEGRADED_REVIEW`.
7. **Append status and roll forward.** Record results without rewriting history:
   ```text
   node <skill-dir>/scripts/gate-check.mjs --scope <scope> --log "leaf-1.2.1 verified"
   ```
   Mark the leaf `VERIFIED`, promote newly unblocked leaves from `WAITING` to `READY`, and dispatch them without waiting for unrelated in-flight leaves.
8. **Integrate bottom-up.** Work each `node-*.md` ledger only after all named children return. Reverify children, then run interface, end-to-end, regression, and quality-bar/threshold integration checks.
9. **Reconcile, release, and report.** Reread the current request and review every current contract row against live owner and observation. Missing/stale ownership or observation, abandonment, deferment, and owner decisions are non-completion. Release all scope leases after final verification. Report only when both the inventory and root ledger are met, then remeasure every reported count.

## Check Concurrency

Gate checks run sequentially by default (`--jobs 1`). Use `--jobs <N>` only when runnable gates are independent and deterministic parallel execution reduces wall-clock time:

```text
node <skill-dir>/scripts/gate-check.mjs --root . --cwd . --reverify --jobs 4 .unlazy/<scope>/gates/leaf-1.1.1.md .unlazy/<scope>/gates/leaf-1.1.2.md
```

`--jobs` controls command execution, not subagent dispatch and not dependency readiness. Use dispatch waves for native agent concurrency.

## Manual Gates And Critics

Automation cannot prove every user-facing or judgment-heavy outcome. For each manual gate:

- cite the exact artifact, location, measurement, or reviewer decision;
- review consequences, not only polish;
- obtain independent review for high-risk outcomes when feasible;
- keep the gate unmet if evidence is ambiguous.

Do not call a leaf `VERIFIED` merely because every runnable gate passed. Critic evidence must be tied to the actual artifact and the admitted bar or threshold.

## When Not To Orchestrate

Stay solo when one focused context can implement and verify the task without hiding independent deliverables. Orchestration has planning and integration overhead; use it for attention isolation, not ceremony.
