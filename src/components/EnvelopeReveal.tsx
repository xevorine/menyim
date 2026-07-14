import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import type { Memory } from '../types/memory'
import styles from './EnvelopeReveal.module.css'
import { publicPath } from '../lib/publicPath'

interface Props {
  isOpen: boolean
  firstPhoto: Memory | null
  onComplete: () => void
}

// Petal positions relative to envelope center
const PETALS = [
  { x: -80, y: -60, rotate: -30, delay: 0.5 },
  { x: 80, y: -70, rotate: 45, delay: 0.55 },
  { x: -100, y: 20, rotate: -60, delay: 0.6 },
  { x: 110, y: 30, rotate: 20, delay: 0.52 },
  { x: -60, y: 80, rotate: 70, delay: 0.65 },
  { x: 70, y: 85, rotate: -50, delay: 0.58 },
  { x: 10, y: -100, rotate: 10, delay: 0.48 },
  { x: -20, y: 110, rotate: -20, delay: 0.62 },
]

export function EnvelopeReveal({ isOpen, firstPhoto, onComplete }: Props) {
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(onComplete, 2200)
      return () => clearTimeout(t)
    }
  }, [isOpen, onComplete])

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Open envelope */}
      <motion.div
        className={styles.envelope}
        initial={{ scale: 1, y: 0, rotate: 0 }}
        animate={isOpen ? { scale: 0.6, y: 60, opacity: 0 } : { scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeInOut', delay: 0.6 }}
      >
        <motion.svg 
          viewBox="0 0 200 140" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          aria-hidden="true"
          animate={isOpen ? { rotate: [0, -3, 3, -2, 2, 0] } : {}}
          transition={{ duration: 0.4, delay: 0 }}
        >
          <rect x="4" y="30" width="192" height="106" rx="8" fill="#f5ede0" stroke="#d4889a" strokeWidth="2"/>
          {/* Flap open */}
          <motion.path
            initial={{ d: 'M4 30 L100 90 L196 30' }}
            d="M4 30 L100 90 L196 30"
            fill="#ecddd0"
            stroke="#d4889a"
            strokeWidth="2"
            animate={isOpen ? { d: 'M4 30 L100 -10 L196 30' } : { d: 'M4 30 L100 90 L196 30' }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.4 }}
          />
          <path d="M4 30 L4 136 L76 86Z" fill="#e8d4c4"/>
          <path d="M196 30 L196 136 L124 86Z" fill="#e8d4c4"/>
          {/* Seal */}
          <motion.g
            animate={isOpen ? { scale: [1, 1.5, 0], opacity: [1, 1, 0] } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            style={{ originX: '100px', originY: '88px' }}
          >
            <circle cx="100" cy="88" r="12" fill="#7d2840" opacity="0.9"/>
            <text x="100" y="93" textAnchor="middle" fill="white" fontSize="12" fontFamily="serif">♥</text>
          </motion.g>
        </motion.svg>
      </motion.div>

      {/* Scattered petals */}
      <AnimatePresence>
        {isOpen && PETALS.map((p, i) => (
          <motion.img
            key={i}
            src={publicPath('flowers/petal.svg')}
            alt=""
            aria-hidden="true"
            className={styles.petal}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 0 }}
            animate={{
              x: p.x,
              y: p.y,
              opacity: [0, 1, 1, 0],
              scale: 1,
              rotate: p.rotate,
            }}
            transition={{
              duration: 1.4,
              delay: p.delay,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>

      {/* First photo emerging from envelope */}
      <AnimatePresence>
        {isOpen && firstPhoto && (
          <motion.div
            className={styles.photoReveal}
            initial={{ scale: 0.3, y: 40, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, y: -20, opacity: 1, rotate: 2 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <img
              src={publicPath(firstPhoto.thumbnailRelativePath)}
              alt={firstPhoto.caption || firstPhoto.name}
              className="photo-protected"
              onContextMenu={e => e.preventDefault()}
              style={{ borderRadius: 8, boxShadow: 'var(--shadow-photo)' }}
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
