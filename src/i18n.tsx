import { createContext, useContext } from 'react'

export type Lang = 'en' | 'tr'

const en = {
  nav: {
    about: 'About',
    experience: 'Experience',
    stack: 'Tools',
    projects: 'Projects',
    path: 'Education',
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
      "I'm a DevOps intern at Soliner and a software engineering student at Fırat University. My work focuses on Kubernetes, CI/CD, and cloud deployments on Azure and AWS.",
    viewProjects: 'View projects',
    getInTouch: 'Get in touch',
    currentRole: 'DevOps intern @ Soliner',
    localTime: 'Local time in Türkiye',
  },
  about: {
    meta: 'A little context',
    titleA: 'From backend',
    titleB: 'to cloud infrastructure',
    p1: [
      "I'm studying software engineering at Fırat University, with graduation expected in 2027. In 2025, I spent an Erasmus+ semester at the University of Maribor in Slovenia. My earlier projects involved ",
      'RAG systems, vector databases, and OAuth 2.0',
      ', from a technical interview simulator to a Spotify-based web app.',
    ],
    p2: [
      "These days, I'm working on ",
      'Kubernetes, delivery pipelines, and cloud infrastructure',
      '. At Soliner, my internship project brought together Terraform, AKS, and GitOps. For Trackruit, I deployed a Next.js application on AWS ECS Fargate and automated its releases with GitHub Actions.',
    ],
    portrait: 'Berat Doğan',
    portraitHint: 'hover the photo — reveals color',
    facts: [
      ['Location', 'Malatya, Türkiye'],
      ['University', 'Fırat University — Software Engineering, expected 2027'],
      ['Exchange', 'University of Maribor — Erasmus+, 2025'],
      ['Languages', 'Turkish (native) · English (B2)'],
    ],
  },
  experience: {
    meta: 'Currently',
    company: 'Soliner',
    role: 'DevOps Engineer Intern',
    period: 'Jul 2026 — Present',
    summary:
      'Working on container deployments and Kubernetes configurations, alongside an AKS internship project.',
    bullets: [
      'Worked on containerization and Kubernetes deployment configurations in a BSS environment.',
      'Built reusable Helm charts with health probes and environment-specific values; tested Istio routing with an 80/20 traffic split in a lab application.',
      'Set up Prometheus metrics, Grafana dashboards, Loki logs, and Alertmanager email notifications for the AKS project; investigated deployment, networking, and secret configuration issues.',
    ],
    exposureLabel: 'Team workflows',
    exposure: 'Gained exposure to Jenkins, Argo CD, Bitbucket, Harbor, and AWS EKS/ECR through the team’s workflows.',
  },
  stack: {
    meta: 'Tools I work with',
    title: 'What I build with',
    groups: ['Cloud & infrastructure', 'Containers & delivery', 'Operations & security', 'Development & data'],
  },
  projects: {
    meta: '5 projects',
    title: 'Selected projects',
    scrollPrev: 'Previous project',
    scrollNext: 'Next project',
    more: 'Other projects',
    featured: {
      name: 'Cloud Native Order Platform',
      context: 'Soliner internship project · 2026',
      description: 'An order platform on Azure Kubernetes Service, built during my internship to work through infrastructure provisioning, GitOps delivery, and day-to-day cluster operations.',
      details: [
        {
          title: 'Infrastructure & services',
          body: 'Provisioned AKS with Terraform and deployed Node.js services and PostgreSQL with persistent storage using Helm.',
        },
        {
          title: 'From commit to deployment',
          body: 'Added tests, Helm validation, and Trivy image scanning to GitHub Actions. Published images to ACR using OIDC and configured Argo CD to sync deployments from Git.',
        },
        {
          title: 'Secrets & traffic',
          body: 'Connected Azure Key Vault through External Secrets Operator and Workload Identity. Added NetworkPolicies and configured Istio-based canary delivery with Argo Rollouts.',
        },
        {
          title: 'Scaling & restore checks',
          body: 'Configured HPA and recommendation-only VPA. Used Velero with CSI snapshots and verified restored PostgreSQL data files in a separate namespace.',
        },
      ],
    },
    items: [
      {
        role: 'End-to-end build',
        description:
          'A job application tracker built with Next.js and Supabase. I containerized the app and deployed it to AWS ECS Fargate through ECR, with ALB, ACM HTTPS, and Cloudflare DNS. GitHub Actions handles builds and deployments; IAM, Secrets Manager, CloudWatch, and SNS/EventBridge support access, secrets, and monitoring.',
      },
      {
        role: 'Technical team lead / Scrum Master',
        description:
          'An academic technical interview simulator built by a team of four in 2024–2025. I led the team and planned sprints, built a Dockerized RAG backend with Qdrant, indexed 40,000+ records, and fine-tuned open-source models with LoRA/QLoRA.',
      },
      {
        role: 'Backend & auth',
        description:
          'A web app using the Spotify API. I implemented the backend and OAuth 2.0 authorization flow, including token exchange, refresh, and session handling.',
      },
      {
        role: 'Realtime backend',
        description:
          'A real-time broadcast backend built with Node.js and Socket.io. I worked on connection lifecycle, live rooms, viewers, and event delivery over persistent connections.',
      },
    ],
  },
  path: {
    meta: 'Education & training',
    title: 'The route so far',
    education: 'Education',
    certificates: 'Courses & training',
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
    titleA: 'Get in',
    titleB: 'touch',
    cvTitle: 'Download CV',
    cvMeta: 'PDF · English · 1 page',
    builtWith: 'React + Vite — deployed on Cloudflare Pages',
    backToTop: 'Back to top ↑',
  },
}

