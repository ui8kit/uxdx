#!/usr/bin/env bash
set -euo pipefail
exec "$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)/sdlc.sh" start "$@"
