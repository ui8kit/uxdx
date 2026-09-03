---
name: sdlc-invariants
description: >-
  Enforce shared-module invariants for core SDLC harness. Use when editing a
  kernel, form library, ARIA contract, or other pinned dependency. Block
  product IA, second APIs, and hand-edits of generated code.
---

# Core invariants

Apply whenever creating or changing a public surface in this repository.

1. Consumers pin this module. Do not add site-specific kinds, carts, or CMS
   schemas so a product can ship a page.
2. Do not invent a parallel REST or GraphQL content contract.
3. Do not hand-edit generated sources if the repo marks them generated.
4. If a policy must always hold, prefer a test or hook over a comment in
   `plan.md`.
5. Record the invariant in `.sdlc/changes/<slug>/spec.md` when the contract
   itself changes.
