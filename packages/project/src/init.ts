import { mkdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

export type ProjectInitOpts = {
  dir: string;
  force: boolean;
  rules: boolean;
};

function ensureLine(file: string, line: string, _force: boolean): void {
  if (!existsSync(file)) {
    writeFileSync(file, `${line}\n`);
    return;
  }
  const cur = readFileSync(file, "utf8");
  if (cur.split(/\r?\n/).some((l) => l.trim() === line.trim())) return;
  const nl = cur.endsWith("\n") || cur.length === 0 ? "" : "\n";
  writeFileSync(file, `${cur}${nl}${line}\n`);
}

function writeIfMissing(file: string, body: string, force: boolean): void {
  if (existsSync(file) && !force) return;
  writeFileSync(file, body);
}

/** Track an empty `.manual/` in git; keep operator notes untracked. */
function ensureManualGitignore(file: string): void {
  const block = ".manual/*\n!.manual/.gitkeep\n";
  if (!existsSync(file)) {
    writeFileSync(file, block);
    return;
  }
  const cur = readFileSync(file, "utf8");
  const lines = cur.split(/\r?\n/);
  if (lines.some((l) => l.trim() === ".manual/*")) {
    ensureLine(file, "!.manual/.gitkeep", false);
    return;
  }
  const withoutFull = lines.filter((l) => l.trim() !== ".manual/");
  const next = withoutFull.join("\n");
  const nl = next.endsWith("\n") || next.length === 0 ? "" : "\n";
  writeFileSync(file, `${next}${nl}${block}`);
}

function ensureManualDir(root: string): void {
  const dir = join(root, ".manual");
  if (existsSync(dir)) return;
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, ".gitkeep"), "");
}

export function initProject(opts: ProjectInitOpts): string[] {
  const root = opts.dir;
  mkdirSync(root, { recursive: true });
  const done: string[] = [];
  const name = basename(root);

  const readme = join(root, "README.md");
  writeIfMissing(readme, `# ${name}\n`, opts.force);
  done.push("README.md");

  ensureManualGitignore(join(root, ".gitignore"));
  done.push(".gitignore");
  ensureLine(join(root, ".cursorignore"), ".manual/", opts.force);
  done.push(".cursorignore");

  const projectDir = join(root, ".project");
  mkdirSync(projectDir, { recursive: true });
  writeIfMissing(
    join(projectDir, "README.md"),
    `# .project\n\nOperator notes for this repository. See \`intent.md\` when present.\n`,
    opts.force,
  );
  done.push(".project/");

  ensureManualDir(root);
  done.push(".manual/");

  if (opts.rules) {
    const rulesDir = join(root, ".cursor", "rules");
    mkdirSync(rulesDir, { recursive: true });
    writeIfMissing(
      join(rulesDir, "uxdx.mdc"),
      `---
description: UXDX operator layout
alwaysApply: true
---

# UXDX

Read the repository operator notes before changing product scope.
`,
      opts.force,
    );
    done.push(".cursor/rules/");
  }

  return done;
}
