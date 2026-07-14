import { useNavigate } from 'react-router-dom'
import { useMemories } from '../hooks/useMemories'
import { MemoriesGallery } from '../components/MemoriesGallery'
import { MemoryLightbox } from '../components/MemoryLightbox'
import { useState, useCallback } from 'react'
import type { Memory } from '../types/memory'
import styles from './MemoriesPage.module.css'
import { publicPath } from '../lib/publicPath'

export function MemoriesPage() {
  const { all, featured } = useMemories()
  const featuredIds = new Set(featured.map(m => m.id))
  const navigate = useNavigate()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const handlePhotoClick = useCallback((memory: Memory) => {
    const idx = all.findIndex(m => m.id === memory.id)
    if (idx !== -1) setLightboxIndex(idx)
  }, [all])

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost"
          aria-label="Go back to the gift"
          style={{ marginRight: 'auto' }}
        >
          ← Kembali
        </button>
        <div className={styles.logoArea}>
          <img src={publicPath('flowers/rose.svg')} alt="" aria-hidden="true" style={{ width: 36 }}/>
          <h1 className={styles.title}>Semua Kenangan</h1>
          <img src={publicPath('flowers/rose.svg')} alt="" aria-hidden="true" style={{ width: 36, transform: 'scaleX(-1)' }}/>
        </div>
        <div style={{ marginLeft: 'auto', width: 80 }}/>
      </header>

      {/* Gallery */}
      <MemoriesGallery memories={all} featuredIds={featuredIds}/>

      {lightboxIndex !== null && (
        <MemoryLightbox
          memories={all}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  )
}
