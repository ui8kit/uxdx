import { parseArgv, PROJECT_HELP, ROOT_HELP, SDLC_HELP } from "./parse.ts";
import { initProject } from "../../project/src/init.ts";
import { initSdlc } from "../../sdlc/src/init.ts";

export function run(argv: string[]): number {
  let parsed;
  try {
    parsed = parseArgv(argv);
  } catch (e) {
    console.error(`uxdx: ${(e as Error).message}`);
    return 1;
  }

  if (parsed.command === "help") {
    console.log(ROOT_HELP);
    return 0;
  }
  if (parsed.command === "project") {
    if (parsed.help) {
      console.log(PROJECT_HELP);
      return 0;
    }
    const done = initProject({
      dir: parsed.dir,
      force: parsed.force,
      rules: parsed.rules,
    });
    console.log(`uxdx: project init in ${parsed.dir}`);
    for (const p of done) console.log(`  ${p}`);
    return 0;
  }

  if (parsed.help) {
    console.log(SDLC_HELP);
    return 0;
  }
  if (!parsed.level) {
    console.error("uxdx: --level is required (light | core | full)");
    console.log(SDLC_HELP);
    return 1;
  }
  try {
    const { sdlcDir, installed } = initSdlc({
      dir: parsed.dir,
      level: parsed.level,
      force: parsed.force,
      install: parsed.install,
    });
    console.log(`uxdx: sdlc ${parsed.level} → ${sdlcDir}${installed ? " (install ran)" : ""}`);
    return 0;
  } catch (e) {
    console.error((e as Error).message);
    return 1;
  }
}

if (import.meta.main) {
  process.exit(run(process.argv));
}
