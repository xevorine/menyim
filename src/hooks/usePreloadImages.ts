import { useEffect } from 'react'

/**
 * Preloads the previous and next images for lightbox navigation.
 * Avoids loading the entire gallery upfront.
 */
export function usePreloadImages(srcs: string[]) {
  useEffect(() => {
    srcs.forEach(src => {
      if (!src) return
      const img = new Image()
      img.src = src
    })
  }, [srcs])
}
