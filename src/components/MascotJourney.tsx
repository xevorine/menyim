import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { AxolotlSticker } from './AxolotlSticker'
import { PenguinSticker } from './PenguinSticker'
import styles from './MascotJourney.module.css'
import { useState, useEffect } from 'react'

export function MascotJourney() {
  const { scrollYProgress } = useScroll()
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20
  })

  // Axolotl swimming down the left side
  const axolotlY = useTransform(smoothProgress, [0.1, 0.9], ["0vh", "90vh"])
  const axolotlX = useTransform(smoothProgress, 
    [0.1, 0.3, 0.5, 0.7, 0.9], 
    ["10vw", "20vw", "5vw", "25vw", "10vw"]
  )
  const axolotlRotate = useTransform(smoothProgress, 
    [0.1, 0.3, 0.5, 0.7, 0.9], 
    [15, -10, 20, -15, 10]
  )

  // Penguin sliding down the right side
  const penguinY = useTransform(smoothProgress, [0.2, 0.8], ["10vh", "85vh"])
  const penguinX = useTransform(smoothProgress, 
    [0.2, 0.4, 0.6, 0.8], 
    ["80vw", "70vw", "85vw", "75vw"]
  )
  const penguinRotate = useTransform(smoothProgress,
    [0.2, 0.4, 0.6, 0.8],
    [-10, 5, -15, 0]
  )

  if (isMobile) return null // Hide complex scrolling mascots on mobile for performance

  return (
    <div className={styles.container} aria-hidden="true">
      <motion.div
        className={styles.mascotWrapper}
        style={{ y: axolotlY, x: axolotlX, rotate: axolotlRotate }}
      >
        <AxolotlSticker className={styles.mascot} />
      </motion.div>

      <motion.div
        className={styles.mascotWrapper}
        style={{ y: penguinY, x: penguinX, rotate: penguinRotate }}
      >
        <PenguinSticker className={styles.mascot} />
      </motion.div>
    </div>
  )
}
