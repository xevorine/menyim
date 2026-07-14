import type { Memory } from '../types/memory'
import { generatedMemories } from '../data/generatedMemories'

/** Get all memories, typed */
export function getAllMemories(): Memory[] {
  return generatedMemories
}

/** Find a memory by relative path key */
export function findMemoryByPath(relPath: string): Memory | undefined {
  return generatedMemories.find(
    m => (m.folder ? `${m.folder}/${m.name}` : m.name) === relPath || m.name === relPath
  )
}

/** Safe fallback: if no photos at all, return empty array without crashing */
export function safeSlice(memories: Memory[], start: number, end?: number): Memory[] {
  if (memories.length === 0) return []
  return memories.slice(start, end)
}
