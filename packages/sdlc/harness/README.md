# SDLC harness packs (solo)

Copy-paste packs for the AI-native loop, sized for one operator. Source method:
[`.manual/sdlc-en`](../.manual/sdlc-en/README.md). Which product gets which pack:
[`.project/sdlc-scope.md`](../.project/sdlc-scope.md).

Later this tree can move to its own repo or a CLI (`sdlc init --level full`).
Until then the consumer copies **one** pack into **`.sdlc/`**.

## How it works

```
hinddy/brainstorm/.harness-sdlc/<level>/     (this gym)
        │
        │  copy (do not merge levels)
        ▼
your-repo/.sdlc/                             artifacts + overlay text
        │
        ├── intent.md  spec.md  plan.md      templates at pack root
        ├── changes/<slug>/                  one folder per real change
        ├── AGENTS.md                        overlay — merge into root AGENTS.md
        ├── skills/                          copy → .cursor/skills/
        └── cursor/rules/                    copy → .cursor/rules/
```

1. Pick **full**, **core**, or **light** from `sdlc-scope.md`. Never stack two packs.
2. Copy the pack directory contents into `<repo>/.sdlc/` (keep `manifest.yaml`).
3. **Activate Cursor** (rules/skills are not loaded from `.sdlc` by default):

   ```bash
   mkdir -p .cursor/rules .cursor/skills
   cp .sdlc/cursor/rules/*.mdc .cursor/rules/
   cp -R .sdlc/skills/* .cursor/skills/
   ```

4. **AGENTS.md**: if the repo already has a product `AGENTS.md` (SiteStarter, YPanel, …), **append** a short pointer. Do not replace stack-contract text. If there is no root file, copy `.sdlc/AGENTS.md` to the repo root.
5. For each change: copy `intent.md` / `spec.md` / `plan.md` into `.sdlc/changes/<slug>/` and fill them. Leave the pack-root files as templates.
6. Existing product rules (`.cursor/rules/stack-contract.mdc`, …) stay. The harness adds SDLC rules; it does not own Codex IA.

Human still merges. The agent writes artifacts and code; you accept `plan.md` before a large diff.

## Levels

| Pack | Use when | Artifacts | Extra |
| --- | --- | --- | --- |
| `light/` | Product on an existing contract; small blast radius | `plan.md` required; `intent.md` optional; skip `spec.md` unless IA changes | No evals, no maintain bands |
| `core/` | Kernel, API, ARIA, shared library | `intent.md` + `plan.md`; compressed `spec.md` on boundary changes | Invariant skills; short `REVIEW.md` |
| `full/` | Portable Codex path, YPanel, anything that ships + is pinned | Full chain including `spec.md` | `REVIEW.md`, `evals/` stub, `bands.yaml` stub |

## Future CLI (not built)

Suggested commands, matching `manifest.yaml` in each pack:

- `sdlc init --level full` → copy pack to `.sdlc`, overlay rules/skills, patch root `AGENTS.md` between markers
- `sdlc change start <slug>` → copy templates into `.sdlc/changes/<slug>/`
- `sdlc change accept` → remind to commit artifacts with the diff

Do not invent a second content REST or product kinds from this harness.
