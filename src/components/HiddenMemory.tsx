import { motion } from 'framer-motion'
import { useState } from 'react'
import { FlowerCluster } from './FlowerCluster'
import { galleryRowClusters } from '../data/flowerDecorations'
import styles from './HiddenMemory.module.css'
import { publicPath } from '../lib/publicPath'

interface Props {
  onDiscover: () => void
}

export function HiddenMemory({ onDiscover }: Props) {
  const [revealed, setRevealed] = useState(false)

  const handleReveal = () => {
    if (revealed) return
    setRevealed(true)
    onDiscover()
  }

  return (
    <div className={styles.container}>
      {/* The hidden photo */}
      <motion.div
        className={styles.photoWrapper}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className={styles.polaroid} onClick={handleReveal} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleReveal()}>
          <div className={styles.photoFrame}>
            <img src={publicPath('photos/memories/3.jpeg')} alt="Hidden memory" />
          </div>
          <p className={styles.caption + ' script'}>You found a hidden memory! ✨</p>
        </div>
      </motion.div>

      {/* The flowers hiding it */}
      <motion.div
        className={styles.flowerCover}
        animate={revealed ? { x: -80, y: 40, rotate: -15, opacity: 0.8 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 60, damping: 14 }}
        onClick={handleReveal}
        onKeyDown={(e) => e.key === 'Enter' && handleReveal()}
        role="button"
        tabIndex={revealed ? -1 : 0}
        aria-label="Reveal hidden memory"
      >
        <FlowerCluster flowers={galleryRowClusters[0]} />
      </motion.div>
    </div>
  )
}
