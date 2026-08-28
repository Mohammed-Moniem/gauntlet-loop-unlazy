# Attribution And Adaptation Notice

This package is a hybrid derivative. No endorsement by the upstream creators is implied.

## Gauntlet Loop Lineage

- **Title:** Gauntlet Loop
- **Creator:** Jay E at RoboNuggets
- **Source:** https://github.com/robonuggets/gauntlet-loop
- **Inspected revision:** `9b1975a1b8f01981f3f1e6b667ad3aaf907178ea`
- **Upstream license:** Creative Commons Attribution 4.0 International
- **License text:** https://github.com/robonuggets/gauntlet-loop/blob/9b1975a1b8f01981f3f1e6b667ad3aaf907178ea/LICENSE

The builder/critic comparison technique and its name are also credited upstream to Matt Shumer, who used it while creating Claude of Duty.

- **Source project:** https://github.com/mshumer/Claude-of-Duty
- **Inspected revision:** `d9b237b75c9304ab8d9ef4cfa0c3568c7c11a853`

## Unlazy Lineage

- **Title:** Unlazy
- **Creator:** Leonxlnx
- **Source:** https://github.com/Leonxlnx/unlazy
- **Inspected revision:** `da0b00a3a6b706b471797cd4ef579ae1001ff6d7`
- **Upstream license:** MIT
- **License text:** `LICENSE-UNLAZY-MIT.txt`

The vendored `scripts/` runtime, related dispatch/checking behavior, and several regression tests are derived from Unlazy. Keep the MIT copyright notice with those files.

## Material Changes

- Combined quality-bar admission and independent critic judging with runnable acceptance gates.
- Added explicit COMPARATIVE and THRESHOLD evidence models.
- Required both current gate evidence and critic selection before `WON`.
- Added a hybrid run ledger that records bar or threshold dossier, gate state, contract inventory, critic verdicts, and recovery cursor.
- Preserved Unlazy-style approval, re-verification, linting, dispatch waves, and gate abandonment as non-successful handoff.
- Preserved Gauntlet Loop-style honest terminal states and whole-artifact integration review.
- Rewrote the operating instructions for Codex skill discovery and progressive disclosure.

When redistributing this package, preserve this notice, both upstream links, the license files, and an indication of changes.
