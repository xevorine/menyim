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
import { InstantCameraPhoto } from './InstantCameraPhoto'
import { JourneyLine } from './JourneyLine'
import { PenguinDelivery } from './PenguinDelivery'
import { HiddenMemory } from './HiddenMemory'
import { ParallaxContainer } from './ParallaxContainer'

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
  const [isFlipped, setIsFlipped] = useState(false)

  const BASE_SIZE = 155  // px — base photo width before scale

  const handleCardClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    // Prevent flipping if clicking the view full screen button
    const target = e.target as HTMLElement
    if (target.closest(`.${styles.viewFullBtn}`)) return
    setIsFlipped(prev => !prev)
  }

  return (
    <motion.div
      ref={ref}
      className={styles.card + ' ' + styles[variant]}
      style={{
        position: 'absolute',
        left: `calc(${xPct}% - ${(BASE_SIZE * scale) / 2}px)`,
        top: yOffset,
        zIndex: isFlipped ? zIndex + 50 : zIndex, // Bring to front when flipped
        width: BASE_SIZE * scale,
        '--rotation': `${rotation}deg`,
        perspective: '1000px', // Required for 3D flip
      } as React.CSSProperties}
      custom={{ rotation, index }}
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
      <motion.div 
        className={styles.flipper}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        onClick={handleCardClick}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(e) } }}
        role="button"
        tabIndex={0}
        aria-label={`Photo: ${memory.caption || memory.name}. Click to flip.`}
      >
        {/* FRONT */}
        <div className={styles.front}>
          <div className={styles.imageWrapper + ' ' + (variant === 'circular' ? styles.circularWrapper : '')}>
            {index < 3 ? (
              <InstantCameraPhoto
                src={publicPath(memory.thumbnailRelativePath)}
                alt={memory.caption || memory.name}
                className={'photo-protected ' + styles.photo}
                aspectRatio={memory.width && memory.height ? `${memory.width} / ${memory.height}` : undefined}
              />
            ) : (
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
            )}
            {variant === 'tape' && <div className={styles.tape} aria-hidden="true"/>}
          </div>
          {(variant === 'polaroid' || variant === 'tape') && memory.caption && (
            <p className={styles.caption + ' script'}>{memory.caption}</p>
          )}
        </div>

        {/* BACK */}
        <div className={styles.back}>
          <div className={styles.backContent}>
            {memory.date && <p className={styles.backDate}>{memory.date}</p>}
            {memory.location && <p className={styles.backLocation}>📍 {memory.location}</p>}
            <p className={styles.backCaption + ' script'}>{memory.caption || "A beautiful memory"}</p>
            
            <button 
              className={styles.viewFullBtn}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              aria-label="View full screen"
            >
              🔍 View Full
            </button>
          </div>
        </div>
      </motion.div>
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
        <h2 className={styles.heading}>Memories</h2>
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
          
          {/* Animated Journey Line */}
          <JourneyLine />

          <PenguinDelivery />
          <HiddenMemory onDiscover={() => setLightboxIndex(0)} />

          {/* Background flower decorations injected dynamically down the page */}
          <ParallaxContainer intensity={1.5} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {Array.from({ length: Math.ceil(memories.length / 5) }).map((_, i) => {
              // Distribute them vertically roughly every 600px
              const top = 300 + i * 600
              const cluster = galleryRowClusters[i % galleryRowClusters.length]
              
              if (!cluster) return null

              return (
                <div 
                  key={i} 
                  className={styles.galleryCluster}
                  style={{
                    top: `${top}px`,
                    opacity: 0.8
                  }}
                  aria-hidden="true"
                >
                  <FlowerCluster flowers={cluster} />
                </div>
              )
            })}
          </ParallaxContainer>

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
