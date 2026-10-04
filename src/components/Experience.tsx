import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import { useI18n } from '../i18n'
import solinerLogo from '../assets/soliner.jpeg'

export default function Experience() {
  const { t } = useI18n()

  return (
    <section id="experience" className="border-t border-line px-6 py-20 md:px-10 md:py-32">
      <Reveal>
        <SectionLabel meta={t.experience.meta}>{t.nav.experience}</SectionLabel>
      </Reveal>

      <div className="mt-14 grid gap-8 md:mt-16 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <div className="border-l-2 border-accent pl-6 md:pl-8">
            <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase text-mute">
              {t.experience.period}
            </p>
            <div className="mt-4 flex items-center gap-4 md:gap-5">
              <img
                src={solinerLogo}
                alt=""
                className="h-12 w-12 rounded-full border border-line object-cover md:h-16 md:w-16"
              />
              <h3 className="font-display text-4xl leading-none font-bold tracking-tight uppercase md:text-6xl">
                {t.experience.company}
              </h3>
            </div>
            <p className="mt-5 font-mono text-xs tracking-[0.15em] uppercase">
              {t.experience.role}
            </p>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink/75">
              {t.experience.summary}
            </p>
            <ul className="mt-6 max-w-xl space-y-4 text-[15px] leading-relaxed text-ink/75">
              {t.experience.bullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="text-accent">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
          <aside className="border-t border-ink pt-5">
            <h3 className="font-mono text-xs tracking-[0.12em] uppercase">{t.experience.exposureLabel}</h3>
            <p className="mt-4 text-sm leading-relaxed text-mute">{t.experience.exposure}</p>
            <a href="#cloud-native" className="mt-6 inline-flex min-h-11 items-center border-b border-ink text-sm transition-colors hover:text-accent">
              Cloud Native Order Platform <span aria-hidden="true" className="ml-2">↓</span>
            </a>
          </aside>
        </Reveal>
      </div>
    </section>
  )
}
