import { useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  staticFallback: ReactNode
}

/**
 * Renders children normally, or a static fallback when
 * the user has requested reduced motion.
 */
export function ReducedMotionFallback({ children, staticFallback }: Props) {
  const shouldReduce = useReducedMotion()
  return <>{shouldReduce ? staticFallback : children}</>
}
