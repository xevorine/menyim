/**
 * useMemories.ts
 *
 * Merges auto-generated manifest + user captions + featured selections.
 * Resolves missing featured photos gracefully with fallbacks.
 */

import { useMemo } from 'react'
import { generatedMemories } from '../data/generatedMemories'
import { memoryCaptions } from '../data/memoryCaptions'
import { featuredMemories } from '../data/featuredMemories'
import type { Memory } from '../types/memory'

function resolvePhotos(names: string[], allMemories: Memory[]): Memory[] {
  const found: Memory[] = []
  for (const name of names) {
    // Match by relative path (folder + name) or just name at root
    const match = allMemories.find(
      m =>
        m.name === name ||
        (m.folder ? `${m.folder}/${m.name}` : m.name) === name
    )
    if (match) found.push(match)
  }
  return found
}

function mergeMetadata(memories: Memory[]): Memory[] {
  return memories.map(m => {
    const key = m.folder ? `${m.folder}/${m.name}` : m.name
    const meta = memoryCaptions[key] ?? memoryCaptions[m.name]
    if (!meta) return m
    return {
      ...m,
      caption: meta.caption ?? m.caption,
      date: meta.date ?? m.date,
      location: meta.location ?? m.location,
    }
  })
}

export function useMemories() {
  return useMemo(() => {
    const all = mergeMetadata(generatedMemories)
    const isEmpty = all.length === 0

    // Opening photos: use configured ones, fall back to first 6
    let opening = resolvePhotos(featuredMemories.opening, all)
    if (opening.length === 0) opening = all.slice(0, 6)

    // Featured: configured, fall back to photos 3–8
    let featured = resolvePhotos(featuredMemories.featured, all)
    if (featured.length === 0) featured = all.slice(2, 8)

    // Final bouquet: configured, fall back to first 5
    let finalBouquet = resolvePhotos(featuredMemories.finalBouquet, all)
    if (finalBouquet.length === 0) finalBouquet = all.slice(0, 5)

    // Randomize the entire gallery placement order
    const shuffledAll = [...all].sort(() => Math.random() - 0.5)

    return {
      all: shuffledAll,
      opening,
      featured,
      finalBouquet,
      isEmpty,
      hasTimelineData: all.some(m => m.date || m.caption),
    }
  }, [])
}
