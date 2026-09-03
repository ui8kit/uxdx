---
name: sdlc-loop
description: >-
  Full AI-native SDLC loop for a solo developer. Use when working in a repo
  with .sdlc/manifest.yaml level full. Drive intent.md, spec.md, plan.md in
  order; do not skip to code on a non-trivial change.
---

# Full SDLC loop

1. Write or update `.sdlc/changes/<slug>/intent.md`. The human corrects it
   before spec.
2. Produce `spec.md` from the intent. Flag policy conflicts. Do not start
   plan mode until the human accepts the spec (or explicitly says "small,
   proceed").
3. Plan mode: `plan.md` with files, order, risks, proof. No file edits until
   the plan is accepted.
4. Implement in one pass when the plan is tight. Update `plan.md` if you
   diverge.
5. Hand off to skill `sdlc-feedback` before reporting done.
6. PR text points at the three artifacts. Review uses `sdlc-review`.
