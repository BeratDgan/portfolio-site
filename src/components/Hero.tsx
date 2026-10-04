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
  const btn = (l: Lang) => `min-h-11 min-w-11 transition-colors ${lang === l ? 'text-accent' : idle}`

  return (
    <div className="flex shrink-0 items-center font-mono text-xs tracking-[0.15em] uppercase">
      <button type="button" aria-label="English" aria-pressed={lang === 'en'} onClick={() => setLang('en')} className={btn('en')}>
        EN
      </button>
      <span aria-hidden="true" className={onDark ? 'text-ground/30' : 'text-line'}>
        /
      </span>
      <button type="button" aria-label="Türkçe" aria-pressed={lang === 'tr'} onClick={() => setLang('tr')} className={btn('tr')}>
        TR
      </button>
    </div>
  )
}

export default function Hero() {
  const { lang, t } = useI18n()
  const clock = useLocalClock()
  const nameRef = useRef<HTMLHeadingElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDialogElement>(null)
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
    if (!menuOpen) return
    const menu = menuRef.current
    const menuButton = menuBtnRef.current
    const previousOverflow = document.body.style.overflow
    const desktop = window.matchMedia('(min-width: 80rem)')
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }

    menu?.showModal()
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    desktop.addEventListener('change', closeOnDesktop)
    closeOnDesktop()

    return () => {
      desktop.removeEventListener('change', closeOnDesktop)
      menu?.close()
      document.body.style.overflow = previousOverflow
      if (!desktop.matches) menuButton?.focus({ preventScroll: true })
    }
  }, [menuOpen])

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== 'Tab') return
    const items = event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')
    const first = items[0]
    const last = items[items.length - 1]
    const active = document.activeElement

    if (event.shiftKey && (active === first || active === event.currentTarget)) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && active === last) {
      event.preventDefault()
      first?.focus()
    }
  }

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
          B—D<span className="hidden text-mute min-[400px]:inline"> / Portfolio</span>
        </a>

        <div className="flex items-center gap-3 sm:gap-6 xl:gap-8">
          <nav className="hidden xl:flex xl:gap-6" aria-label="Site">
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
          <span aria-hidden="true" className="hidden h-4 w-px bg-line xl:block" />
          <LangToggle />
          <button
            ref={menuBtnRef}
            type="button"
            aria-label={t.nav.openMenu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            aria-controls="site-menu"
            className="-mr-2 flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 p-2 xl:hidden"
          >
            <span className="block h-px w-6 bg-ink" />
            <span className="block h-px w-6 bg-ink" />
          </button>
        </div>
      </header>

      {menuOpen && (
        <dialog
          ref={menuRef}
          id="site-menu"
          aria-label={t.nav.menu}
          onCancel={() => setMenuOpen(false)}
          onKeyDown={handleMenuKeyDown}
          className="fixed inset-0 z-50 m-0 h-dvh max-h-none w-screen max-w-none cursor-auto! flex-col overflow-y-auto border-0 bg-ink px-6 py-5 text-ground open:flex [&_*]:cursor-auto! [&_a]:cursor-pointer! [&_button]:cursor-pointer!"
        >
          <div className="flex shrink-0 items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ground/50">
              B—D / {t.nav.menu}
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              aria-label={t.nav.closeMenu}
              onClick={() => setMenuOpen(false)}
              className="-mr-2 min-h-11 min-w-11 p-2 font-mono text-sm"
            >
              ✕
            </button>
          </div>

          <nav className="mt-10 mb-8 flex shrink-0 flex-col" aria-label="Site">
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
            className="fade-up mt-auto flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-ground/20 pt-5"
            style={{ '--d': '0.4s' } as React.CSSProperties}
          >
            <LangToggle onDark />
            <a href="mailto:dgan.berat@gmail.com" className="font-mono text-xs tracking-[0.1em]">
              dgan.berat@gmail.com
            </a>
          </div>
        </dialog>
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
            className="fade-up flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6 md:col-span-3 md:flex-col md:items-end 2xl:flex-row 2xl:justify-end"
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
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {t.hero.currentRole}
        </span>
        <a
          href={lang === 'tr' ? '/Berat_Dogan_CV_TR.pdf' : '/Berat_Dogan_CV.pdf'}
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
