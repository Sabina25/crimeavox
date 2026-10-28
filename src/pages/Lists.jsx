import { useSearchParams } from 'react-router-dom'
import { news, events, blogs, NEWS_RUBRICS, isUpcoming } from '../data'
import { NewsCard, EventRow, BlogCard } from '../components/Cards'

function PageHead({ title, text }) {
  return (
    <section className="page-head">
      <div className="wrap">
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  )
}

export function NewsPage() {
  const [params, setParams] = useSearchParams()
  const r = params.get('r') || 'all'
  const list = r === 'all' ? news : news.filter(n => n.rubric === r)
  const tabs = [['all', 'Усе'], ...Object.entries(NEWS_RUBRICS)]

  return (
    <>
      <PageHead title="Новини" text="Що відбувається в Криму і навколо нього." />
      <section className="tight">
        <div className="wrap">
          <div className="filters" role="group" aria-label="Фільтр за рубрикою">
            {tabs.map(([k, label]) => (
              <button
                key={k}
                aria-pressed={r === k}
                onClick={() => setParams(k === 'all' ? {} : { r: k }, { replace: true })}
              >{label}</button>
            ))}
          </div>
          {list.length
            ? <div className="feed">{list.map((n, i) => <NewsCard key={n.slug} item={n} size={i === 0 ? 'lead' : ''} />)}</div>
            : <p className="empty">У цій рубриці ще немає матеріалів.</p>}
        </div>
      </section>
    </>
  )
}

export function EventsPage() {
  const upcoming = events.filter(e => isUpcoming(e.date)).sort((a, b) => a.date.localeCompare(b.date))
  const past = events.filter(e => !isUpcoming(e.date)).sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      <PageHead title="Події" text="Вистави, покази, зустрічі та акції про Крим і з кримчанами." />
      <section className="tight">
        <div className="wrap">
          <h2 className="sub-h">Найближчі</h2>
          {upcoming.length
            ? <div className="ev-list">{upcoming.map(e => <EventRow key={e.slug} item={e} />)}</div>
            : <p className="empty">Нових подій поки немає. Стежте за анонсами в Instagram.</p>}

          {past.length > 0 && <>
            <h2 className="sub-h past-h">Минулі</h2>
            <div className="ev-list">{past.map(e => <EventRow key={e.slug} item={e} past />)}</div>
          </>}
        </div>
      </section>
    </>
  )
}

export function BlogPage() {
  return (
    <>
      <PageHead title="Блоги" text="Авторські колонки: кримчани, історики, митці та люди з окупованого півострова." />
      <section className="tight">
        <div className="wrap">
          <div className="posts">{blogs.map(b => <BlogCard key={b.slug} item={b} />)}</div>
        </div>
      </section>
    </>
  )
}
