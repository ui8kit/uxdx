import { describe, expect, test } from "bun:test";
import { mkdtempSync, existsSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { run } from "./main.ts";

describe("run", () => {
  test("root help", () => {
    expect(run(["bun", "uxdx"])).toBe(0);
    expect(run(["bun", "uxdx", "--help"])).toBe(0);
  });

  test("project help aliases", () => {
    expect(run(["bun", "uxdx", "-p", "--help"])).toBe(0);
    expect(run(["bun", "uxdx", "project", "--help"])).toBe(0);
  });

  test("sdlc help aliases", () => {
    expect(run(["bun", "uxdx", "-s", "--help"])).toBe(0);
    expect(run(["bun", "uxdx", "sdlc", "--help"])).toBe(0);
  });

  test("sdlc without --level fails", () => {
    expect(run(["bun", "uxdx", "sdlc"])).toBe(1);
  });

  test("unknown command fails", () => {
    expect(run(["bun", "uxdx", "wat"])).toBe(1);
  });

  test("project init empty dir", () => {
    const dir = mkdtempSync(join(tmpdir(), "uxdx-run-p-"));
    expect(run(["bun", "uxdx", "-p", "--dir", dir])).toBe(0);
    expect(existsSync(join(dir, "README.md"))).toBe(true);
    expect(readFileSync(join(dir, ".gitignore"), "utf8")).toContain(".manual/*");
    expect(existsSync(join(dir, ".project"))).toBe(true);
    expect(existsSync(join(dir, ".manual", ".gitkeep"))).toBe(true);
  });

  test("sdlc light with --no-install", () => {
    const dir = mkdtempSync(join(tmpdir(), "uxdx-run-s-"));
    expect(
      run(["bun", "uxdx", "-s", "--level", "light", "--dir", dir, "--no-install"]),
    ).toBe(0);
    const man = join(dir, ".sdlc", "manifest.yaml");
    expect(existsSync(man)).toBe(true);
    expect(readFileSync(man, "utf8")).toContain("level: light");
    expect(existsSync(join(dir, ".sdlc", "sdlc.sh"))).toBe(true);
  });
});
