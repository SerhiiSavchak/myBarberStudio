#!/usr/bin/env bash
# Transcode hero MP4s for web: no audio, H.264, yuv420p, faststart.
# Does NOT overwrite originals — writes *.optimized.mp4 next to sources.
# After verifying quality, replace originals or point constants/media.ts to .optimized.mp4
#
# Requires: ffmpeg
# From repo root: bash scripts/optimize-hero-videos.sh

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DES="$ROOT/public/videos/hero/hero-desktop.mp4"
MOB="$ROOT/public/videos/hero/hero-mobile.mp4"
OUT_DES="$ROOT/public/videos/hero/hero-desktop.optimized.mp4"
OUT_MOB="$ROOT/public/videos/hero/hero-mobile.optimized.mp4"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Install ffmpeg and re-run."
  exit 1
fi

echo "=== Desktop (max 1600w, CRF 23, no audio, faststart) ==="
ffmpeg -y -i "$DES" -an \
  -vf "scale='min(1600,iw)':-2,fps=30" \
  -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p \
  -movflags +faststart \
  "$OUT_DES"

echo "=== Mobile (max 900w, CRF 23, no audio, faststart) ==="
ffmpeg -y -i "$MOB" -an \
  -vf "scale='min(900,iw)':-2,fps=30" \
  -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p \
  -movflags +faststart \
  "$OUT_MOB"

ls -lh "$OUT_DES" "$OUT_MOB"
echo "Done. Update constants/media.ts to use .optimized.mp4 when satisfied, or replace originals."
