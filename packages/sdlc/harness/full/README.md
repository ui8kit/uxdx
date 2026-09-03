# Full harness

For the portable Codex path and high-stakes operators.
Examples: SiteStarter, GoBackend, SvelteCMS, YPanel.

Copy this directory to `<repo>/.sdlc/`. Overlay Cursor files — `../README.md`.

Solo adaptation: no MDM, no weekly committee. You still accept `spec.md` and
`plan.md`, merge PRs, and authorize production.

## Loop

1. `intent.md` — originator + agent; you correct and commit.
2. `spec.md` — requirements and design in one pass; flagged concerns first.
3. `plan.md` — plan mode; implement only after you accept.
4. Feedback loop — repo verify commands before "done".
5. PR — `.sdlc/REVIEW.md`; you approve.
6. Maintain — `bands.yaml` is a stub. Fill it only if this repo already has
   metrics; do not invent an on-call agent.

## Per change

`mkdir -p .sdlc/changes/<slug>` and copy `intent.md`, `spec.md`, `plan.md`.
