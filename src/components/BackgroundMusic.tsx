import { useBackgroundMusic } from '../hooks/useBackgroundMusic'
import { giftContent } from '../data/giftContent'

interface Props {
  started: boolean
}

export function BackgroundMusic({ started }: Props) {
  const { toggleMute, isMuted, isAvailable } = useBackgroundMusic()

  // Only render when audio is enabled AND available AND started
  if (!giftContent.audioEnabled || !isAvailable || !started) return null

  return (
    <button
      onClick={toggleMute}
      className="btn btn-ghost"
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      style={{
        position: 'fixed',
        bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
        right: '1.5rem',
        zIndex: 200,
        width: 44,
        height: 44,
        padding: 0,
        borderRadius: '50%',
        fontSize: '1.2rem',
      }}
    >
      {isMuted ? '🔇' : '🎵'}
    </button>
  )
}
