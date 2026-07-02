import { LangProvider } from './i18n'
import SmoothCursor from './components/SmoothCursor'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Stack from './components/Stack'
import Projects from './components/Projects'
import Path from './components/Path'
import Contact from './components/Contact'

export default function App() {
  return (
    <LangProvider>
      <SmoothCursor />
      <main id="top">
        <Hero />
        <About />
        <Experience />
        <Stack />
        <Projects />
        <Path />
        <Contact />
      </main>
    </LangProvider>
  )
}
