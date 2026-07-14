import { useState, useCallback, useMemo, memo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Memory } from '../types/memory'
import { MemoryLightbox } from './MemoryLightbox'
import { buildScatterPlacements, boardHeight } from '../lib/scatterLayout'
import { FlowerCluster } from './FlowerCluster'
import { PetalLayer } from './PetalLayer'
import { getPhotoVariant } from '../animations/photoVariants'
import { useReducedMotion } from 'framer-motion'
import { galleryRowClusters } from '../data/flowerDecorations'
import styles from './ScatteredMemoriesBoard.module.css'
import { publicPath } from '../lib/publicPath'

interface Props {
  memories: Memory[]
}

// ─── Single scattered photo card ─────────────────────────────────────────────
interface CardProps {
  memory: Memory
  xPct: number
  yOffset: number
  rotation: number
  scale: number
  zIndex: number
  variant: 'polaroid' | 'tape' | 'circular' | 'torn' | 'clean'
  index: number
  onClick: () => void
}

const ScatteredCard = memo(function ScatteredCard({
  memory, xPct, yOffset, rotation, scale, zIndex, variant, index, onClick,
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '200px 0px 200px 0px' })
  const shouldReduceMotion = useReducedMotion()
  const entranceVariant = getPhotoVariant(index)

  const BASE_SIZE = 155  // px — base photo width before scale

  return (
    <motion.div
      ref={ref}
      className={styles.card + ' ' + styles[variant]}
      style={{
        position: 'absolute',
        left: `${xPct}%`,
        top: yOffset,
        zIndex: zIndex,
        width: BASE_SIZE * scale,
        '--rotation': `${rotation}deg`,
      } as React.CSSProperties}
      custom={{ rotation }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={shouldReduceMotion ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
      } : entranceVariant}
      whileHover={shouldReduceMotion ? {} : {
        scale: 1.08,
        rotate: rotation * 0.3,
        zIndex: 100,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.97 }}
    >
      <div
        className={styles.imageWrapper + ' ' + (variant === 'circular' ? styles.circularWrapper : '')}
        onClick={onClick}
        onContextMenu={e => e.preventDefault()}
        role="button"
        tabIndex={0}
        aria-label={`Open photo: ${memory.caption || memory.name}`}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }}
      >
        <img
          src={publicPath(memory.thumbnailRelativePath)}
          alt={memory.caption || memory.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={'photo-protected ' + styles.photo}
          style={
            memory.width && memory.height
              ? { aspectRatio: `${memory.width} / ${memory.height}` }
              : undefined
          }
        />
        {variant === 'tape' && <div className={styles.tape} aria-hidden="true"/>}
      </div>

      {/* Caption for polaroid / tape */}
      {(variant === 'polaroid' || variant === 'tape') && memory.caption && (
        <p className={styles.caption + ' script'}>{memory.caption}</p>
      )}
    </motion.div>
  )
})

// ─── Main board ───────────────────────────────────────────────────────────────
export function ScatteredMemoriesBoard({ memories }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const placements = useMemo(() => buildScatterPlacements(memories.length), [memories.length])
  const totalHeight = useMemo(() => boardHeight(memories.length), [memories.length])

  const handleClick = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const handleClose = useCallback(() => setLightboxIndex(null), [])

  return (
    <section className={styles.section} aria-label="Scattered memories">
      {/* Section header */}
      <div className={styles.header}>
        <img src={publicPath('flowers/babys-breath.svg')} alt="" aria-hidden="true" className={styles.headerFlower}/>
        <h2 className={styles.heading}>Kenangan Kita</h2>
        <img src={publicPath('flowers/babys-breath.svg')} alt="" aria-hidden="true" className={styles.headerFlower + ' ' + styles.headerFlowerRight}/>
      </div>

      {/* Decorative subtitle */}
      <p className={styles.subtitle + ' script'}>
        every photo tells a story 🌸
      </p>

      {/* The board */}
      {memories.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>📷</span>
          <h3>Belum ada foto</h3>
          <p>
            Download foto dari album Google Photos, lalu taruh di:
          </p>
          <code className={styles.code}>public/photos/memories/</code>
          <p style={{ marginTop: '0.75rem' }}>
            Setelah itu restart dev server dengan <code className={styles.code}>npm run dev</code> dan
            foto akan muncul bertebaran di sini. 🌸
          </p>
        </div>
      ) : (
        <div
          className={styles.board}
          style={{ height: totalHeight }}
          aria-label={`${memories.length} scattered memories`}
        >
          {/* Falling petals across the board */}
          <PetalLayer count={20} className={styles.boardPetals} />

          {/* Background flower decorations injected dynamically down the page */}
          {Array.from({ length: Math.ceil(memories.length / 5) }).map((_, i) => {
            // Distribute them vertically roughly every 600px
            const yPos = i * 550
            return (
              <div 
                key={`gc-${i}`} 
                className={styles.galleryCluster} 
                style={{ top: yPos }}
                aria-hidden="true"
              >
                <FlowerCluster
                  flowers={galleryRowClusters[i % galleryRowClusters.length]}
                />
              </div>
            )
          })}

          {/* Scattered cards */}
          {memories.map((memory, i) => {
            const p = placements[i]
            return (
              <ScatteredCard
                key={memory.id}
                memory={memory}
                xPct={p.xPct}
                yOffset={p.yOffset}
                rotation={p.rotation}
                scale={p.scale}
                zIndex={p.zIndex}
                variant={p.variant}
                index={i}
                onClick={() => handleClick(i)}
              />
            )
          })}
        </div>
      )}

      {lightboxIndex !== null && (
        <MemoryLightbox
          memories={memories}
          initialIndex={lightboxIndex}
          onClose={handleClose}
        />
      )}
    </section>
  )
}
