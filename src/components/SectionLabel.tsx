interface SectionLabelProps {
  children: string
  meta?: string
}

export default function SectionLabel({ children, meta }: SectionLabelProps) {
  return (
    <div className="flex items-baseline justify-between font-mono text-xs tracking-[0.2em] uppercase">
      <span>
        <span className="text-accent">/ </span>
        {children}
      </span>
      {meta && <span className="text-mute">{meta}</span>}
    </div>
  )
}
