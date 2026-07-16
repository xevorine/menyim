import { motion, AnimatePresence } from 'framer-motion'
import { publicPath } from '../lib/publicPath'

interface Props {
  isActive: boolean
}

// A petal curtain wipe effect
export function FlowerPortal({ isActive }: Props) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        >
          {/* Top petal curtain */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '60vh',
              background: `url(${publicPath('flowers/petal.svg')}) center/100px repeat-x`,
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
            }}
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
          {/* Bottom petal curtain */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60vh',
              background: `url(${publicPath('flowers/petal.svg')}) center/100px repeat-x`,
              filter: 'drop-shadow(0 -10px 20px rgba(0,0,0,0.1))',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
