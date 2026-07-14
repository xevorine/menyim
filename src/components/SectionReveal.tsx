import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export function SectionReveal({ children, className = '' }: Props) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px 0px -50px 0px' })
  
  if (shouldReduceMotion) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div ref={ref} className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* The content that gets revealed */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.div>

      {/* Paper Wipe Overlay */}
      <motion.div
        initial={{ y: '0%' }}
        animate={isInView ? { y: '100%' } : {}}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          left: -20,
          right: -20,
          height: '110%',
          background: 'var(--color-bg)',
          zIndex: 10,
          pointerEvents: 'none',
          boxShadow: '0 -10px 20px rgba(0,0,0,0.05)',
          borderTop: '2px solid var(--color-dusty-pink)',
          borderTopLeftRadius: '10%',
          borderTopRightRadius: '5%'
        }}
        aria-hidden="true"
      />
    </div>
  )
}
