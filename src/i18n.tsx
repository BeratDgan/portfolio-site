import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type Lang = 'en' | 'tr'

const en = {
  nav: {
    about: 'About',
    experience: 'Experience',
    stack: 'Stack',
    projects: 'Projects',
    path: 'Path',
    contact: 'Contact',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  hero: {
    roleA: 'Cloud',
    roleB: 'DevOps',
    roleC: 'Platform Engineering',
    blurb:
      'I build backend and AI systems, then ship them the way production demands — containerized, behind a pipeline, on real cloud infrastructure. Class of 2027, open to internships and junior roles.',
    viewProjects: 'View projects',
    getInTouch: 'Get in touch',
    openToWork: 'Open to work',
    localTime: 'Local time in Türkiye',
  },
  about: {
    meta: "Who's shipping",
    titleA: 'Backend roots,',
    titleB: 'cloud trajectory',
    p1: [
      "I'm a software engineering student at Fırat University (class of 2027), with an Erasmus+ semester at the University of Maribor, Slovenia. I started out in backend and AI engineering — ",
      'RAG systems, vector databases, OAuth 2.0',
      ' — and the more I shipped, the more I cared about what happens after the code works.',
    ],
    p2: [
      "That's where I'm heading now: ",
      'containers, pipelines and cloud infrastructure',
      ' — Docker images on AWS ECS Fargate, CI/CD on GitHub Actions, DNS to TLS on Cloudflare. I like systems that deploy themselves and stay up.',
    ],
    portrait: 'Portrait — to be deployed',
    facts: [
      ['Location', 'Malatya, Türkiye'],
      ['University', 'Fırat University — Software Engineering, 2027'],
      ['Exchange', 'University of Maribor — Erasmus+, 2025'],
      ['Languages', 'Turkish (native) · English (professional)'],
    ],
  },
  experience: {
    meta: 'Currently',
    company: 'Soliner',
    role: 'DevOps Engineer Intern',
    period: 'Jul 2026 — Present',
    summary:
      'Hands-on with the delivery side of production systems — containers, CI/CD pipelines and cloud infrastructure.',
  },
  stack: {
    meta: 'Tools in production',
    title: 'What I build with',
    groups: ['Cloud & delivery', 'Runtimes & languages', 'Data & realtime'],
  },
  projects: {
    meta: '4 builds',
    title: 'Built & shipped',
    scrollPrev: 'Previous project',
    scrollNext: 'Next project',
    items: [
      {
        role: 'End-to-end build',
        description:
          'Recruitment-tracking web app taken all the way to production: Next.js and Supabase, packaged with Docker and running on AWS ECS Fargate behind an ALB with ACM-issued HTTPS and Cloudflare DNS. Every push ships through GitHub Actions.',
      },
      {
        role: 'Scrum Master — team of 4',
        description:
          'AI-powered technical interview simulator. Retrieval-augmented generation over 40,000+ questions in Qdrant, with LoRA/QLoRA fine-tuned models behind it. Led the four-person team as Scrum Master.',
      },
      {
        role: 'Backend & auth',
        description:
          'Web app built on the Spotify API — backend design and the full Spotify OAuth 2.0 authorization flow.',
      },
      {
        role: 'Realtime backend',
        description:
          'Real-time broadcast backend built on Node.js and Socket.io — live rooms, viewers and events over persistent connections.',
      },
    ],
  },
  path: {
    meta: 'Education & proof',
    title: 'The route so far',
    education: 'Education',
    certificates: 'Certificates',
    entries: [
      {
        period: '2023 - 2027 (expected)',
        place: 'Fırat University',
        detail: 'B.Sc. Software Engineering — Elazığ, Türkiye',
      },
      {
        period: 'Feb — Jul 2025',
        place: 'University of Maribor',
        detail: 'Erasmus+ exchange semester — Maribor, Slovenia',
      },
    ],
  },
  contact: {
    titleA: "Let's ship",
    titleB: 'something real',
    builtWith: 'React + Vite — deployed on Cloudflare Pages',
    backToTop: 'Back to top ↑',
  },
}

export type Dict = typeof en

const tr: Dict = {
  nav: {
    about: 'Hakkımda',
    experience: 'Deneyim',
    stack: 'Stack',
    projects: 'Projeler',
    path: 'Yol',
    contact: 'İletişim',
    menu: 'Menü',
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
  },
  hero: {
    roleA: 'Cloud',
    roleB: 'DevOps',
    roleC: 'Platform Mühendisliği',
    blurb:
      "Backend ve yapay zekâ sistemleri kuruyor, sonra onları production'ın gerektirdiği gibi gönderiyorum — konteynerize edilmiş, pipeline arkasında, gerçek bulut altyapısında. 2027 mezunuyum; staj ve junior rollere açığım.",
    viewProjects: 'Projelere git',
    getInTouch: 'İletişime geç',
    openToWork: 'Çalışmaya açık',
    localTime: "Türkiye'de yerel saat",
  },
  about: {
    meta: 'Gönderen kim',
    titleA: 'Backend kökler,',
    titleB: 'bulut rotası',
    p1: [
      "Fırat Üniversitesi'nde yazılım mühendisliği öğrencisiyim (2027), Erasmus+ ile bir dönem Maribor Üniversitesi'nde (Slovenya) okudum. Backend ve yapay zekâ mühendisliğiyle başladım — ",
      'RAG sistemleri, vektör veritabanları, OAuth 2.0',
      ' — ve gönderdikçe, kod çalıştıktan sonra olanları daha çok önemser oldum.',
    ],
    p2: [
      'Şimdi yöneldiğim yer orası: ',
      "konteynerler, pipeline'lar ve bulut altyapısı",
      " — AWS ECS Fargate'te Docker imajları, GitHub Actions'ta CI/CD, DNS'ten TLS'e Cloudflare. Kendi kendini deploy eden ve ayakta kalan sistemleri severim.",
    ],
    portrait: 'Portre — yakında yayında',
    facts: [
      ['Konum', 'Malatya, Türkiye'],
      ['Üniversite', 'Fırat Üniversitesi — Yazılım Mühendisliği, 2027'],
      ['Değişim', 'Maribor Üniversitesi — Erasmus+, 2025'],
      ['Diller', 'Türkçe (ana dil) · İngilizce (profesyonel)'],
    ],
  },
  experience: {
    meta: 'Şu an',
    company: 'Soliner',
    role: 'DevOps Mühendisi Stajyeri',
    period: 'Tem 2026 — Devam ediyor',
    summary:
      "Production sistemlerinin teslimat tarafında saha deneyimi — konteynerler, CI/CD pipeline'ları ve bulut altyapısı.",
  },
  stack: {
    meta: "Production'daki araçlar",
    title: 'Neyle inşa ediyorum',
    groups: ['Bulut & teslimat', "Runtime'lar & diller", 'Veri & gerçek zamanlı'],
  },
  projects: {
    meta: '4 proje',
    title: 'Kuruldu & yayında',
    scrollPrev: 'Önceki proje',
    scrollNext: 'Sonraki proje',
    items: [
      {
        role: 'Uçtan uca',
        description:
          "Production'a kadar götürülmüş işe alım takip uygulaması: Next.js ve Supabase, Docker ile paketlenip AWS ECS Fargate'te çalışıyor — önünde ALB, ACM'den HTTPS, Cloudflare DNS. Her push GitHub Actions üzerinden yayına çıkıyor.",
      },
      {
        role: 'Scrum Master — 4 kişilik ekip',
        description:
          'Yapay zekâ destekli teknik mülakat simülatörü. Qdrant üzerinde 40.000+ soruyla retrieval-augmented generation, arkasında LoRA/QLoRA ile fine-tune edilmiş modeller. Dört kişilik ekibi Scrum Master olarak yönettim.',
      },
      {
        role: 'Backend & auth',
        description:
          'Spotify API üzerine kurulu web uygulaması — backend tasarımı ve uçtan uca Spotify OAuth 2.0 yetkilendirme akışı.',
      },
      {
        role: 'Gerçek zamanlı backend',
        description:
          "Node.js ve Socket.io ile gerçek zamanlı yayın backend'i — kalıcı bağlantılar üzerinden canlı odalar, izleyiciler ve olaylar.",
      },
    ],
  },
  path: {
    meta: 'Eğitim & belgeler',
    title: 'Bugüne kadarki rota',
    education: 'Eğitim',
    certificates: 'Sertifikalar',
    entries: [
      {
        period: '2023 - 2027 (beklenen)',
        place: 'Fırat Üniversitesi',
        detail: 'Yazılım Mühendisliği Lisansı — Elazığ, Türkiye',
      },
      {
        period: 'Şub — Tem 2025',
        place: 'Maribor Üniversitesi',
        detail: 'Erasmus+ değişim dönemi — Maribor, Slovenya',
      },
    ],
  },
  contact: {
    titleA: 'Gerçek bir şeyi',
    titleB: 'yayına alalım',
    builtWith: "React + Vite — Cloudflare Pages'te yayında",
    backToTop: 'Başa dön ↑',
  },
}

const dictionaries: Record<Lang, Dict> = { en, tr }

interface I18nValue {
  lang: Lang
  t: Dict
  setLang: (lang: Lang) => void
}

const I18nContext = createContext<I18nValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('lang')
    if (saved === 'en' || saved === 'tr') return saved
    return navigator.language.toLowerCase().startsWith('tr') ? 'tr' : 'en'
  })

  useEffect(() => {
    localStorage.setItem('lang', lang)
    // keeps CSS text-transform: uppercase mapping i → İ correctly in Turkish
    document.documentElement.lang = lang
  }, [lang])

  return (
    <I18nContext.Provider value={{ lang, t: dictionaries[lang], setLang }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside LangProvider')
  return ctx
}
