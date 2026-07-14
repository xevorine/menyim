import { useCallback, useEffect, useRef, useState } from 'react'
import { giftContent } from '../data/giftContent'

/**
 * Background music hook.
 * - Only initialises when audioEnabled is true in giftContent
 * - Does NOT autoplay — must call start() after user interaction
 * - Handles missing audio files silently
 * - Persists mute preference in sessionStorage
 */
export function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return sessionStorage.getItem('music-muted') === 'true'
    } catch {
      return false
    }
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [isAvailable, setIsAvailable] = useState(false)

  useEffect(() => {
    if (!giftContent.audioEnabled) return

    const audio = new Audio()
    audio.src = giftContent.audioSrc
    audio.loop = true
    audio.volume = 0.25
    audio.muted = isMuted
    audio.preload = 'none'

    audio.addEventListener('canplaythrough', () => setIsAvailable(true))
    audio.addEventListener('error', () => {
      // Missing or unsupported file — silently disable
      setIsAvailable(false)
    })

    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const start = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !giftContent.audioEnabled) return
    audio.play().then(() => setIsPlaying(true)).catch(() => {
      // Browser blocked autoplay — ignore
    })
  }, [])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    const next = !isMuted
    setIsMuted(next)
    try { sessionStorage.setItem('music-muted', String(next)) } catch { /* ignore */ }
    if (audio) audio.muted = next
  }, [isMuted])

  return { start, toggleMute, isMuted, isPlaying, isAvailable }
}
