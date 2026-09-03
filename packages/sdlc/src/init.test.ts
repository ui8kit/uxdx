import { describe, expect, test } from "bun:test";
import { mkdtempSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { initSdlc } from "./init.ts";

describe("initSdlc", () => {
  test("light pack copies manifest and sdlc.sh", () => {
    const dir = mkdtempSync(join(tmpdir(), "uxdx-s-"));
    initSdlc({ dir, level: "light", force: false, install: false });
    const man = join(dir, ".sdlc", "manifest.yaml");
    expect(existsSync(man)).toBe(true);
    expect(readFileSync(man, "utf8")).toContain("level: light");
    expect(existsSync(join(dir, ".sdlc", "sdlc.sh"))).toBe(true);
  });

  test("refuses to mix levels without --force", () => {
    const dir = mkdtempSync(join(tmpdir(), "uxdx-sm-"));
    initSdlc({ dir, level: "light", force: false, install: false });
    expect(() => initSdlc({ dir, level: "full", force: false, install: false })).toThrow(
      /already has level light/,
    );
  });

  test("sdlc.sh status prints level: light", () => {
    const dir = mkdtempSync(join(tmpdir(), "uxdx-st-"));
    initSdlc({ dir, level: "light", force: false, install: false });
    const r = spawnSync("bash", [join(dir, ".sdlc", "sdlc.sh"), "status"], {
      cwd: dir,
      encoding: "utf8",
    });
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("level:");
    expect(r.stdout).toMatch(/light/);
  });

  test("install overlays rules and AGENTS.md", () => {
    const dir = mkdtempSync(join(tmpdir(), "uxdx-in-"));
    initSdlc({ dir, level: "light", force: false, install: true });
    expect(existsSync(join(dir, ".cursor", "rules", "sdlc-light.mdc"))).toBe(true);
    expect(readFileSync(join(dir, "AGENTS.md"), "utf8")).toContain("sdlc-harness:begin");
  });
});
