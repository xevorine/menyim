import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import type { Memory } from '../types/memory'
import styles from './EnvelopeReveal.module.css'
import { publicPath } from '../lib/publicPath'
import { EnvelopeFlowerBurst } from './EnvelopeFlowerBurst'

interface Props {
  isOpen: boolean
  firstPhoto: Memory | null
  onComplete: () => void
}

type EnvelopeState = 'closed' | 'opening' | 'bursting' | 'revealed'

export function EnvelopeReveal({ isOpen, firstPhoto, onComplete }: Props) {
  const [state, setState] = useState<EnvelopeState>('closed')
  const shouldReduceMotion = useReducedMotion()
  const unmountedRef = useRef(false)

  // Sync prop 'isOpen' to start the state machine
  useEffect(() => {
    if (isOpen && state === 'closed') {
      setState('opening')
    }
  }, [isOpen, state])

  // State Machine logic
  useEffect(() => {
    unmountedRef.current = false
    
    if (state === 'opening') {
      const timer = setTimeout(() => {
        if (!unmountedRef.current) setState('bursting')
      }, 400)
      return () => clearTimeout(timer)
    }

    if (state === 'bursting') {
      // The burst animation takes about 1.0s. 
      // We wait for 1.0s and then go straight to the final photo spread!
      const timer = setTimeout(() => {
        if (!unmountedRef.current) onComplete()
      }, 1000)
      return () => clearTimeout(timer)
    }

    return () => {
      unmountedRef.current = true
    }
  }, [state, onComplete])

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Open envelope */}
      <motion.div
        className={styles.envelope}
        initial={{ scale: 1, y: 0, rotate: 0 }}
        animate={
          state !== 'closed' 
            ? { scale: 0.6, y: 60, opacity: state === 'revealed' ? 0 : 1 }
            : { scale: 1, y: 0, opacity: 1 }
        }
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      >
        <motion.svg 
          viewBox="0 0 200 140" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          aria-hidden="true"
          animate={state === 'opening' ? { rotate: [0, -3, 3, -2, 2, 0] } : {}}
          transition={{ duration: 0.4, delay: 0 }}
        >
          <rect x="4" y="30" width="192" height="106" rx="8" fill="#f5ede0" stroke="#d4889a" strokeWidth="2"/>
          {/* Flap open */}
          <motion.path
            initial={{ d: 'M4 30 L100 90 L196 30' }}
            d="M4 30 L100 90 L196 30"
            fill="#ecddd0"
            stroke="#d4889a"
            strokeWidth="2"
            animate={state !== 'closed' ? { d: 'M4 30 L100 -10 L196 30' } : { d: 'M4 30 L100 90 L196 30' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          <path d="M4 30 L4 136 L76 86Z" fill="#e8d4c4"/>
          <path d="M196 30 L196 136 L124 86Z" fill="#e8d4c4"/>
          {/* Seal */}
          <motion.g
            animate={state !== 'closed' ? { scale: [1, 1.5, 0], opacity: [1, 1, 0] } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ originX: '100px', originY: '88px' }}
          >
            <circle cx="100" cy="88" r="12" fill="#7d2840" opacity="0.9"/>
            <text x="100" y="93" textAnchor="middle" fill="white" fontSize="12" fontFamily="serif">♥</text>
          </motion.g>
        </motion.svg>
      </motion.div>

      {/* Flower Burst layer */}
      <AnimatePresence>
        {state === 'bursting' && (
          <motion.div 
            className={styles.burstLayer}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EnvelopeFlowerBurst />
          </motion.div>
        )}
      </AnimatePresence>


    </motion.div>
  )
}
