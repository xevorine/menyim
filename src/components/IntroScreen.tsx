import { motion } from 'framer-motion'
import { useState } from 'react'
import { giftContent } from '../data/giftContent'
import { FlowerCluster } from './FlowerCluster'
import { PetalLayer } from './PetalLayer'
import { introFlowers } from '../data/flowerDecorations'
import styles from './IntroScreen.module.css'

interface Props {
  onOpen: () => void
}

export function IntroScreen({ onOpen }: Props) {
  const [isOpening, setIsOpening] = useState(false)

  const handleOpen = () => {
    if (isOpening) return
    setIsOpening(true)
    onOpen()
  }

  return (
    <motion.section
      className={styles.intro}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Falling petals */}
      <PetalLayer count={15} />

      {/* Dense decorative floral frame */}
      <FlowerCluster flowers={introFlowers} />


      <div className={styles.content}>
        {/* Envelope illustration */}
        <motion.div
          className={styles.envelopeWrapper}
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <svg
            className={styles.envelope}
            viewBox="0 0 200 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Envelope body */}
            <rect x="4" y="30" width="192" height="106" rx="8" fill="#f5ede0" stroke="#d4889a" strokeWidth="2"/>
            {/* Envelope flap closed */}
            <path d="M4 30 L100 90 L196 30" fill="#ecddd0" stroke="#d4889a" strokeWidth="2"/>
            {/* Left and right triangles */}
            <path d="M4 30 L4 136 L76 86Z" fill="#e8d4c4"/>
            <path d="M196 30 L196 136 L124 86Z" fill="#e8d4c4"/>
            {/* Seal */}
            <circle cx="100" cy="88" r="12" fill="#7d2840" opacity="0.9"/>
            <text x="100" y="93" textAnchor="middle" fill="white" fontSize="12" fontFamily="serif">♥</text>
          </svg>
        </motion.div>

        {/* Text */}
        <motion.div
          className={styles.textBlock}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <p className={styles.openingTitle + ' script'}>{giftContent.openingTitle}</p>
          <h1 className={styles.recipientName}>{giftContent.recipientName}</h1>
          <p className={styles.subtitle}>{giftContent.openingSubtitle}</p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <button
            className={'btn btn-primary ' + styles.openBtn}
            onClick={handleOpen}
            disabled={isOpening}
            aria-label="Open your gift"
          >
            <span>🌸</span> Buka
          </button>
        </motion.div>
      </div>
    </motion.section>
  )
}
