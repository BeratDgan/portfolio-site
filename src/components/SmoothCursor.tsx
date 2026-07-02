import { useEffect, useRef } from 'react'

/**
 * Spring-follow custom cursor: trails the pointer with damped physics,
 * tilts toward the direction of travel, scales over links and on click.
 * Disabled on touch devices and when reduced motion is preferred.
 */
export default function SmoothCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    document.documentElement.classList.add('has-smooth-cursor')

    let x = -100
    let y = -100
    let tx = -100
    let ty = -100
    let vx = 0
    let vy = 0
    let rot = 0
    let scale = 1
    let targetScale = 1
    let seen = false
    let raf = 0

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (!seen) {
        seen = true
        x = tx
        y = ty
        el.style.opacity = '1'
      }
    }
    const onOver = (e: MouseEvent) => {
      targetScale = (e.target as Element).closest('a, button') ? 1.25 : 1
    }
    const onDown = () => {
      targetScale = 0.8
    }
    const onUp = () => {
      targetScale = 1
    }
    const onLeaveDoc = () => {
      el.style.opacity = '0'
    }
    const onEnterDoc = () => {
      if (seen) el.style.opacity = '1'
    }

    const tick = () => {
      vx = (vx + (tx - x) * 0.24) * 0.6
      vy = (vy + (ty - y) * 0.24) * 0.6
      x += vx
      y += vy
      const speed = Math.hypot(vx, vy)
      if (speed > 1) {
        const target = (Math.atan2(vy, vx) * 180) / Math.PI + 90
        const diff = ((target - rot + 540) % 360) - 180
        rot += diff * Math.min(0.25, speed / 60)
      } else {
        rot -= rot * 0.12
      }
      scale += (targetScale - scale) * 0.18
      el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${scale})`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeaveDoc)
    document.documentElement.addEventListener('mouseenter', onEnterDoc)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeaveDoc)
      document.documentElement.removeEventListener('mouseenter', onEnterDoc)
      document.documentElement.classList.remove('has-smooth-cursor')
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] opacity-0 transition-opacity duration-200"
      style={{ transformOrigin: '0 0' }}
    >
      <svg width="26" height="31" viewBox="0 0 26 31" className="-mt-px -ml-[13px]">
        <path
          d="M13 1.5 L23.5 28 L13 22 L2.5 28 Z"
          fill="var(--color-ink)"
          stroke="var(--color-ground)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
