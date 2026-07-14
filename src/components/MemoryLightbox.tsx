import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import type { Memory } from '../types/memory'
import { usePreloadImages } from '../hooks/usePreloadImages'
import styles from './MemoryLightbox.module.css'

interface Props {
  memories: Memory[]
  initialIndex: number
  onClose: () => void
}

export function MemoryLightbox({ memories, initialIndex, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex)
  const [direction, setDirection] = useState(0)
  const current = memories[index]

  // Preload adjacent images
  const adjacentSrcs = [
    memories[index - 1]?.originalSrc,
    memories[index + 1]?.originalSrc,
  ].filter(Boolean) as string[]
  usePreloadImages(adjacentSrcs)

  const goPrev = useCallback(() => {
    if (index > 0) {
      setDirection(-1)
      setIndex(i => i - 1)
    }
  }, [index])

  const goNext = useCallback(() => {
    if (index < memories.length - 1) {
      setDirection(1)
      setIndex(i => i + 1)
    }
  }, [index, memories.length])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, goPrev, goNext])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Swipe gesture
  const bind = useDrag(({ swipe: [swipeX] }) => {
    if (swipeX === -1) goNext()
    if (swipeX === 1) goPrev()
  }, { swipe: { velocity: 0.15 } })

  if (!current) return null

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${current.caption || current.name}`}
    >
      {/* Close */}
      <button
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="Close lightbox"
      >
        ✕
      </button>

      {/* Counter */}
      <div className={styles.counter} aria-live="polite">
        {index + 1} / {memories.length}
      </div>

      {/* Photo */}
      <div
        className={styles.photoArea}
        onClick={e => e.stopPropagation()}
        {...bind()}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            initial={{ x: direction * 100, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: direction * -100, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.8 }}
            className={styles.photoWrapper}
          >
            <img
              src={current.originalSrc}
              alt={current.caption || current.name}
              className={styles.photo + ' photo-protected'}
              draggable={false}
              onContextMenu={e => e.preventDefault()}
              decoding="async"
            />
          </motion.div>
        </AnimatePresence>

        {/* Prev/Next arrows */}
        {index > 0 && (
          <button
            className={styles.navBtn + ' ' + styles.prevBtn}
            onClick={e => { e.stopPropagation(); goPrev() }}
            aria-label="Previous photo"
          >
            ‹
          </button>
        )}
        {index < memories.length - 1 && (
          <button
            className={styles.navBtn + ' ' + styles.nextBtn}
            onClick={e => { e.stopPropagation(); goNext() }}
            aria-label="Next photo"
          >
            ›
          </button>
        )}
      </div>

      {/* Caption */}
      {(current.caption || current.date || current.location) && (
        <div className={styles.captionArea} onClick={e => e.stopPropagation()}>
          {current.caption && <p className={styles.caption + ' script'}>{current.caption}</p>}
          <div className={styles.meta}>
            {current.date && <span>📅 {current.date}</span>}
            {current.location && <span>📍 {current.location}</span>}
          </div>
        </div>
      )}
    </motion.div>
  )
}
