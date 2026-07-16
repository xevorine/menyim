import type { Variants } from 'framer-motion'

// Magnetic snap sequence:
// 1. Slide from an offset
// 2. Rotate to angle
// 3. Snap via spring
// 4. One small settling movement (handled by the spring settling)
// 5. Stable

export const magneticSnapLeft: Variants = {
  hidden: (custom) => ({ opacity: 0, x: -100, y: -20, rotate: (custom?.rotation || 0) - 20, scale: 0.8 }),
  visible: (custom) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: custom?.rotation || 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14,
      mass: 1.2,
      delay: (custom?.index || 0) * 0.1,
    }
  })
}

export const magneticSnapRight: Variants = {
  hidden: (custom) => ({ opacity: 0, x: 100, y: 30, rotate: (custom?.rotation || 0) + 20, scale: 0.85 }),
  visible: (custom) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: custom?.rotation || 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 110,
      damping: 15,
      mass: 1.1,
      delay: (custom?.index || 0) * 0.1,
    }
  })
}

export const magneticSnapTop: Variants = {
  hidden: (custom) => ({ opacity: 0, x: 10, y: -80, rotate: (custom?.rotation || 0) - 15, scale: 0.9 }),
  visible: (custom) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: custom?.rotation || 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 130,
      damping: 13,
      mass: 1.3,
      delay: (custom?.index || 0) * 0.1,
    }
  })
}

export const magneticSnapBottom: Variants = {
  hidden: (custom) => ({ opacity: 0, x: -20, y: 80, rotate: (custom?.rotation || 0) + 25, scale: 0.95 }),
  visible: (custom) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: custom?.rotation || 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 115,
      damping: 14,
      mass: 1.2,
      delay: (custom?.index || 0) * 0.1,
    }
  })
}

const allVariants = [
  magneticSnapLeft, 
  magneticSnapRight, 
  magneticSnapTop, 
  magneticSnapBottom
]

export function getPhotoVariant(index: number): Variants {
  return allVariants[index % allVariants.length]
}
