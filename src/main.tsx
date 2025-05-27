import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { App } from './App.tsx'

if ('serviceWorker' in navigator) {
  if (import.meta.env.VITE_MODE === "PROD") {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('[SW] Registered', reg))
        .catch(err => console.error('[SW] Registration failed', err))
    })
  } else {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const reg of registrations) {
        reg.unregister().then(() => {
          console.log('[DEV] Service worker désinscrit')
        })
      }
    })
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
