import { motion, useReducedMotion } from 'framer-motion'
import { useState, useCallback } from 'react'

interface Props {
  className?: string
  style?: React.CSSProperties
}

export function AxolotlSticker({ className = '', style }: Props) {
  const [isTapped, setIsTapped] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const handleTap = useCallback(() => {
    setClickCount(c => c + 1)
    if (isTapped) return
    setIsTapped(true)
    setTimeout(() => setIsTapped(false), 2000)
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
          <filter id="ax-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.1"/>
          </filter>
        </defs>
        
        {/* Border */}
        <path d="M 60 40 
                 C 40 10, 10 30, 30 70 
                 C 10 90, 10 130, 40 160 
                 C 70 190, 130 190, 160 160 
                 C 190 130, 190 90, 170 70 
                 C 190 30, 160 10, 140 40 
                 C 120 20, 80 20, 60 40 Z" 
              fill="#ffffff" stroke="#ffffff" strokeWidth="12" strokeLinejoin="round" filter="url(#ax-shadow)"/>
        
        {/* Body Container (Wiggles on Tap) */}
        <motion.g
          animate={isTapped ? { rotate: [0, -10, 10, -10, 0] } : { rotate: 0 }}
          transition={{ duration: 0.5 }}
          style={{ originX: '100px', originY: '140px' }}
        >
          {/* Body */}
          <path d="M 50 140 C 50 180, 150 180, 150 140 C 150 90, 50 90, 50 140 Z" fill="#ffb6c1"/>
          
          {/* Tail (Wags) */}
          <motion.path
            d="M 140 160 Q 180 170 160 190 Q 130 180 120 175 Z"
            fill="#ffb6c1"
            animate={shouldReduceMotion ? {} : { rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '140px', originY: '160px' }}
          />

          {/* Left Arm (Waves) */}
          <motion.path
            d="M 55 140 Q 30 130 35 150 Q 50 160 65 150 Z"
            fill="#ffb6c1"
            animate={shouldReduceMotion ? {} : { rotate: [0, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '55px', originY: '140px' }}
          />

          {/* Right Arm */}
          <path d="M 145 140 Q 170 130 165 150 Q 150 160 135 150 Z" fill="#ffb6c1"/>

          {/* Head */}
          <ellipse cx="100" cy="110" rx="50" ry="40" fill="#ffb6c1"/>
          
          {/* Left Gills (Breathe) */}
          <motion.g
            animate={shouldReduceMotion ? {} : { scaleY: [1, 1.05, 1], rotate: [0, -2, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '50px', originY: '110px' }}
          >
            <path d="M 55 90 C 30 70, 20 80, 45 100 Z" fill="#ff69b4" rx="5"/>
            <path d="M 50 105 C 20 100, 15 115, 45 115 Z" fill="#ff69b4"/>
            <path d="M 52 120 C 25 125, 25 140, 55 130 Z" fill="#ff69b4"/>
          </motion.g>
          
          {/* Right Gills */}
          <motion.g
            animate={shouldReduceMotion ? {} : { scaleY: [1, 1.05, 1], rotate: [0, 2, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            style={{ originX: '150px', originY: '110px' }}
          >
            <path d="M 145 90 C 170 70, 180 80, 155 100 Z" fill="#ff69b4"/>
            <path d="M 150 105 C 180 100, 185 115, 155 115 Z" fill="#ff69b4"/>
            <path d="M 148 120 C 175 125, 175 140, 145 130 Z" fill="#ff69b4"/>
          </motion.g>
          
          {/* Eyes (Blink) */}
          <motion.g
            animate={shouldReduceMotion ? {} : { scaleY: [1, 1, 0, 1, 1] }}
            transition={{ duration: 4, times: [0, 0.95, 0.97, 0.99, 1], repeat: Infinity }}
            style={{ originY: '105px' }}
          >
            {isTapped ? (
              <>
                {/* Surprised eyes */}
                <circle cx="80" cy="105" r="7" fill="#4a4a4a"/>
                <circle cx="120" cy="105" r="7" fill="#4a4a4a"/>
              </>
            ) : (
              <>
                {/* Normal eyes */}
                <circle cx="80" cy="105" r="5" fill="#4a4a4a"/>
                <circle cx="120" cy="105" r="5" fill="#4a4a4a"/>
              </>
            )}
          </motion.g>
          
          {/* Blush */}
          <ellipse cx="70" cy="115" rx="8" ry="4" fill="#ff99cc" opacity={isTapped ? 0.9 : 0.6}/>
          <ellipse cx="130" cy="115" rx="8" ry="4" fill="#ff99cc" opacity={isTapped ? 0.9 : 0.6}/>
          
          {/* Mouth */}
          {isTapped ? (
            <circle cx="100" cy="120" r="4" fill="#4a4a4a"/>
          ) : (
            <path d="M 90 115 Q 100 125 110 115" fill="none" stroke="#4a4a4a" strokeWidth="2.5" strokeLinecap="round"/>
          )}
        </motion.g>
      </svg>
      
      {/* Bubbles and Hearts on Tap */}
      {isTapped && !shouldReduceMotion && (
        <>
          <motion.div
            style={{ position: 'absolute', top: '10%', left: '30%', width: 8, height: 8, borderRadius: '50%', background: '#fff' }}
            initial={{ opacity: 1, y: 0, scale: 0 }}
            animate={{ opacity: 0, y: -40, scale: 1.5 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          <motion.div
            style={{ position: 'absolute', top: '20%', left: '70%', width: 12, height: 12, borderRadius: '50%', background: '#ff99cc' }}
            initial={{ opacity: 1, y: 0, scale: 0 }}
            animate={{ opacity: 0, y: -50, scale: 1.2 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
          />
          <motion.div
            style={{ position: 'absolute', top: '5%', left: '50%', width: 10, height: 10, borderRadius: '50%', background: '#fff' }}
            initial={{ opacity: 1, y: 0, scale: 0 }}
            animate={{ opacity: 0, y: -60, scale: 1.8 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
          />
          
          {showEasterEgg && (
            <>
              {/* Hearts Easter Egg */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`heart-${i}`}
                  style={{ 
                    position: 'absolute', 
                    top: '20%', 
                    left: `${40 + (Math.random() * 20 - 10)}%`,
                    fontSize: '1.5rem',
                    pointerEvents: 'none'
                  }}
                  initial={{ opacity: 1, y: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: 0, 
                    y: -100 - (Math.random() * 50),
                    x: (Math.random() * 60 - 30),
                    scale: 1 + Math.random() 
                  }}
                  transition={{ duration: 1.5 + Math.random(), ease: 'easeOut' }}
                >
                  ❤️
                </motion.div>
              ))}
            </>
          )}
        </>
      )}
    </motion.div>
  )
}
