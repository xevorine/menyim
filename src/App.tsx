import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'

// Route-level code splitting
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })))
const MemoriesPage = lazy(() => import('./pages/MemoriesPage').then(m => ({ default: m.MemoriesPage })))

function LoadingFallback() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-cream)',
        fontFamily: 'var(--font-serif)',
        fontSize: '1.2rem',
        color: 'var(--color-dusty-pink)',
        fontStyle: 'italic',
      }}
    >
      🌸
    </div>
  )
}

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<LoadingFallback/>}>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/memories" element={<MemoriesPage/>}/>
          {/* Catch-all — redirect to home */}
          <Route path="*" element={<HomePage/>}/>
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
