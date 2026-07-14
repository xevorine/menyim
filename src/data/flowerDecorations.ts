/**
 * flowerDecorations.ts
 *
 * Deterministic flower placement data for each section.
 * Values are hard-coded (not Math.random()) so layouts are stable across refreshes.
 */

export interface FlowerItem {
  id: string
  asset: string          // filename in /flowers/
  x: number             // % from left (0-100)
  y: number             // % from top (0-100) or px offset
  size: number          // px
  rotation: number      // degrees
  opacity: number       // 0-1
  depth: 'background' | 'middle' | 'foreground'
  delay?: number        // animation delay in seconds
}

// ─── Intro screen corners (dense) ────────────────────────────────────────────

export const introFlowers: FlowerItem[] = [
  // Bottom-left cluster (super dense)
  { id: 'il-00', asset: 'fern.svg',          x: -5,  y: 70, size: 140, rotation: 15,  opacity: 0.6,  depth: 'background', delay: 0 },
  { id: 'il-01', asset: 'peony.svg',         x: -4,  y: 80, size: 150, rotation: -15, opacity: 0.95, depth: 'foreground', delay: 0 },
  { id: 'il-01b',asset: 'peony.svg',         x: -8,  y: 65, size: 120, rotation: 10,  opacity: 0.9,  depth: 'middle',     delay: 0.05 },
  { id: 'il-02', asset: 'rose-pink.svg',     x: 5,   y: 68, size: 110, rotation: 10,  opacity: 0.9,  depth: 'foreground', delay: 0.1 },
  { id: 'il-03', asset: 'tulip-pink.svg',    x: 12,  y: 74, size: 90,  rotation: -8,  opacity: 0.9,  depth: 'middle',     delay: 0.15 },
  { id: 'il-03b',asset: 'rose-cream.svg',    x: 15,  y: 82, size: 100, rotation: 25,  opacity: 0.95, depth: 'foreground', delay: 0.1 },
  { id: 'il-04', asset: 'daisy-white.svg',   x: -2,  y: 90, size: 95,  rotation: 20,  opacity: 0.85, depth: 'foreground', delay: 0.2 },
  { id: 'il-05', asset: 'leaf-dark.svg',     x: 8,   y: 80, size: 90,  rotation: -25, opacity: 0.8,  depth: 'background', delay: 0.05 },
  { id: 'il-06', asset: 'leaf-light.svg',    x: 16,  y: 82, size: 80,  rotation: 15,  opacity: 0.75, depth: 'background', delay: 0.1 },
  { id: 'il-07', asset: 'fern.svg',          x: 2,   y: 88, size: 100, rotation: 10,  opacity: 0.7,  depth: 'background', delay: 0 },
  { id: 'il-08', asset: 'small-blossom.svg', x: 22,  y: 72, size: 55,  rotation: 5,   opacity: 0.85, depth: 'middle',     delay: 0.25 },
  { id: 'il-09', asset: 'small-blossom.svg', x: 5,   y: 95, size: 50,  rotation: -15, opacity: 0.8,  depth: 'middle',     delay: 0.3 },
  { id: 'il-10', asset: 'loose-petal.svg',   x: 18,  y: 90, size: 35,  rotation: 30,  opacity: 0.7,  depth: 'foreground', delay: 0.35 },
  { id: 'il-11', asset: 'loose-petal.svg',   x: 25,  y: 86, size: 30,  rotation: -20, opacity: 0.65, depth: 'foreground', delay: 0.4 },
  { id: 'il-12', asset: 'eucalyptus.svg',    x: 10,  y: 65, size: 90,  rotation: -10, opacity: 0.7,  depth: 'background', delay: 0 },
  { id: 'il-13', asset: 'hydrangea.svg',     x: 20,  y: 78, size: 85,  rotation: 5,   opacity: 0.75, depth: 'middle',     delay: 0.2 },
  { id: 'il-14', asset: 'daisy-pink.svg',    x: 8,   y: 55, size: 80,  rotation: -12, opacity: 0.85, depth: 'middle',     delay: 0.15 },

  // Mascot: Axolotl hiding in bottom-left
  { id: 'mascot-1', asset: '../decorations/axolotl-sticker.svg', x: 12, y: 88, size: 120, rotation: -10, opacity: 1, depth: 'foreground', delay: 0.5 },

  // Bottom-right cluster (super dense)
  { id: 'ir-00', asset: 'eucalyptus.svg',    x: 85,  y: 65, size: 140, rotation: -25, opacity: 0.65, depth: 'background', delay: 0 },
  { id: 'ir-01', asset: 'rose-burgundy.svg', x: 88,  y: 75, size: 130, rotation: 12,  opacity: 0.95, depth: 'foreground', delay: 0.05 },
  { id: 'ir-01b',asset: 'peony.svg',         x: 95,  y: 65, size: 140, rotation: -10, opacity: 0.9,  depth: 'middle',     delay: 0.1 },
  { id: 'ir-02', asset: 'rose-cream.svg',    x: 78,  y: 80, size: 110, rotation: -8,  opacity: 0.9,  depth: 'foreground', delay: 0.1 },
  { id: 'ir-03', asset: 'tulip-white.svg',   x: 84,  y: 86, size: 95,  rotation: 5,   opacity: 0.88, depth: 'middle',     delay: 0.15 },
  { id: 'ir-04', asset: 'daisy-pink.svg',    x: 93,  y: 84, size: 90,  rotation: -18, opacity: 0.85, depth: 'foreground', delay: 0.2 },
  { id: 'ir-04b',asset: 'rose-pink.svg',     x: 72,  y: 88, size: 100, rotation: 15,  opacity: 0.95, depth: 'foreground', delay: 0.15 },
  { id: 'ir-05', asset: 'leaf-light.svg',    x: 75,  y: 82, size: 90,  rotation: 22,  opacity: 0.78, depth: 'background', delay: 0.05 },
  { id: 'ir-06', asset: 'leaf-dark.svg',     x: 86,  y: 88, size: 85,  rotation: -12, opacity: 0.75, depth: 'background', delay: 0.1 },
  { id: 'ir-07', asset: 'eucalyptus.svg',    x: 94,  y: 85, size: 100, rotation: -5,  opacity: 0.7,  depth: 'background', delay: 0 },
  { id: 'ir-08', asset: 'hydrangea.svg',     x: 74,  y: 70, size: 85,  rotation: 10,  opacity: 0.78, depth: 'middle',     delay: 0.25 },
  { id: 'ir-09', asset: 'small-blossom.svg', x: 96,  y: 92, size: 55,  rotation: 25,  opacity: 0.8,  depth: 'middle',     delay: 0.3 },
  { id: 'ir-10', asset: 'loose-petal.svg',   x: 80,  y: 94, size: 35,  rotation: -35, opacity: 0.68, depth: 'foreground', delay: 0.35 },
  { id: 'ir-11', asset: 'loose-petal.svg',   x: 72,  y: 86, size: 30,  rotation: 15,  opacity: 0.65, depth: 'foreground', delay: 0.4 },

  // Top edge (dense garland)
  { id: 'it-01', asset: 'hydrangea.svg',     x: 5,   y: -2, size: 70,  rotation: -15, opacity: 0.75, depth: 'middle',     delay: 0.05 },
  { id: 'it-02', asset: 'rose-cream.svg',    x: 20,  y: -5, size: 80,  rotation: 10,  opacity: 0.8,  depth: 'foreground', delay: 0.1 },
  { id: 'it-03', asset: 'small-blossom.svg', x: 35,  y: 1,  size: 45,  rotation: -12, opacity: 0.72, depth: 'middle',     delay: 0.15 },
  { id: 'it-04', asset: 'daisy-white.svg',   x: 50,  y: -2, size: 75,  rotation: 8,   opacity: 0.85, depth: 'middle',     delay: 0.2 },
  { id: 'it-05', asset: 'rose-pink.svg',     x: 65,  y: -5, size: 85,  rotation: -6,  opacity: 0.8,  depth: 'foreground', delay: 0.25 },
  { id: 'it-06', asset: 'peony.svg',         x: 85,  y: -8, size: 95,  rotation: 20,  opacity: 0.85, depth: 'middle',     delay: 0.08 },
  { id: 'it-07', asset: 'leaf-light.svg',    x: 10,  y: 2,  size: 60,  rotation: 25,  opacity: 0.6,  depth: 'background', delay: 0.18 },
  { id: 'it-08', asset: 'eucalyptus.svg',    x: 40,  y: -5, size: 80,  rotation: 90,  opacity: 0.55, depth: 'background', delay: 0.28 },
  { id: 'it-09', asset: 'fern.svg',          x: 75,  y: -2, size: 75,  rotation: -80, opacity: 0.5,  depth: 'background', delay: 0 },
  { id: 'it-10', asset: 'loose-petal.svg',   x: 28,  y: 4,  size: 25,  rotation: 15,  opacity: 0.65, depth: 'foreground', delay: 0.1 },
  { id: 'it-11', asset: 'loose-petal.svg',   x: 58,  y: 6,  size: 20,  rotation: -25, opacity: 0.65, depth: 'foreground', delay: 0.15 },

  // Left side mid
  { id: 'im-01', asset: 'rose-pink.svg',     x: -2,  y: 38, size: 85,  rotation: -20, opacity: 0.75, depth: 'middle',     delay: 0.05 },
  { id: 'im-01b',asset: 'daisy-white.svg',   x: 2,   y: 48, size: 75,  rotation: 15,  opacity: 0.75, depth: 'middle',     delay: 0.1 },
  { id: 'im-02', asset: 'leaf.svg',          x: -1,  y: 44, size: 70,  rotation: 10,  opacity: 0.65, depth: 'background', delay: 0 },
  // Right side mid
  { id: 'im-03', asset: 'rose-cream.svg',    x: 95,  y: 40, size: 85,  rotation: 15,  opacity: 0.75, depth: 'middle',     delay: 0.05 },
  { id: 'im-03b',asset: 'peony.svg',         x: 93,  y: 50, size: 80,  rotation: -10, opacity: 0.75, depth: 'middle',     delay: 0.1 },
  { id: 'im-04', asset: 'leaf.svg',          x: 96,  y: 45, size: 70,  rotation: -12, opacity: 0.62, depth: 'background', delay: 0 },
]

