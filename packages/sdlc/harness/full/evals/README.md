# Agent evals (stub)

When this repo's agent config (`AGENTS.md`, `.sdlc`, `.cursor/rules`, skills)
changes, add 20–50 real tasks here later. Each eval is a prompt plus checks
(tests pass, lint clean, policy followed).

Do not add a second CI framework. Prefer the existing GitHub Actions /
`make verify` job, gated on paths:

- `AGENTS.md`
- `.sdlc/**`
- `.cursor/rules/**`
- `.cursor/skills/**`

A production incident becomes a permanent eval in this folder, owned by the
person who closed the incident.
