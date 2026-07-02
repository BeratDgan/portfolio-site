import { useRef } from 'react'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import { useI18n } from '../i18n'

// TODO: point each repo at the actual repository once the names are confirmed
const PROJECTS = [
  {
    index: '01',
    name: 'Trackruit',
    tags: ['Next.js', 'Supabase', 'Docker', 'AWS ECS Fargate', 'GitHub Actions'],
    repo: 'https://github.com/BeratDgan/Trackruit',
  },
  {
    index: '02',
    name: 'PrePath',
    tags: ['Python', 'Qdrant', 'RAG', 'LoRA / QLoRA'],
    repo: 'https://github.com/Ainterview-4/Big-Leap',
  },
  {
    index: '03',
    name: 'Lyricly.tech',
    tags: ['Node.js', 'Spotify API', 'OAuth 2.0'],
    repo: 'https://github.com/BeratDgan/lyric-thing',
  },
  {
    index: '04',
    name: 'Live Streaming Platform',
    tags: ['Node.js', 'Socket.io', 'WebSockets'],
    repo: 'https://github.com/BeratDgan/streamhub',
  },
] as const

export default function Projects() {
  const { t } = useI18n()
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('article')
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 480) + 1), behavior: 'smooth' })
  }

  return (
    <section id="projects" className="border-t border-line py-20 md:py-32">
      <div className="px-6 md:px-10">
        <Reveal>
          <SectionLabel meta={t.projects.meta}>{t.nav.projects}</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-8 flex items-end justify-between gap-6">
            <h2 className="font-display text-4xl leading-[0.95] font-bold tracking-tight uppercase md:text-6xl">
              {t.projects.title}<span className="text-accent">.</span>
            </h2>
            <div className="hidden shrink-0 gap-2 md:flex">
              <button
                type="button"
                aria-label={t.projects.scrollPrev}
                onClick={() => scrollByCard(-1)}
                className="border border-line px-4 py-2 font-mono text-xs transition-colors hover:border-ink hover:bg-ink hover:text-ground"
              >
                ←
              </button>
              <button
                type="button"
                aria-label={t.projects.scrollNext}
                onClick={() => scrollByCard(1)}
                className="border border-line px-4 py-2 font-mono text-xs transition-colors hover:border-ink hover:bg-ink hover:text-ground"
              >
                →
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-12 md:mt-16">
        <div
          ref={scrollerRef}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto border-y border-line pl-6 [scroll-padding-left:1.5rem] md:pl-10 md:[scroll-padding-left:2.5rem]"
        >
          {PROJECTS.map((project, i) => (
            <article
              key={project.name}
              className="group flex w-[85vw] shrink-0 snap-start flex-col border-l border-line py-10 pr-8 pl-8 first:border-l-0 first:pl-0 sm:w-[34rem] md:w-[40rem] md:py-14 md:pr-12 md:pl-12"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-xs tracking-[0.2em] text-mute transition-colors group-hover:text-accent">
                  {project.index}
                </span>
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-mute">
                  {t.projects.items[i].role}
                </span>
              </div>
              <h3 className="mt-6 font-display text-3xl leading-none font-bold tracking-tight uppercase transition-colors group-hover:text-accent md:text-5xl">
                {project.name}
              </h3>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/75">
                {t.projects.items[i].description}
              </p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-10">
                <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-mute">
                  {project.tags.join(' / ')}
                </p>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-ink px-4 py-2 font-mono text-xs tracking-[0.15em] uppercase transition-colors hover:border-accent hover:bg-accent hover:text-ground"
                >
                  GitHub ↗
                </a>
              </div>
            </article>
          ))}
          <div className="w-6 shrink-0 md:w-10" aria-hidden="true" />
        </div>
      </Reveal>
    </section>
  )
}
