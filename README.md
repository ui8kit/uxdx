# UXDX

CLI to accumulate operator and developer experience packs. One binary, two
commands. Package name: [`@ui8kit/uxdx`](https://www.npmjs.com/package/@ui8kit/uxdx).

Homepage: [github.com/ui8kit/uxdx](https://github.com/ui8kit/uxdx)

```text
npx @ui8kit/uxdx --help
npx @ui8kit/uxdx project | p | -p | --project  [init] [--dir <path>] [--rules] [--force]
npx @ui8kit/uxdx sdlc    | s | -s | --sdlc     [init] [--dir <path>] --level light|core|full [--force] [--no-install]
```

Same via Bun: `bunx @ui8kit/uxdx --help`.

The binary is still `uxdx`. After a local or global install you can call it
without the scope:

```bash
npm i -g @ui8kit/uxdx
uxdx --help

npm i -D @ui8kit/uxdx
npx uxdx --help
```

- `project` writes `README.md`, `.gitignore`, `.cursorignore`, and `.manual/`.
- `sdlc` copies a vendored harness pack into `.sdlc/`. `--level` is required.
- After copy, `sdlc` runs `.sdlc/sdlc.sh install` unless `--no-install`.

## Local

```bash
bun install
bun test
bun run uxdx -- --help
bun run build
```
