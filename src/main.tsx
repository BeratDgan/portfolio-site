import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource/roboto/700.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import './index.css'
import App from './App.tsx'

const lang = window.location.pathname === '/tr' || window.location.pathname.startsWith('/tr/') ? 'tr' : 'en'
document.documentElement.lang = lang
document.documentElement.classList.add('has-js')
const root = document.getElementById('root')!
const app = <StrictMode><App lang={lang} /></StrictMode>

// Production has build-time HTML; the Vite development server starts empty.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
