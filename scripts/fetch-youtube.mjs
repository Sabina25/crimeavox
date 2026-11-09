// Забирає останні відео та Shorts з YouTube-каналу CrimeaVox для сторінки «Відео».
// Ключ не обов'язковий: без нього використовуються відкриті RSS-стрічки YouTube (до 15 останніх записів).
//
// Запуск:
//   node scripts/fetch-youtube.mjs
//   YT_API_KEY=... node scripts/fetch-youtube.mjs   — через YouTube Data API: завжди 10 останніх довгих відео
//   YT_MOCK=scripts/mock-youtube.xml node scripts/fetch-youtube.mjs   — тест без інтернету
//
// Результат: src/content/youtube.json

import { writeFile, readFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'src/content/youtube.json')

export const CHANNEL_ID = 'UCm-C1Ix_tf4PnuROw8QRqTg' // @crimea_vox
const SUFFIX = CHANNEL_ID.slice(2)
const FEED = (q) => `https://www.youtube.com/feeds/videos.xml?${q}`
// UULF… — лише звичайні відео, UUSH… — лише Shorts, channel_id — усе разом
const FEEDS = {
  videos: FEED(`playlist_id=UULF${SUFFIX}`),
  shorts: FEED(`playlist_id=UUSH${SUFFIX}`),
  all: FEED(`channel_id=${CHANNEL_ID}`),
}

const decode = (s = '') =>
  s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))

const tag = (xml, name) => decode((xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`)) || [])[1] || '').trim()
const attr = (xml, name, a) => (xml.match(new RegExp(`<${name}[^>]*\\s${a}="([^"]*)"`)) || [])[1]

// Atom-стрічка YouTube → [{ id, title, date, description, views }]
export function parseFeed(xml) {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => ({
    id: tag(e, 'yt:videoId'),
    title: tag(e, 'title'),
    date: tag(e, 'published').slice(0, 10),
    description: tag(e, 'media:description').split('\n').map((l) => l.trim()).filter(Boolean).slice(0, 2).join(' ').slice(0, 220),
    views: Number(attr(e, 'media:statistics', 'views') || 0) || undefined,
  })).filter((v) => v.id)
}

async function get(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (CrimeaVox site builder)' } })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.text()
}

// Запасний спосіб відрізнити Shorts: youtube.com/shorts/ID відповідає 200 для Shorts і перенаправляє для звичайних відео
async function isShort(id) {
  try {
    const res = await fetch(`https://www.youtube.com/shorts/${id}`, { method: 'HEAD', redirect: 'manual' })
    return res.status === 200
  } catch { return false }
}

const VIDEOS_LIMIT = Number(process.env.YT_VIDEOS || 10)
const SHORTS_LIMIT = Number(process.env.YT_SHORTS || 15)
const byDate = (a, b) => b.date.localeCompare(a.date)
const dedupe = (list) => [...new Map(list.map((v) => [v.id, v])).values()]

// ---------- YouTube Data API (необов'язково, якщо задано YT_API_KEY) ----------
// Дає скільки завгодно останніх відео (RSS віддає лише 15 останніх записів).
const API = 'https://www.googleapis.com/youtube/v3'
async function apiGet(path, key) {
  const res = await fetch(`${API}/${path}&key=${key}`)
  const body = await res.json()
  if (!res.ok || body.error) throw new Error(`YouTube API: ${body.error?.message || res.status}`)
  return body
}
async function apiPlaylist(playlistId, limit, key) {
  const items = []
  let page = ''
  while (items.length < limit) {
    const r = await apiGet(`playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}${page && `&pageToken=${page}`}`, key)
    items.push(...r.items)
    if (!r.nextPageToken) break
    page = r.nextPageToken
  }
  const list = items.slice(0, limit).map((it) => ({
    id: it.contentDetails.videoId,
    title: it.snippet.title,
    date: (it.contentDetails.videoPublishedAt || it.snippet.publishedAt).slice(0, 10),
    description: (it.snippet.description || '').split('\n').map((l) => l.trim()).filter(Boolean).slice(0, 2).join(' ').slice(0, 220),
  })).filter((v) => v.title !== 'Private video' && v.title !== 'Deleted video')
  // перегляди
  for (let i = 0; i < list.length; i += 50) {
    const ids = list.slice(i, i + 50).map((v) => v.id).join(',')
    const r = await apiGet(`videos?part=statistics&id=${ids}`, key)
    const views = Object.fromEntries(r.items.map((x) => [x.id, Number(x.statistics.viewCount)]))
    list.slice(i, i + 50).forEach((v) => { v.views = views[v.id] || undefined })
  }
  return list
}

