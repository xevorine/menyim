import { motion } from 'framer-motion'
import type { Memory } from '../types/memory'
import type { PhotoVariant } from '../types/memory'
import styles from './MemoryPolaroid.module.css'
import clsx from 'clsx'

interface Props {
  memory: Memory
  variant?: PhotoVariant
  rotation?: number
  onClick?: () => void
  priority?: boolean
  style?: React.CSSProperties
}

const variantClass: Record<PhotoVariant, string> = {
  polaroid: styles.polaroid,
  tape: styles.tape,
  circular: styles.circular,
  torn: styles.torn,
  clean: styles.clean,
}

export function MemoryPolaroid({
  memory,
  variant = 'polaroid',
  rotation = 0,
  onClick,
  priority = false,
  style,
}: Props) {
  const isCircular = variant === 'circular'

  return (
    <motion.div
      className={clsx(styles.base, variantClass[variant])}
      style={{ '--rotation': `${rotation}deg`, ...style } as React.CSSProperties}
      whileHover={onClick ? { scale: 1.04, rotate: rotation * 0.5, zIndex: 10 } : undefined}
      whileTap={onClick ? { scale: 0.97 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div
        className={clsx(styles.imageWrapper, isCircular && styles.circularWrapper)}
        onClick={onClick}
        onContextMenu={e => e.preventDefault()}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-label={onClick ? `Open photo: ${memory.caption || memory.name}` : undefined}
        onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } } : undefined}
      >
        <img
          src={memory.thumbnailSrc}
          alt={memory.caption || memory.name}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={clsx(styles.photo, 'photo-protected')}
          draggable={false}
          style={
            memory.width && memory.height
              ? { aspectRatio: `${memory.width} / ${memory.height}` }
              : undefined
          }
        />
        {/* Tape decoration for tape variant */}
        {variant === 'tape' && (
          <div className={styles.tapeStrip} aria-hidden="true"/>
        )}
      </div>

      {/* Caption below polaroid */}
      {(variant === 'polaroid' || variant === 'tape') && (memory.caption || memory.date) && (
        <div className={styles.caption}>
          {memory.caption && <p className={styles.captionText + ' script'}>{memory.caption}</p>}
          {memory.date && <p className={styles.dateText}>{memory.date}</p>}
        </div>
      )}
    </motion.div>
  )
}
