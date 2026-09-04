<!-- sdlc-harness:begin -->
## SDLC harness (full)

This repo uses the **full** pack from [`@hinddy/uxdx`](https://www.npmjs.com/package/@hinddy/uxdx) (`.sdlc/`).

Loop: accepted `intent.md` → `spec.md` → `plan.md` → diff + existing verify
→ PR against `.sdlc/REVIEW.md` → you merge. Optional later: `evals/` on
harness-file changes, `bands.yaml` only if metrics already exist.

- Skills: `sdlc-loop`, `sdlc-feedback`, `sdlc-review`. Rule: `sdlc-full.mdc`.
- Start non-trivial sessions in plan mode. Auto-apply edits only after the
  plan is accepted and tests exist for the blast radius.
- Do not replace this overlay with a second product contract. Stack rules win.
- Production deploy stays a human gate (release owner / existing runbooks).
<!-- sdlc-harness:end -->
