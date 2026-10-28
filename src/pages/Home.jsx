import { Link } from 'react-router-dom'
import { news, events, blogs, isUpcoming } from '../data'
import { NewsCard, EventRow, BlogCard } from '../components/Cards'
import { Subscribe } from '../components/Layout'

export default function Home() {
  const latest = news.slice(0, 5)
  const upcoming = events.filter(e => isUpcoming(e.date)).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3)
  const posts = blogs.slice(0, 3)

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Голос Криму, <span className="plate">який не затихає</span></h1>
          <div className="hero-foot">
            <p>Незалежне медіа про кримських татар, окупацію і спротив. Новини з півострова, історія, яку намагаються стерти, і культура, яка живе попри все.</p>
            <div className="cta">
              <Link className="btn" to="/news">Читати новини</Link>
              <Link className="btn ghost" to="/about#support">Підтримати редакцію</Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <h2>Новини</h2>
            <Link className="see-all" to="/news">Усі новини</Link>
          </div>
          <div className="feed">
            {latest.map((n, i) => (
              <NewsCard key={n.slug} item={n} size={i === 0 ? 'lead' : i === 1 ? '' : 'third'} />
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <h2>Події</h2>
            <Link className="see-all" to="/events">Усі події</Link>
          </div>
          {upcoming.length
            ? <div className="ev-list">{upcoming.map(e => <EventRow key={e.slug} item={e} />)}</div>
            : <p className="empty">Нових подій поки немає. Стежте за анонсами в Instagram.</p>}
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sec-head">
            <h2>Блоги</h2>
            <Link className="see-all" to="/blog">Усі колонки</Link>
          </div>
          <div className="posts">{posts.map(b => <BlogCard key={b.slug} item={b} />)}</div>
        </div>
      </section>

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
