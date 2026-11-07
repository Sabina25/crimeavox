import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { NEWS_RUBRICS, isUpcoming } from '../data'
import { useContent } from '../content'
import { Status } from '../components/Status'
import { NewsCard, EventRow, BlogCard } from '../components/Cards'

const PAGE = 12

// Показує список частинами по PAGE штук з кнопкою «Показати ще»
function useMore(list, resetKey) {
  const [state, setState] = useState({ key: resetKey, n: PAGE })
  const n = state.key === resetKey ? state.n : PAGE
  return [list.slice(0, n), n < list.length, () => setState({ key: resetKey, n: n + PAGE })]
}

function More({ onClick }) {
  return <div className="more"><button className="btn ghost" onClick={onClick}>Показати ще</button></div>
}

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
  const { news, status } = useContent()
  const [params, setParams] = useSearchParams()
  const r = params.get('r') || 'all'
  const list = r === 'all' ? news : news.filter(n => n.rubric === r)
  const tabs = [['all', 'Усе'], ...Object.entries(NEWS_RUBRICS)]
  const [shown, hasMore, more] = useMore(list, r)

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
            ? <div className="feed">{shown.map((n, i) => <NewsCard key={n.slug} item={n} size={i === 0 ? 'lead' : ''} />)}</div>
            : <Status status={status} empty text="У цій рубриці ще немає матеріалів." />}
          {hasMore && <More onClick={more} />}
        </div>
      </section>
    </>
  )
}

export function EventsPage() {
  const { events, status } = useContent()
  const upcoming = events.filter(e => isUpcoming(e.date)).sort((a, b) => a.date.localeCompare(b.date))
  const past = events.filter(e => !isUpcoming(e.date)).sort((a, b) => b.date.localeCompare(a.date))
  const [pastShown, hasMore, more] = useMore(past, 'past')

  return (
    <>
      <PageHead title="Події" text="Вистави, покази, зустрічі та акції про Крим і з кримчанами." />
      <section className="tight">
        <div className="wrap">
          <h2 className="sub-h">Найближчі</h2>
          {upcoming.length
            ? <div className="ev-list">{upcoming.map(e => <EventRow key={e.slug} item={e} />)}</div>
            : <Status status={status} empty text="Нових подій поки немає. Стежте за анонсами в Instagram." />}

          {past.length > 0 && <>
            <h2 className="sub-h past-h">Минулі</h2>
            <div className="ev-list">{pastShown.map(e => <EventRow key={e.slug} item={e} past />)}</div>
            {hasMore && <More onClick={more} />}
          </>}
        </div>
      </section>
    </>
  )
}

export function BlogPage() {
  const { blogs, status } = useContent()
  const [shown, hasMore, more] = useMore(blogs, 'blogs')
  return (
    <>
      <PageHead title="Блоги" text="Авторські колонки: кримчани, історики, митці та люди з окупованого півострова." />
      <section className="tight">
        <div className="wrap">
          {shown.length > 0
            ? <div className="posts">{shown.map(b => <BlogCard key={b.slug} item={b} />)}</div>
            : <Status status={status} empty text="Колонок поки немає." />}
          {hasMore && <More onClick={more} />}
        </div>
      </section>
    </>
  )
}
