import { useEffect, useRef, useState } from 'react'
import { useI18n, type Lang } from '../i18n'

const timeFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Istanbul',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

function useLocalClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return timeFormat.format(now)
}

function Letters({ text }: { text: string }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span
          key={i}
          data-letter
          className="inline-block transition-transform duration-300 ease-out will-change-transform"
        >
          {ch}
        </span>
      ))}
    </>
  )
}

function LangToggle({ onDark = false }: { onDark?: boolean }) {
  const { lang, setLang } = useI18n()
  const idle = onDark ? 'text-ground/50 hover:text-ground' : 'text-mute hover:text-ink'
  const btn = (l: Lang) => `transition-colors ${lang === l ? 'text-accent' : idle}`

  return (
    <div className="flex items-center gap-1.5 font-mono text-xs tracking-[0.15em] uppercase">
      <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')} className={btn('en')}>
        EN
      </button>
      <span aria-hidden="true" className={onDark ? 'text-ground/30' : 'text-line'}>
        /
      </span>
      <button type="button" aria-pressed={lang === 'tr'} onClick={() => setLang('tr')} className={btn('tr')}>
        TR
      </button>
    </div>
  )
}

export default function Hero() {
  const { t } = useI18n()
  const clock = useLocalClock()
  const nameRef = useRef<HTMLHeadingElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const nav = [
    [t.nav.about, '#about'],
    [t.nav.experience, '#experience'],
    [t.nav.stack, '#stack'],
    [t.nav.projects, '#projects'],
    [t.nav.path, '#path'],
    [t.nav.contact, '#contact'],
  ] as const

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (menuOpen) closeBtnRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // letters near the cursor lift slightly, falling off like a wave
  const handleNameMove = (e: React.MouseEvent) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const letters = nameRef.current?.querySelectorAll<HTMLElement>('[data-letter]')
    letters?.forEach((el) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const sigma = Math.max(r.width * 1.4, 100)
      const s = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma))
      el.style.transform = `translateY(${(-0.09 * s).toFixed(4)}em)`
    })
  }

  const handleNameLeave = () => {
    nameRef.current
      ?.querySelectorAll<HTMLElement>('[data-letter]')
      .forEach((el) => {
        el.style.transform = ''
      })
  }

  return (
    <section className="flex min-h-svh flex-col px-6 md:px-10">
      <header
        className="fade-up flex items-center justify-between border-b border-line py-5"
        style={{ '--d': '0.1s' } as React.CSSProperties}
      >
        <a href="#top" className="font-mono text-xs uppercase tracking-[0.2em]">
          B—D<span className="text-mute"> / Portfolio</span>
        </a>

        <div className="flex items-center gap-6 md:gap-8">
          <nav className="hidden md:flex md:gap-6" aria-label="Site">
            {nav.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="relative font-mono text-xs uppercase tracking-[0.15em] text-mute transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:text-ink hover:after:origin-left hover:after:scale-x-100"
              >
                {label}
              </a>
            ))}
          </nav>
          <span aria-hidden="true" className="hidden h-4 w-px bg-line md:block" />
          <LangToggle />
          <button
            type="button"
            aria-label={t.nav.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="-mr-2 flex flex-col gap-1.5 p-2 md:hidden"
          >
            <span className="block h-px w-6 bg-ink" />
            <span className="block h-px w-6 bg-ink" />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink px-6 py-5 text-ground md:hidden">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ground/50">
              B—D / {t.nav.menu}
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              aria-label={t.nav.closeMenu}
              onClick={() => setMenuOpen(false)}
              className="-mr-2 p-2 font-mono text-sm"
            >
              ✕
            </button>
          </div>

          <nav className="mt-14 flex flex-col" aria-label="Site">
            {nav.map(([label, href], i) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="fade-up border-b border-ground/15 py-4 font-display text-4xl font-bold tracking-tight uppercase"
                style={{ '--d': `${0.05 + i * 0.06}s` } as React.CSSProperties}
              >
                <span className="mr-4 align-middle font-mono text-xs tracking-[0.2em] text-accent">
                  0{i + 1}
                </span>
                {label}
              </a>
            ))}
          </nav>

          <div
            className="fade-up mt-auto flex items-center justify-between border-t border-ground/20 pt-5"
            style={{ '--d': '0.4s' } as React.CSSProperties}
          >
            <LangToggle onDark />
            <a href="mailto:dgan.berat@gmail.com" className="font-mono text-xs tracking-[0.1em]">
              dgan.berat@gmail.com
            </a>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col justify-center py-12 md:py-10">
        <h1
          ref={nameRef}
          aria-label="Berat Doğan"
          onMouseMove={handleNameMove}
          onMouseLeave={handleNameLeave}
          className="font-display text-[clamp(3.5rem,18vw,15rem)] leading-[0.85] font-bold tracking-[-0.04em] uppercase"
        >
          <span aria-hidden="true" className="reveal" style={{ '--d': '0.15s' } as React.CSSProperties}>
            <span>
              <Letters text="Berat" />
            </span>
          </span>
          <span aria-hidden="true" className="reveal" style={{ '--d': '0.27s' } as React.CSSProperties}>
            <span>
              <Letters text="Doğan" />
              <span className="text-accent">.</span>
            </span>
          </span>
        </h1>
      </div>

      <div>
        <hr
          className="rule-draw border-t border-ink"
          style={{ '--d': '0.55s' } as React.CSSProperties}
        />
        <div className="grid gap-x-6 gap-y-10 py-10 md:grid-cols-12 md:py-12">
          <p
            className="fade-up font-display text-xl leading-tight font-bold tracking-tight uppercase md:col-span-4 md:text-2xl"
            style={{ '--d': '0.7s' } as React.CSSProperties}
          >
            {t.hero.roleA} <span className="text-accent">/</span> {t.hero.roleB}{' '}
            <span className="text-accent">/</span>
            <br />
            {t.hero.roleC}
          </p>
          <p
            className="fade-up max-w-md text-[15px] leading-relaxed text-ink/75 md:col-span-5"
            style={{ '--d': '0.8s' } as React.CSSProperties}
          >
            {t.hero.blurb}
          </p>
          <div
            className="fade-up flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6 md:col-span-3 md:justify-end"
            style={{ '--d': '0.9s' } as React.CSSProperties}
          >
            <a
              href="#projects"
              className="group inline-flex justify-center bg-ink px-5 py-3 font-mono text-xs tracking-[0.15em] whitespace-nowrap text-ground uppercase transition-colors hover:bg-accent"
            >
              {t.hero.viewProjects}{' '}
              <span className="ml-2 inline-block transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex justify-center border-b border-ink py-3 text-center font-mono text-xs tracking-[0.15em] whitespace-nowrap uppercase transition-colors hover:border-accent hover:text-accent"
            >
              {t.hero.getInTouch}
            </a>
          </div>
        </div>
      </div>

      <footer
        className="fade-up flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line py-4 font-mono text-[11px] tracking-[0.12em] text-mute uppercase"
        style={{ '--d': '1.05s' } as React.CSSProperties}
      >
        <span className="hidden md:block">38.36°N / 38.32°E — MALATYA, TR</span>
        <time aria-label={t.hero.localTime}>{clock} TRT</time>
        <span className="flex items-center gap-2 text-ink">
          <span className="cursor-blink inline-block h-3 w-[7px] bg-accent" aria-hidden="true" />
          {t.hero.openToWork}
        </span>
        <a
          href="/Berat_Dogan_CV.pdf"
          download
          className="text-ink transition-colors hover:text-accent"
        >
          CV.PDF <span className="text-accent">↓</span>
        </a>
        <span className="hidden sm:block">Portfolio — v1.0</span>
      </footer>
    </section>
  )
}
