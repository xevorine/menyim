import { useState, useCallback } from 'react'
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useMemories } from '../hooks/useMemories'
import { useBackgroundMusic } from '../hooks/useBackgroundMusic'
import { IntroScreen } from '../components/IntroScreen'
import { EnvelopeReveal } from '../components/EnvelopeReveal'
import { FlowerReveal } from '../components/FlowerReveal'
import { ScatteredMemoriesBoard } from '../components/ScatteredMemoriesBoard'
import { MemoryTimeline } from '../components/MemoryTimeline'
import { PersonalMessage } from '../components/PersonalMessage'
import { FinalGift } from '../components/FinalGift'
import { BackgroundMusic } from '../components/BackgroundMusic'
import { GrowingVines } from '../components/GrowingVines'
import { MascotJourney } from '../components/MascotJourney'
import { PageCurlTransition } from '../components/PageCurlTransition'
import { FlowerPortal } from '../components/FlowerPortal'

type Scene = 'intro' | 'envelope' | 'main'

export function HomePage() {
  const [scene, setScene] = useState<Scene>('intro')
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [musicStarted, setMusicStarted] = useState(false)
  const [animationCycleId, setAnimationCycleId] = useState(0)
  
  const { all, opening, finalBouquet, hasTimelineData } = useMemories()
  const { start } = useBackgroundMusic()
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll()
  
  // Intro: cream/soft pink (#f5ede0), Reveal: warm ivory (#faf6f0)
  // Gallery: ivory with sage (#f1f4f1), Letter: soft paper white (#fcfbf9)
  // Final: warm peach (#faebd7)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    ['#faf6f0', '#f1f4f1', '#fcfbf9', '#faebd7', '#faebd7']
  )

  const handleOpen = useCallback(() => {
    setScene('envelope')
    setEnvelopeOpen(true)
    start()
    setMusicStarted(true)
  }, [start])

  const handleEnvelopeComplete = useCallback(() => {
    setScene('main')
  }, [])

  const handleReplay = useCallback(() => {
    setScene('intro')
    setEnvelopeOpen(false)
    setMusicStarted(false)
    setAnimationCycleId(prev => prev + 1)
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' })
  }, [shouldReduceMotion])

  const [portalActive, setPortalActive] = useState(false)
  const handleViewMemories = useCallback(() => {
    setPortalActive(true)
    setTimeout(() => {
      navigate('/memories')
    }, 600) // Wait for portal wipe to cover screen
  }, [navigate])

  return (
    <>
      <FlowerPortal isActive={portalActive} />
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          backgroundColor: scene === 'intro' || scene === 'envelope' ? '#f5ede0' : backgroundColor,
          transition: 'background-color 1s ease'
        }}
        aria-hidden="true"
      />

      <AnimatePresence mode="wait">
        {scene === 'intro' && (
          <IntroScreen key={`intro-${animationCycleId}`} onOpen={handleOpen}/>
        )}
        {scene === 'envelope' && (
          <EnvelopeReveal
            key={`envelope-${animationCycleId}`}
            isOpen={envelopeOpen}
            firstPhoto={opening[0] ?? null}
            onComplete={handleEnvelopeComplete}
          />
        )}
      </AnimatePresence>

      {scene === 'main' && (
        <main key={animationCycleId}>
          <GrowingVines />
          <MascotJourney />
          {/* Scene 2: Flower + first photos */}
          <FlowerReveal photos={opening}/>

          {/* Scene 3: Scattered memories board — all photos scattered everywhere */}
          <ScatteredMemoriesBoard memories={all}/>

          {/* Scene 5: Timeline — only when metadata exists */}
          {hasTimelineData && <MemoryTimeline memories={all}/>}

          <PageCurlTransition />

          {/* Scene 6: Personal message */}
          <PersonalMessage/>

          {/* Scene 7: Final gift */}
          <FinalGift
            photos={finalBouquet}
            onViewMemories={handleViewMemories}
            onReplay={handleReplay}
          />
        </main>
      )}

      <BackgroundMusic started={musicStarted}/>
    </>
  )
}
