import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import styles from './PageCurlTransition.module.css'

export function PageCurlTransition() {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // We map the scroll progress across this transition zone to a curl effect
  // If reduced motion is on, just do a simple opacity fade.
  const curlRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [-90, -45, 0])
  const curlOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  if (shouldReduceMotion) {
    return <div ref={ref} style={{ height: 100 }} /> // Just some spacing
  }

  return (
    <div ref={ref} className={styles.container} aria-hidden="true">
      <motion.div
        className={styles.curlShadow}
        style={{ opacity: curlOpacity }}
      />
      <motion.div
        className={styles.curlPage}
        style={{
          rotateX: curlRotateX,
          opacity: curlOpacity,
          transformOrigin: 'top center'
        }}
      >
        <div className={styles.curlHighlight} />
      </motion.div>
    </div>
  )
}
