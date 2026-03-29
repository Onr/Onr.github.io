#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if ! command -v gum >/dev/null 2>&1; then
  echo "gum is required. Install it from https://github.com/charmbracelet/gum" >&2
  exit 1
fi

choice="$(
  gum choose \
    --header "Personal website CLI" \
    --cursor-prefix "→ " \
    --height 10 \
    "Preview website locally  Start a local server (default: port 8000)" \
    "Inspect Stitch Toggle Reminder refresh  Review the homepage, blog, assets, and Stitch MCP config"
)"

case "$choice" in
  "Preview website locally  Start a local server (default: port 8000)")
    "$ROOT_DIR/scripts/preview-site.sh"
    ;;
  "Inspect Stitch Toggle Reminder refresh  Review the homepage, blog, assets, and Stitch MCP config")
    "$ROOT_DIR/scripts/inspect-prospective-memory-update.sh"
    ;;
  *)
    exit 0
    ;;
esac
