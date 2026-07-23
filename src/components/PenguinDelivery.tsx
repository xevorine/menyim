import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { publicPath } from '../lib/publicPath'
import { generatedMemories } from '../data/generatedMemories'
import styles from './PenguinDelivery.module.css'

// A small component placing the penguin delivering a polaroid
export function PenguinDelivery() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px -50px 0px' })
  const shouldReduceMotion = useReducedMotion()
  const [sequence, setSequence] = useState<'hidden' | 'walking' | 'placing' | 'waving' | 'resting' | 'done'>('hidden')

  useEffect(() => {
    if (isInView && sequence === 'hidden') {
      if (shouldReduceMotion) {
        setSequence('done')
      } else {
        setSequence('walking')
      }
    }
  }, [isInView, sequence, shouldReduceMotion])

  useEffect(() => {
    if (sequence === 'walking') {
      const t = setTimeout(() => setSequence('placing'), 1200)
      return () => clearTimeout(t)
    }
    if (sequence === 'placing') {
      const t = setTimeout(() => setSequence('waving'), 400)
      return () => clearTimeout(t)
    }
    if (sequence === 'waving') {
      const t = setTimeout(() => setSequence('resting'), 800)
      return () => clearTimeout(t)
    }
  }, [sequence])

  return (
    <div ref={ref} className={styles.container} aria-hidden="true" style={{ pointerEvents: 'none' }}>
      {/* 
        Container gives us a positioning context. 
        We use framer-motion to orchestrate the animation.
      */}
      {!shouldReduceMotion && (
        <motion.div
          className={styles.penguinWrapper}
          initial={{ x: -100, opacity: 0 }}
          animate={{
            x: sequence === 'walking' || sequence === 'placing' || sequence === 'waving' || sequence === 'resting' ? 0 : -100,
            opacity: sequence !== 'hidden' ? 1 : 0
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.div
            className={styles.penguinImg}
            animate={
              sequence === 'walking'
                ? { rotate: [-5, 5, -5, 5, 0], y: [0, -10, 0, -10, 0] }
                : sequence === 'waving'
                ? { rotate: [0, 10, -5, 10, 0] }
                : { rotate: 0, y: 0 }
            }
            transition={
              sequence === 'walking'
                ? { duration: 1.2, repeat: Infinity }
                : { duration: 0.8 }
            }
            style={{ width: 80, height: 80 }}
          >
            <svg viewBox="0 0 200 200" width="100%" height="100%">
              <defs>
                <filter id="peng-shadow-delivery" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.1"/>
                </filter>
              </defs>
              <path d="M 60 30 C 40 10, 10 30, 25 70 C 10 90, 15 140, 40 170 C 60 195, 140 195, 160 170 C 185 140, 190 90, 175 70 C 190 30, 160 10, 140 30 C 120 15, 80 15, 60 30 Z" fill="#ffffff" stroke="#ffffff" strokeWidth="12" strokeLinejoin="round" filter="url(#peng-shadow-delivery)"/>
              <g>
                <path d="M 50 100 C 30 110, 25 130, 45 120 Z" fill="#3a4b5c"/>
                <path d="M 50 140 C 40 80, 60 40, 100 40 C 140 40, 160 80, 150 140 C 145 170, 55 170, 50 140 Z" fill="#3a4b5c"/>
                <path d="M 65 140 C 55 90, 70 55, 100 55 C 130 55, 145 90, 135 140 C 130 160, 70 160, 65 140 Z" fill="#ffffff"/>
                <path d="M 150 100 C 170 110, 175 130, 155 120 Z" fill="#3a4b5c"/>
                <path d="M 70 165 C 60 175, 80 180, 85 170 Z" fill="#ffb347"/>
                <path d="M 130 165 C 140 175, 120 180, 115 170 Z" fill="#ffb347"/>
                <circle cx="85" cy="85" r="5" fill="#2a2a2a"/>
                <circle cx="115" cy="85" r="5" fill="#2a2a2a"/>
                <ellipse cx="70" cy="95" rx="7" ry="4" fill="#ff99cc" opacity="0.6"/>
                <ellipse cx="130" cy="95" rx="7" ry="4" fill="#ff99cc" opacity="0.6"/>
                <path d="M 95 90 Q 100 98 105 90 Z" fill="#ffb347"/>
              </g>
            </svg>
          </motion.div>
          
          {/* Polaroid being carried and placed */}
          <motion.div
            className={styles.polaroid}
            initial={{ opacity: 0, x: 20, y: 20, rotate: 10 }}
            animate={
              sequence === 'walking'
                ? { opacity: 1, x: 20, y: 15, rotate: 5 } // carried
                : sequence === 'placing' || sequence === 'waving' || sequence === 'resting' || sequence === 'done'
                ? { opacity: 1, x: 60, y: 30, rotate: -15, scale: 1.2 } // placed
                : { opacity: 0 }
            }
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <div className={styles.photoFrame}>
              {(() => {
                // We do this lazily/safely so we don't import generatedMemories if it's huge, but wait, we already import it elsewhere.
                // Since this component is inside ScatteredMemoriesBoard, let's just use the first featured photo, or a random one.
                const hasMemories = generatedMemories.length > 0
                if (!hasMemories) return null
                
                // Pick a consistent random photo using a simple hash or just random on mount
                const memory = generatedMemories[Math.floor(Math.random() * generatedMemories.length)]
                const isVideo = memory.relativePath.match(/\.(mp4|webm|mov|mkv)$/i)
                return isVideo ? (
                  <video
                    src={publicPath(memory.relativePath)}
                    className="photo-protected"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                ) : (
                  <img
                    src={publicPath(memory.thumbnailRelativePath)}
                    alt="Penguin delivery"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )
              })()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
