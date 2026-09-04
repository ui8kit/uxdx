# UXDX

CLI to accumulate operator and developer experience packs. One binary, two
commands. Package name: [`@hinddy/uxdx`](https://www.npmjs.com/package/@hinddy/uxdx)
(was `@ui8kit/uxdx`; keep using this scope after publish).

Homepage: [github.com/ui8kit/uxdx](https://github.com/ui8kit/uxdx)

```text
npx @hinddy/uxdx --help
npx @hinddy/uxdx project | p | -p | --project  [init] [--dir <path>] [--rules] [--force]
npx @hinddy/uxdx sdlc    | s | -s | --sdlc     [init] [--dir <path>] --level light|core|full [--force] [--no-install]
```

Same via Bun: `bunx @hinddy/uxdx --help`.

The binary is still `uxdx`. After a local or global install you can call it
without the scope:

```bash
npm i -g @hinddy/uxdx
uxdx --help

npm i -D @hinddy/uxdx
npx uxdx --help
```

- `project` writes `README.md`, `.gitignore`, `.cursorignore`, and `.manual/.gitkeep` if `.manual/` is missing.
- `sdlc` copies a vendored harness pack into `.sdlc/`. `--level` is required.
- After copy, `sdlc` runs `.sdlc/sdlc.sh install` unless `--no-install`.

## Local

```bash
bun install
bun test
bun run uxdx -- --help
bun run build
```
