# SDLC harness packs (solo)

Copy-ready packs for the AI-native loop, sized for one operator. Method:
[The AI-Native SDLC Playbook](https://academy.claude.com/courses/ai-native-sdlc-playbook)
(public course). Map `plan.md` / `CLAUDE.md` onto Cursor Plan mode and
`AGENTS.md`.

This tree is the source of truth. Install a pack with the published CLI:

```text
npx @hinddy/uxdx sdlc --level light|core|full
```

That copies **one** pack into the target repo’s `.sdlc/` and, unless
`--no-install`, overlays Cursor rules/skills and merges `AGENTS.md`.
Never stack two levels. Do not copy this tree by hand.

Package: [`@hinddy/uxdx`](https://www.npmjs.com/package/@hinddy/uxdx)

## How it works

```
@hinddy/uxdx  packages/sdlc/harness/<level>/
        │
        │  npx @hinddy/uxdx sdlc --level <level>
        ▼
your-repo/.sdlc/                             artifacts + overlay text
        │
        ├── intent.md  spec.md  plan.md      templates at pack root
        ├── changes/<slug>/                  one folder per real change
        ├── AGENTS.md                        overlay — merge into root AGENTS.md
        ├── skills/                          copy → .cursor/skills/
        └── cursor/rules/                    copy → .cursor/rules/
```

1. Pick **full**, **core**, or **light**. Never stack two packs.
2. Run `npx @hinddy/uxdx sdlc --level <level>` (add `--dir` if needed).
3. **Activate Cursor** is done by `sdlc.sh install` (default). To copy only:

   ```text
   npx @hinddy/uxdx sdlc --level <level> --no-install
   ```

   then overlay yourself:

   ```bash
   mkdir -p .cursor/rules .cursor/skills
   cp .sdlc/cursor/rules/*.mdc .cursor/rules/
   cp -R .sdlc/skills/* .cursor/skills/
   ```

4. **AGENTS.md**: if the repo already has one, the install **appends** a
   marked overlay. Do not replace product contract text. If there is no root
   file, install writes `.sdlc/AGENTS.md` to the repo root.
5. For each change: copy templates into `.sdlc/changes/<slug>/` (`sdlc.sh
   start <slug>`) and fill them. Leave the pack-root files as templates.
6. Existing product rules stay. The harness adds SDLC rules only.

Human still merges. The agent writes artifacts and code; you accept `plan.md`
before a large diff.

## Levels

| Pack | Use when | Artifacts | Extra |
| --- | --- | --- | --- |
| `light/` | Product already has a contract; small blast radius | `plan.md` required; `intent.md` optional; skip `spec.md` unless the public contract changes | No evals, no maintain bands |
| `core/` | Kernel, API, or shared library | `intent.md` + `plan.md`; short `spec.md` on boundary changes | Invariant skills; short `REVIEW.md` |
| `full/` | Shipping product or high-stakes operator surface | Full chain including `spec.md` | `REVIEW.md`, `evals/` stub, `bands.yaml` stub |

## Commands

```text
npx @hinddy/uxdx sdlc --level full
bash .sdlc/sdlc.sh install
bash .sdlc/sdlc.sh start <slug>
bash .sdlc/sdlc.sh status
```
