import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { publicPath } from '../lib/publicPath'
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
          <motion.img
            src={publicPath('mascots/penguin.png')} // assuming there's a penguin.png or we can use a placeholder
            alt=""
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
            style={{ width: 80, height: 80, objectFit: 'contain' }}
          />
          
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
            <div className={styles.photoFrame} />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