// ─── Gallery inline clusters (between photo rows) ─────────────────────────────

export const galleryRowClusters: FlowerItem[][] = [
  // Cluster 0 — very dense left-leaning sweep
  [
    { id: 'gc0-1', asset: 'peony.svg',         x: -2, y: 45, size: 140, rotation: -10, opacity: 0.9,  depth: 'background', delay: 0 },
    { id: 'gc0-ax-1', asset: '../decorations/axolotl-sticker.svg', x: 5, y: 45, size: 90, rotation: 10, opacity: 1, depth: 'foreground', delay: 0.2 },
    { id: 'gc0-2', asset: 'rose-pink.svg',     x: 8,  y: 35, size: 100, rotation: 15,  opacity: 0.85, depth: 'middle',     delay: 0.1 },
    { id: 'gc0-3', asset: 'hydrangea.svg',     x: 18, y: 50, size: 110, rotation: -5,  opacity: 0.8,  depth: 'background', delay: 0.05 },
    { id: 'gc0-4', asset: 'tulip-pink.svg',    x: 12, y: 65, size: 90,  rotation: 25,  opacity: 0.85, depth: 'middle',     delay: 0.15 },
    { id: 'gc0-5', asset: 'daisy-white.svg',   x: 5,  y: 55, size: 80,  rotation: -20, opacity: 0.85, depth: 'middle',     delay: 0.1 },
    { id: 'gc0-6', asset: 'leaf-dark.svg',     x: 10, y: 40, size: 90,  rotation: 30,  opacity: 0.6,  depth: 'background', delay: 0 },
    { id: 'gc0-7', asset: 'eucalyptus.svg',    x: -5, y: 55, size: 120, rotation: -20, opacity: 0.55, depth: 'background', delay: 0 },
    { id: 'gc0-8', asset: 'small-blossom.svg', x: 22, y: 42, size: 50,  rotation: 10,  opacity: 0.8,  depth: 'middle',     delay: 0.2 },
    { id: 'gc0-9', asset: 'loose-petal.svg',   x: 28, y: 38, size: 30,  rotation: 45,  opacity: 0.7,  depth: 'foreground', delay: 0.25 },
    // Some stragglers on the right to balance
    { id: 'gc0-10',asset: 'daisy-pink.svg',    x: 88, y: 50, size: 70,  rotation: -15, opacity: 0.7,  depth: 'background', delay: 0.1 },
    { id: 'gc0-11',asset: 'fern.svg',          x: 92, y: 55, size: 90,  rotation: 10,  opacity: 0.6,  depth: 'background', delay: 0 },
  ],
  // Cluster 1 — very dense center and right spread
  [
    { id: 'gc1-1', asset: 'rose-burgundy.svg', x: 45, y: 55, size: 110, rotation: 8,   opacity: 0.85, depth: 'middle',     delay: 0 },
    { id: 'gc1-2', asset: 'peony.svg',         x: 55, y: 45, size: 130, rotation: -15, opacity: 0.9,  depth: 'background', delay: 0.05 },
    { id: 'gc1-3', asset: 'daisy-white.svg',   x: 38, y: 50, size: 90,  rotation: 20,  opacity: 0.8,  depth: 'middle',     delay: 0.1 },
    { id: 'gc1-4', asset: 'rose-cream.svg',    x: 85, y: 50, size: 120, rotation: -10, opacity: 0.9,  depth: 'background', delay: 0.15 },
    { id: 'gc1-5', asset: 'tulip-white.svg',   x: 92, y: 60, size: 90,  rotation: 15,  opacity: 0.85, depth: 'middle',     delay: 0.2 },
    { id: 'gc1-6', asset: 'leaf-light.svg',    x: 48, y: 65, size: 85,  rotation: -25, opacity: 0.65, depth: 'background', delay: 0 },
    { id: 'gc1-7', asset: 'eucalyptus.svg',    x: 88, y: 45, size: 110, rotation: 20,  opacity: 0.6,  depth: 'background', delay: 0.05 },
    { id: 'gc1-peng-1', asset: '../decorations/penguin-sticker.svg', x: 80, y: 55, size: 85, rotation: -25, opacity: 1, depth: 'foreground', delay: 0.2 },
    { id: 'gc1-8', asset: 'small-blossom.svg', x: 30, y: 55, size: 50,  rotation: -15, opacity: 0.75, depth: 'middle',     delay: 0.2 },
    { id: 'gc1-9', asset: 'loose-petal.svg',   x: 65, y: 40, size: 30,  rotation: 10,  opacity: 0.7,  depth: 'foreground', delay: 0.25 },
    { id: 'gc1-ax-2', asset: '../decorations/axolotl-sticker.svg', x: 25, y: 35, size: 70, rotation: -45, opacity: 1, depth: 'foreground', delay: 0.3 },
  ],
  // Cluster 2 — full width heavy bottom sweep
  [
    { id: 'gc2-1', asset: 'hydrangea.svg',     x: 8,  y: 50, size: 110, rotation: 12,  opacity: 0.85, depth: 'background', delay: 0 },
    { id: 'gc2-2', asset: 'rose-pink.svg',     x: 20, y: 55, size: 100, rotation: -8,  opacity: 0.88, depth: 'middle',     delay: 0.1 },
    { id: 'gc2-3', asset: 'peony.svg',         x: 75, y: 50, size: 140, rotation: -15, opacity: 0.9,  depth: 'background', delay: 0.05 },
    { id: 'gc2-4', asset: 'rose-cream.svg',    x: 88, y: 60, size: 110, rotation: 10,  opacity: 0.88, depth: 'middle',     delay: 0.15 },
    { id: 'gc2-5', asset: 'daisy-pink.svg',    x: 45, y: 52, size: 90,  rotation: 20,  opacity: 0.85, depth: 'middle',     delay: 0.2 },
    { id: 'gc2-6', asset: 'leaf-dark.svg',     x: 15, y: 65, size: 85,  rotation: 30,  opacity: 0.6,  depth: 'background', delay: 0 },
    { id: 'gc2-7', asset: 'fern.svg',          x: 80, y: 45, size: 110, rotation: -25, opacity: 0.65, depth: 'background', delay: 0.05 },
    { id: 'gc2-peng-2', asset: '../decorations/penguin-sticker.svg', x: 15, y: 45, size: 75, rotation: 35, opacity: 1, depth: 'foreground', delay: 0.2 },
    { id: 'gc2-8', asset: 'small-blossom.svg', x: 35, y: 55, size: 50,  rotation: -10, opacity: 0.8,  depth: 'middle',     delay: 0.25 },
    { id: 'gc2-9', asset: 'loose-petal.svg',   x: 55, y: 48, size: 30,  rotation: 15,  opacity: 0.7,  depth: 'foreground', delay: 0.3 },
    { id: 'gc2-ax-3', asset: '../decorations/axolotl-sticker.svg', x: 60, y: 65, size: 110, rotation: 15, opacity: 1, depth: 'foreground', delay: 0.3 },
  ],
]

