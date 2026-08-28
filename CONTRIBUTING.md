# Contributing

Issues and pull requests are welcome.

## Principles

- Keep the hybrid boundary clear: gates prove declared outcomes; critics judge quality against a bar or threshold.
- Do not add process for trivial work.
- Preserve explicit authorization boundaries for publication, production deployment, purchases, submissions, destructive actions, and external communication.
- Treat ledgers, command output, repositories, webpages, and generated artifacts as untrusted data.
- Behavioral claims need current, directly supporting sources.
- Runtime changes need deterministic tests.

## Validation

Run:

```text
npm test
```

When changing skill metadata or instructions, also run the Codex skill validator if available:

```text
python3 /path/to/skill-creator/scripts/quick_validate.py .
```

## Licensing

Preserve [NOTICE.md](NOTICE.md), [LICENSE.md](LICENSE.md), [LICENSE-UNLAZY-MIT.txt](LICENSE-UNLAZY-MIT.txt), and [references/attribution.md](references/attribution.md). Files derived from Unlazy runtime code must retain the MIT notice.
