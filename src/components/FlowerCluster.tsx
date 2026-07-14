import { AnimatedFlower } from './AnimatedFlower'
import { AxolotlSticker } from './AxolotlSticker'
import { PenguinSticker } from './PenguinSticker'
import type { FlowerItem } from '../data/flowerDecorations'

interface Props {
  flowers: FlowerItem[]
  /** Container must be position:relative or position:absolute */
  className?: string
}

/**
 * FlowerCluster — renders a set of FlowerItem decorations as position:absolute
 * elements inside a relative container.
 */
export function FlowerCluster({ flowers, className = '' }: Props) {
  return (
    <div
      className={className}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    >
      {flowers.map((f, i) => {
        const isAxolotl = f.id.includes('ax')
        const isPenguin = f.id.includes('peng')
        
        if (isAxolotl) {
          return (
            <AxolotlSticker
              key={f.id}
              style={{
                position: 'absolute',
                left: `${f.x}%`,
                top: `${f.y}%`,
                width: f.size,
                height: f.size,
                zIndex: f.depth === 'background' ? 1 : f.depth === 'middle' ? 3 : 5,
                transform: `rotate(${f.rotation}deg)`
              }}
            />
          )
        }

        if (isPenguin) {
          return (
            <PenguinSticker
              key={f.id}
              style={{
                position: 'absolute',
                left: `${f.x}%`,
                top: `${f.y}%`,
                width: f.size,
                height: f.size,
                zIndex: f.depth === 'background' ? 1 : f.depth === 'middle' ? 3 : 5,
                transform: `rotate(${f.rotation}deg)`
              }}
            />
          )
        }
        
        return <AnimatedFlower key={f.id} flower={f} index={i} />
      })}
    </div>
  )
}
