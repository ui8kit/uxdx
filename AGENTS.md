# UXDX

Published CLI (`uxdx`) for operator layout and SDLC harness packs. npm name:
[`@ui8kit/uxdx`](https://www.npmjs.com/package/@ui8kit/uxdx). Binary name stays
`uxdx`.

Read [`.project/intent.md`](.project/intent.md) before changing product scope.
Nested slices: [`.project/intents/`](.project/intents/). Public command copy:
[`README.md`](README.md).

## Commands

From this checkout (Bun). The `--` after `bun run uxdx` is required.

```bash
bun test
bun run build
bun run uxdx -- --help
bun run uxdx -- -p --help
bun run uxdx -- -s --help
```

| Need | Command |
| --- | --- |
| Operator files in cwd | `bun run uxdx -- -p` |
| Operator files elsewhere | `bun run uxdx -- -p --dir <path>` |
| Stub Cursor rule | `bun run uxdx -- -p --rules` |
| Install harness | `bun run uxdx -- -s --level light\|core\|full` |
| Copy harness only | `bun run uxdx -- -s --level <level> --no-install` |

Published. Prefer `bunx` (no npm shim). `npx` needs `@0.1.3+` (shebang) and
`--` so `-p` is not taken by `npx`:

```bash
bunx @ui8kit/uxdx -p
bunx @ui8kit/uxdx -s --level light
npx @ui8kit/uxdx@latest -- -p
```

`-p` / `--project` / `project` and `-s` / `--sdlc` / `sdlc` are the same
commands. `--level` is required for `sdlc`. `--force` is never the default.

`project` writes `README.md`, `.gitignore`, `.cursorignore`, `.project/`, and
`.manual/` (`.gitkeep` only when `.manual/` is missing). Notes stay gitignored
via `.manual/*` except `.gitkeep`.

## Verify

```bash
bun test
bun run build
```

Do not invent Codex APIs, product kinds, or a second content REST here.
