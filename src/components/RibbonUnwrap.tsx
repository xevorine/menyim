import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import styles from './RibbonUnwrap.module.css'

interface Props {
  children: React.ReactNode
}

export function RibbonUnwrap({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px 0px -100px 0px' })
  const shouldReduceMotion = useReducedMotion()
  const [sequence, setSequence] = useState<'wrapped' | 'loosening' | 'sliding' | 'behind' | 'revealed'>('wrapped')

  useEffect(() => {
    if (isInView && sequence === 'wrapped') {
      if (shouldReduceMotion) {
        setSequence('revealed')
      } else {
        setSequence('loosening')
      }
    }
  }, [isInView, sequence, shouldReduceMotion])

  useEffect(() => {
    if (sequence === 'loosening') {
      const t = setTimeout(() => setSequence('sliding'), 400)
      return () => clearTimeout(t)
    }
    if (sequence === 'sliding') {
      const t = setTimeout(() => setSequence('behind'), 600)
      return () => clearTimeout(t)
    }
    if (sequence === 'behind') {
      const t = setTimeout(() => setSequence('revealed'), 300)
      return () => clearTimeout(t)
    }
  }, [sequence])

  return (
    <div ref={ref} className={styles.container}>
      {/* The wrapped content */}
      <motion.div
        className={styles.contentWrapper}
        initial={{ y: 20 }}
        animate={{ y: sequence === 'revealed' ? 0 : 20 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {children}
      </motion.div>

      {/* The Ribbon */}
      {!shouldReduceMotion && sequence !== 'revealed' && (
        <div className={styles.ribbonLayer} aria-hidden="true" style={{ pointerEvents: 'none' }}>
          {/* Left ribbon tail */}
          <motion.div
            className={styles.ribbonTailLeft}
            initial={{ x: 0, opacity: 1 }}
            animate={
              sequence === 'loosening' ? { x: -10, rotate: -5 } :
              sequence === 'sliding' ? { x: -100, opacity: 0 } :
              sequence === 'behind' ? { opacity: 0 } : {}
            }
            transition={{ duration: 0.5 }}
          />
          {/* Right ribbon tail */}
          <motion.div
            className={styles.ribbonTailRight}
            initial={{ x: 0, opacity: 1 }}
            animate={
              sequence === 'loosening' ? { x: 10, rotate: 5 } :
              sequence === 'sliding' ? { x: 100, opacity: 0 } :
              sequence === 'behind' ? { opacity: 0 } : {}
            }
            transition={{ duration: 0.5 }}
          />
          {/* Center Knot */}
          <motion.div
            className={styles.ribbonKnot}
            initial={{ scale: 1, opacity: 1 }}
            animate={
              sequence === 'loosening' ? { scale: 1.2, opacity: 0.8 } :
              sequence === 'sliding' || sequence === 'behind' ? { scale: 1.5, opacity: 0 } : {}
            }
            transition={{ duration: 0.4 }}
          />
        </div>
      )}
    </div>
  )
}
