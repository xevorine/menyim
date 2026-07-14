/**
 * Seeded pseudo-random number generator (Mulberry32).
 * Deterministic so photo positions don't shift on refresh.
 */
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s |= 0; s = s + 0x6D2B79F5 | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export interface PhotoPlacement {
  /** % from left of board */
  xPct: number
  /** approximate top offset in px from board top */
  yOffset: number
  rotation: number
  scale: number
  zIndex: number
  variant: 'polaroid' | 'tape' | 'circular' | 'torn' | 'clean'
}

/**
 * Build deterministic scattered placements for n photos.
 * Uses a controlled column-based masonry approach for balance.
 */
export function buildScatterPlacements(count: number): PhotoPlacement[] {
  if (count === 0) return []
  const rand = seededRandom(1337) // changed seed for fresh layout

  const VARIANTS: PhotoPlacement['variant'][] = ['polaroid', 'tape', 'circular', 'torn', 'clean']

  const placements: PhotoPlacement[] = []
  let currentY = 0

  for (let i = 0; i < count; i++) {
    // Determine X position using a sine wave to create a snake/zigzag pattern
    // sine wave goes from -1 to 1. We scale it to -35 to +35 and offset by 50%
    // Frequency: i * 0.6 means a full left-right sweep every ~5 photos
    let xBase = 50 + 35 * Math.sin(i * 0.6) + (rand() * 10 - 5)

    // Ensure it doesn't spill off the edge completely
    xBase = Math.max(5, Math.min(95, xBase))

    // Determine Y position
    // Increment Y steadily to form a continuous line downwards.
    // Small increments make them overlap and look dense.
    const ySpacing = 110 + (rand() * 30)
    currentY += ySpacing
    const yOffset = currentY

    // Gentle rotations (-18 to +18)
    const rotation = (rand() - 0.5) * 36 
    
    // Controlled scaling (0.85 to 1.1)
    const scale = 0.85 + rand() * 0.25

    // Z-index increases sequentially so the snake layers nicely on top of previous photos
    const zIndex = i + 10

    // Try to vary the variants visually
    let variant = VARIANTS[i % VARIANTS.length]
    if (rand() > 0.8) {
       // Occasional forced variation
       variant = VARIANTS[Math.floor(rand() * VARIANTS.length)]
    }

    placements.push({
      xPct: xBase,
      yOffset,
      rotation,
      scale,
      zIndex,
      variant,
    })
  }

  // Final check to pull the whole board up slightly if there's massive top spacing
  const minTop = Math.min(...placements.map(p => p.yOffset))
  if (minTop > 100) {
    const shift = minTop - 80
    placements.forEach(p => p.yOffset -= shift)
  }

  return placements
}

/** Total board height in px for n photos */
export function boardHeight(count: number): number {
  if (count === 0) return 500
  
  // Re-run the exact same layout logic just to find the max column height
  const placements = buildScatterPlacements(count)
  let maxOffset = 0
  for (const p of placements) {
    if (p.yOffset > maxOffset) {
      maxOffset = p.yOffset
    }
  }
  
  // Add enough padding at the bottom so the last photo isn't cut off
  // Adjusted from 1000 to 350 to reduce empty space before the letter
  return Math.max(800, maxOffset + 350)
}
