import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import styles from './GrowingVines.module.css'
import { publicPath } from '../lib/publicPath'

export function GrowingVines() {
  const { scrollYProgress } = useScroll()
  
  // Smooth out the scroll for drawing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Map scroll progress (10% to 90% of page) to path length (0 to 1)
  const pathLength = useTransform(smoothProgress, [0.05, 0.95], [0, 1])
  
  const [windowHeight, setWindowHeight] = useState(3000)
  
  useEffect(() => {
    // Measure body height to draw SVG properly
    const updateHeight = () => {
      const h = document.documentElement.scrollHeight
      setWindowHeight(Math.max(h, 2000))
    }
    
    updateHeight()
    window.addEventListener('resize', updateHeight)
    // Small delay to allow images to load and DOM to settle
    setTimeout(updateHeight, 1000)
    
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  return (
    <div className={styles.container} aria-hidden="true">
      {/* Left Vine */}
      <svg className={styles.vineLeft} viewBox={`0 0 100 ${windowHeight}`} preserveAspectRatio="none">
        <motion.path
          d={`M 20 0 Q 80 ${windowHeight * 0.25}, 20 ${windowHeight * 0.5} T 20 ${windowHeight}`}
          fill="transparent"
          stroke="var(--color-sage-green)"
          strokeWidth="4"
          style={{ pathLength }}
          strokeLinecap="round"
          className={styles.stem}
        />
      </svg>
      
      {/* Right Vine */}
      <svg className={styles.vineRight} viewBox={`0 0 100 ${windowHeight}`} preserveAspectRatio="none">
        <motion.path
          d={`M 80 0 Q 20 ${windowHeight * 0.25}, 80 ${windowHeight * 0.5} T 80 ${windowHeight}`}
          fill="transparent"
          stroke="var(--color-sage-green)"
          strokeWidth="4"
          style={{ pathLength }}
          strokeLinecap="round"
          className={styles.stem}
        />
      </svg>
    </div>
  )
}
