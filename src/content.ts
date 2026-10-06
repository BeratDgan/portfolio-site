// Shared by the visible portfolio, prerendering, and Markdown export.
export const SITE_URL = 'https://beratdogan.me'
export const LANGUAGE_PATHS = { en: '/', tr: '/tr/' } as const
export const MARKDOWN_PATHS = { en: '/en.md', tr: '/tr.md' } as const
export const FEATURED_REPO = 'https://github.com/BeratDgan/cloud-native-order-platform'

export const PROJECTS = [
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
    huggingface: 'https://huggingface.co/beratdgan/Qwen3-14B-Interview-Coach',
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

export const GROUP_ITEMS = [
  ['Azure — AKS, ACR, Key Vault', 'AWS — ECS Fargate, ECR, IAM', 'ALB, ACM, Secrets Manager', 'Terraform', 'Linux, Cloudflare'],
  ['Docker, Kubernetes, Helm', 'Git, GitHub Actions', 'Argo CD, Argo Rollouts', 'Istio'],
  ['Prometheus, Grafana', 'Loki, Alertmanager', 'CloudWatch, SNS, EventBridge', 'Trivy, External Secrets Operator', 'Velero'],
  ['Node.js, JavaScript, TypeScript', 'Python, C# / .NET Core', 'Next.js, REST API', 'PostgreSQL, MongoDB', 'Redis, Qdrant, Socket.io'],
] as const

export const CERTIFICATES = [
  ['Kubernetes Temelleri', 'Udemy · 08/2026'],
  ['Getting Started with Serverless', 'AWS Educate'],
  ['Docker', 'DataCamp'],
  ['Kubernetes', 'DataCamp'],
  ['Linux 301', 'Turkcell Academy'],
  ['.NET Core', 'Patika.dev'],
  ['Get Started with Redis', 'Redis University'],
  ['Prompting Essentials', 'Google'],
] as const

export const LINKS = [
  ['GitHub', 'https://github.com/BeratDgan'],
  ['LinkedIn', 'https://www.linkedin.com/in/beratdgan/'],
] as const
