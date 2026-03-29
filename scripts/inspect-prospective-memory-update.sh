#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONFIG_FILE="${HOME}/.codex/config.toml"
STITCH_SNIPPET="awk '/\\[mcp_servers.stitch\\]/{flag=1} /\\[mcp_servers.playwright\\]/{flag=0} flag' \"$CONFIG_FILE\""
COMMAND="sed -n '296,360p' \"$ROOT_DIR/index.html\" && printf '\n---\n' && sed -n '1,260p' \"$ROOT_DIR/blogs/prospective-memory-toggle-reminder.html\" && printf '\n---\n' && $STITCH_SNIPPET && printf '\n---\n' && ls -1 \"$ROOT_DIR/blogs/assets\"/toggle-reminder-screen-1.png \"$ROOT_DIR/blogs/assets\"/toggle-reminder-screen-3.png"

gum style --border rounded --padding "0 1" --margin "1 0" \
  "Inspect command" \
  "$COMMAND"

if ! gum confirm "Show the Stitch-based homepage/blog update in the terminal?"; then
  echo "Aborted."
  exit 0
fi

sed -n '296,360p' "$ROOT_DIR/index.html"
printf '\n---\n'
sed -n '1,260p' "$ROOT_DIR/blogs/prospective-memory-toggle-reminder.html"
printf '\n---\n'
awk '/\[mcp_servers.stitch\]/{flag=1} /\[mcp_servers.playwright\]/{flag=0} flag' "$CONFIG_FILE"
printf '\n---\n'
ls -1 \
  "$ROOT_DIR"/blogs/assets/toggle-reminder-screen-1.png \
  "$ROOT_DIR"/blogs/assets/toggle-reminder-screen-3.png