// ─── Personal message floral frame ────────────────────────────────────────────

export const messageFrameFlowers: FlowerItem[] = [
  // Top dense garland
  { id: 'mf-01', asset: 'rose-pink.svg',     x: 20,  y: -10, size: 100, rotation: -15, opacity: 0.9,  depth: 'foreground', delay: 0 },
  { id: 'mf-02', asset: 'peony.svg',         x: 40,  y: -12, size: 110, rotation: 5,   opacity: 0.95, depth: 'foreground', delay: 0.05 },
  { id: 'mf-03', asset: 'rose-cream.svg',    x: 60,  y: -8,  size: 95,  rotation: 12,  opacity: 0.88, depth: 'foreground', delay: 0.1 },
  { id: 'mf-04', asset: 'daisy-white.svg',   x: 5,   y: -5,  size: 85,  rotation: -20, opacity: 0.85, depth: 'middle',     delay: 0.05 },
  { id: 'mf-05', asset: 'daisy-pink.svg',    x: 80,  y: -5,  size: 80,  rotation: 18,  opacity: 0.85, depth: 'middle',     delay: 0.1 },
  { id: 'mf-06', asset: 'hydrangea.svg',     x: 30,  y: -5,  size: 85,  rotation: -5,  opacity: 0.8,  depth: 'middle',     delay: 0.15 },
  { id: 'mf-07', asset: 'hydrangea.svg',     x: 70,  y: -8,  size: 80,  rotation: 10,  opacity: 0.8,  depth: 'middle',     delay: 0.15 },
  { id: 'mf-08', asset: 'fern.svg',          x: 50,  y: -15, size: 100, rotation: 80,  opacity: 0.65, depth: 'background', delay: 0 },
  { id: 'mf-09', asset: 'eucalyptus.svg',    x: 25,  y: -10, size: 90,  rotation: -80, opacity: 0.65, depth: 'background', delay: 0.05 },
  { id: 'mf-10', asset: 'eucalyptus.svg',    x: 75,  y: -12, size: 95,  rotation: 85,  opacity: 0.65, depth: 'background', delay: 0.1 },
  
  // Left thick side
  { id: 'mf-11', asset: 'leaf-dark.svg',     x: -5,  y: 15, size: 90,  rotation: -30, opacity: 0.7,  depth: 'background', delay: 0 },
  { id: 'mf-12', asset: 'peony.svg',         x: -4,  y: 25, size: 100, rotation: 15,  opacity: 0.9,  depth: 'foreground', delay: 0.05 },
  { id: 'mf-13', asset: 'eucalyptus.svg',    x: -8,  y: 40, size: 110, rotation: -15, opacity: 0.68, depth: 'background', delay: 0.1 },
  { id: 'mf-14', asset: 'rose-burgundy.svg', x: -2,  y: 55, size: 90,  rotation: 5,   opacity: 0.88, depth: 'foreground', delay: 0.15 },
  { id: 'mf-15', asset: 'daisy-white.svg',   x: -5,  y: 70, size: 80,  rotation: -10, opacity: 0.85, depth: 'middle',     delay: 0.2 },
  { id: 'mf-16', asset: 'fern.svg',          x: -6,  y: 80, size: 95,  rotation: -25, opacity: 0.65, depth: 'background', delay: 0.1 },
  
  // Right thick side
  { id: 'mf-17', asset: 'leaf-light.svg',    x: 95,  y: 15, size: 90,  rotation: 28,  opacity: 0.7,  depth: 'background', delay: 0 },
  { id: 'mf-18', asset: 'rose-cream.svg',    x: 96,  y: 25, size: 100, rotation: -15, opacity: 0.9,  depth: 'foreground', delay: 0.05 },
  { id: 'mf-19', asset: 'fern.svg',          x: 97,  y: 40, size: 100, rotation: 10,  opacity: 0.65, depth: 'background', delay: 0.1 },
  { id: 'mf-20', asset: 'tulip-pink.svg',    x: 94,  y: 55, size: 95,  rotation: -5,  opacity: 0.88, depth: 'foreground', delay: 0.15 },
  { id: 'mf-21', asset: 'hydrangea.svg',     x: 96,  y: 70, size: 85,  rotation: 12,  opacity: 0.85, depth: 'middle',     delay: 0.2 },
  { id: 'mf-22', asset: 'eucalyptus.svg',    x: 95,  y: 85, size: 110, rotation: 20,  opacity: 0.65, depth: 'background', delay: 0.1 },

  // Bottom dense cluster
  { id: 'mf-23', asset: 'rose-pink.svg',     x: 15,  y: 95, size: 100, rotation: 20,  opacity: 0.9,  depth: 'foreground', delay: 0.05 },
  { id: 'mf-24', asset: 'peony.svg',         x: 35,  y: 98, size: 110, rotation: -10, opacity: 0.95, depth: 'foreground', delay: 0 },
  { id: 'mf-25', asset: 'rose-cream.svg',    x: 65,  y: 96, size: 95,  rotation: 8,   opacity: 0.9,  depth: 'foreground', delay: 0.1 },
  { id: 'mf-26', asset: 'tulip-white.svg',   x: 50,  y: 94, size: 85,  rotation: -5,  opacity: 0.88, depth: 'middle',     delay: 0.15 },
  { id: 'mf-27', asset: 'hydrangea.svg',     x: 0,   y: 92, size: 90,  rotation: -15, opacity: 0.8,  depth: 'middle',     delay: 0.15 },
  { id: 'mf-28', asset: 'daisy-pink.svg',    x: 85,  y: 94, size: 85,  rotation: 25,  opacity: 0.85, depth: 'middle',     delay: 0.2 },
  { id: 'mf-29', asset: 'fern.svg',          x: 20,  y: 100,size: 110, rotation: -70, opacity: 0.65, depth: 'background', delay: 0.05 },
  { id: 'mf-30', asset: 'eucalyptus.svg',    x: 75,  y: 102,size: 105, rotation: 65,  opacity: 0.65, depth: 'background', delay: 0.1 },
  
  // Scatters and petals
  { id: 'mf-31', asset: 'loose-petal.svg',   x: 25,  y: -2, size: 30,  rotation: 45,  opacity: 0.7,  depth: 'foreground', delay: 0.2 },
  { id: 'mf-32', asset: 'loose-petal.svg',   x: 65,  y: 4,  size: 25,  rotation: -15, opacity: 0.65, depth: 'foreground', delay: 0.25 },
  { id: 'mf-33', asset: 'loose-petal.svg',   x: 8,   y: 45, size: 28,  rotation: 30,  opacity: 0.6,  depth: 'foreground', delay: 0.3 },
  { id: 'mf-34', asset: 'loose-petal.svg',   x: 92,  y: 65, size: 26,  rotation: -40, opacity: 0.6,  depth: 'foreground', delay: 0.35 },
  
  // Mascot: Penguin sticker at the bottom right peeking out
  { id: 'mascot-2', asset: '../decorations/penguin-sticker.svg', x: 80, y: 92, size: 100, rotation: 15, opacity: 1, depth: 'foreground', delay: 0.6 },
]

