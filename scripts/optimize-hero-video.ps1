# Optimize hero video: create WebM (smaller) and optionally compress MP4
# Requires: ffmpeg (choco install ffmpeg or download from ffmpeg.org)
# Run from project root: .\scripts\optimize-hero-video.ps1

$Input = "public/hero-video.mp4"
$WebM = "public/hero-video.webm"

if (-not (Test-Path $Input)) {
    Write-Error "Error: $Input not found"
    exit 1
}

Write-Host "Creating WebM (VP9, no audio, 720p max)..."
ffmpeg -y -i $Input -c:v libvpx-vp9 -b:v 800k -maxrate 1.2M -bufsize 2M `
  -vf "scale=min(1280,iw):min(720,ih):force_original_aspect_ratio=decrease" `
  -an -loop 1 -t 12 $WebM

Write-Host "Done. WebM saved to $WebM"
Write-Host "Optional: compress MP4 with: ffmpeg -i $Input -c:v libx264 -crf 28 -preset slow -an -movflags +faststart public/hero-video-compressed.mp4"
