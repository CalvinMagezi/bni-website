# Gallery Seeding + Hero Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Download real bootcamp photos from Pixieset, compress them, upload to Supabase Storage, seed the gallery DB, and swap the AI-generated hero image for a real group shot.

**Architecture:** Three disposable scripts in `scripts/` handle download → compress → upload/seed. The scripts are run once and never deployed. All image file I/O goes through a gitignored `tmp/` directory. The gallery already has `gallery_albums` + `gallery_photos` tables and a working admin panel. The hero swap is a single-line change in `app/page.tsx`.

**Tech Stack:** macOS `sips` (compression), `@supabase/supabase-js` (upload + seed), Claude-in-Chrome (Pixieset scrape), `curl` (download)

---

## File Map

| Path | Action | Purpose |
|------|--------|---------|
| `tmp/raw/` | Create (gitignored) | Raw full-res downloads from Pixieset |
| `tmp/compressed/` | Create (gitignored) | sips-resized output (≤400 KB each) |
| `tmp/urls.json` | Create (gitignored) | Supabase public URLs written by upload script |
| `scripts/upload-and-seed.js` | Create | Uploads compressed images + inserts DB rows |
| `app/page.tsx` | Modify (1 line) | Replace Framer hero URL with Supabase URL |
| `.gitignore` | Modify | Add `tmp/` entry |

---

## Task 1: Prepare working directories + gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add tmp/ to .gitignore**

Open `.gitignore` and append:

```
# one-time seeding workdir — never commit images
tmp/
scripts/
```

- [ ] **Step 2: Create the directories**

```bash
mkdir -p tmp/raw tmp/compressed
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: ignore tmp/ and scripts/ (gallery seeding workdir)"
```

---

## Task 2: Verify Supabase Storage bucket exists

The gallery needs a public `gallery` bucket. This must be done in the Supabase dashboard before the upload script runs.

**Files:** None (dashboard action only)

- [ ] **Step 1: Open Supabase dashboard**

Go to your Supabase project → Storage → Buckets.

- [ ] **Step 2: Create bucket if missing**

If a bucket named `gallery` does not exist, click **New Bucket**:
- Name: `gallery`
- Public bucket: **ON** (so images render without auth tokens)

- [ ] **Step 3: Add service role key to .env.local**

The upload script needs the service role key (the anon key cannot write to Storage).

In Supabase → Settings → API, copy the **service_role** key (keep it secret).

Add to `.env.local`:

```
SUPABASE_SERVICE_ROLE_KEY=eyJ...your_key_here
```

Do NOT commit `.env.local` — it's already in `.gitignore`.

---

## Task 3: Download images from Pixieset

Use the Claude-in-Chrome browser tools to access the gallery and extract the full-resolution image URLs, then batch-download with curl.

**Files:**
- Create: `tmp/raw/` (populated with downloaded JPEGs)

- [ ] **Step 1: Open the Pixieset gallery in browser**

Using Claude-in-Chrome (mcp__claude-in-chrome__navigate):
- Navigate to: `https://plaxmediagroup.pixieset.com/boysnetwork/`

- [ ] **Step 2: Enter the download code**

On the page there will be a password/download-code prompt. Enter `4535` and submit. Wait for the gallery to load.

- [ ] **Step 3: Extract all full-resolution image URLs via JavaScript**

Use `mcp__claude-in-chrome__javascript_tool` to run:

```javascript
// Pixieset loads full-res URLs in data attributes or image src attributes.
// This extracts all unique image URLs from the page.
const urls = [];
document.querySelectorAll('img').forEach(img => {
  const src = img.getAttribute('data-src') || img.src;
  if (src && src.includes('pixieset') && !src.includes('thumb') && !urls.includes(src)) {
    urls.push(src);
  }
});
// Also check data-full attributes
document.querySelectorAll('[data-full]').forEach(el => {
  const src = el.getAttribute('data-full');
  if (src && !urls.includes(src)) urls.push(src);
});
// Check for lazy-load data attributes
document.querySelectorAll('[data-image-url], [data-url]').forEach(el => {
  const src = el.getAttribute('data-image-url') || el.getAttribute('data-url');
  if (src && !urls.includes(src)) urls.push(src);
});
console.log(JSON.stringify(urls, null, 2));
return urls;
```

