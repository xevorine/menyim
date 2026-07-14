/**
 * generate-memory-manifest.mjs
 *
 * Scans public/photos/memories/ for images, generates WebP thumbnails
 * using Sharp, and writes src/data/generatedMemories.ts.
 *
 * Supports: .jpg .jpeg .png .webp .avif
 * Attempts: .heic .heif (if Sharp build supports libheif)
 *
 * Windows-safe: converts backslashes, encodes special characters.
 * Dedup-safe: uses relative paths as IDs, not just filenames.
 * Thumbnail-safe: skips regeneration when source hasn't changed.
 */

import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const MEMORIES_DIR = path.join(ROOT, 'public', 'photos', 'memories')
const THUMBNAILS_DIR = path.join(ROOT, 'public', 'photos', 'thumbnails')
const OUTPUT_FILE = path.join(ROOT, 'src', 'data', 'generatedMemories.ts')
const THUMBNAIL_MAX_WIDTH = 600

const SUPPORTED_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])
const HEIC_EXTS = new Set(['.heic', '.heif'])

// Temp/partial download file patterns to skip
const IGNORED_PATTERNS = [
  /\.crdownload$/i,   // Chrome partial downloads
  /\.part$/i,         // Firefox partial downloads
  /\.tmp$/i,
  /\.temp$/i,
  /\.download$/i,
  /^Unconfirmed\s/i,  // Chrome "Unconfirmed XXXXXX.crdownload"
]

function isIgnoredFile(filename) {
  return IGNORED_PATTERNS.some(re => re.test(filename))
}

// ─── Utilities ────────────────────────────────────────────────────────────────

/** Convert Windows backslashes to forward slashes and encode special chars */
function toPublicUrl(relativePath) {
  const forward = relativePath.replace(/\\/g, '/')
  return '/' + forward.split('/').map(segment => encodeURIComponent(segment)).join('/')
}

/** Natural sort comparator (e.g. IMG_2 before IMG_10) */
function naturalCompare(a, b) {
  const re = /(\d+)/g
  const aParts = a.replace(re, '\0$1\0').split('\0')
  const bParts = b.replace(re, '\0$1\0').split('\0')
  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const ap = aParts[i] ?? ''
    const bp = bParts[i] ?? ''
    const an = parseInt(ap, 10)
    const bn = parseInt(bp, 10)
    if (!isNaN(an) && !isNaN(bn) && an !== bn) return an - bn
    if (ap !== bp) return ap < bp ? -1 : 1
  }
  return 0
}

/** Generate a stable ID from relative path */
function makeId(relPath) {
  const hash = createHash('sha1').update(relPath).digest('hex').slice(0, 8)
  const safe = relPath.replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase()
  return `memory-${safe}-${hash}`
}

/** Recursively collect image files */
function collectImages(dir, baseDir) {
  const results = []
  if (!fs.existsSync(dir)) return results

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...collectImages(fullPath, baseDir))
    } else if (entry.isFile()) {
      // Skip temp/partial download files
      if (isIgnoredFile(entry.name)) {
        console.log(`⏭️  Skipping temp file: ${entry.name}`)
        continue
      }
      const ext = path.extname(entry.name).toLowerCase()
      if (SUPPORTED_EXTS.has(ext) || HEIC_EXTS.has(ext)) {
        results.push(fullPath)
      }
    }
  }
  return results
}

/** Get file mtime as a string for change detection */
function getMtime(filePath) {
  try {
    return fs.statSync(filePath).mtimeMs.toString()
  } catch {
    return ''
  }
}

// ─── Sharp thumbnail generation ───────────────────────────────────────────────

let sharp = null
let sharpAvailable = false

async function loadSharp() {
  try {
    const mod = await import('sharp')
    sharp = mod.default
    sharpAvailable = true
    console.log('✅ Sharp loaded – thumbnails will be generated.')
  } catch (e) {
    console.warn('⚠️  Sharp not available. Thumbnails will point to originals.')
    console.warn('   Run "npm install" to install sharp.')
  }
}

/**
 * Generate a WebP thumbnail for a given source image.
 * Returns the public URL of the thumbnail, or falls back to originalSrc.
 * @param {string} srcPath   Absolute path to the source image
 * @param {string} relPath   Relative path from memories dir (for naming)
 * @param {string} originalSrc  Public URL of original
 * @returns {{ thumbnailSrc: string, width: number, height: number }}
 */
