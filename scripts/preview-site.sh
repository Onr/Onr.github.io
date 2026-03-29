#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${PORT:-8000}"
COMMAND="python3 -m http.server ${PORT} --directory \"$ROOT_DIR\""

gum style --border rounded --padding "0 1" --margin "1 0" \
  "Preview command" \
  "$COMMAND"

if ! gum confirm "Start local preview server on http://127.0.0.1:${PORT}?"; then
  echo "Aborted."
  exit 0
fi

echo "Serving $ROOT_DIR on http://127.0.0.1:${PORT}"
exec python3 -m http.server "$PORT" --directory "$ROOT_DIR"
