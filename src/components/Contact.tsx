import Reveal from './Reveal'
import { useI18n } from '../i18n'

const LINKS = [
  ['GitHub', 'https://github.com/BeratDgan'],
  ['LinkedIn', 'https://www.linkedin.com/in/beratdgan/'],
] as const

export default function Contact() {
  const { t } = useI18n()

  return (
    <section id="contact" className="bg-ink px-6 pt-20 pb-6 text-ground md:px-10 md:pt-32">
      <Reveal>
        <div className="font-mono text-xs tracking-[0.2em] uppercase text-ground/50">
          <span className="text-accent">/ </span>
          {t.nav.contact}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className="mt-14 font-display text-[clamp(2.75rem,9vw,8rem)] leading-[0.9] font-bold tracking-[-0.03em] uppercase md:mt-16">
          {t.contact.titleA}
          <br />
          {t.contact.titleB}<span className="text-accent">.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.2}>
        <a
          href="mailto:dgan.berat@gmail.com"
          className="mt-14 inline-block border-b border-ground/40 pb-1 font-mono text-lg transition-colors hover:border-accent hover:text-accent md:text-2xl"
        >
          dgan.berat@gmail.com
        </a>
      </Reveal>

      <Reveal delay={0.25}>
        <div className="mt-10 flex gap-8">
          {LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group font-mono text-xs tracking-[0.2em] uppercase text-ground/60 transition-colors hover:text-accent"
            >
              {label}{' '}
              <span className="inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          ))}
        </div>
      </Reveal>

      <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-ground/20 py-4 font-mono text-[11px] tracking-[0.12em] uppercase text-ground/40 md:mt-24">
        <span>© 2026 Berat Doğan</span>
        <span className="hidden sm:block">{t.contact.builtWith}</span>
        <a href="#top" className="transition-colors hover:text-accent">
          {t.contact.backToTop}
        </a>
      </footer>
    </section>
  )
}
