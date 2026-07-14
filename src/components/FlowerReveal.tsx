import { motion } from 'framer-motion'
import type { Memory } from '../types/memory'
import { FloatingPhoto } from './FloatingPhoto'
import { FlowerCluster } from './FlowerCluster'
import { PetalLayer } from './PetalLayer'
import { messageFrameFlowers } from '../data/flowerDecorations'
import styles from './FlowerReveal.module.css'

interface Props {
  photos: Memory[]
}

// Photo placement: up to 6, arranged in arc
const PHOTO_PLACEMENTS = [
  { size: 140, delay: 0.3, rotation: -8, style: { top: '15%', left: '15%' } },
  { size: 160, delay: 0.55, rotation: 5, style: { top: '10%', right: '18%' } },
  { size: 130, delay: 0.75, rotation: -3, style: { bottom: '18%', left: '12%' } },
  { size: 150, delay: 0.95, rotation: 7, style: { bottom: '15%', right: '14%' } },
  { size: 120, delay: 1.1, rotation: -12, style: { top: '45%', left: '8%' } },
  { size: 120, delay: 1.25, rotation: 10, style: { top: '42%', right: '8%' } },
]

export function FlowerReveal({ photos }: Props) {
  const visiblePhotos = photos.slice(0, 6)

  return (
    <section className={styles.wrapper} aria-label="Flower and photo reveal">
      {/* Background gradient */}
      <div className={styles.bg} aria-hidden="true"/>

      {/* Falling petals */}
      <PetalLayer count={20} />

      {/* Flower decorations */}
      <FlowerCluster className={styles.flowers} flowers={messageFrameFlowers} />

      {/* Central content */}
      <div className={styles.center}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Lintang Myra Siva 🌸
        </motion.h2>

        {visiblePhotos.length === 0 && (
          <motion.p
            className={styles.emptyNote}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Tambahkan foto ke <code>public/photos/memories/</code> untuk melihat kenangan di sini.
          </motion.p>
        )}
      </div>

      {/* Floating photos */}
      {visiblePhotos.map((photo, i) => {
        const placement = PHOTO_PLACEMENTS[i] ?? PHOTO_PLACEMENTS[0]
        return (
          <div
            key={photo.id}
            style={{ position: 'absolute', ...placement.style }}
          >
            <FloatingPhoto
              memory={photo}
              size={placement.size}
              delay={placement.delay}
              rotation={placement.rotation}
            />
          </div>
        )
      })}
    </section>
  )
}
