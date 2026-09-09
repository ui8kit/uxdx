import { describe, expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

describe("node bin", () => {
  test("bundled ESM entry runs without import.meta.main", () => {
    const dir = mkdtempSync(join(tmpdir(), "uxdx-bin-"));
    const outfile = join(dir, "uxdx.mjs");
    const build = spawnSync(
      "bun",
      [
        "build",
        join(import.meta.dir, "bin.ts"),
        "--outfile",
        outfile,
        "--target",
        "node",
      ],
      { encoding: "utf8" },
    );
    expect(build.status).toBe(0);
    const bundled = readFileSync(outfile, "utf8");
    expect(bundled.startsWith("#!/usr/bin/env node\n")).toBe(true);
    expect(bundled).not.toContain("__require.main");

    const help = spawnSync("node", [outfile, "-p", "--help"], { encoding: "utf8" });
    expect(help.status).toBe(0);
    expect(help.stdout).toContain("uxdx project");

    const target = mkdtempSync(join(tmpdir(), "uxdx-bin-p-"));
    const init = spawnSync("node", [outfile, "-p", "--dir", target], {
      encoding: "utf8",
    });
    expect(init.status).toBe(0);
    expect(init.stdout).toContain("uxdx: project init");
  });
});
