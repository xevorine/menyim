import type { Variants } from 'framer-motion'

export const photoSlideOut: Variants = {
  hidden: (custom) => ({ opacity: 0, x: -40, rotate: (custom?.rotation || 0) - 10, scale: 0.8 }),
  visible: (custom) => ({
    opacity: 1,
    x: 0,
    rotate: custom?.rotation || 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }
  })
}

export const photoDrop: Variants = {
  hidden: (custom) => ({ opacity: 0, y: -50, scale: 1.1, rotate: (custom?.rotation || 0) + 15 }),
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: custom?.rotation || 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  })
}

export const photoUnfold: Variants = {
  hidden: (custom) => ({ opacity: 0, rotateX: 60, y: 20, rotate: custom?.rotation || 0 }),
  visible: (custom) => ({
    opacity: 1,
    rotateX: 0,
    y: 0,
    rotate: custom?.rotation || 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  })
}

export const photoSwing: Variants = {
  hidden: (custom) => ({ opacity: 0, rotate: (custom?.rotation || 0) - 30, originX: 0.5, originY: 0 }),
  visible: (custom) => ({
    opacity: 1,
    rotate: custom?.rotation || 0,
    transition: { type: 'spring', stiffness: 50, damping: 8 }
  })
}

export const photoExpand: Variants = {
  hidden: (custom) => ({ opacity: 0, scale: 0 }),
  visible: (custom) => ({
    opacity: 1,
    scale: 1,
    rotate: custom?.rotation || 0,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
  })
}

const allVariants = [photoSlideOut, photoDrop, photoUnfold, photoSwing, photoExpand]

export function getPhotoVariant(index: number): Variants {
  return allVariants[index % allVariants.length]
}
