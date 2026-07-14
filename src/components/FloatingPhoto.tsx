import { motion } from 'framer-motion'
import type { Memory } from '../types/memory'
import styles from './FloatingPhoto.module.css'

interface Props {
  memory: Memory
  size?: number
  delay?: number
  rotation?: number
  style?: React.CSSProperties
}

export function FloatingPhoto({ memory, size = 160, delay = 0, rotation = 0, style }: Props) {
  return (
    <motion.div
      className={styles.wrapper}
      style={{
        width: size,
        '--rotation': `${rotation}deg`,
        ...style,
      } as React.CSSProperties}
      initial={{ opacity: 0, y: 20, scale: 0.85 }}
      animate={{
        opacity: 1,
        y: [0, -10, 0],
        scale: 1,
      }}
      transition={{
        opacity: { delay, duration: 0.6 },
        scale: { delay, duration: 0.6 },
        y: {
          delay: delay + 0.6,
          duration: 3 + Math.random(),
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        },
      }}
    >
      <div className={styles.polaroidFrame}>
        <img
          src={memory.thumbnailSrc}
          alt={memory.caption || memory.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          onContextMenu={e => e.preventDefault()}
          className="photo-protected"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    </motion.div>
  )
}
