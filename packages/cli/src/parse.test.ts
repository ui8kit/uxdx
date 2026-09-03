import { describe, expect, test } from "bun:test";
import { parseArgv } from "./parse.ts";

describe("parseArgv", () => {
  test("root help", () => {
    expect(parseArgv(["bun", "uxdx"]).command).toBe("help");
    expect(parseArgv(["bun", "uxdx", "--help"]).command).toBe("help");
  });

  test("project aliases", () => {
    for (const a of ["project", "p", "-p", "--project"]) {
      const p = parseArgv(["bun", "uxdx", a, "--dir", "/tmp/x"]);
      expect(p.command).toBe("project");
      if (p.command === "project") {
        expect(p.dir).toBe("/tmp/x");
        expect(p.help).toBe(false);
      }
    }
  });

  test("uxdx -p --help", () => {
    const p = parseArgv(["bun", "uxdx", "-p", "--help"]);
    expect(p.command).toBe("project");
    if (p.command === "project") expect(p.help).toBe(true);
  });

  test("uxdx -s --help", () => {
    const p = parseArgv(["bun", "uxdx", "-s", "--help"]);
    expect(p.command).toBe("sdlc");
    if (p.command === "sdlc") expect(p.help).toBe(true);
  });

  test("sdlc requires parsing level", () => {
    const p = parseArgv(["bun", "uxdx", "-s", "--level", "light"]);
    expect(p.command).toBe("sdlc");
    if (p.command === "sdlc") {
      expect(p.level).toBe("light");
      expect(p.install).toBe(true);
    }
  });

  test("sdlc --no-install", () => {
    const p = parseArgv(["bun", "uxdx", "sdlc", "--level", "core", "--no-install"]);
    expect(p.command).toBe("sdlc");
    if (p.command === "sdlc") expect(p.install).toBe(false);
  });
});
