import { motion, useInView } from 'framer-motion'
import { useRef, useState, useCallback, memo } from 'react'
import type { Memory } from '../types/memory'
import type { PhotoVariant } from '../types/memory'
import { MemoryPolaroid } from './MemoryPolaroid'
import { MemoryLightbox } from './MemoryLightbox'
import styles from './MemoriesGallery.module.css'
import { publicPath } from '../lib/publicPath'

interface Props {
  memories: Memory[]
  featuredIds: Set<string>
}

type LayoutBlock =
  | { type: 'single'; memory: Memory; variant: PhotoVariant; rotation: number }
  | { type: 'pair'; memories: [Memory, Memory] }
  | { type: 'featured'; memory: Memory }
  | { type: 'strip'; memories: Memory[] }

function buildLayout(memories: Memory[], featuredIds: Set<string>): LayoutBlock[] {
  const blocks: LayoutBlock[] = []
  let i = 0

  const VARIANTS: PhotoVariant[] = ['polaroid', 'tape', 'torn', 'clean', 'circular']
  const ROTATIONS = [-4, -2, 0, 2, 4, -3, 3, 1, -1]

  while (i < memories.length) {
    const m = memories[i]
    const isFeatured = featuredIds.has(m.id)

    if (isFeatured) {
      blocks.push({ type: 'featured', memory: m })
      i++
      continue
    }

    // Film strip of 3–4
    if (i + 3 <= memories.length && blocks.length % 5 === 4) {
      const stripCount = Math.min(4, memories.length - i)
      blocks.push({ type: 'strip', memories: memories.slice(i, i + stripCount) })
      i += stripCount
      continue
    }

    // Pair layout every ~3 singles
    if (i + 1 < memories.length && blocks.length % 3 === 2) {
      blocks.push({ type: 'pair', memories: [memories[i], memories[i + 1]] })
      i += 2
      continue
    }

    // Single with variant cycle
    const variantIdx = i % VARIANTS.length
    const rotationIdx = i % ROTATIONS.length
    blocks.push({
      type: 'single',
      memory: m,
      variant: VARIANTS[variantIdx],
      rotation: ROTATIONS[rotationIdx],
    })
    i++
  }

  return blocks
}

// Lazy-rendered block that only mounts when in view
const GalleryBlock = memo(function GalleryBlock({
  block,
  index,
  onPhotoClick,
}: {
  block: LayoutBlock
  index: number
  onPhotoClick: (memory: Memory) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05 * (index % 8) }}
    >
      {block.type === 'single' && (
        <div className={styles.singleBlock}>
          <MemoryPolaroid
            memory={block.memory}
            variant={block.variant}
            rotation={block.rotation}
            onClick={() => onPhotoClick(block.memory)}
          />
        </div>
      )}

      {block.type === 'featured' && (
        <div className={styles.featuredBlock}>
          <MemoryPolaroid
            memory={block.memory}
            variant="clean"
            rotation={0}
            onClick={() => onPhotoClick(block.memory)}
          />
          {(block.memory.caption || block.memory.date) && (
            <div className={styles.featuredCaption}>
              {block.memory.caption && <p className="script">{block.memory.caption}</p>}
              {block.memory.date && <small>{block.memory.date}</small>}
            </div>
          )}
        </div>
      )}

      {block.type === 'pair' && (
        <div className={styles.pairBlock}>
          {block.memories.map((m, pi) => (
            <MemoryPolaroid
              key={m.id}
              memory={m}
              variant="polaroid"
              rotation={pi === 0 ? -3 : 3}
              onClick={() => onPhotoClick(m)}
            />
          ))}
        </div>
      )}

      {block.type === 'strip' && (
        <div className={styles.stripBlock}>
          {block.memories.map(m => (
            <MemoryPolaroid
              key={m.id}
              memory={m}
              variant="clean"
              rotation={0}
              onClick={() => onPhotoClick(m)}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
})

export function MemoriesGallery({ memories, featuredIds }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const handlePhotoClick = useCallback((memory: Memory) => {
    const idx = memories.findIndex(m => m.id === memory.id)
    if (idx !== -1) setLightboxIndex(idx)
  }, [memories])

  const handleLightboxClose = useCallback(() => setLightboxIndex(null), [])

  if (memories.length === 0) {
    return (
      <section className={styles.empty}>
        <div className={styles.emptyContent}>
          <span className={styles.emptyIcon}>📷</span>
          <h2>Belum ada foto</h2>
          <p>Tambahkan fotomu ke <code>public/photos/memories/</code> lalu jalankan kembali <code>npm run dev</code>.</p>
        </div>
      </section>
    )
  }

  const blocks = buildLayout(memories, featuredIds)

  return (
    <section className={styles.gallery} aria-label="Memory gallery">
      <div className={styles.header}>
        <img src={publicPath('flowers/babys-breath.svg')} alt="" aria-hidden="true" className={styles.headerFlower}/>
        <h2 className={styles.heading}>Memories</h2>
        <img src={publicPath('flowers/babys-breath.svg')} alt="" aria-hidden="true" className={styles.headerFlower + ' ' + styles.headerFlowerRight}/>
      </div>

      <div className={styles.grid}>
        {blocks.map((block, i) => (
          <GalleryBlock
            key={i}
            block={block}
            index={i}
            onPhotoClick={handlePhotoClick}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <MemoryLightbox
          memories={memories}
          initialIndex={lightboxIndex}
          onClose={handleLightboxClose}
        />
      )}
    </section>
  )
}