async function generateThumbnail(srcPath, relPath, originalSrc) {
  if (!sharpAvailable) {
    return { thumbnailSrc: originalSrc, width: 0, height: 0 }
  }

  const ext = path.extname(relPath).toLowerCase()
  const isHeic = HEIC_EXTS.has(ext)

  if (isHeic) {
    // Check if sharp heif support exists
    const formats = sharp.format || {}
    if (!formats.heif || !formats.heif.input?.fileSuffix?.includes('heic')) {
      console.warn(`⚠️  HEIC/HEIF not supported by this Sharp build, skipping: ${path.basename(srcPath)}`)
      return { thumbnailSrc: originalSrc, width: 0, height: 0 }
    }
  }

  // Build thumbnail output path
  const relWithoutExt = relPath.replace(/[^a-z0-9/]/gi, '_')
  const thumbName = relWithoutExt.replace(/\//g, '__') + '.webp'
  const thumbPath = path.join(THUMBNAILS_DIR, thumbName)
  const thumbPublicUrl = `/photos/thumbnails/${encodeURIComponent(thumbName)}`

  // Skip if thumbnail is newer than source
  const srcMtime = getMtime(srcPath)
  const thumbMtime = getMtime(thumbPath)
  if (thumbPath && fs.existsSync(thumbPath) && thumbMtime >= srcMtime) {
    try {
      const meta = await sharp(thumbPath).metadata()
      return {
        thumbnailSrc: thumbPublicUrl,
        width: meta.width || 0,
        height: meta.height || 0,
      }
    } catch {
      // regenerate below
    }
  }

  // Ensure thumbnails dir exists
  fs.mkdirSync(THUMBNAILS_DIR, { recursive: true })

  try {
    const image = sharp(srcPath)
    const meta = await image.metadata()
    const origWidth = meta.width || THUMBNAIL_MAX_WIDTH
    const origHeight = meta.height || THUMBNAIL_MAX_WIDTH

    const resized = image
      .resize({
        width: THUMBNAIL_MAX_WIDTH,
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({ quality: 82 })

    await resized.toFile(thumbPath)

    // Read actual output dimensions
    const outMeta = await sharp(thumbPath).metadata()
    return {
      thumbnailSrc: thumbPublicUrl,
      width: origWidth,
      height: origHeight,
    }
  } catch (err) {
    console.warn(`⚠️  Failed to generate thumbnail for ${path.basename(srcPath)}: ${err.message}`)
    return { thumbnailSrc: originalSrc, width: 0, height: 0 }
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  await loadSharp()

  // Ensure output directory exists
  const outDir = path.dirname(OUTPUT_FILE)
  fs.mkdirSync(outDir, { recursive: true })

  // Ensure memories dir exists
  fs.mkdirSync(MEMORIES_DIR, { recursive: true })

  const allFiles = collectImages(MEMORIES_DIR, MEMORIES_DIR)

  if (allFiles.length === 0) {
    console.log('📂 No photos found in public/photos/memories/ – generating empty manifest.')
    const emptyContent = `// AUTO-GENERATED by scripts/generate-memory-manifest.mjs
// Do not edit this file manually. Run: npm run generate:memories

import type { Memory } from '../types/memory'

export const generatedMemories: Memory[] = []
`
    fs.writeFileSync(OUTPUT_FILE, emptyContent, 'utf8')
    console.log(`✅ Written: ${OUTPUT_FILE}`)
    return
  }

  // Sort by relative path (natural sort)
  allFiles.sort((a, b) => {
    const relA = path.relative(MEMORIES_DIR, a)
    const relB = path.relative(MEMORIES_DIR, b)
    return naturalCompare(relA, relB)
  })

  const entries = []
  for (const absPath of allFiles) {
    const relPath = path.relative(MEMORIES_DIR, absPath) // e.g. "subfolder\IMG_001.jpg"
    const relPathForward = relPath.replace(/\\/g, '/') // "subfolder/IMG_001.jpg"
    const folder = path.dirname(relPathForward) === '.' ? '' : path.dirname(relPathForward)
    const name = path.basename(relPathForward)
    const id = makeId(relPathForward)

    // Build public URLs
    const memoriesRelative = `photos/memories/${relPathForward}`
    const originalSrc = '/' + memoriesRelative.split('/').map(s => encodeURIComponent(s)).join('/')

    const { thumbnailSrc, width, height } = await generateThumbnail(absPath, relPathForward, originalSrc)

    entries.push({ id, name, originalSrc, thumbnailSrc, width, height, folder })
  }

  // Serialize to TypeScript
  const lines = entries.map(e => {
    return `  {
    id: ${JSON.stringify(e.id)},
    name: ${JSON.stringify(e.name)},
    originalSrc: ${JSON.stringify(e.originalSrc)},
    thumbnailSrc: ${JSON.stringify(e.thumbnailSrc)},
    width: ${e.width},
    height: ${e.height},
    folder: ${JSON.stringify(e.folder)},
    caption: '',
    date: null,
    location: null,
  }`
  })

  const content = `// AUTO-GENERATED by scripts/generate-memory-manifest.mjs
// Do not edit this file manually. Run: npm run generate:memories

import type { Memory } from '../types/memory'

export const generatedMemories: Memory[] = [
${lines.join(',\n')}
]
`

  fs.writeFileSync(OUTPUT_FILE, content, 'utf8')
  console.log(`✅ Written ${entries.length} memories to: ${OUTPUT_FILE}`)
  if (sharpAvailable) {
    console.log(`🖼️  Thumbnails generated in: public/photos/thumbnails/`)
  }
}

main().catch(err => {
  console.error('❌ Manifest generation failed:', err)
  process.exit(1)
})
