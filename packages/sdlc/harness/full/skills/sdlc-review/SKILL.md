---
name: sdlc-review
description: >-
  Review a PR against .sdlc/REVIEW.md, spec.md, and plan.md in a full-harness
  repo. Use when reviewing diffs or addressing review comments.
---

# PR review (full)

1. Read `.sdlc/REVIEW.md` and the change's `spec.md` / `plan.md`.
2. Three passes: bugs, security, compliance with the artifacts.
3. Findings do not merge the PR. A human approves.
4. If the same mistake appears twice, add a line to product `AGENTS.md` or a
   skill — not a one-off comment that will rot.
5. The agent that wrote the diff must not be treated as the approver.