async function main() {
  let videos = [], shorts = []
  const key = process.env.YT_API_KEY

  if (process.env.YT_MOCK) {
    const all = parseFeed(await readFile(join(ROOT, process.env.YT_MOCK), 'utf8'))
    // у тестовому файлі Shorts позначені словом #shorts у назві
    shorts = all.filter((v) => /#shorts/i.test(v.title))
    videos = all.filter((v) => !/#shorts/i.test(v.title))
  } else if (key) {
    try {
      ;[videos, shorts] = await Promise.all([apiPlaylist(`UULF${SUFFIX}`, VIDEOS_LIMIT, key), apiPlaylist(`UUSH${SUFFIX}`, SHORTS_LIMIT, key)])
      console.log('Джерело: YouTube Data API')
    } catch (e) {
      console.warn(`${e.message} — переходжу на RSS`)
    }
  }

  if (!process.env.YT_MOCK && !videos.length && !shorts.length) {
    // RSS: три стрічки разом — лише відео, лише Shorts і загальна стрічка каналу
    const [lf, sh, all] = await Promise.allSettled([FEEDS.videos, FEEDS.shorts, FEEDS.all].map((u) => get(u).then(parseFeed)))
    const ok = (r) => (r.status === 'fulfilled' ? r.value : null)
    if (!ok(lf) && !ok(sh) && !ok(all)) {
      console.warn(`YouTube недоступний (${lf.reason?.message}) — залишаю попередні дані.`)
      return
    }
    shorts = ok(sh) || []
    let rest = ok(all) || []
    if (!ok(sh) && rest.length) {
      // окремої стрічки Shorts немає — перевіряємо кожне відео
      const flags = await Promise.all(rest.map((v) => isShort(v.id)))
      shorts = rest.filter((_, i) => flags[i])
    }
    const shortIds = new Set(shorts.map((v) => v.id))
    // з загальної стрічки беремо все, що не Shorts: так потрапляють і ефіри, і прем'єри
    videos = dedupe([...(ok(lf) || []), ...rest.filter((v) => !shortIds.has(v.id))])
    console.log('Джерело: RSS (до 15 останніх записів у кожній стрічці)')
  }

  videos = dedupe(videos).sort(byDate).slice(0, VIDEOS_LIMIT)
  // Shorts часто мають у назві хештеги — прибираємо їх з підпису
  shorts = dedupe(shorts).sort(byDate).slice(0, SHORTS_LIMIT)
    .map((s) => ({ ...s, title: s.title.replace(/\s*#[\p{L}\p{N}_]+/gu, '').trim() || s.title }))

  const out = { fetchedAt: new Date().toISOString(), channel: `https://www.youtube.com/channel/${CHANNEL_ID}`, videos, shorts }
  await mkdir(dirname(OUT), { recursive: true })
  await writeFile(OUT, JSON.stringify(out, null, 2))
  console.log(`YouTube: відео ${videos.length}, Shorts ${shorts.length}`)
  if (videos.length < VIDEOS_LIMIT && !key) {
    console.log(`Довгих відео серед останніх записів каналу лише ${videos.length}. Щоб завжди було ${VIDEOS_LIMIT}, додайте YT_API_KEY (див. README).`)
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((e) => { console.error(e.message); process.exit(1) })
}
