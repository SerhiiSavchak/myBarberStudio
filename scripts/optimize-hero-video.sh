#!/bin/bash
# Optimize hero video: compress MP4 (faststart) + create WebM
# Run from project root: ./scripts/optimize-hero-video.sh
# Requires: ffmpeg

set -e
INPUT="public/hero-video.mp4"
WEBM="public/hero-video.webm"
MP4_TMP="public/hero-video-compressed.mp4"

if [ ! -f "$INPUT" ]; then
  echo "Error: $INPUT not found"
  exit 1
fi

echo "=== Step 1: Compress MP4 (CRF 28, faststart) ==="
ffmpeg -y -i "$INPUT" -c:v libx264 -crf 28 -preset medium -an -movflags +faststart -vf "scale=min(1920,iw):min(1080,ih):force_original_aspect_ratio=decrease" "$MP4_TMP"
mv "$MP4_TMP" "$INPUT"
echo "MP4 compressed and replaced."

echo ""
echo "=== Step 2: Create WebM (VP9, 720p max) ==="
ffmpeg -y -i "$INPUT" -c:v libvpx-vp9 -b:v 800k -maxrate 1.2M -bufsize 2M \
  -vf "scale=min(1280,iw):min(720,ih):force_original_aspect_ratio=decrease" \
  -an -loop 1 -t 15 "$WEBM"
echo "WebM saved to $WEBM"

echo ""
echo "Done. Run 'npm run video:optimize' to re-run."
