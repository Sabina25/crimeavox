import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

const NAV = [
  { to: '/news', label: 'Новини' },
  { to: '/events', label: 'Події' },
  { to: '/blog', label: 'Блоги' },
  { to: '/about', label: 'Про нас' },
]

export function Mark({ size = 46 }) {
  return (
    <span className="mark" style={{ width: size, height: size }} aria-hidden="true">
      <span><b>CRI</b><b>MEA</b><b>VOX</b></span>
    </span>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="site-head">
      <div className="wrap bar">
        <Link className="logo" to="/" aria-label="CrimeaVox, на головну">
          <Mark />
          <span>CrimeaVox</span>
        </Link>
        <nav id="nav" className={open ? 'open' : ''} aria-label="Головне меню">
          <ul>
            {NAV.map(n => (
              <li key={n.to}><NavLink to={n.to}>{n.label}</NavLink></li>
            ))}
          </ul>
        </nav>
        <Link className="btn head-cta" to="/about#support">Підтримати</Link>
        <button
          className="menu-btn"
          aria-controls="nav"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          {open ? 'Закрити' : 'Меню'}
        </button>
      </div>
    </header>
  )
}

export function Subscribe() {
  const [done, setDone] = useState(false)
  return (
    <section className="sub" id="support">
      <div className="wrap sub-in">
        <div>
          <h2>Головне про Крим раз на тиждень</h2>
          <p>Короткий лист щонеділі: що сталося на півострові, кого переслідують і що варто прочитати.</p>
        </div>
        <div>
          {/* Підключіть форму до сервісу розсилок (Mailchimp, SendPulse, Substack тощо) */}
          <form onSubmit={e => { e.preventDefault(); setDone(true); e.target.reset() }}>
            <label htmlFor="email" className="sr-only">Email</label>
            <input id="email" type="email" required placeholder="Ваш email" autoComplete="email" />
            <button type="submit">Підписатися</button>
          </form>
          <div className="ok" role="status">{done && 'Готово. Перший лист прийде в неділю.'}</div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="f-top">
          <div>
            <div className="f-mark"><b>CRI</b><b>MEA</b>VOX</div>
            <p>Голос Криму, який не затихає.</p>
          </div>
          <div>
            <h4>Розділи</h4>
            <ul>
              {NAV.map(n => <li key={n.to}><Link to={n.to}>{n.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4>Соцмережі</h4>
            <ul>
              <li><a href="https://www.instagram.com/crimea_vox/" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://www.threads.net/@crimea_vox" target="_blank" rel="noreferrer">Threads</a></li>
              <li><a href="#">Telegram</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </div>
          <div>
            <h4>Редакція</h4>
            <ul>
              <li><Link to="/about">Про нас</Link></li>
              <li><a href="#">Надіслати новину</a></li>
              <li><Link to="/about#support">Підтримати</Link></li>
              <li><a href="#">Контакти</a></li>
            </ul>
          </div>
        </div>
        <div className="f-bot">
          <span>© {new Date().getFullYear()} CrimeaVox</span>
          <span>Крим — це Україна</span>
        </div>
      </div>
    </footer>
  )
}

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) { el.scrollIntoView(); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <Header />
      <main><Outlet /></main>
      <Footer />
    </>
  )
}
