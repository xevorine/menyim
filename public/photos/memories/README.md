# Photos — Memories Folder

Place your personal photos here. Supported formats:

- `.jpg` / `.jpeg`
- `.png`
- `.webp`
- `.avif`
- `.heic` / `.heif` *(requires Sharp with libheif support)*

## Nested folders are supported

You may organize photos into subdirectories:

```
memories/
  2024/
    IMG_001.jpg
    IMG_002.jpg
  2025/
    vacation.jpg
```

## After adding photos

Run (or restart the dev server — it runs this automatically):

```
npm run generate:memories
```

This will:
1. Scan all photos here
2. Generate WebP thumbnails in `public/photos/thumbnails/`
3. Update `src/data/generatedMemories.ts`
