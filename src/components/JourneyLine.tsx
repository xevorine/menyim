import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function JourneyLine() {
  const { scrollYProgress } = useScroll()
  const shouldReduceMotion = useReducedMotion()
  const [windowHeight, setWindowHeight] = useState(3000)

  useEffect(() => {
    const updateHeight = () => {
      const h = document.documentElement.scrollHeight
      setWindowHeight(Math.max(h, 2000))
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    setTimeout(updateHeight, 1500)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  })

  // We want the line to draw down the middle of the screen
  // Path length goes from 0 to 1 based on scroll
  const pathLength = useTransform(smoothProgress, [0.1, 0.95], [0, 1])

  if (shouldReduceMotion) return null

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2, // Behind photos, above background
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      <svg 
        viewBox={`0 0 100 ${windowHeight}`} 
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%', opacity: 0.4 }}
      >
        <motion.path
          d={`M 50 0 
              Q 30 ${windowHeight * 0.1}, 50 ${windowHeight * 0.2} 
              T 50 ${windowHeight * 0.4}
              T 50 ${windowHeight * 0.6}
              T 50 ${windowHeight * 0.8}
              T 50 ${windowHeight}`}
          fill="transparent"
          stroke="var(--color-burgundy)"
          strokeWidth="2"
          strokeDasharray="10 15"
          style={{ pathLength }}
          strokeLinecap="round"
        />
        
        {/* Draw a few little knots/dots on the line */}
        <motion.circle cx="50" cy={windowHeight * 0.2} r="3" fill="var(--color-dusty-pink)" style={{ opacity: useTransform(pathLength, [0, 0.2, 0.25], [0, 0, 1]) }} />
        <motion.circle cx="50" cy={windowHeight * 0.4} r="3" fill="var(--color-dusty-pink)" style={{ opacity: useTransform(pathLength, [0, 0.4, 0.45], [0, 0, 1]) }} />
        <motion.circle cx="50" cy={windowHeight * 0.6} r="3" fill="var(--color-dusty-pink)" style={{ opacity: useTransform(pathLength, [0, 0.6, 0.65], [0, 0, 1]) }} />
        <motion.circle cx="50" cy={windowHeight * 0.8} r="3" fill="var(--color-dusty-pink)" style={{ opacity: useTransform(pathLength, [0, 0.8, 0.85], [0, 0, 1]) }} />
      </svg>
    </div>
  )
}
