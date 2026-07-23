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
  const isVideo = src.match(/\.(mp4|webm|mov|mkv)$/i)

  return (
    <motion.div 
      ref={ref} 
      className={`${styles.container} ${className}`} 
      style={style}
      initial={shouldReduceMotion ? false : { y: 10, rotate: -2 }}
      animate={isInView ? { y: 0, rotate: 0 } : {}}
      transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 2.2 }} // Settling motion at the end
    >
      {/* The actual photo */}
      {isVideo ? (
        <motion.video
          src={src}
          className={'photo-protected ' + styles.photo}
          style={{ aspectRatio }}
          muted
          loop
          playsInline
          autoPlay
          initial={{ 
            opacity: 0.1, 
            filter: 'blur(8px) grayscale(100%) contrast(0.8) brightness(1.2)' 
          }}
          animate={
            isInView 
              ? (shouldReduceMotion 
                  ? { opacity: 1, filter: 'blur(0px) grayscale(0%) contrast(1) brightness(1)' } 
                  : { opacity: 1, filter: 'blur(0px) grayscale(0%) contrast(1) brightness(1)' }) 
              : {}
          }
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 2.5, ease: 'easeOut', delay: 0.2 }}
        />
      ) : (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={'photo-protected ' + styles.photo}
          style={{ aspectRatio }}
          initial={{ 
            opacity: 0.1, 
            filter: 'blur(8px) grayscale(100%) contrast(0.8) brightness(1.2)' 
          }}
          animate={
            isInView 
              ? (shouldReduceMotion 
                  ? { opacity: 1, filter: 'blur(0px) grayscale(0%) contrast(1) brightness(1)' } 
                  : { opacity: 1, filter: 'blur(0px) grayscale(0%) contrast(1) brightness(1)' }) 
              : {}
          }
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 2.5, ease: 'easeOut', delay: 0.2 }}
        />
      )}
      
      {/* Flash overlay - optional, kept from original or can be removed. I will tone it down. */}
      {!shouldReduceMotion && (
        <motion.div
          className={styles.flash}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: [0, 0.4, 0] } : {}}
          transition={{ duration: 0.4, times: [0, 0.1, 1], ease: 'easeOut' }}
          style={{ pointerEvents: 'none' }}
        />
      )}
    </motion.div>
  )
}
