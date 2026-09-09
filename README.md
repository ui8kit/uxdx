# UXDX

CLI for creating operator files and installing SDLC harness packs.

Package: [`@ui8kit/uxdx`](https://www.npmjs.com/package/@ui8kit/uxdx)  
Source: [github.com/ui8kit/uxdx](https://github.com/ui8kit/uxdx)

## Quick start

Create the operator layout in the current directory:

```bash
npx @ui8kit/uxdx@latest -p
```

Install one SDLC harness level:

```bash
npx @ui8kit/uxdx@latest -s --level light
```

You can use `bunx` instead of `npx`:

```bash
bunx @ui8kit/uxdx -p
```

Do not place `--` after the package name. If `npx` prints a `punycode`
deprecation warning, it comes from npm and does not prevent UXDX from running.

## Project layout

`-p` is an alias for `project`. It creates or updates:

- `README.md`
- `.gitignore`
- `.cursorignore`
- `.project/README.md`
- `.manual/.gitkeep` when `.manual/` does not exist

Existing content is preserved unless `--force` is used. Operator notes under
`.manual/` remain ignored by Git.

```bash
npx @ui8kit/uxdx@latest -p --dir ./my-repo
npx @ui8kit/uxdx@latest -p --rules
```

## SDLC harness

`-s` is an alias for `sdlc`. `--level` is required:

```bash
npx @ui8kit/uxdx@latest -s --level light
npx @ui8kit/uxdx@latest -s --level core
npx @ui8kit/uxdx@latest -s --level full
```

The command copies one pack into `.sdlc/` and runs its installer. Use
`--no-install` to copy only, or `--dir <path>` to target another repository.
Do not combine multiple levels in one repository.

## Help

```bash
npx @ui8kit/uxdx@latest --help
npx @ui8kit/uxdx@latest -p --help
npx @ui8kit/uxdx@latest -s --help
```

## Development

```bash
bun install
bun test
bun run build
bun run uxdx -- --help
```

The separator `--` is required only after `bun run uxdx`.
