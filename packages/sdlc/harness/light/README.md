# Light harness

For product repos that already have a contract (`AGENTS.md`, rules, tests).

Install:

```text
npx @ui8kit/uxdx sdlc --level light
```

## Per change

1. `bash .sdlc/sdlc.sh start <slug>` (or `mkdir -p .sdlc/changes/<slug>`).
2. Fill `plan.md` in that folder.
3. Add `intent.md` only if the origin is unclear.
4. Skip `spec.md` unless you are changing a published or user-visible contract.
5. Run the repo’s existing verify command before calling the task done.
