/**
 * memoryCaptions.ts
 *
 * Add per-photo metadata here using the RELATIVE PATH from
 * public/photos/memories/ as the key.
 *
 * Examples:
 *   "IMG_001.jpg"              → top-level file
 *   "2024/IMG_001.jpg"         → in a subfolder
 *   "vacation/beach.jpg"       → nested folder
 *
 * Using relative paths (not just filenames) prevents collisions
 * when different folders contain files with the same name.
 */

import type { MemoryCaptionsMap } from '../types/memory'

export const memoryCaptions: MemoryCaptionsMap = {
  // "IMG_001.jpg": {
  //   caption: "Our first memory together",
  //   date: "2025-01-01",
  //   location: "Solo, Indonesia",
  // },
  // "2024/vacation.jpg": {
  //   caption: "Best day of the year",
  //   date: "2024-06-15",
  //   location: "Bali",
  // },
}
