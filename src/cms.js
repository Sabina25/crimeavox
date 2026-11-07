import { SANITY } from './cms.config'

const API_VERSION = 'v2025-02-19'
export const cmsEnabled = Boolean(SANITY.projectId)

// Один запит забирає все: нові матеріали зверху, до 300 кожного типу
const body = `body[]{..., _type == "image" => {"url": asset->url, alt, caption}}`
const common = `"slug": slug.current, title, date, lead, "img": image.asset->url, "alt": image.alt, ${body}`
const QUERY = `{
  "news": *[_type == "news" && defined(slug.current)] | order(date desc, _createdAt desc)[0...300]{ ${common}, accent, rubric },
  "events": *[_type == "event" && defined(slug.current)] | order(date desc)[0...300]{ ${common}, type, time, city, place, link },
  "blogs": *[_type == "blog" && defined(slug.current)] | order(date desc, _createdAt desc)[0...300]{ ${common}, author, role }
}`

const TONES = ['a', 'b', 'c', 'd', 'e', 'f']
const tone = (s) => TONES[[...s].reduce((n, c) => n + c.charCodeAt(0), 0) % TONES.length]

// Текст з адмінки (Portable Text) → кількість слів, щоб порахувати час читання
export function blocksText(blocks = []) {
  return blocks
    .filter((b) => b._type === 'block')
    .map((b) => (b.children || []).map((c) => c.text).join(''))
    .join(' ')
}

// Фото з Sanity CDN у потрібному розмірі
export const sized = (url, w) => (url ? `${url}?w=${w}&auto=format&fit=max&q=80` : undefined)

function normalize(item, extra = {}) {
  return {
    ...item,
    lead: item.lead || '',
    body: item.body || [],
    img: sized(item.img, 1600),
    tone: tone(item.slug),
    ...extra,
  }
}

export async function fetchContent() {
  const url = `https://${SANITY.projectId}.apicdn.sanity.io/${API_VERSION}/data/query/${SANITY.dataset}?query=${encodeURIComponent(QUERY)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Sanity: ${res.status}`)
  const { result } = await res.json()
  return {
    news: result.news.map((n) => normalize(n, { rubric: n.rubric || 'news' })),
    events: result.events.map((e) => normalize(e, { type: e.type || 'Подія', city: e.city || '', place: e.place || 'Місце уточнюється', time: e.time || '', link: e.link || '' })),
    blogs: result.blogs.map((b) => {
      const words = blocksText(b.body).split(/\s+/).filter(Boolean).length
      return normalize(b, { author: b.author || 'CrimeaVox', role: b.role || 'редакція', read: Math.max(1, Math.round(words / 200)) })
    }),
  }
}
