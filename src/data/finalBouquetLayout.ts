import { finalBouquetFlowers, FlowerItem } from './flowerDecorations'

// Phase 1: stems grow upward, leaves unfold, central flowers bloom behind the "For Menyim" card
export const phase1Flowers: FlowerItem[] = finalBouquetFlowers.filter(f => 
  f.asset.includes('fern') || 
  f.asset.includes('eucalyptus') || 
  f.asset.includes('leaf') || 
  (f.id.match(/^fb-0[1-5]$/)) // First few central flowers (peony, roses, etc)
)

// Phase 2: side flowers slide gently into their planned positions
export const phase2Flowers: FlowerItem[] = finalBouquetFlowers.filter(f => 
  f.id.match(/^fb-(0[6-9]|10|11)$/) // The rest of the large flowers (daisy, tulips, hydrangea)
)

// Phase 3: baby's breath, small blossoms, leaves, ribbon, and mascots
export const phase3Flowers: FlowerItem[] = finalBouquetFlowers.filter(f => 
  !phase1Flowers.includes(f) && !phase2Flowers.includes(f)
)
