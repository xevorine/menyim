import type { ReactNode } from 'react'
import { FlowerCluster } from './FlowerCluster'
import { messageFrameFlowers } from '../data/flowerDecorations'
import styles from './FloralFrame.module.css'

interface Props {
  children: ReactNode
  className?: string
}

/**
 * FloralFrame — wraps content with a dense floral border.
 * Flowers extend outside the card but are clipped at the section edge.
 */
export function FloralFrame({ children, className = '' }: Props) {
  return (
    <div className={styles.frame + (className ? ' ' + className : '')}>
      <FlowerCluster flowers={messageFrameFlowers}/>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}
