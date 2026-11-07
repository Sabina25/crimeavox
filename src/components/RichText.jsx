// Показує текст з адмінки Sanity (Portable Text): абзаци, підзаголовки, списки, цитати, посилання, фото.
// Старий формат — масив рядків — теж підтримується.
import { sized } from '../cms'

function Spans({ block }) {
  const defs = Object.fromEntries((block.markDefs || []).map((d) => [d._key, d]))
  return (block.children || []).map((span, i) => {
    let node = span.text
    for (const m of span.marks || []) {
      if (m === 'strong') node = <strong>{node}</strong>
      else if (m === 'em') node = <em>{node}</em>
      else if (defs[m]?._type === 'link' && defs[m].href) {
        const ext = /^https?:/.test(defs[m].href)
        node = <a href={defs[m].href} {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})}>{node}</a>
      }
    }
    return <span key={span._key || i}>{node}</span>
  })
}

function Block({ b }) {
  const kids = <Spans block={b} />
  switch (b.style) {
    case 'h2': return <h2 className="rt-h2">{kids}</h2>
    case 'h3': return <h3 className="rt-h3">{kids}</h3>
    case 'blockquote': return <blockquote>{kids}</blockquote>
    default: return <p>{kids}</p>
  }
}

export default function RichText({ value = [] }) {
  if (!value.length) return null
  if (typeof value[0] === 'string') return value.map((p, i) => <p key={i}>{p}</p>)

  // Пункти списку, що йдуть підряд, збираємо в один <ul>/<ol>
  const out = []
  for (const b of value) {
    if (b._type === 'block' && b.listItem) {
      const last = out[out.length - 1]
      if (last?.list === b.listItem) last.items.push(b)
      else out.push({ list: b.listItem, items: [b], _key: b._key })
    } else out.push(b)
  }

  return out.map((b, i) => {
    if (b.list) {
      const Tag = b.list === 'number' ? 'ol' : 'ul'
      return <Tag key={b._key || i}>{b.items.map((it, j) => <li key={it._key || j}><Spans block={it} /></li>)}</Tag>
    }
    if (b._type === 'image' && b.url) {
      return (
        <figure key={b._key || i}>
          <img src={sized(b.url, 1400)} alt={b.alt || ''} loading="lazy" />
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      )
    }
    if (b._type === 'block') return <Block key={b._key || i} b={b} />
    return null
  })
}
