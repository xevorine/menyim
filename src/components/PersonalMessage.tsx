import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { giftContent } from '../data/giftContent'
import { FloralFrame } from './FloralFrame'
import { PenguinSticker } from './PenguinSticker'
import { SectionReveal } from './SectionReveal'
import { RibbonUnwrap } from './RibbonUnwrap'
import { Doodle } from './Doodles'
import styles from './PersonalMessage.module.css'

export function PersonalMessage() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })
  const shouldReduceMotion = useReducedMotion()

  // Split message into paragraphs
  const paragraphs = giftContent.personalMessage.split('\n').filter(Boolean)

  return (
    <section ref={ref} className={styles.section} aria-label="Personal message">
      <SectionReveal>
        <FloralFrame>
          <RibbonUnwrap>
            <motion.div
              className={styles.card}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div style={{ position: 'relative' }}>
                <motion.p
                  className={styles.salutation + ' script'}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }} // Delay until ribbon unwraps
                >
                  For {giftContent.recipientName},
                </motion.p>
                <Doodle type="heart" color="#d4889a" style={{ position: 'absolute', right: -30, top: -10 }} />
              </div>

              <div className={styles.body}>
                {paragraphs.map((para, i) => (
                  <motion.p
                    key={i}
                    className={styles.para}
                    initial={{ opacity: 0, y: 8 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.0 + i * 0.15, duration: 0.5 }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              <motion.p
                className={styles.signature + ' script'}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1.0 + paragraphs.length * 0.15 + 0.3, duration: 0.6 }}
              >
                Take care,<br />{giftContent.senderName}
              </motion.p>

              <motion.div
                style={{ position: 'absolute', bottom: '-40px', right: '-20px', zIndex: 10, width: 80, height: 80 }}
                initial={{ opacity: 0, y: 30, rotate: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: -10 } : {}}
                transition={{ delay: 1.0 + paragraphs.length * 0.15 + 0.6, type: 'spring', stiffness: 200, damping: 15 }}
              >
                <PenguinSticker />
              </motion.div>
            </motion.div>
          </RibbonUnwrap>
        </FloralFrame>
      </SectionReveal>
    </section>
  )
}
