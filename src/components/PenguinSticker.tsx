import { motion, useReducedMotion } from 'framer-motion'
import { useState, useCallback } from 'react'

interface Props {
  className?: string
  style?: React.CSSProperties
}

export function PenguinSticker({ className = '', style }: Props) {
  const [isTapped, setIsTapped] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const handleTap = useCallback(() => {
    setClickCount(c => c + 1)
    if (isTapped) return
    setIsTapped(true)
    setTimeout(() => setIsTapped(false), 1500)
  }, [isTapped])
  
  const showEasterEgg = clickCount >= 3

  return (
    <motion.div
      className={className}
      style={{ ...style, cursor: 'pointer', position: 'relative' }}
      onClick={handleTap}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        <defs>
          <filter id="peng-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.1"/>
          </filter>
        </defs>
        
        {/* Border */}
        <path d="M 60 30 
                 C 40 10, 10 30, 25 70 
                 C 10 90, 15 140, 40 170 
                 C 60 195, 140 195, 160 170 
                 C 185 140, 190 90, 175 70 
                 C 190 30, 160 10, 140 30 
                 C 120 15, 80 15, 60 30 Z" 
              fill="#ffffff" stroke="#ffffff" strokeWidth="12" strokeLinejoin="round" filter="url(#peng-shadow)"/>
        
        {/* Body Container (Jumps on Tap) */}
        <motion.g
          animate={isTapped ? { y: [0, -20, 0, -10, 0] } : (shouldReduceMotion ? {} : { rotate: [0, 2, -2, 0], y: [0, -2, 0] })}
          transition={
            isTapped 
            ? { duration: 0.6, times: [0, 0.4, 0.6, 0.8, 1], ease: 'easeOut' }
            : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          }
          style={{ originX: '100px', originY: '170px' }}
        >
          {/* Back Flipper (Left) */}
          <motion.path 
            d="M 50 100 C 30 110, 25 130, 45 120 Z" 
            fill="#3a4b5c"
            animate={shouldReduceMotion ? {} : { rotate: [0, -15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '50px', originY: '100px' }}
          />

          {/* Body */}
          <path d="M 50 140 C 40 80, 60 40, 100 40 C 140 40, 160 80, 150 140 C 145 170, 55 170, 50 140 Z" fill="#3a4b5c"/>
          
          {/* White Belly */}
          <path d="M 65 140 C 55 90, 70 55, 100 55 C 130 55, 145 90, 135 140 C 130 160, 70 160, 65 140 Z" fill="#ffffff"/>
          
          {/* Front Flipper (Right) */}
          <motion.path 
            d="M 150 100 C 170 110, 175 130, 155 120 Z" 
            fill="#3a4b5c"
            animate={isTapped ? { rotate: -40 } : (shouldReduceMotion ? {} : { rotate: [0, 10, 0] })}
            transition={{ duration: isTapped ? 0.3 : 1.5, repeat: isTapped ? 0 : Infinity, ease: 'easeInOut', delay: 0.2 }}
            style={{ originX: '150px', originY: '100px' }}
          />
          
          {/* Feet */}
          <path d="M 70 165 C 60 175, 80 180, 85 170 Z" fill="#ffb347"/>
          <path d="M 130 165 C 140 175, 120 180, 115 170 Z" fill="#ffb347"/>
          
          {/* Eyes (Blink) */}
          <motion.g
            animate={shouldReduceMotion ? {} : { scaleY: [1, 1, 0, 1, 1] }}
            transition={{ duration: 4.5, times: [0, 0.95, 0.97, 0.99, 1], repeat: Infinity }}
            style={{ originY: '85px' }}
          >
            {isTapped ? (
              <>
                <path d="M 80 85 Q 85 80 90 85" fill="none" stroke="#2a2a2a" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M 110 85 Q 115 80 120 85" fill="none" stroke="#2a2a2a" strokeWidth="2.5" strokeLinecap="round"/>
              </>
            ) : (
              <>
                <circle cx="85" cy="85" r="5" fill="#2a2a2a"/>
                <circle cx="115" cy="85" r="5" fill="#2a2a2a"/>
              </>
            )}
          </motion.g>
          
          {/* Blush */}
          <ellipse cx="70" cy="95" rx="7" ry="4" fill="#ff99cc" opacity={isTapped ? 0.9 : 0.6}/>
          <ellipse cx="130" cy="95" rx="7" ry="4" fill="#ff99cc" opacity={isTapped ? 0.9 : 0.6}/>
          
          {/* Beak */}
          <motion.path 
            d="M 95 90 Q 100 98 105 90 Z" 
            fill="#ffb347"
            animate={isTapped ? { scaleY: 1.5 } : {}}
            style={{ originY: '90px' }}
          />
          
          {/* Easter Egg Hat (Flower) */}
          {showEasterEgg && (
            <motion.g
              initial={{ scale: 0, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              style={{ originX: '100px', originY: '45px' }}
            >
              {/* Petals */}
              <circle cx="100" cy="35" r="8" fill="#ff99cc"/>
              <circle cx="90" cy="45" r="8" fill="#ff99cc"/>
              <circle cx="110" cy="45" r="8" fill="#ff99cc"/>
              <circle cx="95" cy="55" r="8" fill="#ff99cc"/>
              <circle cx="105" cy="55" r="8" fill="#ff99cc"/>
              {/* Center */}
              <circle cx="100" cy="45" r="5" fill="#ffd700"/>
            </motion.g>
          )}
        </motion.g>
      </svg>
      
      {/* Sparkles on Tap */}
      {isTapped && !shouldReduceMotion && (
        <>
          <motion.div
            style={{ position: 'absolute', top: '20%', left: '20%', width: 6, height: 6, borderRadius: '50%', background: '#fff', boxShadow: '0 0 4px #fff' }}
            initial={{ opacity: 1, y: 0, scale: 0 }}
            animate={{ opacity: 0, y: -30, scale: [0, 1.5, 0] }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          <motion.div
            style={{ position: 'absolute', top: '10%', right: '30%', width: 8, height: 8, borderRadius: '50%', background: '#fff', boxShadow: '0 0 6px #fff' }}
            initial={{ opacity: 1, y: 0, scale: 0 }}
            animate={{ opacity: 0, y: -40, scale: [0, 2, 0] }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
          />
          <motion.div
            style={{ position: 'absolute', top: '30%', right: '15%', width: 5, height: 5, borderRadius: '50%', background: '#fff', boxShadow: '0 0 4px #fff' }}
            initial={{ opacity: 1, y: 0, scale: 0 }}
            animate={{ opacity: 0, y: -20, scale: [0, 1.2, 0] }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          />
        </>
      )}
    </motion.div>
  )
}
