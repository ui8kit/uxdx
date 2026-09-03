#!/usr/bin/env bash
# Run from a product repo after this pack is copied to .sdlc/
#   .sdlc/sdlc.sh install
#   .sdlc/sdlc.sh start <slug>
#   .sdlc/sdlc.sh status
set -euo pipefail

SDLC_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
REPO_ROOT="$(CDPATH= cd -- "$SDLC_DIR/.." && pwd)"
MANIFEST="$SDLC_DIR/manifest.yaml"
BEGIN='<!-- sdlc-harness:begin -->'
END='<!-- sdlc-harness:end -->'

die() { printf 'sdlc: %s\n' "$*" >&2; exit 1; }

need_manifest() {
  [[ -f "$MANIFEST" ]] || die "missing $MANIFEST (copy a harness pack into .sdlc/)"
}

level() {
  awk '/^level:[[:space:]]/ { print $2; exit }' "$MANIFEST"
}

warn_location() {
  local base
  base="$(basename -- "$SDLC_DIR")"
  if [[ "$base" != ".sdlc" ]]; then
    printf 'sdlc: warning: script dir is %s (expected .sdlc in a product repo)\n' "$SDLC_DIR" >&2
  fi
}

usage() {
  cat <<EOF
Usage: .sdlc/sdlc.sh <command>

  install              Overlay Cursor rules/skills; merge AGENTS.md at repo root
  start <slug> [opts]  Copy templates into .sdlc/changes/<slug>/
  status               Show level, overlay, and changes

start options:
  --force              Overwrite files that already exist in the change folder
  --intent             Also copy intent.md (light/core; full always copies it)
  --spec               Also copy spec.md (light; core/full as below)
  --boundary           core: copy intent.md + spec.md + plan.md

Repo root is the parent of this .sdlc directory:
  $REPO_ROOT
EOF
}

copy_rules() {
  local src="$SDLC_DIR/cursor/rules" dest="$REPO_ROOT/.cursor/rules" f
  [[ -d "$src" ]] || die "missing $src"
  mkdir -p "$dest"
  shopt -s nullglob
  for f in "$src"/*.mdc; do
    cp -- "$f" "$dest/"
    printf 'sdlc: rule %s\n' "$dest/$(basename -- "$f")"
  done
  shopt -u nullglob
}

copy_skills() {
  local src="$SDLC_DIR/skills" dest="$REPO_ROOT/.cursor/skills" d name
  [[ -d "$src" ]] || die "missing $src"
  mkdir -p "$dest"
  shopt -s nullglob
  for d in "$src"/*/; do
    name="$(basename -- "$d")"
    rm -rf -- "$dest/$name"
    cp -R -- "$d" "$dest/$name"
    printf 'sdlc: skill %s\n' "$dest/$name"
  done
  shopt -u nullglob
}

merge_agents() {
  local overlay="$SDLC_DIR/AGENTS.md" dest="$REPO_ROOT/AGENTS.md" tmp
  [[ -f "$overlay" ]] || die "missing $overlay"
  if [[ ! -f "$dest" ]]; then
    cp -- "$overlay" "$dest"
    printf 'sdlc: created %s\n' "$dest"
    return
  fi
  tmp="$(mktemp)"
  if grep -F -q -- "$BEGIN" "$dest"; then
    awk -v begin="$BEGIN" -v end="$END" -v overlay="$overlay" '
      BEGIN {
        while ((getline line < overlay) > 0) { o = o line "\n" }
        close(overlay)
      }
      index($0, begin) == 1 {
        printf "%s", o
        skip = 1
        next
      }
      skip {
        if (index($0, end) == 1) skip = 0
        next
      }
      { print }
    ' "$dest" >"$tmp"
  else
    cat -- "$dest" >"$tmp"
    printf '\n' >>"$tmp"
    cat -- "$overlay" >>"$tmp"
  fi
  mv -- "$tmp" "$dest"
  printf 'sdlc: merged overlay into %s\n' "$dest"
}

