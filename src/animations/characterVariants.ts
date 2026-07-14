import type { Variants } from 'framer-motion'

export const characterPeek: Variants = {
  hidden: (custom) => ({ opacity: 0, y: 20, rotate: custom?.rotation || 0, scale: 0.8 }),
  visible: (custom) => ({
    opacity: 1, 
    y: 0, 
    rotate: custom?.rotation || 0, 
    scale: 1,
    transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: custom?.delay || 0 }
  })
}

export const characterWobble: Variants = {
  idle: (custom) => ({
    rotate: [(custom?.rotation || 0), (custom?.rotation || 0) + 4, (custom?.rotation || 0) - 4, (custom?.rotation || 0)],
    y: [0, -3, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: custom?.delay || 0
    }
  })
}
