import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import { useI18n } from '../i18n'

const CERTIFICATES = [
  ['Serverless', 'AWS Educate'],
  ['Docker', 'DataCamp'],
  ['Kubernetes', 'DataCamp'],
  ['Linux 301', 'Turkcell Academy'],
  ['.NET Core', 'Patika.dev'],
  ['Redis', 'Redis University'],
  ['Prompting Essentials', 'Google'],
] as const

export default function Path() {
  const { t } = useI18n()

  return (
    <section id="path" className="border-t border-line px-6 py-20 md:px-10 md:py-32">
      <Reveal>
        <SectionLabel meta={t.path.meta}>{t.nav.path}</SectionLabel>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-8 font-display text-4xl leading-[0.95] font-bold tracking-tight uppercase md:text-6xl">
          {t.path.title}<span className="text-accent">.</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-16 md:mt-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <Reveal>
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-mute">
              {t.path.education}
            </h3>
          </Reveal>
          {t.path.entries.map((entry, i) => (
            <Reveal key={entry.place} delay={i * 0.08}>
              <div className="mt-8 border-l-2 border-accent pl-6">
                <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-mute">
                  {entry.period}
                </p>
                <p className="mt-2 font-display text-2xl leading-tight font-bold tracking-tight uppercase md:text-3xl">
                  {entry.place}
                </p>
                <p className="mt-2 text-sm text-mute">{entry.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <Reveal>
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-mute">
              {t.path.certificates}
            </h3>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="mt-8">
              {CERTIFICATES.map(([name, issuer]) => (
                <li
                  key={`${issuer}-${name}`}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3"
                >
                  <span className="text-sm">{name}</span>
                  <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-mute">
                    {issuer}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
