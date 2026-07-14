import type { Variants } from 'framer-motion'

export const flowerBloom: Variants = {
  hidden: (custom) => ({ 
    opacity: 0, 
    scale: 0.3, 
    rotate: (custom?.rotation || 0) - 15,
    x: "-50%",
    y: "-50%"
  }),
  visible: (custom) => ({
    opacity: custom?.opacity || 1,
    scale: 1,
    rotate: custom?.rotation || 0,
    x: "-50%",
    y: "-50%",
    transition: {
      duration: 1.2,
      ease: [0.34, 1.56, 0.64, 1], // Spring-like ease out
      delay: custom?.delay || 0
    }
  })
}

export const flowerGrow: Variants = {
  hidden: (custom) => ({
    opacity: 0,
    scaleY: 0.2,
    x: "-50%",
    y: "-40%",
    originY: 1
  }),
  visible: (custom) => ({
    opacity: custom?.opacity || 1,
    scaleY: 1,
    x: "-50%",
    y: "-50%",
    originY: 1,
    transition: {
      duration: 1.0,
      ease: 'easeOut',
      delay: custom?.delay || 0
    }
  })
}

export const petalFall: Variants = {
  hidden: (custom) => ({
    opacity: 0,
    y: -40,
    x: 0,
    rotate: 0,
    scale: 0.8
  }),
  visible: (custom) => ({
    opacity: [0, 1, 1, 0],
    y: 80,
    x: custom?.xOffset || 20,
    rotate: custom?.rotateEnd || 90,
    scale: 1,
    transition: {
      duration: 2.5,
      ease: 'easeOut',
      delay: custom?.delay || 0
    }
  })
}

// Very subtle sway, barely noticeable
export const flowerSway: Variants = {
  idle: (custom) => ({
    x: "-50%",
    y: "-50%",
    rotate: [(custom?.rotation || 0), (custom?.rotation || 0) + 2, (custom?.rotation || 0) - 1, (custom?.rotation || 0)],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: custom?.delay || 0
    }
  })
}
