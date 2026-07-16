import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

export type DoodleType = 'heart' | 'star' | 'sparkle' | 'underline'

interface Props {
  type: DoodleType
  color?: string
  width?: number
  className?: string
  style?: React.CSSProperties
}

const DOODLE_PATHS: Record<DoodleType, string> = {
  heart: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  star: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  sparkle: 'M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z',
  underline: 'M2 12c4-2 8-2 12 0s8 2 12 0'
}

export function Doodle({ type, color = '#d4889a', width = 24, className = '', style }: Props) {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' })
  const shouldReduceMotion = useReducedMotion()

  return (
    <svg
      ref={ref}
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ ...style, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <motion.path
        d={DOODLE_PATHS[type]}
        initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
      />
    </svg>
  )
}
