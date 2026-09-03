# Review instructions (full)

## Passes

Run three passes and tag each finding:

- Bugs: logic errors, broken edge cases, subtle regressions
- Security: injection, auth gaps, PII in logs, CSRF/session mistakes
- Compliance: the change matches `spec.md`, `plan.md`, and this repo's
  `AGENTS.md` / `.project/` ADRs

## Important vs nit

Important: would break behaviour, leak data, or breach a documented policy.
Style and naming are nits. At most five nits; summarize the rest as a count.

## Do not report

Generated files the repo forbids editing, and anything CI already enforces.
