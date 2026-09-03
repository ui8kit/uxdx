# Core harness

For kernels, shared libraries, and high blast-radius contracts.
Examples: FormSet, Framework, Panel, ui8kit/aria, Context.

Copy this directory to `<repo>/.sdlc/`. Overlay Cursor files — `../README.md`.

## Per change

1. Write `intent.md` when the change is a boundary, policy, or public API.
2. Keep `spec.md` short: constraints + concerns, not a product PRD.
3. `plan.md` always names files, order, tests, and what must not break.
4. Encode repeated invariants as skills; do not repeat them in every plan.
5. Human merge. No on-call agent. No eval suite unless this repo already has CI
   for agent config (then add cases there, not a second framework).
