import { Link, useParams } from 'react-router-dom'
import '../live.css'
import { NEWS_RUBRICS, fmtDate, isUpcoming } from '../data'
import { useContent } from '../content'
import { Status } from '../components/Status'
import RichText from '../components/RichText'
import { Media, Headline, NewsCard, BlogCard, Avatar } from '../components/Cards'

function Body({ paragraphs = [], item }) {
  return (
    <div className="prose">
      <RichText value={paragraphs} />
      {item?.permalink && (
        <a className="ig-link" href={item.permalink} target="_blank" rel="noreferrer">
          {item.video ? 'Дивитися відео в Instagram' : 'Оригінал в Instagram'}
        </a>
      )}
    </div>
  )
}

function Pending() {
  return <section className="page-head"><div className="wrap"><Status status="loading" empty /></div></section>
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
  const { news, status } = useContent()
  const item = news.find(n => n.slug === slug)
  if (!item) return status === 'loading' ? <Pending /> : <NotFound />
  const more = news.filter(n => n.slug !== slug).slice(0, 3)

  return (
    <article>
      <header className="art-head">
        <Media item={item} />
        <div className="wrap">
          <Link className="crumb" to={`/news?r=${item.rubric}`}>{NEWS_RUBRICS[item.rubric]}</Link>
          <h1><Headline item={item} /></h1>
          {item.lead && <p className="art-lead">{item.lead}</p>}
          <time dateTime={item.date}>{fmtDate(item.date)}</time>
        </div>
      </header>
      <div className="wrap"><Body paragraphs={item.body} item={item} /></div>
      {more.length > 0 && (
        <section className="tight">
          <div className="wrap">
            <h2 className="sub-h">Читайте також</h2>
            <div className="feed related">{more.map(n => <NewsCard key={n.slug} item={n} />)}</div>
          </div>
        </section>
      )}
    </article>
  )
}

export function EventDetail() {
  const { slug } = useParams()
  const { events, status } = useContent()
  const item = events.find(e => e.slug === slug)
  if (!item) return status === 'loading' ? <Pending /> : <NotFound />
  const upcoming = isUpcoming(item.date)

  return (
    <article>
      <header className="art-head">
        <Media item={item} />
        <div className="wrap">
          <Link className="crumb" to="/events">{item.type}</Link>
          <h1>{item.title}</h1>
          {item.lead && <p className="art-lead">{item.lead}</p>}
        </div>
      </header>
      <div className="wrap ev-detail">
        <dl className="facts">
          <div><dt>Дата</dt><dd>{fmtDate(item.date)}{item.time && `, ${item.time}`}</dd></div>
          {item.city && <div><dt>Місто</dt><dd>{item.city}</dd></div>}
          <div><dt>Місце</dt><dd>{item.place}</dd></div>
          {upcoming
            ? <a className="btn" href={item.link} target="_blank" rel="noreferrer">Зареєструватися</a>
            : <span className="past-note">Подія вже відбулася</span>}
        </dl>
        <Body paragraphs={item.body} item={item} />
      </div>
    </article>
  )
}

export function BlogPost() {
  const { slug } = useParams()
  const { blogs, status } = useContent()
  const item = blogs.find(b => b.slug === slug)
  if (!item) return status === 'loading' ? <Pending /> : <NotFound />
  const more = blogs.filter(b => b.slug !== slug).slice(0, 4)

  return (
    <article>
      <header className="blog-head">
        <div className="wrap">
          <Link className="crumb" to="/blog">Блоги</Link>
          <h1>{item.title}</h1>
          {item.lead && <p className="art-lead">{item.lead}</p>}
          <div className="post-by big">
            <Avatar item={item} className="big" />
            <span><b>{item.author}</b>, {item.role}<br />{fmtDate(item.date)}, {item.read} хв читання</span>
          </div>
        </div>
      </header>
      <div className="wrap"><Body paragraphs={item.body} item={item} /></div>
      {more.length > 0 && (
        <section className="tight">
          <div className="wrap">
            <h2 className="sub-h">Інші колонки</h2>
            <div className="cols-grid">{more.map(b => <BlogCard key={b.slug} item={b} />)}</div>
          </div>
        </section>
      )}
    </article>
  )
}
