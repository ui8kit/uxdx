import { describe, expect, test } from "bun:test";
import { mkdtempSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { initProject } from "./init.ts";

describe("initProject", () => {
  test("empty dir gets five entries", () => {
    const dir = mkdtempSync(join(tmpdir(), "uxdx-p-"));
    initProject({ dir, force: false, rules: false });
    expect(existsSync(join(dir, "README.md"))).toBe(true);
    expect(readFileSync(join(dir, "README.md"), "utf8")).toContain("#");
    expect(readFileSync(join(dir, ".gitignore"), "utf8")).toContain(".manual/");
    expect(readFileSync(join(dir, ".cursorignore"), "utf8")).toContain(".manual/");
    expect(existsSync(join(dir, ".project"))).toBe(true);
    expect(existsSync(join(dir, ".manual"))).toBe(true);
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
