export interface Memory {
  id: string
  name: string
  relativePath: string
  thumbnailRelativePath: string
  width: number
  height: number
  folder: string
  caption: string
  date: string | null
  location: string | null
}

export interface MemoryMeta {
  caption?: string
  date?: string
  location?: string
}

export type MemoryCaptionsMap = Record<string, MemoryMeta>

export interface FeaturedMemories {
  opening: string[]
  featured: string[]
  finalBouquet: string[]
}

export interface GiftContent {
  recipientName: string
  senderName: string
  openingTitle: string
  openingSubtitle: string
  personalMessage: string
  finalMessage: string
  albumUrl: string
  audioEnabled: boolean
  audioSrc: string
}

export type PhotoVariant = 'polaroid' | 'tape' | 'circular' | 'torn' | 'clean'
