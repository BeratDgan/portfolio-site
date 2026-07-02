import { useEffect, useRef, type ReactNode } from 'react'
import { annotate } from 'rough-notation'
import type { RoughAnnotation } from 'rough-notation/lib/model'

interface HighlighterProps {
  children: ReactNode
  action?: 'highlight' | 'underline' | 'box' | 'circle' | 'strike-through'
  color?: string
  strokeWidth?: number
}

/** Hand-drawn annotation that plays once the text scrolls into view. */
export function Highlighter({
  children,
  action = 'highlight',
  color = 'rgba(232, 73, 15, 0.35)',
  strokeWidth = 2,
}: HighlighterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let annotation: RoughAnnotation | null = null

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        annotation = annotate(el, {
          type: action,
          color,
          strokeWidth,
          multiline: true,
          iterations: 2,
          padding: action === 'highlight' ? 2 : 3,
          animate: !reduced,
          animationDuration: 700,
        })
        annotation.show()
        io.disconnect()
      },
      { threshold: 0.8 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      annotation?.remove()
    }
  }, [action, color, strokeWidth])

  return <span ref={ref}>{children}</span>
}
