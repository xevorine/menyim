import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { Memory } from '../types/memory'
import { BouquetComposition } from './BouquetComposition'
import { giftContent } from '../data/giftContent'
import styles from './FinalGift.module.css'

interface Props {
  photos: Memory[]
  onViewMemories: () => void
  onReplay: () => void
}

export function FinalGift({ photos, onViewMemories, onReplay }: Props) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' })

  return (
    <section ref={ref} className={styles.section} aria-label="Final gift">
      {/* Bouquet + floating photos */}
      <BouquetComposition photos={photos}/>

      {/* Final message */}
      <motion.div
        className={styles.messageArea}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        <p className={styles.finalMsg + ' script'}>{giftContent.finalMessage}</p>
        <p className={styles.date}>{new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className={styles.buttons}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <button
          className="btn btn-primary"
          onClick={onViewMemories}
          id="btn-view-memories"
        >
          📷 Lihat Semua Kenangan
        </button>

        <a
          href={giftContent.albumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          id="btn-open-album"
          aria-label="Open original Google Photos album in new tab"
        >
          🌐 Buka Album Asli
        </a>

        <button
          className="btn btn-ghost"
          onClick={onReplay}
          id="btn-replay"
          aria-label="Replay the experience from the beginning"
        >
          🔄 Ulangi
        </button>
      </motion.div>
    </section>
  )
}
