import { createContext, useContext, useEffect, useState } from 'react'
import { cmsEnabled, fetchContent } from './cms'
import { staticContent, demoContent } from './data'

const byDateDesc = (a, b) => String(b.date || '').localeCompare(String(a.date || ''))
const count = (c) => c.news.length + c.events.length + c.blogs.length

function merge(cms) {
  const base = {
    news: [...(cms?.news || []), ...staticContent.news],
    events: [...(cms?.events || []), ...staticContent.events],
    blogs: [...(cms?.blogs || []), ...staticContent.blogs],
  }
  // Коли адмінку підключено, демо не показуємо ніколи — краще порожньо, ніж вигадані новини
  const src = count(base) || cmsEnabled ? base : demoContent
  return {
    news: [...src.news].sort(byDateDesc),
    events: [...src.events].sort(byDateDesc),
    blogs: [...src.blogs].sort(byDateDesc),
  }
}

// Останні завантажені дані зберігаємо в браузері, щоб при повторному візиті сайт відкривався миттєво
const CACHE_KEY = 'cv-content-v2' // нова версія — старі збережені копії в браузерах ігноруються
function readCache() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY)) } catch { return null }
}
function writeCache(data) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)) } catch {}
}

const Ctx = createContext(null)

export function ContentProvider({ children }) {
  const [state, setState] = useState(() => {
    if (!cmsEnabled) return { ...merge(null), status: 'ready' }
    const cached = readCache()
    return cached ? { ...merge(cached), status: 'ready' } : { ...merge({ news: [], events: [], blogs: [] }), status: 'loading', empty: true }
  })

  useEffect(() => {
    if (!cmsEnabled) return
    let alive = true
    let last = 0
    const load = () => {
      last = Date.now()
      fetchContent()
        .then((data) => {
          if (!alive) return
          writeCache(data)
          setState({ ...merge(data), status: 'ready' })
        })
        .catch((e) => {
          console.error('Не вдалося завантажити матеріали з Sanity. Якщо сайт запущено локально — перевірте CORS origins.', e)
          if (alive) setState((s) => ({ ...s, status: s.empty ? 'error' : 'ready', empty: false }))
        })
    }
    load()
    // Повернулись на вкладку (наприклад, з адмінки) — підтягуємо свіжі дані, не частіше ніж раз на 20 секунд
    const onVisible = () => { if (document.visibilityState === 'visible' && Date.now() - last > 20000) load() }
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('focus', onVisible)
    return () => {
      alive = false
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('focus', onVisible)
    }
  }, [])

  return <Ctx.Provider value={state}>{children}</Ctx.Provider>
}

// { news, events, blogs, status: 'loading' | 'ready' | 'error' }
export const useContent = () => useContext(Ctx)
