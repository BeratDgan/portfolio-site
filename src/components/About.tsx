import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import { Highlighter } from './Highlighter'
import { useI18n } from '../i18n'
import portraitImg from '../assets/portrait.jpg'

export default function About() {
  const { t, lang } = useI18n()

  return (
    <section id="about" className="border-t border-line px-6 py-20 md:px-10 md:py-32">
      <Reveal>
        <SectionLabel meta={t.about.meta}>{t.nav.about}</SectionLabel>
      </Reveal>

      <div className="mt-14 grid gap-12 md:mt-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <Reveal>
            <h2 className="font-display text-4xl leading-[0.95] font-bold tracking-tight uppercase md:text-6xl">
              {t.about.titleA}
              <br />
              {t.about.titleB}<span className="text-accent">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-xl text-[15px] leading-relaxed text-ink/75 md:text-base">
              {t.about.p1[0]}
              <Highlighter key={lang} action="underline" color="#e8490f">
                {t.about.p1[1]}
              </Highlighter>
              {t.about.p1[2]}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink/75 md:text-base">
              {t.about.p2[0]}
              <Highlighter key={lang}>{t.about.p2[1]}</Highlighter>
              {t.about.p2[2]}
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <Reveal delay={0.1}>
            {/* macOS Safari window frame around the portrait */}
            <div className="group relative">
              <div className="border border-line">
                <div className="flex items-center gap-2 border-b border-line px-3 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
                  <span className="flex flex-1 justify-center">
                    <span className="bg-line/40 px-5 py-1 font-mono text-[10px] tracking-[0.1em] text-mute">
                      berat.dev/portrait
                    </span>
                  </span>
                  <span className="w-[46px]" aria-hidden="true" />
                </div>
                <div className="flex aspect-4/5 items-center justify-center overflow-hidden">
                  <img
                    src={portraitImg}
                    alt="Berat Doğan"
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                  />
                </div>
              </div>

              {/* flight-path cue: departure marker curves up into the frame — fades once hovered */}
              <div className="mt-4 flex items-end justify-end gap-3 transition-opacity duration-500 group-hover:opacity-0">
                <svg className="h-12 w-16 shrink-0" viewBox="0 0 64 48" fill="none" aria-hidden="true">
                  <circle cx="58" cy="44" r="3" fill="#e8490f" />
                  <path
                    className="flight-path"
                    d="M58 44C40 46 20 40 16 24C13 12 20 6 6 4"
                    stroke="#e8490f"
                    strokeWidth="2"
                    strokeDasharray="4 5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 4L16 8M6 4L10 15"
                    stroke="#e8490f"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="pb-1 font-mono text-xs font-bold tracking-[0.15em] text-ink uppercase">
                  {t.about.portraitHint}
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-8">
              {t.about.facts.map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-b border-line py-3 text-sm"
                >
                  <dt className="shrink-0 font-mono text-[11px] leading-5 tracking-[0.15em] uppercase text-mute">
                    {label}
                  </dt>
                  <dd className="text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
