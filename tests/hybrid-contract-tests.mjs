#!/usr/bin/env node
// Contract tests for the hybrid skill package. Zero dependencies.

import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => readFileSync(join(ROOT, relative), "utf8");

const tests = [];
const test = (name, fn) => tests.push({ name, fn });

function filesUnder(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (entry === ".git") continue;
    if (statSync(path).isDirectory()) out.push(...filesUnder(path));
    else out.push(path);
  }
  return out;
}

test("package: required public skill files exist", () => {
  for (const relative of [
    "SKILL.md",
    "README.md",
    "SECURITY.md",
    "LICENSE.md",
    "LICENSE-UNLAZY-MIT.txt",
    "NOTICE.md",
    "agents/openai.yaml",
    "assets/GAUNTLET-UNLAZY-RUN.md",
    "templates/PLAN.md",
    "templates/gates-leaf.md",
    "templates/gates-node.md",
    "references/attribution.md",
    "references/bar-contract.md",
    "references/evaluation-protocol.md",
    "references/gates.md",
    "references/method.md",
    "references/orchestration.md",
    "scripts/gate-check.mjs",
    "scripts/gate-lint.mjs",
    "scripts/dispatch-check.mjs",
    ".github/workflows/test.yml",
  ]) {
    assert.ok(existsSync(join(ROOT, relative)), relative);
  }
});

test("frontmatter and UI metadata route to the hybrid skill", () => {
  const skill = read("SKILL.md");
  assert.match(skill, /^---\r?\n[\s\S]*name: gauntlet-loop-unlazy[\s\S]*---/);
  assert.match(skill, /Use when/);
  assert.match(skill, /do not use/);
  assert.match(skill, /Passing gates alone is not `WON`/);
  assert.match(skill, /favorable critic verdict cannot override/);

  const metadata = read("agents/openai.yaml");
  assert.match(metadata, /display_name: "Gauntlet Loop Unlazy"/);
  assert.match(metadata, /\$gauntlet-loop-unlazy/);
  assert.match(metadata, /allow_implicit_invocation: true/);
});

test("hybrid method keeps comparative and threshold modes distinct", () => {
  const text = [
    read("SKILL.md"),
    read("references/bar-contract.md"),
    read("references/evaluation-protocol.md"),
  ].join("\n");
  for (const token of [
    "COMPARATIVE",
    "THRESHOLD",
    "Do not force a comparative bar",
    "Threshold result: PASS | FAIL | INSUFFICIENT-EVIDENCE",
    "Verdict: OURS | BAR | TIE",
  ]) {
    assert.ok(text.includes(token), token);
  }
});

test("win gate requires both current gates and independent critic result", () => {
  const text = [read("SKILL.md"), read("references/evaluation-protocol.md")].join("\n");
  assert.match(text, /all required gates pass with current evidence/);
  assert.match(text, /predeclared critic rule selects/);
  assert.match(text, /whole-artifact critic verdict/);
  assert.match(text, /`DEGRADED_REVIEW`/);
  assert.match(text, /INSUFFICIENT-INDEPENDENCE/);
});

test("ledger and plan preserve handoffs, recovery, and contract denominator", () => {
  const ledger = read("assets/GAUNTLET-UNLAZY-RUN.md");
  const plan = read("templates/PLAN.md");
  for (const token of [
    "Current Contract Inventory",
    "Evidence Chain",
    "Recovery Cursor",
    "Abandoned Or Deferred Gates",
    "WON | PLATEAUED | BUDGET-EXHAUSTED | BAR-INVALID | BLOCKED | STOPPED",
  ]) {
    assert.ok(ledger.includes(token), token);
  }
  for (const token of [
    "Current Contract Inventory",
    "Contract revision",
    "Required outcome or constraint",
    "Owner",
    "Observing gate or manual review",
    "Disposition",
    "REMOVED_BY_USER",
  ]) {
    assert.ok(plan.includes(token), token);
  }
});

test("orchestration launches the whole safe ready wave before waiting", () => {
  const text = [
    read("SKILL.md"),
    read("references/orchestration.md"),
    read("references/dispatch.md"),
    read("templates/PLAN.md"),
  ].join("\n");
  for (const token of [
    "Dispatch every safe `READY` leaf in the current wave before waiting on any result",
    "Do not dispatch one ready leaf, wait for it, and then dispatch its ready siblings",
    "Ready-wave invariant",
    "all safe READY leaves launch and are recorded before the first wait/result read",
    "Rolling Dispatch Rule",
  ]) {
    assert.ok(text.includes(token), token);
  }
});

