# Gallery Seeding + Hero Update Design

**Date:** 2026-05-31
**Status:** Approved

## Goal

Replace the AI-generated hero image and empty gallery with real photos from the Rise & Thrive Bootcamp 2025, sourced from a Pixieset gallery.

## Source

- URL: https://plaxmediagroup.pixieset.com/boysnetwork/
- Download code: 4535
- Expected volume: 50-200 high-resolution JPEGs

## Phases

### Phase 1 — Download

1. Use browser automation to access the Pixieset gallery with the download code.
2. Extract all full-resolution image CDN URLs from the page.
3. Download images with `curl` to `tmp/bootcamp-2025/` (gitignored working directory).

### Phase 2 — Compress

- Tool: `sips` (macOS built-in) or `sharp` via a small Node script.
- Resize: max 1920px wide, maintain aspect ratio.
- Quality: 80% JPEG.
- Target: under 400KB per image.
- Hero candidate: best wide group shot, cropped/exported at 1920x1080.
- Output to `tmp/bootcamp-2025-compressed/`.

### Phase 3 — Upload to Supabase Storage

- Bucket: `gallery` (create if absent).
- Path pattern: `gallery/bootcamp-2025/<filename>.jpg`.
- Collect all public URLs after upload.

### Phase 4 — Seed Database

Insert into `gallery_albums`:
- `slug`: `rise-thrive-bootcamp-2025`
- `title`: `Rise & Thrive Bootcamp 2025`
- `cover_image`: URL of the best group shot
- `photo_count`: total photos uploaded

Insert into `gallery_photos` for each image:
- `album_id`: FK to the album row
- `src`: Supabase public URL
- `alt`: `"Rise & Thrive Bootcamp 2025 — photo N"`
- `aspect`: `landscape` (default) or `portrait` based on dimensions
- `position`: sequential integer

### Phase 5 — Update Hero

In `app/page.tsx`, replace the Framer CDN URL:
```
https://framerusercontent.com/images/zB5KOyiCxdp4LttYLBVC0dNDugQ.png
```
With the Supabase Storage URL of the chosen hero group shot.

Also update the OpenGraph image URL in both `app/page.tsx` metadata and any other pages referencing the old Framer image.

## Constraints

- Supabase Storage free tier: 1GB total. Compression is required.
- Images stay in Supabase Storage, not in the git repo.
- `tmp/` directory is gitignored; no raw or compressed images are committed.
- One album only for this seeding run.

## Success Criteria

- `/gallery` shows the Rise & Thrive Bootcamp 2025 album with a real cover photo.
- `/gallery/rise-thrive-bootcamp-2025` shows the full photo grid.
- Homepage hero displays a real group shot from the bootcamp.
- No Framer CDN image URLs remain in the codebase.
