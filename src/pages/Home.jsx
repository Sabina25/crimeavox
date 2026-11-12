import { Link } from 'react-router-dom'
import { isUpcoming } from '../data'
import { useContent } from '../content'
import { Status } from '../components/Status'
import { NewsCard, EventRow, Columns } from '../components/Cards'
import { Subscribe } from '../components/Layout'
import { videos } from '../youtube'
import { VideoCard, Player, usePlayer } from '../components/Video'
import '../video.css'

// Скільки днів триває окупація Криму (з 20 лютого 2014 — дата, визначена законом України)
const OCCUPATION_START = new Date(2014, 1, 20)
const daysWord = (n) => {
  const a = n % 10, b = n % 100
  if (a === 1 && b !== 11) return 'день'
  if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return 'дні'
  return 'днів'
}
function OccupationDays() {
  const days = Math.floor((Date.now() - OCCUPATION_START) / 86400000)
  return (
    <p className="occupation">
      <span className="occupation-label">Крим в окупації</span>
      <span className="occupation-num">{days.toLocaleString('uk-UA')} <small>{daysWord(days)}</small></span>
    </p>
  )
}

export default function Home() {
  const { news, events, blogs, status } = useContent()
  const latest = news.slice(0, 5)
  const upcoming = events.filter(e => isUpcoming(e.date)).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3)
  const posts = blogs.slice(0, 6)
  const player = usePlayer()

  return (
    <>
      <section className="hero">
        <div className="wrap hero-in">
          <h1><span className="bubble">Голос Криму,</span><span className="bubble red">який не затихає</span></h1>
          <div className="hero-foot">
            <p>Незалежне медіа про кримських татар, окупацію і спротив. Новини з півострова, історія, яку намагаються стерти, і культура, яка живе попри все.</p>
            <div className="cta">
              <Link className="btn" to="/news">Читати новини</Link>
              <Link className="btn ghost" to="/about#support">Підтримати редакцію</Link>
            </div>
          </div>
        </div>
        <div className="wrap hero-bottom">
          <OccupationDays />
          <button className="scroll-cue" onClick={() => document.getElementById('home-news')?.scrollIntoView({ behavior: 'smooth' })}>
            Гортайте до новин <span aria-hidden="true">↓</span>
          </button>
        </div>
      </section>

      <section id="home-news">
        <div className="wrap">
          <div className="sec-head">
            <h2>Новини</h2>
            <Link className="see-all" to="/news">Усі новини</Link>
          </div>
          <Status status={status} empty={!latest.length} text="Новин поки немає." />
          {latest.length > 0 && <div className="feed">
            {latest.map((n, i) => (
              <NewsCard key={n.slug} item={n} size={i === 0 ? 'lead' : i === 1 ? '' : 'third'} />
            ))}
          </div>}
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <h2>Події</h2>
            <Link className="see-all" to="/events">Усі події</Link>
          </div>
          {upcoming.length
            ? <div className="ev-list home-ev">{upcoming.map(e => <EventRow key={e.slug} item={e} />)}</div>
            : <Status status={status} empty text="Нових подій поки немає. Стежте за анонсами в Instagram." />}
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <h2>Блоги</h2>
            <Link className="see-all" to="/blog">Усі колонки</Link>
          </div>
          {posts.length > 0
            ? <Columns items={posts} />
            : <Status status={status} empty text="Колонок поки немає." />}
        </div>
      </section>

      {videos.length > 0 && (
        <section className="band">
          <div className="wrap">
            <div className="sec-head">
              <h2>Відео</h2>
              <Link className="see-all" to="/video">Усі відео</Link>
            </div>
            {/* на головній — лише звичайні відео; Shorts — на сторінці «Відео» */}
            <div className="vgrid">{videos.slice(0, 3).map(v => <VideoCard key={v.id} v={v} onPlay={player.play} />)}</div>
          </div>
          <Player video={player.video} onClose={player.close} />
        </section>
      )}

      <section className="prisoners">
        <div className="wrap">
          <h2>Їх переслідують за те, що вони є</h2>
          <p className="lead-txt">Більшість кримських політв'язнів — кримські татари. Ми розповідаємо їхні історії, щоб світ знав їхні імена.</p>
          {/* Оновлюйте цифру за даними правозахисних організацій */}
          <div className="counter">200+</div>
          <p className="counter-note">кримчан перебувають у російських в'язницях з політичних мотивів.</p>
          <div className="cta">
            <Link className="btn" to="/news?r=rights">Історії політв'язнів</Link>
          </div>
        </div>
      </section>

      <Subscribe />
    </>
  )
}
