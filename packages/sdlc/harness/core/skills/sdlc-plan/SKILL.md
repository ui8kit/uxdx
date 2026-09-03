---
name: sdlc-plan
description: >-
  Write and follow plan.md for core SDLC. Use at the start of implementation
  in a repo with .sdlc/manifest.yaml level core. Interview risks and callers
  before editing.
---

# Plan mode (core)

1. Read `intent.md` / `spec.md` in `.sdlc/changes/<slug>/` if they exist.
2. Produce `plan.md`: files, order, proof commands, blast radius, rollback.
3. Do not edit product files until a human accepts the plan (or the change is
   a documented one-line fix).
4. If implementation diverges, update `plan.md` in the same commit.
