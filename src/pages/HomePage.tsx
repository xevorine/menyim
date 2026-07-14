import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
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

type Scene = 'intro' | 'envelope' | 'main'

export function HomePage() {
  const [scene, setScene] = useState<Scene>('intro')
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [musicStarted, setMusicStarted] = useState(false)
  const { all, opening, finalBouquet, hasTimelineData } = useMemories()
  const { start } = useBackgroundMusic()
  const navigate = useNavigate()

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
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {scene === 'intro' && (
          <IntroScreen key="intro" onOpen={handleOpen}/>
        )}
        {scene === 'envelope' && (
          <EnvelopeReveal
            key="envelope"
            isOpen={envelopeOpen}
            firstPhoto={opening[0] ?? null}
            onComplete={handleEnvelopeComplete}
          />
        )}
      </AnimatePresence>

      {scene === 'main' && (
        <main>
          <GrowingVines />
          <MascotJourney />
          {/* Scene 2: Flower + first photos */}
          <FlowerReveal photos={opening}/>

          {/* Scene 3: Scattered memories board — all photos scattered everywhere */}
          <ScatteredMemoriesBoard memories={all}/>

          {/* Scene 5: Timeline — only when metadata exists */}
          {hasTimelineData && <MemoryTimeline memories={all}/>}

          {/* Scene 6: Personal message */}
          <PersonalMessage/>

          {/* Scene 7: Final gift */}
          <FinalGift
            photos={finalBouquet}
            onViewMemories={() => navigate('/memories')}
            onReplay={handleReplay}
          />
        </main>
      )}

      <BackgroundMusic started={musicStarted}/>
    </>
  )
}
