# UXDX

CLI for operator files and SDLC harness packs. One binary (`uxdx`), two
commands. Package: [`@ui8kit/uxdx`](https://www.npmjs.com/package/@ui8kit/uxdx).

Repo: [github.com/ui8kit/uxdx](https://github.com/ui8kit/uxdx)

## Run

Prefer Bun (no Node `punycode` warning from `npx`):

```bash
bunx @ui8kit/uxdx --help
bunx @ui8kit/uxdx -p
bunx @ui8kit/uxdx -s --level light
```

Same via npm (`@ui8kit/uxdx@0.1.3` or later; `0.1.2` shims do not run Node):

```bash
npx @ui8kit/uxdx@latest --help
npx @ui8kit/uxdx@latest -- -p
npx @ui8kit/uxdx@latest -- -s --level light
```

`npx` may print `DEP0040` / `punycode`. That comes from npm’s Node, not this
CLI. `--` keeps flags for `uxdx` (`npx` also has `-p`). Success still requires
`uxdx: project init` or `uxdx: sdlc …` after the warning.

After a local or global install the binary is unscoped:

```bash
npm i -g @ui8kit/uxdx
uxdx --help

npm i -D @ui8kit/uxdx
npx uxdx --help
```

## Commands

Aliases are equivalent. `init` is the default and may be omitted.

```text
uxdx [--help]
uxdx project | p | -p | --project  [init] [--dir <path>] [--rules] [--force]
uxdx sdlc    | s | -s | --sdlc     [init] [--dir <path>] --level light|core|full [--force] [--no-install]
```

| Flag | Command | Meaning |
| --- | --- | --- |
| `--dir <path>` | both | Target repo (default: cwd) |
| `--force` | both | Overwrite files this tool owns |
| `--rules` | `project` | Stub `.cursor/rules/uxdx.mdc` if missing |
| `--level` | `sdlc` | Required: `light`, `core`, or `full` |
| `--no-install` | `sdlc` | Copy `.sdlc/` only; skip `sdlc.sh install` |

### `project` (`-p`)

Writes the default operator layout. Existing filled files are left alone
unless `--force`. If `.manual/` already exists, it is not touched.

```bash
bunx @ui8kit/uxdx -p
bunx @ui8kit/uxdx -p --dir ./my-repo --rules
```

Creates or updates:

- `README.md` (only if missing)
- `.gitignore` (`.manual/*` + `!.manual/.gitkeep`)
- `.cursorignore` (`.manual/`)
- `.project/README.md` stub
- `.manual/.gitkeep` (only if `.manual/` is missing)

Success:

```text
uxdx: project init in <dir>
  README.md
  .gitignore
  .cursorignore
  .project/
  .manual/
```

### `sdlc` (`-s`)

Copies one vendored pack into `.sdlc/`. `--level` is required (no silent
`full`). Then runs `.sdlc/sdlc.sh install` unless `--no-install`.

```bash
bunx @ui8kit/uxdx -s --level light
bunx @ui8kit/uxdx -s --level core --dir ./my-repo
bunx @ui8kit/uxdx -s --level full --no-install
```

Do not stack two levels in one repo. Use `--force` only to replace a
different level.

Pack source: `packages/sdlc/harness/`.

## This checkout

```bash
bun install
bun test
bun run build
bun run uxdx -- --help
bun run uxdx -- -p --help
bun run uxdx -- -s --help
```

`--` after `bun run uxdx` is required so flags go to the CLI, not to Bun.
