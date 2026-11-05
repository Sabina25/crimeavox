// Забирає пости з Instagram і перетворює їх на новини, події та блоги для сайту.
//
// Запуск:
//   IG_TOKEN=... node scripts/fetch-instagram.mjs          — справжні дані
//   IG_MOCK=scripts/mock-posts.json node scripts/fetch-instagram.mjs  — тестові дані без токена
//
// Результат: src/content/instagram.json + фото в public/ig/
//
// Як редакція керує рубриками — хештеги в підписі до поста:
//   #новини (за замовчуванням)   #подія / #анонс   #блог / #колонка   #несайт — не публікувати
//   Рубрики новин: #історія  #культура  #праволюдини / #політвʼязні

import { mkdir, writeFile, access } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_JSON = join(ROOT, 'src/content/instagram.json')
const IMG_DIR = join(ROOT, 'public/ig')
const API = 'https://graph.instagram.com'
const MAX_POSTS = Number(process.env.MAX_POSTS || 300)
const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url,thumbnail_url}'

// Пости без жодного хештегу-розділу потрапляють сюди. Поставте null, щоб їх пропускати.
const DEFAULT_SECTION = 'news'

const TAGS = {
  section: {
    news: ['новини', 'новина', 'news'],
    events: ['подія', 'події', 'анонс', 'event', 'events'],
    blogs: ['блог', 'колонка', 'думка', 'blog'],
  },
  skip: ['несайт', 'nosite'],
  rubric: {
    history: ['історія', 'history', 'експлейнер'],
    culture: ['культура', 'culture', 'мистецтво'],
    rights: ['праволюдини', 'політвʼязні', "політв'язні", 'політвязні', 'репресії', 'humanrights'],
  },
}

const MONTHS = ['січ', 'лют', 'бер', 'квіт', 'трав', 'черв', 'лип', 'серп', 'вер', 'жовт', 'лист', 'груд']
const TONES = ['a', 'b', 'c', 'd', 'e', 'f']

// ---------- Instagram API ----------

async function api(url) {
  const res = await fetch(url)
  const body = await res.json().catch(() => ({}))
  if (!res.ok || body.error) {
    const msg = body.error?.message || res.statusText
    throw new Error(`Instagram API: ${msg}`)
  }
  return body
}

async function fetchPosts(token) {
  const posts = []
  let url = `${API}/me/media?fields=${encodeURIComponent(FIELDS)}&limit=50&access_token=${token}`
  while (url && posts.length < MAX_POSTS) {
    const page = await api(url)
    posts.push(...(page.data || []))
    url = page.paging?.next
  }
  return posts.slice(0, MAX_POSTS)
}

// Продовжує життя токена ще на 60 днів. Instagram дозволяє це, якщо токену більше доби.
async function refreshToken(token) {
  const r = await api(`${API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`)
  const days = Math.round((r.expires_in || 0) / 86400)
  console.log(`Токен оновлено, дійсний ще ${days} днів`)
  return r.access_token
}

// ---------- Розбір підпису ----------

