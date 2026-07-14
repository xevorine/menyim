/**
 * featuredMemories.ts
 *
 * Configure which photos appear in key sections of the website.
 * Use relative paths from public/photos/memories/ as keys.
 *
 * If a configured file is missing from the folder, it is
 * silently ignored and the next available photo is used as fallback.
 */

import type { FeaturedMemories } from '../types/memory'

export const featuredMemories: FeaturedMemories = {
  // First 3–6 photos shown during the flower reveal after opening
  opening: [
    // "IMG_001.jpg",
    // "IMG_002.jpg",
    // "IMG_003.jpg",
  ],

  // Photos given a larger "featured" treatment in the gallery
  featured: [
    // "IMG_004.jpg",
  ],

  // 3–5 photos used in the final bouquet composition
  finalBouquet: [
    // "IMG_005.jpg",
    // "IMG_006.jpg",
    // "IMG_007.jpg",
  ],
}
