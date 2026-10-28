import { Link, useParams } from 'react-router-dom'
import { news, events, blogs, NEWS_RUBRICS, fmtDate, isUpcoming } from '../data'
import { Media, Headline, NewsCard, BlogCard } from '../components/Cards'

function Body({ paragraphs }) {
  return <div className="prose">{paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
}

export function NotFound() {
  return (
    <section className="page-head">
      <div className="wrap">
        <h1>Сторінку не знайдено</h1>
        <p>Можливо, матеріал перенесли або посилання застаріло.</p>
        <Link className="btn" to="/">На головну</Link>
      </div>
    </section>
  )
}

export function NewsArticle() {
  const { slug } = useParams()
  const item = news.find(n => n.slug === slug)
  if (!item) return <NotFound />
  const more = news.filter(n => n.slug !== slug).slice(0, 3)

  return (
    <article>
      <header className="art-head">
        <Media item={item} />
        <div className="wrap">
          <Link className="crumb" to={`/news?r=${item.rubric}`}>{NEWS_RUBRICS[item.rubric]}</Link>
          <h1><Headline item={item} /></h1>
          <p className="art-lead">{item.lead}</p>
          <time dateTime={item.date}>{fmtDate(item.date)}</time>
        </div>
      </header>
      <div className="wrap"><Body paragraphs={item.body} /></div>
      <section className="tight">
        <div className="wrap">
          <h2 className="sub-h">Читайте також</h2>
          <div className="feed">{more.map(n => <NewsCard key={n.slug} item={n} />)}</div>
        </div>
      </section>
    </article>
  )
}

export function EventDetail() {
  const { slug } = useParams()
  const item = events.find(e => e.slug === slug)
  if (!item) return <NotFound />
  const upcoming = isUpcoming(item.date)

  return (
    <article>
      <header className="art-head">
        <Media item={item} />
        <div className="wrap">
          <Link className="crumb" to="/events">{item.type}</Link>
          <h1>{item.title}</h1>
          <p className="art-lead">{item.lead}</p>
        </div>
      </header>
      <div className="wrap ev-detail">
        <dl className="facts">
          <div><dt>Дата</dt><dd>{fmtDate(item.date)}, {item.time}</dd></div>
          <div><dt>Місто</dt><dd>{item.city}</dd></div>
          <div><dt>Місце</dt><dd>{item.place}</dd></div>
          {upcoming
            ? <a className="btn" href={item.link} target="_blank" rel="noreferrer">Зареєструватися</a>
            : <span className="past-note">Подія вже відбулася</span>}
        </dl>
        <Body paragraphs={item.body} />
      </div>
    </article>
  )
}

export function BlogPost() {
  const { slug } = useParams()
  const item = blogs.find(b => b.slug === slug)
  if (!item) return <NotFound />
  const more = blogs.filter(b => b.slug !== slug).slice(0, 3)

  return (
    <article>
      <header className="blog-head">
        <div className="wrap">
          <Link className="crumb" to="/blog">Блоги</Link>
          <h1>{item.title}</h1>
          <p className="art-lead">{item.lead}</p>
          <div className="post-by big">
            <span className="ava" aria-hidden="true">{item.author.trim()[0]}</span>
            <span><b>{item.author}</b>, {item.role}<br />{fmtDate(item.date)}, {item.read} хв читання</span>
          </div>
        </div>
      </header>
      <div className="wrap"><Body paragraphs={item.body} /></div>
      {more.length > 0 && (
        <section className="tight">
          <div className="wrap">
            <h2 className="sub-h">Інші колонки</h2>
            <div className="posts">{more.map(b => <BlogCard key={b.slug} item={b} />)}</div>
          </div>
        </section>
      )}
    </article>
  )
}
