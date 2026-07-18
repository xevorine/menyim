import { motion } from 'framer-motion'
import { publicPath } from '../lib/publicPath'

const FLOWER_TYPES = [
  'flowers/tulip.svg',
  'flowers/rose.svg',
  'flowers/daisy.svg',
  'flowers/peony.svg',
  'flowers/hydrangea.svg',
  'flowers/daisy-white.svg',
  'flowers/daisy-pink.svg',
  'flowers/tulip-pink.svg',
  'flowers/eucalyptus.svg',
  'flowers/petal.svg',
  'flowers/loose-petal.svg'
]

// Generate 300 elements for a massive full-screen burst.
// Base size is 120px, scale is 0.5 to 1.8. Without willChange, it's safe to push counts higher.
const generateBurstElements = () => {
  const elements = []
  for (let i = 0; i < 300; i++) {
    const angle = Math.random() * Math.PI * 2
    
    // Spread them even further! Distance up to 1000px from center.
    const distance = Math.pow(Math.random(), 0.5) * 1000
    
    const x = Math.cos(angle) * distance
    const y = Math.sin(angle) * distance
    
    // Safe scales: 0.3 to 1.6
    const scale = 0.3 + Math.random() * 1.3
    const rotate = (Math.random() - 0.5) * 360
    
    // Slight delay variation for a "waterfall" explosion effect
    const delay = Math.random() * 0.4
    
    elements.push({
      id: i,
      x,
      y,
      rotate,
      scale,
      delay,
      src: FLOWER_TYPES[Math.floor(Math.random() * FLOWER_TYPES.length)]
    })
  }
  return elements
}

const BURST_ELEMENTS = generateBurstElements()

export function EnvelopeFlowerBurst() {
  return (
    <>
      {BURST_ELEMENTS.map((flower) => (
        <motion.img
          key={flower.id}
          src={publicPath(flower.src)}
          alt=""
          initial={{
            x: 0,
            y: 10,
            scale: 0.15,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            x: flower.x,
            y: flower.y,
            scale: flower.scale,
            rotate: flower.rotate,
            opacity: 1,
          }}
          transition={{
            duration: 1.0,
            delay: flower.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 120,
            height: 120,
            marginLeft: -60,
            marginTop: -60,
            objectFit: 'contain',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: 0.55,
          scale: [0.5, 1.3, 2],
        }}
        transition={{
          duration: 1.5,
          ease: 'easeOut',
        }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 180,
          height: 120,
          marginLeft: -90,
          marginTop: -60,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(255,245,230,0.9), transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
    </>
  )
}