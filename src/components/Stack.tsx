import type { SimpleIcon } from 'simple-icons'
import {
  siCloudflare,
  siDocker,
  siDotnet,
  siGit,
  siGithubactions,
  siLinux,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siRedis,
  siSocketdotio,
  siTypescript,
} from 'simple-icons'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import { useI18n } from '../i18n'

interface Tech {
  name: string
  icon?: SimpleIcon
}

/* simple-icons no longer ships an AWS mark, so it runs as a wordmark */
const ROW_A: Tech[] = [
  { name: 'AWS' },
  { name: 'Docker', icon: siDocker },
  { name: 'GitHub Actions', icon: siGithubactions },
  { name: 'Cloudflare', icon: siCloudflare },
  { name: 'Linux', icon: siLinux },
  { name: 'PostgreSQL', icon: siPostgresql },
  { name: 'MongoDB', icon: siMongodb },
  { name: 'Redis', icon: siRedis },
]

const ROW_B: Tech[] = [
  { name: 'Node.js', icon: siNodedotjs },
  { name: 'TypeScript', icon: siTypescript },
  { name: 'Python', icon: siPython },
  { name: '.NET', icon: siDotnet },
  { name: 'Next.js', icon: siNextdotjs },
  { name: 'Socket.io', icon: siSocketdotio },
  { name: 'Git', icon: siGit },
]

const GROUP_ITEMS = [
  ['AWS — ECS Fargate, ALB, ACM', 'Docker', 'GitHub Actions', 'Cloudflare', 'Linux'],
  ['Node.js', 'TypeScript', 'Python', '.NET', 'Next.js'],
  ['PostgreSQL', 'MongoDB', 'Redis', 'Qdrant', 'Socket.io'],
] as const

function TechItem({ tech }: { tech: Tech }) {
  return (
    <span className="flex items-center gap-3 px-8 transition-colors hover:text-accent">
      {tech.icon ? (
        <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 fill-current" aria-hidden="true">
          <path d={tech.icon.path} />
        </svg>
      ) : (
        <span className="font-display text-xl leading-none font-bold tracking-tight">{tech.name}</span>
      )}
      <span className="font-mono text-xs tracking-[0.15em] uppercase">{tech.name}</span>
      <span className="pl-8 text-accent" aria-hidden="true">
        /
      </span>
    </span>
  )
}

function LogoLoop({ row, reverse, duration }: { row: Tech[]; reverse?: boolean; duration: string }) {
  return (
    <div className="marquee overflow-hidden py-5 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        className="marquee-track"
        data-reverse={reverse ? '' : undefined}
        style={{ '--marquee-duration': duration } as React.CSSProperties}
      >
        {[false, true].map((clone) => (
          <div key={String(clone)} className="flex" aria-hidden={clone}>
            {row.map((tech) => (
              <TechItem key={tech.name} tech={tech} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Stack() {
  const { t } = useI18n()

  return (
    <section id="stack" className="border-t border-line py-20 md:py-32">
      <div className="px-6 md:px-10">
        <Reveal>
          <SectionLabel meta={t.stack.meta}>{t.nav.stack}</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-8 font-display text-4xl leading-[0.95] font-bold tracking-tight uppercase md:text-6xl">
            {t.stack.title}<span className="text-accent">.</span>
          </h2>
        </Reveal>
      </div>

      <Reveal className="mt-12 md:mt-16">
        <div className="border-y border-line">
          <LogoLoop row={ROW_A} duration="42s" />
          <div className="border-t border-line" />
          <LogoLoop row={ROW_B} reverse duration="36s" />
        </div>
      </Reveal>

      <div className="mt-14 grid gap-10 px-6 md:mt-16 md:grid-cols-3 md:px-10">
        {GROUP_ITEMS.map((items, i) => (
          <Reveal key={t.stack.groups[i]} delay={i * 0.08}>
            <h3 className="border-b border-ink pb-3 font-mono text-xs tracking-[0.2em] uppercase">
              {t.stack.groups[i]}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-mute">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