// ─── Final bouquet flowers (massive) ─────────────────────────────────────────

export const finalBouquetFlowers: FlowerItem[] = [
  // Super thick base foliage (radiating outwards from center)
  { id: 'fb-0a', asset: 'fern.svg',          x: 10, y: 35, size: 300, rotation: -45, opacity: 0.8,  depth: 'background', delay: 0 },
  { id: 'fb-0b', asset: 'fern.svg',          x: 65, y: 30, size: 320, rotation: 35,  opacity: 0.8,  depth: 'background', delay: 0 },
  { id: 'fb-0c', asset: 'eucalyptus.svg',    x: 15, y: 55, size: 280, rotation: -25, opacity: 0.75, depth: 'background', delay: 0 },
  { id: 'fb-0d', asset: 'eucalyptus.svg',    x: 60, y: 50, size: 290, rotation: 30,  opacity: 0.75, depth: 'background', delay: 0 },
  { id: 'fb-0e', asset: 'leaf-dark.svg',     x: 25, y: 20, size: 250, rotation: -60, opacity: 0.85, depth: 'background', delay: 0 },
  { id: 'fb-0f', asset: 'leaf-light.svg',    x: 55, y: 15, size: 240, rotation: 55,  opacity: 0.85, depth: 'background', delay: 0 },

  // Core bouquet center (huge flowers tightly packed behind the card)
  { id: 'fb-01', asset: 'peony.svg',         x: 35, y: 30, size: 280, rotation: -10, opacity: 0.98, depth: 'foreground', delay: 0 },
  { id: 'fb-02', asset: 'rose-burgundy.svg', x: 48, y: 28, size: 260, rotation: 15,  opacity: 0.98, depth: 'foreground', delay: 0.05 },
  { id: 'fb-03', asset: 'rose-pink.svg',     x: 28, y: 45, size: 240, rotation: -25, opacity: 0.98, depth: 'foreground', delay: 0.08 },
  { id: 'fb-04', asset: 'rose-cream.svg',    x: 55, y: 42, size: 250, rotation: 20,  opacity: 0.95, depth: 'middle',     delay: 0.1 },
  { id: 'fb-05', asset: 'daisy.svg',         x: 22, y: 35, size: 200, rotation: -15, opacity: 0.92, depth: 'middle',     delay: 0.12 },
  { id: 'fb-06', asset: 'daisy-white.svg',   x: 62, y: 32, size: 210, rotation: 25,  opacity: 0.92, depth: 'middle',     delay: 0.12 },
  { id: 'fb-07', asset: 'daisy-pink.svg',    x: 42, y: 55, size: 190, rotation: 0,   opacity: 0.9,  depth: 'middle',     delay: 0.15 },
  { id: 'fb-08', asset: 'tulip-pink.svg',    x: 58, y: 52, size: 220, rotation: 15,  opacity: 0.92, depth: 'middle',     delay: 0.1 },
  { id: 'fb-09', asset: 'tulip-white.svg',   x: 25, y: 58, size: 210, rotation: -28, opacity: 0.9,  depth: 'middle',     delay: 0.15 },
  { id: 'fb-10', asset: 'hydrangea.svg',     x: 68, y: 45, size: 230, rotation: 10,  opacity: 0.88, depth: 'middle',     delay: 0.08 },
  { id: 'fb-11', asset: 'hydrangea.svg',     x: 18, y: 48, size: 220, rotation: -18, opacity: 0.85, depth: 'middle',     delay: 0.12 },

  // Filler & baby's breath (very dense)
  { id: 'fb-17', asset: 'babys-breath.svg',  x: 42, y: 22, size: 180, rotation: 5,   opacity: 0.85, depth: 'middle',     delay: 0.15 },
  { id: 'fb-18', asset: 'babys-breath.svg',  x: 25, y: 28, size: 170, rotation: -15, opacity: 0.8,  depth: 'middle',     delay: 0.18 },
  { id: 'fb-19', asset: 'babys-breath.svg',  x: 60, y: 25, size: 175, rotation: 20,  opacity: 0.82, depth: 'middle',     delay: 0.18 },
  { id: 'fb-12', asset: 'small-blossom.svg', x: 38, y: 65, size: 110, rotation: 12,  opacity: 0.88, depth: 'foreground', delay: 0.18 },
  { id: 'fb-13', asset: 'small-blossom.svg', x: 55, y: 62, size: 105, rotation: -15, opacity: 0.85, depth: 'foreground', delay: 0.2 },
  { id: 'fb-14', asset: 'small-blossom.svg', x: 30, y: 68, size: 100, rotation: 22,  opacity: 0.82, depth: 'foreground', delay: 0.22 },
  
  // Petals scattered everywhere
  { id: 'fb-26', asset: 'loose-petal.svg',   x: 40, y: 75, size: 55,  rotation: 25,  opacity: 0.8,  depth: 'foreground', delay: 0.3 },
  { id: 'fb-27', asset: 'loose-petal.svg',   x: 65, y: 70, size: 50,  rotation: -35, opacity: 0.75, depth: 'foreground', delay: 0.35 },
  { id: 'fb-28', asset: 'loose-petal.svg',   x: 48, y: 80, size: 52,  rotation: 12,  opacity: 0.72, depth: 'foreground', delay: 0.4 },
  { id: 'fb-29', asset: 'loose-petal.svg',   x: 25, y: 72, size: 48,  rotation: -18, opacity: 0.7,  depth: 'foreground', delay: 0.4 },
  { id: 'fb-30', asset: 'loose-petal.svg',   x: 72, y: 65, size: 52,  rotation: 28,  opacity: 0.7,  depth: 'foreground', delay: 0.45 },
  { id: 'fb-31', asset: 'loose-petal.svg',   x: 55, y: 85, size: 45,  rotation: -8,  opacity: 0.65, depth: 'foreground', delay: 0.5 },

  // Ribbon (huge and beautiful at the base, directly under the card)
  { id: 'fb-32', asset: 'ribbon.svg',        x: 40, y: 70, size: 260, rotation: 0,   opacity: 0.98, depth: 'foreground', delay: 0.5 },
  
  // Extra mascots scattered around the final bouquet
  { id: 'fb-peng-3', asset: '../decorations/penguin-sticker.svg', x: 22, y: 65, size: 130, rotation: -20, opacity: 1, depth: 'foreground', delay: 0.4 },
  { id: 'fb-ax-4', asset: '../decorations/axolotl-sticker.svg', x: 72, y: 55, size: 140, rotation: 30, opacity: 1, depth: 'foreground', delay: 0.4 },
]
