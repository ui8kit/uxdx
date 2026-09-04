export type Level = "light" | "core" | "full";

export type ProjectArgs = {
  command: "project";
  help: boolean;
  dir: string;
  force: boolean;
  rules: boolean;
};

export type SdlcArgs = {
  command: "sdlc";
  help: boolean;
  dir: string;
  force: boolean;
  level: Level | null;
  install: boolean;
};

export type RootHelp = { command: "help" };

export type Parsed = ProjectArgs | SdlcArgs | RootHelp;

const LEVELS = new Set<string>(["light", "core", "full"]);

function takeFlag(rest: string[], name: string): boolean {
  const i = rest.indexOf(name);
  if (i === -1) return false;
  rest.splice(i, 1);
  return true;
}

function takeOpt(rest: string[], name: string): string | null {
  const i = rest.indexOf(name);
  if (i === -1) return null;
  const v = rest[i + 1];
  if (!v || v.startsWith("-")) {
    throw new Error(`${name} requires a value`);
  }
  rest.splice(i, 2);
  return v;
}

function stripInit(rest: string[]): void {
  if (rest[0] === "init") rest.shift();
}

export function parseArgv(argv: string[]): Parsed {
  const args = argv.slice(2);
  if (args.length === 0) return { command: "help" };

  const head = args[0];
  const rest = args.slice(1);

  if (head === "--help" || head === "-h") {
    if (rest[0] === "-p" || rest[0] === "--project" || rest[0] === "p" || rest[0] === "project") {
      return parseProject(rest.slice(1), true);
    }
    if (rest[0] === "-s" || rest[0] === "--sdlc" || rest[0] === "s" || rest[0] === "sdlc") {
      return parseSdlc(rest.slice(1), true);
    }
    return { command: "help" };
  }

  if (head === "-p" || head === "--project" || head === "p" || head === "project") {
    return parseProject(rest, false);
  }
  if (head === "-s" || head === "--sdlc" || head === "s" || head === "sdlc") {
    return parseSdlc(rest, false);
  }

  throw new Error(`unknown command ${head} (try --help)`);
}

function parseProject(restIn: string[], forcedHelp: boolean): ProjectArgs {
  const rest = [...restIn];
  stripInit(rest);
  const help = forcedHelp || takeFlag(rest, "--help") || takeFlag(rest, "-h");
  const force = takeFlag(rest, "--force");
  const rules = takeFlag(rest, "--rules");
  const dir = takeOpt(rest, "--dir") ?? process.cwd();
  if (rest.length) throw new Error(`unexpected arguments: ${rest.join(" ")}`);
  return { command: "project", help, dir, force, rules };
}

function parseSdlc(restIn: string[], forcedHelp: boolean): SdlcArgs {
  const rest = [...restIn];
  stripInit(rest);
  const help = forcedHelp || takeFlag(rest, "--help") || takeFlag(rest, "-h");
  const force = takeFlag(rest, "--force");
  const noInstall = takeFlag(rest, "--no-install");
  const dir = takeOpt(rest, "--dir") ?? process.cwd();
  const levelRaw = takeOpt(rest, "--level");
  let level: Level | null = null;
  if (levelRaw) {
    if (!LEVELS.has(levelRaw)) throw new Error(`--level must be light, core, or full`);
    level = levelRaw as Level;
  }
  if (rest.length) throw new Error(`unexpected arguments: ${rest.join(" ")}`);
  return {
    command: "sdlc",
    help,
    dir,
    force,
    level,
    install: !noInstall,
  };
}

export const ROOT_HELP = `uxdx — operator and developer experience packs

Usage:
  uxdx [--help]
  uxdx project | p | -p | --project  [init] [--dir <path>] [--rules] [--force]
  uxdx sdlc    | s | -s | --sdlc     [init] [--dir <path>] --level light|core|full [--force] [--no-install]

  -p / --project   Scaffold README, ignores, and .manual/.gitkeep if missing
  -s / --sdlc      Install an SDLC harness pack into .sdlc/

Run uxdx project --help or uxdx sdlc --help for command flags.
`;

export const PROJECT_HELP = `uxdx project — default operator layout

Aliases: project, p, -p, --project

  [init]         Default action (may be omitted)
  --dir <path>   Target directory (default: cwd)
  --rules        Create a stub .cursor/rules file
  --force        Overwrite files this command owns
  --help         This text
`;

export const SDLC_HELP = `uxdx sdlc — install an SDLC harness into .sdlc/

Aliases: sdlc, s, -s, --sdlc

  [init]              Default action (may be omitted)
  --level <name>      Required: light | core | full
  --dir <path>        Target directory (default: cwd)
  --no-install        Copy the pack only; do not run .sdlc/sdlc.sh install
  --force             Replace an existing .sdlc of a different level
  --help              This text
`;
