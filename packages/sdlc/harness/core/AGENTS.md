<!-- sdlc-harness:begin -->
## SDLC harness (core)

This repo uses the **core** pack from [`@hinddy/uxdx`](https://www.npmjs.com/package/@hinddy/uxdx) (`.sdlc/`).

- Boundary, API, and policy changes: `intent.md` + short `spec.md` + `plan.md`.
- Mechanical fixes: `plan.md` only, still name the invariant you must not break.
- Skills: `sdlc-invariants`, `sdlc-plan`. Rule: `sdlc-core.mdc`.
- PR review against `.sdlc/REVIEW.md` (bugs, contract, compatibility).
- Do not add product behaviour to this module to ship a site. Consumers pin.
- Human merge. Skip eval-CI and maintain-bands unless this repo already runs them.
<!-- sdlc-harness:end -->
