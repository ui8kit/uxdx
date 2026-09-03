import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import type { Level } from "../../cli/src/parse.ts";

export type SdlcInitOpts = {
  dir: string;
  level: Level;
  force: boolean;
  install: boolean;
};

function harnessRoot(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  const candidates = [
    join(here, "..", "harness"),
    join(here, "..", "..", "harness"),
    join(here, "..", "packages", "sdlc", "harness"),
    join(process.cwd(), "packages", "sdlc", "harness"),
  ];
  for (const c of candidates) {
    if (existsSync(join(c, "light", "manifest.yaml"))) return c;
  }
  throw new Error("uxdx: SDLC harness packs not found (packages/sdlc/harness)");
}

function readLevel(manifestPath: string): string | null {
  if (!existsSync(manifestPath)) return null;
  const m = readFileSync(manifestPath, "utf8").match(/^level:\s*(\S+)/m);
  return m ? m[1] : null;
}

export function initSdlc(opts: SdlcInitOpts): { sdlcDir: string; installed: boolean } {
  const dest = join(opts.dir, ".sdlc");
  const existing = readLevel(join(dest, "manifest.yaml"));
  if (existing && existing !== opts.level && !opts.force) {
    throw new Error(
      `uxdx: .sdlc already has level ${existing}; use --force to replace with ${opts.level}`,
    );
  }
  const src = join(harnessRoot(), opts.level);
  if (!existsSync(join(src, "manifest.yaml"))) {
    throw new Error(`uxdx: missing harness pack ${opts.level}`);
  }
  mkdirSync(opts.dir, { recursive: true });
  if (existsSync(dest) && opts.force) {
    rmSync(dest, { recursive: true, force: true });
  }
  mkdirSync(dest, { recursive: true });
  cpSync(src, dest, { recursive: true });

  let installed = false;
  if (opts.install) {
    const script = join(dest, "sdlc.sh");
    const r = spawnSync("bash", [script, "install"], {
      cwd: opts.dir,
      encoding: "utf8",
    });
    if (r.error || r.status !== 0) {
      const err = r.stderr || r.error?.message || `exit ${r.status}`;
      throw new Error(`uxdx: .sdlc/sdlc.sh install failed (${err.trim()})`);
    }
    installed = true;
  }
  return { sdlcDir: dest, installed };
}
