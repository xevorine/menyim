import { motion } from 'framer-motion'
import type { FlowerItem } from '../data/flowerDecorations'
import { publicPath } from '../lib/publicPath'

interface Props {
  flowers: FlowerItem[]
  phaseDelay: number
  animationType: 'grow' | 'slide-in' | 'fade-in'
  className?: string
  shouldReduceMotion?: boolean | null
  isInView?: boolean
}

export function BouquetLayer({ flowers, phaseDelay, animationType, className = '', shouldReduceMotion, isInView = true }: Props) {
  return (
    <div className={className} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {flowers.map((f, i) => {
        const src = publicPath(`flowers/${f.asset}`)
        const delay = phaseDelay + i * 0.05
        const zIndex = f.depth === 'foreground' ? 30 : f.depth === 'middle' ? 20 : 10

        const initial = shouldReduceMotion ? { opacity: 1 } :
          animationType === 'grow' ? { scale: 0, opacity: 0, rotate: f.rotation - 20 } :
          animationType === 'slide-in' ? { y: 30, opacity: 0, rotate: f.rotation } :
          { opacity: 0, scale: 0.9, rotate: f.rotation }

        const animate = isInView ? (shouldReduceMotion ? { opacity: f.opacity } : {
          scale: 1, // Will use width/height from style
          opacity: f.opacity,
          y: 0,
          rotate: f.rotation
        }) : {}

        return (
          <div
            key={f.id}
            style={{
              position: 'absolute',
              left: `${f.x}%`,
              top: `${f.y}%`,
              zIndex,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.img
              src={src}
              alt=""
              style={{
                width: f.size,
                height: f.size,
                display: 'block',
              }}
              initial={initial}
              animate={animate}
              transition={{
                delay,
                type: 'spring',
                stiffness: 100,
                damping: 15,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