Capture the returned array of URLs. If fewer than 5 URLs are returned, scroll the page to trigger lazy-load and re-run. The gallery typically has 50-200 photos.

- [ ] **Step 4: Save the URL list to a file**

Write the URLs to `tmp/pixieset-urls.txt` (one URL per line):

```bash
# Replace with actual URLs from step 3
cat > tmp/pixieset-urls.txt << 'EOF'
https://cdn.pixieset.com/...url1...
https://cdn.pixieset.com/...url2...
EOF
```

- [ ] **Step 5: Download all images with curl**

```bash
cd tmp/raw
while IFS= read -r url; do
  filename=$(basename "$url" | sed 's/[?#].*//')
  echo "Downloading $filename..."
  curl -sL "$url" -o "$filename"
done < ../pixieset-urls.txt
echo "Downloaded $(ls | wc -l | tr -d ' ') images"
cd ../..
```

Expected output: `Downloaded N images` where N matches the URL count.

- [ ] **Step 6: Verify downloads**

```bash
ls -lh tmp/raw/ | head -20
```

Expected: JPEG files, each 1-8 MB (full resolution).

---

## Task 4: Compress images with sips

Resize all raw images to max 1920px wide at 80% quality using macOS `sips` (no dependencies required).

**Files:**
- Populate: `tmp/compressed/`

- [ ] **Step 1: Run compression**

```bash
for f in tmp/raw/*.jpg tmp/raw/*.JPG tmp/raw/*.jpeg tmp/raw/*.JPEG; do
  [ -f "$f" ] || continue
  fname=$(basename "$f")
  sips -Z 1920 "$f" --setProperty formatOptions 80 --out "tmp/compressed/$fname" > /dev/null
  size=$(du -sh "tmp/compressed/$fname" | cut -f1)
  echo "$fname → $size"
done
```

Expected: each file should be under 400KB. Files already under 1920px wide are not upscaled.

- [ ] **Step 2: Verify size targets are met**

```bash
du -sh tmp/compressed/
ls tmp/compressed/ | wc -l
```

Expected: total directory size under 150MB, same file count as `tmp/raw/`.

- [ ] **Step 3: Identify the hero candidate**

Browse the compressed images to pick the best wide group shot for the hero. It should be landscape orientation and show many boys together.

```bash
# Open the compressed folder in Finder to review
open tmp/compressed/
```

Note the filename of your chosen hero image (e.g., `IMG_1234.jpg`). You will use this in Task 6.

---

## Task 5: Write the upload-and-seed script

**Files:**
- Create: `scripts/upload-and-seed.js`

- [ ] **Step 1: Create the script**

```javascript
// scripts/upload-and-seed.js
// Run: node scripts/upload-and-seed.js
// Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY in .env.local
// Output: tmp/urls.json with { photos: [{ filename, url }] }

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load env vars from .env.local
const envContent = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf8')
const env = Object.fromEntries(
  envContent.split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => {
      const idx = l.indexOf('=')
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()]
    })
)

const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL']
const SERVICE_ROLE_KEY = env['SUPABASE_SERVICE_ROLE_KEY']

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

const COMPRESSED_DIR = path.join(__dirname, '../tmp/compressed')
const BUCKET = 'gallery'
const PREFIX = 'bootcamp-2025'

async function uploadAll() {
  const files = fs.readdirSync(COMPRESSED_DIR)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .sort()

  console.log(`Uploading ${files.length} files to Supabase Storage...`)

  const results = []
  for (const [i, filename] of files.entries()) {
    const filePath = path.join(COMPRESSED_DIR, filename)
    const fileBuffer = fs.readFileSync(filePath)
    const storagePath = `${PREFIX}/${filename}`

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true,
      })

    if (error) {
      console.error(`  FAIL ${filename}: ${error.message}`)
      continue
    }

    const { data: publicData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(storagePath)

    results.push({ filename, url: publicData.publicUrl })
    console.log(`  [${i + 1}/${files.length}] ${filename} → OK`)
  }

  return results
}

async function main() {
  const photos = await uploadAll()

  if (photos.length === 0) {
    console.error('No photos uploaded. Check bucket name and service role key.')
    process.exit(1)
  }

  fs.writeFileSync(
    path.join(__dirname, '../tmp/urls.json'),
    JSON.stringify({ photos }, null, 2)
  )

  console.log(`\nDone. ${photos.length} photos uploaded.`)
  console.log('URLs saved to tmp/urls.json')
}

main().catch(err => { console.error(err); process.exit(1) })
```

