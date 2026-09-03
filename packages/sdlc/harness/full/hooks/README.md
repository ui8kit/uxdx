# Hooks (notes, not a runtime)

Solo default: rely on existing tests and PR review.

Add deterministic hooks later if you run Claude Code / Cursor hooks in this
repo, for example:

- Block edits to generated or frozen paths
- Block secret files (`.env`, `**/secrets/**`)
- Ask a human before production deploy commands

Keep approval prompts off the build hot path so parallel sessions are not
serialized. Production gates belong at deploy, not on every file save.

Example PreToolUse shape lives in the public playbook
([hooks as approval gates](https://academy.claude.com/courses/ai-native-sdlc-playbook/hooks-as-approval-gates)).
Do not enable managed-only enterprise settings unless you actually operate MDM.
