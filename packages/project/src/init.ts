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

export function initProject(opts: ProjectInitOpts): string[] {
  const root = opts.dir;
  mkdirSync(root, { recursive: true });
  const done: string[] = [];
  const name = basename(root);

  const readme = join(root, "README.md");
  writeIfMissing(readme, `# ${name}\n`, opts.force);
  done.push("README.md");

  ensureLine(join(root, ".gitignore"), ".manual/", opts.force);
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

  mkdirSync(join(root, ".manual"), { recursive: true });
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
