import { describe, expect, test } from "bun:test";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { initProject } from "./init.ts";

describe("initProject", () => {
  test("empty dir gets five entries", () => {
    const dir = mkdtempSync(join(tmpdir(), "uxdx-p-"));
    initProject({ dir, force: false, rules: false });
    expect(existsSync(join(dir, "README.md"))).toBe(true);
    expect(readFileSync(join(dir, "README.md"), "utf8")).toContain("#");
    const gi = readFileSync(join(dir, ".gitignore"), "utf8");
    expect(gi).toContain(".manual/*");
    expect(gi).toContain("!.manual/.gitkeep");
    expect(readFileSync(join(dir, ".cursorignore"), "utf8")).toContain(".manual/");
    expect(existsSync(join(dir, ".project"))).toBe(true);
    expect(existsSync(join(dir, ".manual", ".gitkeep"))).toBe(true);
  });

  test("existing .manual is left alone", () => {
    const dir = mkdtempSync(join(tmpdir(), "uxdx-p-man-"));
    mkdirSync(join(dir, ".manual"));
    writeFileSync(join(dir, ".manual", "note.txt"), "keep");
    initProject({ dir, force: false, rules: false });
    expect(readFileSync(join(dir, ".manual", "note.txt"), "utf8")).toBe("keep");
    expect(existsSync(join(dir, ".manual", ".gitkeep"))).toBe(false);
  });

  test("does not clobber README without force", () => {
    const dir = mkdtempSync(join(tmpdir(), "uxdx-p2-"));
    initProject({ dir, force: false, rules: false });
    const first = readFileSync(join(dir, "README.md"), "utf8");
    initProject({ dir, force: false, rules: false });
    expect(readFileSync(join(dir, "README.md"), "utf8")).toBe(first);
  });

  test("--rules creates stub mdc", () => {
    const dir = mkdtempSync(join(tmpdir(), "uxdx-pr-"));
    initProject({ dir, force: false, rules: true });
    expect(existsSync(join(dir, ".cursor", "rules", "uxdx.mdc"))).toBe(true);
  });
});
