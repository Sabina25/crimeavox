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

// Кругле фото автора; якщо фото немає — ініціали на червоному
export function Avatar({ item, className = '' }) {
  const initials = item.author.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
  return (
    <span className={`avatar ${className}`} aria-hidden="true">
      {item.authorPhoto ? <img src={item.authorPhoto} alt="" loading="lazy" /> : initials}
    </span>
  )
}

// Колонка: акцент на авторі (фото, ім'я, посада), під ним заголовок.
// variant: 'feature' — велика головна, 'side' — поруч з головною, без variant — у сітці
export function BlogCard({ item, variant }) {
  const who = (
    <span className="col-who">
      <span className="col-name">{item.author}</span>
      {item.role && <span className="col-role">{item.role}</span>}
    </span>
  )
  if (variant === 'feature') {
    return (
      <Link className="col feature" to={`/blog/${item.slug}`}>
        <Avatar item={item} />
        <span className="col-body">
          {who}
          <h3>{item.title}</h3>
          <time dateTime={item.date}>{fmtDate(item.date)}, {item.read} хв читання</time>
        </span>
      </Link>
    )
  }
  return (
    <Link className={`col ${variant || ''}`} to={`/blog/${item.slug}`}>
      <span className="col-head"><Avatar item={item} />{who}</span>
      <h3>{item.title}</h3>
      <time dateTime={item.date}>{fmtDate(item.date)}</time>
    </Link>
  )
}

// Блок колонок: головна + бічна зверху, решта — сіткою по 4
export function Columns({ items }) {
  const [first, second, ...rest] = items
  return (
    <div className="columns">
      <div className={`cols-top ${second ? '' : 'single'}`}>
        {first && <BlogCard item={first} variant="feature" />}
        {second && <BlogCard item={second} variant="side" />}
      </div>
      {rest.length > 0 && <div className="cols-grid">{rest.map((b) => <BlogCard key={b.slug} item={b} />)}</div>}
    </div>
  )
}
