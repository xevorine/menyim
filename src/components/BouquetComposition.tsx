import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { Memory } from '../types/memory'
import { FloatingPhoto } from './FloatingPhoto'
import { FlowerCluster } from './FlowerCluster'
import { PetalLayer } from './PetalLayer'
import { finalBouquetFlowers } from '../data/flowerDecorations'
import styles from './BouquetComposition.module.css'
import { giftContent } from '../data/giftContent'
import { publicPath } from '../lib/publicPath'
import { AxolotlSticker } from './AxolotlSticker'
import { PenguinSticker } from './PenguinSticker'

interface Props {
  photos: Memory[]
}



const PHOTO_PLACEMENTS = [
  { size: 150, delay: 0.2, rotation: -8, style: { bottom: '18%', left: '8%' } },
  { size: 170, delay: 0.35, rotation: 4, style: { bottom: '22%', left: '28%' } },
  { size: 180, delay: 0.5, rotation: -2, style: { bottom: '20%', left: '50%', transform: 'translateX(-50%)' } },
  { size: 160, delay: 0.65, rotation: 6, style: { bottom: '24%', right: '26%' } },
  { size: 140, delay: 0.8, rotation: -9, style: { bottom: '16%', right: '7%' } },
]

export function BouquetComposition({ photos }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' })

  const visiblePhotos = photos.slice(0, 5)

  return (
    <div ref={ref} className={styles.composition}>
      {/* Falling petals */}
      <PetalLayer count={30} className={styles.finalPetals} />

      {/* Bouquet flowers */}
      <FlowerCluster className={styles.bouquet} flowers={finalBouquetFlowers} />

      {/* Recipient name */}
      <motion.div
        className={styles.nameTag}
        initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
        animate={isInView ? { opacity: 1, scale: 1, x: "-50%", y: "-50%" } : {}}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <p className={'script ' + styles.forText}>For</p>
        <h2 className={styles.name}>{giftContent.recipientName}</h2>
        <img src={publicPath('flowers/ribbon.svg')} alt="" className={styles.ribbonDecor}/>
      </motion.div>

      {/* Floating photos behind/around the bouquet */}
      {visiblePhotos.map((photo, i) => {
        const placement = PHOTO_PLACEMENTS[i]
        if (!placement) return null
        return (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 100, rotate: placement.rotation - 10 }}
            animate={isInView ? { opacity: 1, y: 0, rotate: placement.rotation } : {}}
            transition={{ duration: 1.2, delay: 0.6 + placement.delay, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              ...placement.style,
              zIndex: 1, // behind the bouquet
            }}
          >
            <FloatingPhoto 
              memory={photo} 
              size={placement.size} 
              delay={placement.delay} 
            />
          </motion.div>
        )
      })}

      {/* Mascots sliding in */}
      <motion.div
        initial={{ opacity: 0, x: -100, rotate: -20 }}
        animate={isInView ? { opacity: 1, x: 0, rotate: -10 } : {}}
        transition={{ duration: 1.5, delay: 1.5, type: 'spring' }}
        style={{ position: 'absolute', bottom: '10%', left: '5%', zIndex: 10, width: 120, height: 120 }}
      >
        <AxolotlSticker />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100, rotate: 20 }}
        animate={isInView ? { opacity: 1, x: 0, rotate: 10 } : {}}
        transition={{ duration: 1.5, delay: 1.7, type: 'spring' }}
        style={{ position: 'absolute', bottom: '5%', right: '5%', zIndex: 10, width: 120, height: 120 }}
      >
        <PenguinSticker />
      </motion.div>
    </div>
  )
}
