# UXDX

Published CLI for operator layout and SDLC harness packs. The npm package is
`@ui8kit/uxdx`; the binary is `uxdx`.

Read [`.project/intent.md`](.project/intent.md) before changing product scope.
Nested slices live in [`.project/intents/`](.project/intents/). Keep public
usage in [`README.md`](README.md) aligned with CLI help.

## Structure

- `packages/cli/src/bin.ts` — executable entry
- `packages/cli/src/parse.ts` — commands, flags, and help
- `packages/project/src/` — `project` / `-p`
- `packages/sdlc/src/` — `sdlc` / `-s`
- `packages/sdlc/harness/` — published harness packs
- `dist/uxdx.mjs` — generated npm binary; do not edit by hand

## Development

```bash
bun install
bun test
bun run build
bun run uxdx -- --help
bun run uxdx -- -p --help
bun run uxdx -- -s --help
```

The separator `--` is required after `bun run uxdx`. It is not used after the
package name with `npx` or `bunx`.

Keep initialization idempotent. Do not overwrite existing consumer files
without `--force`. Preserve `.manual/` contents and keep its notes ignored
except for `.manual/.gitkeep`.

Do not invent Codex APIs, product kinds, or a second content REST here.