export type Dict = typeof en

const tr: Dict = {
  nav: {
    about: 'Hakkımda',
    experience: 'Deneyim',
    stack: 'Araçlar',
    projects: 'Projeler',
    path: 'Eğitim',
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
      "Soliner'de DevOps stajyeriyim. Kubernetes, CI/CD ve Azure / AWS altyapılarıyla çalışıyorum; Fırat Üniversitesi'nde yazılım mühendisliği okuyorum.",
    viewProjects: 'Projelere git',
    getInTouch: 'İletişime geç',
    currentRole: 'Soliner’de DevOps stajyeri',
    localTime: "Türkiye'de yerel saat",
  },
  about: {
    meta: 'Biraz hakkımda',
    titleA: 'Backend’den',
    titleB: 'bulut altyapısına',
    p1: [
      "Fırat Üniversitesi'nde yazılım mühendisliği okuyorum; 2027'de mezun olmayı planlıyorum. 2025'te Erasmus+ ile bir dönem Slovenya'daki Maribor Üniversitesi'nde okudum. Önceki projelerimde ",
      'RAG sistemleri, vektör veritabanları ve OAuth 2.0',
      ' ile çalıştım; teknik mülakat simülatörü ve Spotify tabanlı bir web uygulaması geliştirdim.',
    ],
    p2: [
      'Şu sıralar ağırlıklı olarak ',
      'Kubernetes, CI/CD ve bulut altyapısıyla',
      " çalışıyorum. Soliner'deki staj projemde Terraform, AKS ve GitOps'u bir araya getirdim. Trackruit'te ise Next.js uygulamasını AWS ECS Fargate'e taşıyıp yayın sürecini GitHub Actions ile otomatikleştirdim.",
    ],
    portrait: 'Berat Doğan',
    portraitHint: 'fotoğrafın üzerine gel — renklenir',
    facts: [
      ['Konum', 'Malatya, Türkiye'],
      ['Üniversite', 'Fırat Üniversitesi — Yazılım Mühendisliği, beklenen 2027'],
      ['Değişim', 'Maribor Üniversitesi — Erasmus+, 2025'],
      ['Diller', 'Türkçe (ana dil) · İngilizce (B2)'],
    ],
  },
  experience: {
    meta: 'Şu an',
    company: 'Soliner',
    role: 'DevOps Mühendisi Stajyeri',
    period: 'Tem 2026 — Devam ediyor',
    summary:
      "Konteyner ve Kubernetes yapılandırmaları üzerinde çalışıyor, staj projemi AKS üzerinde geliştiriyorum.",
    bullets: [
      'BSS ortamında uygulamaların konteynerleştirilmesi ve Kubernetes dağıtım yapılandırmaları üzerinde çalıştım.',
      'Sağlık kontrolleri ve ortama özel değerlerle tekrar kullanılabilir Helm chart’ları hazırladım; laboratuvar uygulamasında Istio ile 80/20 trafik dağılımını denedim.',
      'AKS projesinde Prometheus metrikleri, Grafana panoları, Loki logları ve Alertmanager e-posta bildirimlerini kurdum; dağıtım, ağ ve secret yapılandırma sorunlarını inceledim.',
    ],
    exposureLabel: 'Ekipte tanıdığım iş akışları',
    exposure: 'Ekibin Jenkins, Argo CD, Bitbucket, Harbor ve AWS EKS/ECR iş akışlarını tanıma fırsatı buldum.',
  },
  stack: {
    meta: 'Kullandığım araçlar',
    title: 'Çalıştığım teknolojiler',
    groups: ['Bulut ve altyapı', 'Konteynerler ve dağıtım', 'Operasyon ve güvenlik', 'Geliştirme ve veri'],
  },
  projects: {
    meta: '5 proje',
    title: 'Projelerden seçmeler',
    scrollPrev: 'Önceki proje',
    scrollNext: 'Sonraki proje',
    more: 'Diğer projeler',
    featured: {
      name: 'Cloud Native Order Platform',
      context: 'Soliner staj projesi · 2026',
      description: 'Stajım sırasında Azure Kubernetes Service üzerinde geliştirdiğim sipariş platformu. Altyapının kurulumundan GitOps ile dağıtıma ve küme operasyonlarına kadar farklı aşamalarda çalıştım.',
      details: [
        {
          title: 'Altyapı ve servisler',
          body: 'AKS altyapısını Terraform ile oluşturdum. Node.js servislerini ve kalıcı depolama kullanan PostgreSQL’i Helm ile dağıttım.',
        },
        {
          title: 'Commit’ten dağıtıma',
          body: 'GitHub Actions’a test, Helm doğrulama ve Trivy imaj taraması ekledim. OIDC ile ACR’a imaj gönderdim; Argo CD’yi Git’teki dağıtım tanımlarıyla senkronize çalışacak şekilde yapılandırdım.',
        },
        {
          title: 'Secret yönetimi ve trafik',
          body: 'Azure Key Vault’u External Secrets Operator ve Workload Identity ile bağladım. NetworkPolicy kuralları ekledim; Istio ve Argo Rollouts ile canary dağıtımını yapılandırdım.',
        },
        {
          title: 'Ölçekleme ve geri yükleme',
          body: 'HPA’yı ve yalnızca öneri üreten VPA’yı yapılandırdım. Velero ve CSI snapshot’larıyla yedekleme yaptım; ayrı bir namespace’e geri yüklenen PostgreSQL veri dosyalarını doğruladım.',
        },
      ],
    },
    items: [
      {
        role: 'Uçtan uca',
        description:
          'Next.js ve Supabase ile geliştirdiğim iş başvurusu takip uygulaması. Docker ile paketleyip ECR üzerinden AWS ECS Fargate’e dağıttım; ALB, ACM HTTPS ve Cloudflare DNS’i yapılandırdım. GitHub Actions ile build ve dağıtımı otomatikleştirdim; IAM, Secrets Manager, CloudWatch ve SNS/EventBridge ile erişim, secret ve izleme ayarlarını yaptım.',
      },
      {
        role: 'Teknik ekip lideri / Scrum Master',
        description:
          '2024–2025 döneminde dört kişilik ekiple geliştirdiğimiz akademik teknik mülakat simülatörü. Ekibe liderlik edip sprintleri planladım; Docker üzerinde çalışan RAG backend’ini geliştirdim, Qdrant’ta 40.000+ kayıt indeksledim ve açık kaynak modelleri LoRA/QLoRA ile uyarladım.',
      },
      {
        role: 'Backend & auth',
        description:
          'Spotify API kullanan bir web uygulaması. Backend’i ve OAuth 2.0 yetkilendirme akışını geliştirdim; token değişimi, yenileme ve oturum yönetimini uyguladım.',
      },
      {
        role: 'Gerçek zamanlı backend',
        description:
          'Node.js ve Socket.io ile geliştirdiğim gerçek zamanlı yayın backend’i. Kalıcı bağlantılar üzerinden bağlantı yaşam döngüsü, canlı odalar, izleyiciler ve olay iletimi üzerinde çalıştım.',
      },
    ],
  },
  path: {
    meta: 'Eğitim ve kurslar',
    title: 'Bugüne kadarki rota',
    education: 'Eğitim',
    certificates: 'Kurslar ve eğitimler',
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
    titleA: 'İletişimde',
    titleB: 'kalalım',
    cvTitle: "CV'yi indir",
    cvMeta: 'PDF · Türkçe · 1 sayfa',
    builtWith: "React + Vite — Cloudflare Pages'te yayında",
    backToTop: 'Başa dön ↑',
  },
}

export const dictionaries: Record<Lang, Dict> = { en, tr }

interface I18nValue {
  lang: Lang
  t: Dict
}

export const I18nContext = createContext<I18nValue | null>(null)

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside LangProvider')
  return ctx
}