export function hashtags(text) {
  return [...text.matchAll(/#([\p{L}\p{N}_'ʼ’]+)/gu)].map(m => m[1].toLowerCase().replace(/[’']/g, 'ʼ'))
}

const norm = t => t.toLowerCase().replace(/[’']/g, 'ʼ')
const has = (tags, list) => list.some(x => tags.includes(norm(x)))

function stripTags(line) {
  return line.replace(/#[\p{L}\p{N}_'ʼ’]+/gu, '').replace(/\s{2,}/g, ' ').trim()
}

function stripLeadingSymbols(s) {
  return s.replace(/^[^\p{L}\p{N}«"„(]+/u, '').trim()
}

function clip(s, max) {
  if (s.length <= max) return s
  const cut = s.slice(0, max)
  const dot = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '))
  if (dot > max * 0.6) return cut.slice(0, dot + 1)
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,:;—–-]$/, '') + '…'
}

function paragraphs(caption) {
  const text = caption.replace(/\r/g, '')
  const blocks = /\n\s*\n/.test(text) ? text.split(/\n\s*\n/) : text.split('\n')
  return blocks
    .map(b => b.split('\n').map(stripTags).filter(Boolean).join(' ').trim())
    // відкидаємо рядки, що складалися лише з хештегів, і порожні
    .filter(b => b && /[\p{L}\p{N}]/u.test(b))
}

// Емодзі-мітка або слово з двокрапкою на початку рядка: «📍 Київ», «Місце: Київ»
const FIELD_RE = {
  date: /^(?:(?:📅|🗓️?|⏰)\s*|(?:дата|коли|date)\s*:\s*)/iu,
  place: /^(?:📍\s*|(?:місце|де|адреса|place)\s*:\s*)/iu,
  author: /^(?:✍️?\s*|(?:автор|авторка|author)\s*:\s*)/iu,
  link: /^(?:🔗\s*|(?:реєстрація|квитки|link)\s*:\s*)/iu,
}

// Службові фрази, які в Instagram мають сенс, а на сайті — ні
const NOISE_RE = /^(гортайте|листайте|свайп|дивіться відео|деталі в|більше в|посилання в)/iu

// Витягує службові рядки (Дата:, Місце:, Автор:) з підпису і повертає решту тексту абзацами
function extractFields(caption) {
  const fields = {}
  const kept = []
  for (const raw of caption.replace(/\r/g, '').split('\n')) {
    const line = stripTags(raw)
    const hit = Object.entries(FIELD_RE).find(([key, re]) => !fields[key] && re.test(line))
    if (hit) fields[hit[0]] = line.replace(hit[1], '').trim()
    else kept.push(raw)
  }
  const rest = paragraphs(kept.join('\n')).filter(p => !NOISE_RE.test(stripLeadingSymbols(p)))
  return { fields, rest }
}

// Якщо підпис — один довгий абзац, заголовком стає перше речення
function splitTitle(rest) {
  const first = stripLeadingSymbols(rest[0])
  if (rest.length > 1 || first.length <= 90) return [first, ...rest.slice(1)]
  const m = first.match(/^(.{20,140}?[.!?])\s+(.+)$/u)
  return m ? [m[1], m[2]] : [first]
}

// "29 жовтня, 19:00" / "29.10.2026 о 19:00" → { date: '2026-10-29', time: '19:00' }
export function parseEventDate(text, postIso) {
  if (!text) return null
  const post = new Date(postIso)
  let day, month, year
  const named = text.toLowerCase().match(/(\d{1,2})\s+([а-яіїєґ]+)(?:\s+(\d{4}))?/u)
  const numeric = text.match(/(\d{1,2})\.(\d{1,2})(?:\.(\d{2,4}))?/)
  if (named) {
    const idx = MONTHS.findIndex(m => named[2].startsWith(m))
    if (idx >= 0) { day = +named[1]; month = idx; year = named[3] && +named[3] }
  }
  if (month === undefined && numeric) {
    day = +numeric[1]; month = +numeric[2] - 1
    year = numeric[3] && (numeric[3].length === 2 ? 2000 + +numeric[3] : +numeric[3])
  }
  if (month === undefined || !day || month > 11) return null
  if (!year) {
    year = post.getUTCFullYear()
    // анонс у грудні на січень — це наступний рік
    if (new Date(Date.UTC(year, month, day)) < new Date(post.getTime() - 60 * 86400e3)) year++
  }
  const time = text.match(/(?:^|[^\d.])(\d{1,2}):(\d{2})/) || []
  const pad = n => String(n).padStart(2, '0')
  return {
    date: `${year}-${pad(month + 1)}-${pad(day)}`,
    time: time[1] ? `${pad(time[1])}:${time[2]}` : '',
  }
}

function eventType(text) {
  const t = text.toLowerCase()
  const map = [['вистав', 'Вистава'], ['кіно', 'Кінопоказ'], ['показ', 'Кінопоказ'], ['подкаст', 'Запис подкасту'],
    ['акці', 'Акція'], ['лекці', 'Лекція'], ['презентац', 'Презентація'], ['концерт', 'Концерт'],
    ['виставк', 'Виставка'], ['дискусі', 'Дискусія'], ['зустріч', 'Зустріч']]
  return (map.find(([k]) => t.includes(k)) || [, 'Подія'])[1]
}

const TRANSLIT = { а:'a',б:'b',в:'v',г:'h',ґ:'g',д:'d',е:'e',є:'ie',ж:'zh',з:'z',и:'y',і:'i',ї:'i',й:'i',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'kh',ц:'ts',ч:'ch',ш:'sh',щ:'shch',ь:'',ю:'iu',я:'ia',ы:'y',э:'e',ё:'io',ъ:'' }
function slugify(title, id) {
  const base = title.toLowerCase().split('').map(c => TRANSLIT[c] ?? c).join('')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').split('-').slice(0, 7).join('-')
  return `${base || 'post'}-${id.slice(-6)}`
}

function imageUrl(p) {
  if (p.media_type === 'CAROUSEL_ALBUM') {
    const first = p.children?.data?.[0]
    if (first) return first.media_type === 'VIDEO' ? first.thumbnail_url : first.media_url
  }
  return p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url
}

// Перетворює один пост Instagram на матеріал сайту
export function toItem(p) {
  const caption = p.caption || ''
  const tags = hashtags(caption)
  if (has(tags, TAGS.skip)) return null

  let section = Object.keys(TAGS.section).find(s => has(tags, TAGS.section[s])) || DEFAULT_SECTION
  if (!section) return null

  const { fields, rest: paras } = extractFields(caption)
  if (!paras.length) return null
  const rest = splitTitle(paras)

  const title = clip(rest[0], 140).replace(/\.$/, '')
  const leadSrc = rest[1] || ''
  const lead = clip(stripLeadingSymbols(leadSrc), 240)
  const body = rest.slice(lead && lead === leadSrc ? 2 : 1)
  const date = p.timestamp.slice(0, 10)

  const item = {
    slug: slugify(title, p.id),
    date,
    title,
    lead,
    body,
    tone: TONES[parseInt(p.id.slice(-3), 10) % 6] || 'a',
    permalink: p.permalink,
    video: p.media_type === 'VIDEO' || undefined,
    _id: p.id,
    _img: imageUrl(p),
  }

  if (section === 'news') {
    item.rubric = Object.keys(TAGS.rubric).find(r => has(tags, TAGS.rubric[r])) || 'news'
  }

  if (section === 'events') {
    const when = parseEventDate(fields.date, p.timestamp) || { date, time: '' }
    const [city, ...placeRest] = (fields.place || '').split(',').map(s => s.trim())
    Object.assign(item, {
      date: when.date,
      time: when.time,
      city: city || '',
      place: placeRest.join(', ') || (city ? '' : 'Місце уточнюється'),
      type: eventType(caption),
      link: (fields.link || caption).match(/https?:\/\/\S+/)?.[0] || p.permalink,
    })
  }

  if (section === 'blogs') {
    const [author, ...role] = (fields.author || 'CrimeaVox, редакція').split(',').map(s => s.trim())
    const words = rest.join(' ').split(/\s+/).length
    Object.assign(item, { author, role: role.join(', ') || 'автор', read: Math.max(1, Math.round(words / 200)) })
  }

  return { section, item }
}

// ---------- Фото ----------

// Посилання на фото в Instagram швидко протухають, тому фото зберігаємо в сам сайт
async function saveImage(id, url) {
  if (!url) return null
  const file = join(IMG_DIR, `${id}.jpg`)
  try { await access(file); return `ig/${id}.jpg` } catch {}
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(res.status)
    await writeFile(file, Buffer.from(await res.arrayBuffer()))
    return `ig/${id}.jpg`
  } catch (e) {
    console.warn(`Не вдалося завантажити фото ${id}: ${e.message}`)
    return null
  }
}

// ---------- Головне ----------

async function main() {
  let posts
  if (process.env.IG_MOCK) {
    const { readFile } = await import('node:fs/promises')
    posts = JSON.parse(await readFile(join(ROOT, process.env.IG_MOCK), 'utf8')).data
    console.log(`Тестовий режим: ${posts.length} постів з ${process.env.IG_MOCK}`)
  } else {
    let token = process.env.IG_TOKEN
    if (!token) {
      console.log('IG_TOKEN не задано — пропускаю Instagram, сайт збереться з наявними даними.')
      return
    }
    if (process.env.IG_REFRESH === '1') {
      try {
        token = await refreshToken(token)
        if (process.env.IG_NEW_TOKEN_FILE) await writeFile(process.env.IG_NEW_TOKEN_FILE, token)
      } catch (e) { console.warn(`Оновити токен не вдалося: ${e.message}`) }
    }
    posts = await fetchPosts(token)
    console.log(`Отримано ${posts.length} постів з Instagram`)
  }

  await mkdir(IMG_DIR, { recursive: true })
  const out = { fetchedAt: new Date().toISOString(), news: [], events: [], blogs: [] }
  for (const p of posts) {
    const res = toItem(p)
    if (!res) continue
    const { section, item } = res
    const img = process.env.IG_MOCK ? null : await saveImage(item._id, item._img)
    if (img) item.img = img
    delete item._id; delete item._img
    if (!item.video) delete item.video
    out[section].push(item)
  }

  await mkdir(dirname(OUT_JSON), { recursive: true })
  await writeFile(OUT_JSON, JSON.stringify(out, null, 2))
  console.log(`Готово: новин ${out.news.length}, подій ${out.events.length}, блогів ${out.blogs.length}`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(e => { console.error(e.message); process.exit(1) })
}
