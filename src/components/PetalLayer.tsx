import { motion } from 'framer-motion'
import styles from './PetalLayer.module.css'

interface Petal {
  id: number
  x: number     // % from left
  delay: number // seconds
  dur: number   // animation duration
  size: number  // px
  rotation: number
  asset: string
}

const PETAL_ASSETS = ['/flowers/loose-petal.svg', '/flowers/petal.svg', '/flowers/small-blossom.svg']

function buildPetals(count: number): Petal[] {
  // Deterministic positions based on index
  return Array.from({ length: count }, (_, i) => {
    const seed = i * 137.508  // golden angle increment
    return {
      id: i,
      x: ((seed * 6.18) % 90) + 5,
      delay: (i * 0.7) % 8,
      dur: 5 + (i % 4) * 1.5,
      size: 16 + (i % 5) * 6,
      rotation: (i * 47) % 360,
      asset: PETAL_ASSETS[i % PETAL_ASSETS.length],
    }
  })
}

interface Props {
  count?: number
  className?: string
}

/**
 * PetalLayer — continuously falling petals animation.
 * Respects prefers-reduced-motion by reducing count.
 */
export function PetalLayer({ count = 12, className = '' }: Props) {
  const petals = buildPetals(count)

  return (
    <div
      className={styles.layer + (className ? ' ' + className : '')}
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      {petals.map(p => (
        <motion.img
          key={p.id}
          src={p.asset}
          alt=""
          draggable={false}
          className={styles.petal}
          style={{ left: `${p.x}%`, width: p.size }}
          initial={{ y: -80, opacity: 0, rotate: p.rotation }}
          animate={{
            y: '110vh',
            opacity: [0, 0.75, 0.75, 0],
            rotate: p.rotation + 360,
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
