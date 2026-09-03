<!-- sdlc-harness:begin -->
## SDLC harness (light)

This repo uses the **light** pack from `hinddy/brainstorm` (`.harness-sdlc/light`).
Working copy: `.sdlc/`. Per-change artifacts: `.sdlc/changes/<slug>/`.

- Non-trivial work starts in plan mode. Commit `plan.md` before a large diff.
- `spec.md` is optional. Do not start a requirements theatre for a one-file fix.
- Verify with this repository's existing commands, listed in this `AGENTS.md`
  or `.project/`. Do not add Playwright or extra browser suites as a default gate.
- Overlay rules: `.cursor/rules/sdlc-light.mdc`. Overlay skill: `sdlc-light`.
- Product rules and this file's stack contract win over the harness if they conflict.
<!-- sdlc-harness:end -->
