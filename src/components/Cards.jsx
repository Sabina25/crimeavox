import { Link } from 'react-router-dom'
import { NEWS_RUBRICS, fmtDate, fmtDay } from '../data'

// Фото, а якщо його немає — кольорова заглушка
export function Media({ item, className = '' }) {
  return item.img
    ? <img className={`ph ${className}`} src={item.img} alt="" loading="lazy" />
    : <div className={`ph tone-${item.tone || 'a'} ${className}`} />
}

export function Headline({ item }) {
  return (
    <>
      {item.title}{item.accent && <> <span className="plate">{item.accent}</span></>}
    </>
  )
}

export function NewsCard({ item, size }) {
  return (
    <Link className={`card ${size || ''}`} to={`/news/${item.slug}`}>
      <Media item={item} />
      <div className="rub">{NEWS_RUBRICS[item.rubric]}</div>
      <h3><Headline item={item} /></h3>
      {item.lead && <p>{item.lead}</p>}
      <time dateTime={item.date}>{fmtDate(item.date)}</time>
    </Link>
  )
}

export function EventRow({ item, past }) {
  const { day, month } = fmtDay(item.date)
  return (
    <Link className={`ev ${past ? 'past' : ''}`} to={`/events/${item.slug}`}>
      <div className="ev-date">
        <strong>{day}</strong>
        <span>{month}</span>
      </div>
      <div className="ev-main">
        <span className="tag">{item.type}</span>
        <h3>{item.title}</h3>
        <p>{item.lead}</p>
      </div>
      <div className="ev-meta">
        <span>{item.city}</span>
        <span>{item.place}</span>
        <span>{item.time}</span>
      </div>
    </Link>
  )
}

export function BlogCard({ item }) {
  return (
    <Link className="post" to={`/blog/${item.slug}`}>
      <div className="post-img"><Media item={item} /></div>
      <div className="post-by">
        <span className="ava" aria-hidden="true">{item.author.trim()[0]}</span>
        <span><b>{item.author}</b>, {item.role}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.lead}</p>
      <span className="post-meta">{fmtDate(item.date)}, {item.read} хв читання</span>
    </Link>
  )
}
