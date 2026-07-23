import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { Memory } from '../types/memory'
import styles from './MemoryTimeline.module.css'
import { publicPath } from '../lib/publicPath'

interface Props {
  memories: Memory[]
}

function TimelineItem({ memory, index }: { memory: Memory; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className={styles.item + ' ' + (isLeft ? styles.left : styles.right)}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div className={styles.connector} aria-hidden="true">
        <div className={styles.dot}/>
      </div>

      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          {memory.relativePath.match(/\.(mp4|webm|mov|mkv)$/i) ? (
            <video
              src={publicPath(memory.relativePath)}
              className={'photo-protected ' + styles.photo}
              muted
              loop
              playsInline
              autoPlay
            />
          ) : (
            <img
              src={publicPath(memory.thumbnailRelativePath)}
              alt={memory.caption || memory.name}
              loading="lazy"
              decoding="async"
              draggable={false}
              onContextMenu={e => e.preventDefault()}
              className={'photo-protected ' + styles.photo}
            />
          )}
        </div>
        {(memory.caption || memory.date || memory.location) && (
          <div className={styles.info}>
            {memory.caption && <p className={styles.caption + ' script'}>{memory.caption}</p>}
            <div className={styles.meta}>
              {memory.date && <span>📅 {memory.date}</span>}
              {memory.location && <span>📍 {memory.location}</span>}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function MemoryTimeline({ memories }: Props) {
  // Only show memories that have at least one metadata field
  const withMeta = memories.filter(m => m.date || m.caption || m.location)

  if (withMeta.length === 0) return null

  return (
    <section className={styles.timeline} aria-label="Memory timeline">
      <div className={styles.header}>
        <img src={publicPath('flowers/leaf.svg')} alt="" aria-hidden="true" className={styles.leafLeft}/>
        <h2 className={styles.heading}>Jejak Kenangan</h2>
        <img src={publicPath('flowers/leaf.svg')} alt="" aria-hidden="true" className={styles.leafRight}/>
      </div>

      <div className={styles.track}>
        <div className={styles.line} aria-hidden="true"/>
        {withMeta.map((m, i) => (
          <TimelineItem key={m.id} memory={m} index={i}/>
        ))}
      </div>
    </section>
  )
}
