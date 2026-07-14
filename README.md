# 🌸 Menyim — Personal Flower & Memories Gift Website

A romantic, interactive gift website built with React + TypeScript + Vite.

## Quick Start

```bash
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173).

---

## How to Add Photos

1. **Open the Google Photos shared album** and select photos to download
2. **Download** individual photos or use Google Takeout for the full album
3. **Extract** the downloaded archive if needed
4. **Copy** your image files into:
   ```
   public/photos/memories/
   ```
   Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.heic` (if supported by your Sharp build)
5. **Restart the development server** — it runs `npm run generate:memories` automatically:
   ```bash
   npm run dev
   ```
6. Thumbnails will be generated automatically in `public/photos/thumbnails/`

### Organizing with subfolders

You can organize photos into subfolders — they're all detected:
```
public/photos/memories/
  2024/IMG_001.jpg
  2025/vacation.jpg
  IMG_special.jpg
```

---

## How to Edit Captions, Dates & Locations

Edit [`src/data/memoryCaptions.ts`](src/data/memoryCaptions.ts):

```ts
export const memoryCaptions = {
  "IMG_001.jpg": {
    caption: "Our first memory",
    date: "2025-01-01",
    location: "Solo, Indonesia",
  },
  "2024/vacation.jpg": {
    caption: "Best day ever",
    date: "2024-06-15",
  },
}
```

Use the **relative path from `public/photos/memories/`** as the key. This prevents collisions when different folders contain files with the same name.

---

## How to Choose Featured Photos

Edit [`src/data/featuredMemories.ts`](src/data/featuredMemories.ts):

```ts
export const featuredMemories = {
  opening: ["IMG_001.jpg", "IMG_002.jpg"],   // shown in flower reveal
  featured: ["IMG_003.jpg"],                  // large featured in gallery
  finalBouquet: ["IMG_004.jpg", "IMG_005.jpg"], // final scene
}
```

Missing filenames are silently ignored — the site won't crash.

---

## How to Change Names and Messages

Edit [`src/data/giftContent.ts`](src/data/giftContent.ts):

```ts
export const giftContent = {
  recipientName: "Sayang",
  senderName: "Aku",
  openingTitle: "A little something for you",
  personalMessage: `...`,
  finalMessage: "...",
  albumUrl: "https://photos.app.goo.gl/...",
}
```

---

## How to Add Background Music

1. Place an MP3 file at:
   ```
   public/audio/background-music.mp3
   ```
2. In [`src/data/giftContent.ts`](src/data/giftContent.ts), set:
   ```ts
   audioEnabled: true,
   audioSrc: '/audio/background-music.mp3',
   ```
3. Music starts only **after the user taps "Open"** — never autoplays.
4. A mute/unmute button appears at the bottom right.

---

## How to Replace Flowers

Replace any SVG file in `public/flowers/` with your own:

| File | Used for |
|---|---|
| `rose.svg` | Main flower decoration |
| `tulip.svg` | Secondary bouquet flower |
| `daisy.svg` | Accent flower |
| `babys-breath.svg` | Filler clusters |
| `leaf.svg` | Greenery accents |
| `ribbon.svg` | Decorative bow |
| `petal.svg` | Falling petal animation |

Keep the same filename and the components will automatically use your new asset.

---

## How to Deploy

### Vercel (recommended)

```bash
npm run build
vercel --prod
```

The included `vercel.json` handles SPA routing so `/memories` won't 404.

### Netlify

```bash
npm run build
netlify deploy --dir=dist --prod
```

The included `netlify.toml` handles SPA routing.

### Manual (any static host)

```bash
npm run build
```

Upload the `dist/` folder. Configure your server to serve `index.html` for all routes.

---

## Project Structure

```
src/
  components/        UI components
  data/              Editable config (names, captions, featured photos)
  hooks/             React hooks
  lib/               Utility functions
  pages/             Route-level pages
  types/             TypeScript types
public/
  flowers/           SVG flower assets (replaceable)
  photos/
    memories/        ← Place your photos here
    thumbnails/      Auto-generated WebP thumbnails
  audio/             Optional background music
scripts/
  generate-memory-manifest.mjs   Auto-scans photos, generates manifest + thumbnails
```
