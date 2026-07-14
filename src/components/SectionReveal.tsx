import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import { sectionReveal, sectionFade } from '../animations/commonVariants'

interface Props {
  children: ReactNode
  className?: string
}

export function SectionReveal({ children, className = '' }: Props) {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={shouldReduceMotion ? sectionFade : sectionReveal}
    >
      {children}
    </motion.div>
  )
}