cmd_install() {
  need_manifest
  warn_location
  copy_rules
  copy_skills
  merge_agents
  printf 'sdlc: install done (level %s) repo %s\n' "$(level)" "$REPO_ROOT"
}

valid_slug() {
  [[ "$1" =~ ^[a-z0-9][a-z0-9-]*$ ]] || die "slug must be kebab-case: $1"
}

copy_template() {
  local src="$SDLC_DIR/$1" dest="$2/$1"
  [[ -f "$src" ]] || die "missing template $src"
  if [[ -e "$dest" && "$FORCE" -eq 0 ]]; then
    printf 'sdlc: skip existing %s (use --force)\n' "$dest"
    return
  fi
  cp -- "$src" "$dest"
  printf 'sdlc: %s\n' "$dest"
}

cmd_start() {
  need_manifest
  warn_location
  local slug="" with_intent=0 with_spec=0 boundary=0
  FORCE=0
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --force) FORCE=1; shift ;;
      --intent) with_intent=1; shift ;;
      --spec) with_spec=1; shift ;;
      --boundary) boundary=1; shift ;;
      --help|-h) usage; exit 0 ;;
      -*) die "unknown option $1" ;;
      *)
        [[ -z "$slug" ]] || die "unexpected argument $1"
        slug="$1"
        shift
        ;;
    esac
  done
  [[ -n "$slug" ]] || die "start requires <slug>"
  valid_slug "$slug"

  local lvl dest
  lvl="$(level)"
  dest="$SDLC_DIR/changes/$slug"
  mkdir -p "$dest"

  case "$lvl" in
    light)
      copy_template plan.md "$dest"
      [[ "$with_intent" -eq 1 ]] && copy_template intent.md "$dest"
      [[ "$with_spec" -eq 1 ]] && copy_template spec.md "$dest"
      ;;
    core)
      copy_template plan.md "$dest"
      if [[ "$boundary" -eq 1 || "$with_intent" -eq 1 || "$with_spec" -eq 1 ]]; then
        copy_template intent.md "$dest"
        copy_template spec.md "$dest"
      fi
      ;;
    full)
      copy_template intent.md "$dest"
      copy_template spec.md "$dest"
      copy_template plan.md "$dest"
      ;;
    *)
      die "unknown level in manifest: $lvl"
      ;;
  esac
  printf 'sdlc: change %s ready under %s\n' "$slug" "$dest"
}

cmd_status() {
  need_manifest
  warn_location
  local lvl
  lvl="$(level)"
  printf 'level:     %s\n' "$lvl"
  printf 'sdlc dir:  %s\n' "$SDLC_DIR"
  printf 'repo:      %s\n' "$REPO_ROOT"
  if [[ -f "$REPO_ROOT/AGENTS.md" ]] && grep -F -q -- "$BEGIN" "$REPO_ROOT/AGENTS.md"; then
    printf 'AGENTS.md: overlay present\n'
  else
    printf 'AGENTS.md: overlay missing (run install)\n'
  fi
  if [[ -d "$REPO_ROOT/.cursor/rules" ]]; then
    printf 'rules:\n'
    ls -1 "$REPO_ROOT/.cursor/rules"/sdlc-*.mdc 2>/dev/null || printf '  (no sdlc-*.mdc)\n'
  fi
  printf 'changes:\n'
  if [[ -d "$SDLC_DIR/changes" ]]; then
    local d
    shopt -s nullglob
    for d in "$SDLC_DIR/changes"/*/; do
      printf '  %s\n' "$(basename -- "$d")"
    done
    shopt -u nullglob
  fi
}

main() {
  local cmd="${1:-}"
  [[ -n "$cmd" ]] || { usage; exit 1; }
  shift || true
  case "$cmd" in
    install) cmd_install "$@" ;;
    start) cmd_start "$@" ;;
    status) cmd_status "$@" ;;
    -h|--help|help) usage ;;
    *) die "unknown command $cmd" ;;
  esac
}

main "$@"