test("plan records tiering, ownership, waves, and exact verification targets", () => {
  const plan = read("templates/PLAN.md");
  for (const token of [
    "| ID | Tier | Kind | Needs | OWNS | Dispatch wave | Verification target | Unblocks | State |",
    ".unlazy/<scope>/gates/leaf-1.1.1.md",
    "A one-leaf wave is allowed only when no other safe ready leaf exists",
    "Parent verification targets the exact leaf ledger",
  ]) {
    assert.ok(plan.includes(token), token);
  }
});

test("leaf verification is narrow and project-wide checks live in branch or root gates", () => {
  const text = [
    read("references/orchestration.md"),
    read("references/gates.md"),
    read("templates/gates-leaf.md"),
    read("templates/gates-node.md"),
    read("README.md"),
  ].join("\n");
  for (const token of [
    "Do not use a bare `gates/*.md` or whole-scope sweep as the parent proof for a single leaf",
    "Leaf ledgers cover only the outcomes owned by that leaf",
    "Put cross-leaf behavior, whole-project regressions, end-to-end checks, final packaging",
    "Whole-project, all-sibling, packaging, and final quality-bar checks belong in",
    "Reverify returned work with `--reverify` against the exact leaf ledger",
  ]) {
    assert.ok(text.includes(token), token);
  }
});

test("orchestration adds no hard dependency on model-router or runtime packages", () => {
  const pkg = JSON.parse(read("package.json"));
  assert.equal(pkg.dependencies, undefined);
  assert.equal(pkg.devDependencies, undefined);
  const text = filesUnder(ROOT)
    .filter((file) => file.endsWith(".md") || file.endsWith(".yaml") || file.endsWith(".json"))
    .map((file) => readFileSync(file, "utf8"))
    .join("\n");
  assert.equal(text.includes("model-router"), false);
});

test("every local markdown link resolves", () => {
  const missing = [];
  const link = /\[[^\]]+\]\(([^)]+)\)/g;
  for (const file of filesUnder(ROOT).filter((p) => p.endsWith(".md"))) {
    const text = readFileSync(file, "utf8");
    for (const match of text.matchAll(link)) {
      const target = match[1];
      if (target.includes("://") || target.startsWith("#")) continue;
      const withoutAnchor = target.split("#")[0];
      if (!withoutAnchor) continue;
      const resolved = resolve(dirname(file), withoutAnchor);
      if (!existsSync(resolved)) missing.push(file.replace(ROOT + "/", "") + " -> " + target);
    }
  }
  assert.deepEqual(missing, []);
});

test("attribution and licenses identify both upstreams and revisions", () => {
  const attribution = read("references/attribution.md");
  const notice = read("NOTICE.md");
  const license = read("LICENSE.md");
  for (const token of [
    "9b1975a1b8f01981f3f1e6b667ad3aaf907178ea",
    "da0b00a3a6b706b471797cd4ef579ae1001ff6d7",
    "Creative Commons Attribution 4.0 International",
    "MIT",
    "No upstream endorsement is implied",
  ]) {
    assert.ok((attribution + notice + license).includes(token), token);
  }
});

test("repository contains no banned HTTP client dependency or recommendation", () => {
  const offenders = [];
  const banned = "ax" + "ios";
  for (const file of filesUnder(ROOT)) {
    const relative = file.replace(ROOT + "/", "");
    if (relative.includes(".git/")) continue;
    if (readFileSync(file, "utf8").toLowerCase().includes(banned)) offenders.push(relative);
  }
  assert.deepEqual(offenders, []);
});

let passed = 0;
const failures = [];
for (const current of tests) {
  try {
    current.fn();
    passed++;
    console.log("ok   " + current.name);
  } catch (error) {
    failures.push(current.name);
    console.log("FAIL " + current.name + "\n     " + String(error.message).replace(/\n/g, "\n     "));
  }
}

console.log("\n" + passed + "/" + tests.length + " passed");
process.exit(failures.length ? 1 : 0);