---

## Task 6: Run the upload script

**Files:**
- Populate: `tmp/urls.json`

- [ ] **Step 1: Run the script**

```bash
node scripts/upload-and-seed.js
```

Expected output:
```
Uploading N files to Supabase Storage...
  [1/N] IMG_1234.jpg → OK
  [2/N] IMG_1235.jpg → OK
  ...
Done. N photos uploaded.
URLs saved to tmp/urls.json
```

- [ ] **Step 2: Verify urls.json was created**

```bash
cat tmp/urls.json | head -20
```

Expected: JSON array with `filename` and `url` fields, URLs pointing to your Supabase project's storage.

- [ ] **Step 3: Note the hero URL**

Find the filename you chose in Task 4 Step 3 in the JSON, and copy its `url` value. You'll use it in Task 7 and Task 8.

---

## Task 7: Seed the gallery database

**Files:**
- Create: `scripts/seed-gallery.js`

- [ ] **Step 1: Create the seed script**

Replace `HERO_FILENAME` with the filename you chose in Task 4 Step 3 (e.g., `IMG_1234.jpg`).

```javascript
// scripts/seed-gallery.js
// Run: node scripts/seed-gallery.js HERO_FILENAME
// Example: node scripts/seed-gallery.js IMG_1234.jpg

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const heroFilename = process.argv[2]
if (!heroFilename) {
  console.error('Usage: node scripts/seed-gallery.js HERO_FILENAME')
  process.exit(1)
}

const envContent = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf8')
const env = Object.fromEntries(
  envContent.split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => {
      const idx = l.indexOf('=')
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()]
    })
)

const supabase = createClient(
  env['NEXT_PUBLIC_SUPABASE_URL'],
  env['SUPABASE_SERVICE_ROLE_KEY']
)

const urls = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../tmp/urls.json'), 'utf8')
)

const heroPhoto = urls.photos.find(p => p.filename === heroFilename)
if (!heroPhoto) {
  console.error(`Hero filename "${heroFilename}" not found in tmp/urls.json`)
  process.exit(1)
}

async function main() {
  // Remove existing album if re-seeding
  await supabase
    .from('gallery_albums')
    .delete()
    .eq('slug', 'rise-thrive-bootcamp-2025')

  // Insert album
  const { data: album, error: albumErr } = await supabase
    .from('gallery_albums')
    .insert({
      title: 'Rise & Thrive Bootcamp 2025',
      slug: 'rise-thrive-bootcamp-2025',
      cover_image: heroPhoto.url,
      photo_count: urls.photos.length,
    })
    .select()
    .single()

  if (albumErr) {
    console.error('Album insert failed:', albumErr.message)
    process.exit(1)
  }

  console.log(`Album created: ${album.id}`)

  // Insert photos
  const photoRows = urls.photos.map((photo, i) => ({
    album_id: album.id,
    src: photo.url,
    alt: `Rise & Thrive Bootcamp 2025 — photo ${i + 1}`,
    aspect: 'landscape',
    position: i,
  }))

  const { error: photosErr } = await supabase
    .from('gallery_photos')
    .insert(photoRows)

  if (photosErr) {
    console.error('Photos insert failed:', photosErr.message)
    process.exit(1)
  }

  console.log(`Inserted ${photoRows.length} photos.`)
  console.log(`Hero URL: ${heroPhoto.url}`)
  console.log('\nCopy this URL for the hero update in app/page.tsx:')
  console.log(heroPhoto.url)
}

main().catch(err => { console.error(err); process.exit(1) })
```

