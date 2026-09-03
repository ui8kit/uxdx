# Light harness

For product repos that already have a contract (`AGENTS.md`, stack rules, tests).
Examples: AlexY OS, GitCourse, Lab, BrandOSS, ui8px-cli, FastyGo UI.

Copy this directory to `<repo>/.sdlc/`. Then overlay Cursor files — see
`../README.md`.

## Per change

1. `mkdir -p .sdlc/changes/<slug>`
2. Copy `plan.md` into that folder and fill it.
3. Add `intent.md` only if the origin is unclear (incident, external request).
4. Skip `spec.md` unless you are changing published IA or a user-visible contract.
5. Run the repo's existing verify command before calling the task done.
