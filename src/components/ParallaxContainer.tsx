import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'

interface Props {
  children: React.ReactNode
  intensity?: number // multiplier for the movement (e.g. 1, 2)
  className?: string
  style?: React.CSSProperties
}

export function ParallaxContainer({ children, intensity = 1, className = '', style }: Props) {
  const shouldReduceMotion = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // We use spring physics for a smooth settling effect
  const springConfig = { damping: 30, stiffness: 100, mass: 1 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    if (shouldReduceMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position from center (-1 to 1)
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      
      // Max displacement 12px
      mouseX.set(nx * 12 * intensity)
      mouseY.set(ny * 12 * intensity)
    }

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!e.gamma || !e.beta) return
      // gamma is left-to-right (-90 to 90)
      // beta is front-to-back (-180 to 180)
      let nx = e.gamma / 45
      let ny = (e.beta - 45) / 45
      nx = Math.max(-1, Math.min(1, nx))
      ny = Math.max(-1, Math.min(1, ny))

      mouseX.set(nx * 8 * intensity)
      mouseY.set(ny * 8 * intensity)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('deviceorientation', handleDeviceOrientation)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('deviceorientation', handleDeviceOrientation)
    }
  }, [mouseX, mouseY, intensity, shouldReduceMotion])

  if (shouldReduceMotion) {
    return <div className={className} style={style}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      style={{ ...style, x, y }}
    >
      {children}
    </motion.div>
  )
}
