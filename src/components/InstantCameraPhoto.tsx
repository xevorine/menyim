import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import styles from './InstantCameraPhoto.module.css'

interface Props {
  src: string
  alt?: string
  className?: string
  style?: React.CSSProperties
  aspectRatio?: string
}

export function InstantCameraPhoto({ src, alt, className = '', style, aspectRatio }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '100px 0px 100px 0px' })
  const shouldReduceMotion = useReducedMotion()

  return (
    <div ref={ref} className={`${styles.container} ${className}`} style={style}>
      {/* The actual photo */}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={'photo-protected ' + styles.photo}
        style={{ aspectRatio }}
        initial={{ filter: 'blur(20px) contrast(0.5) brightness(1.5)' }}
        animate={isInView ? { filter: 'blur(0px) contrast(1) brightness(1)' } : {}}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 2.5, ease: 'easeOut', delay: 0.2 }}
      />
      
      {/* Flash overlay */}
      {!shouldReduceMotion && (
        <motion.div
          className={styles.flash}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: [0, 1, 0] } : {}}
          transition={{ duration: 0.4, times: [0, 0.1, 1], ease: 'easeOut' }}
        />
      )}
    </div>
  )
}
