import { motion, useReducedMotion } from 'framer-motion'
import type { FlowerItem } from '../data/flowerDecorations'
import { flowerBloom, flowerGrow, flowerSway } from '../animations/flowerVariants'
import { useMemo } from 'react'

interface Props {
  flower: FlowerItem
  index?: number
}

export function AnimatedFlower({ flower, index = 0 }: Props) {
  const shouldReduceMotion = useReducedMotion()
  
  // Decide entrance variant based on asset name or index
  const entranceVariant = useMemo(() => {
    if (flower.asset.includes('leaf') || flower.asset.includes('fern') || flower.asset.includes('eucalyptus')) {
      return flowerGrow
    }
    return flowerBloom
  }, [flower.asset])

  return (
    <motion.img
      src={`/flowers/${flower.asset}`}
      alt=""
      draggable={false}
      style={{
        position: 'absolute',
        left: `${flower.x}%`,
        top: `${flower.y}%`,
        width: flower.size,
        height: 'auto',
        zIndex: flower.depth === 'background' ? 1 : flower.depth === 'middle' ? 3 : 5,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
      custom={{ 
        delay: flower.delay ?? 0, 
        rotation: flower.rotation,
        opacity: flower.opacity
      }}
      initial="hidden"
      whileInView={shouldReduceMotion ? "visible" : ["visible", "idle"]}
      viewport={{ once: true, margin: '150px' }}
      variants={{
        hidden: entranceVariant.hidden,
        visible: entranceVariant.visible,
        idle: flowerSway.idle
      }}
    />
  )
}