- [ ] **Step 2: Run the seed script**

```bash
node scripts/seed-gallery.js IMG_YOUR_HERO_FILENAME.jpg
```

(Replace `IMG_YOUR_HERO_FILENAME.jpg` with the actual filename from Task 4 Step 3.)

Expected output:
```
Album created: <uuid>
Inserted N photos.
Hero URL: https://<project>.supabase.co/storage/v1/object/public/gallery/bootcamp-2025/IMG_...jpg

Copy this URL for the hero update in app/page.tsx:
https://<project>.supabase.co/storage/v1/object/public/gallery/bootcamp-2025/IMG_...jpg
```

- [ ] **Step 3: Verify in browser**

Start the dev server (`npm run dev`) and visit `http://localhost:3100/gallery`. The Rise & Thrive Bootcamp 2025 album should appear with the real cover photo.

Visit `http://localhost:3100/gallery/rise-thrive-bootcamp-2025` — all photos should render in the grid.

---

## Task 8: Update the hero image

Replace the AI-generated Framer CDN URL in `app/page.tsx` with the real group shot.

**Files:**
- Modify: `app/page.tsx` (2 occurrences)

- [ ] **Step 1: Find the hero background URL**

Open `app/page.tsx` and locate this string (around line 70):

```
https://framerusercontent.com/images/zB5KOyiCxdp4LttYLBVC0dNDugQ.png
```

- [ ] **Step 2: Replace the hero background URL**

Replace that URL with the hero photo Supabase URL from Task 7. The full style block looks like:

```typescript
background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.92) 78%, rgba(0,0,0,0.92) 100%),
  url(PASTE_YOUR_HERO_URL_HERE) top center/cover no-repeat`,
```

- [ ] **Step 3: Update the OpenGraph image**

In the same file, find the `metadata` export near the top. Replace the `openGraph.images[0].url` value:

```typescript
// Before
images: [{ url: 'https://framerusercontent.com/images/zNckLAoaorpjAkb2LSzjVcez7A.jpg', ... }]

// After
images: [{ url: 'PASTE_YOUR_HERO_URL_HERE', width: 1200, height: 630, alt: 'Rise & Thrive Bootcamp 2025 group photo' }]
```

- [ ] **Step 4: Also update the organizationSchema logo if it still points to Framer**

Search `app/page.tsx` for any remaining `framerusercontent.com` strings and replace with the appropriate Supabase URL or leave the logo URL as-is if it's a separate asset.

- [ ] **Step 5: Check other pages for stale Framer image URLs**

```bash
grep -r "framerusercontent.com" app/ --include="*.tsx" --include="*.ts" -l
```

For each file returned, review whether the URL is a photo (replace) or a logo (leave for now unless a Supabase version exists).

- [ ] **Step 6: Verify hero in browser**

With the dev server running, visit `http://localhost:3100`. The hero section should display the real group shot behind the gradient overlay.

- [ ] **Step 7: Commit**

```bash
git add app/page.tsx
git commit -m "feat: replace AI hero image with real bootcamp group photo"
```

---

## Task 9: Final checks + cleanup

- [ ] **Step 1: Check gallery page renders correctly**

```bash
npm run build 2>&1 | tail -20
```

Expected: no TypeScript errors. Build should succeed.

- [ ] **Step 2: Verify no Framer image URLs remain (optional: clean up)**

```bash
grep -r "framerusercontent.com" app/ --include="*.tsx" --include="*.ts"
```

Any remaining hits are logos or other assets — leave them unless they're photos that should be replaced.

- [ ] **Step 3: Clean up tmp/ (optional)**

The `tmp/` directory is gitignored. You can delete it once the seeding is done:

```bash
rm -rf tmp/ scripts/
```

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: post-seeding cleanup"
```
