---
name: sdlc-feedback
description: >-
  Verify agent work with the repo's existing commands before claiming done.
  Use in full-harness repos after implementation. Do not weaken tests to
  make a task pass.
---

# Feedback loop

1. Read verify commands from root `AGENTS.md` (or Makefile / package.json
   scripts named there).
2. Run them. Paste or summarize the outcome.
3. If tests fail, fix production code, not the test, unless the change is the
   test and `plan.md` says so.
4. For UI, use the repo's existing check (`bun run check`, screenshot, or
   documented browser step). Do not add Playwright as a default gate.
5. Never report complete without the proof named in `plan.md`.
