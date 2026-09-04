---
name: sdlc-light
description: >-
  Light AI-native SDLC for a solo developer. Use when planning or implementing
  work in a repo whose `.sdlc` was installed with `@hinddy/uxdx` at level
  light. Write plan.md,
  skip spec.md unless IA changes, run existing verify commands.
---

# Light SDLC

## When

Repo contains `.sdlc/manifest.yaml` with `level: light`.

## Do

1. Read root `AGENTS.md` and existing `.cursor/rules` first.
2. For anything beyond a typo: write `.sdlc/changes/<slug>/plan.md` (files,
   order, proof command, risks).
3. Implement only what the plan names. If implementation diverges, update
   `plan.md` in the same commit.
4. Run the proof command from the plan. Fix code, not tests, unless the change
   is the test.
5. Do not introduce `evals/`, production hooks, or an on-call agent.

## Do not

- Replace product `AGENTS.md` with the overlay file.
- Invent kinds, taxonomies, or a second content API.
- Copy `full` or `core` files into a light repo.
