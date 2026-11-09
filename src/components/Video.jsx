import { useEffect, useRef, useState } from 'react'
import { fmtDate } from '../data'

export const CHANNEL_URL = 'https://www.youtube.com/@crimea_vox'

const fmtViews = (n) => {
  if (!n) return ''
  if (n >= 1e6) return `${(n / 1e6).toFixed(1).replace('.0', '')} млн переглядів`
  if (n >= 1e3) return `${Math.round(n / 100) / 10} тис. переглядів`.replace('.0 ', ' ')
  return `${n} переглядів`
}

// Обкладинка з YouTube. Для Shorts спершу пробуємо вертикальну, якщо її немає — звичайну
function Thumb({ id, vertical, title }) {
  const [src, setSrc] = useState(vertical ? `https://i.ytimg.com/vi/${id}/oar2.jpg` : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`)
  return (
    <img
      className="vthumb"
      src={src}
      alt=""
      loading="lazy"
      onError={() => setSrc(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
    />
  )
}

export function VideoCard({ v, onPlay, size }) {
  return (
    <button className={`vcard ${size || ''}`} onClick={() => onPlay(v, false)}>
      <span className="vframe">
        <Thumb id={v.id} title={v.title} />
        <span className="vplay" aria-hidden="true" />
      </span>
      <span className="vtitle">{v.title}</span>
      {size === 'lead' && v.description && <span className="vdesc">{v.description}</span>}
      <span className="vmeta">{[fmtDate(v.date), fmtViews(v.views)].filter(Boolean).join(', ')}</span>
    </button>
  )
}

export function ShortCard({ v, onPlay }) {
  return (
    <button className="scard" onClick={() => onPlay(v, true)}>
      <span className="sframe">
        <Thumb id={v.id} vertical title={v.title} />
        <span className="vplay" aria-hidden="true" />
        <span className="stitle">{v.title}</span>
      </span>
    </button>
  )
}

// Плеєр у спливаючому вікні. Відео вантажиться лише після кліку — сторінка лишається швидкою
export function Player({ video, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    if (video && d && !d.open) {
      d.showModal()
      // фокус на «Закрити», щоб Esc закривав вікно (якщо фокус усередині відео, YouTube перехоплює клавіші)
      d.querySelector('.player-bar button')?.focus()
    }
    if (!video && d?.open) d.close()
  }, [video])

  return (
    <dialog
      ref={ref}
      className={`player ${video?.vertical ? 'vertical' : ''}`}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose() }}
      aria-label={video?.title || 'Відео'}
    >
      {video && (
        <div className="player-in">
          <div className="player-frame">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1`}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
          <div className="player-bar">
            <span>{video.title}</span>
            <a href={video.vertical ? `https://www.youtube.com/shorts/${video.id}` : `https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">Відкрити на YouTube</a>
            <button onClick={onClose}>Закрити</button>
          </div>
        </div>
      )}
    </dialog>
  )
}

export function usePlayer() {
  const [video, setVideo] = useState(null)
  return {
    video,
    play: (v, vertical) => setVideo({ ...v, vertical }),
    close: () => setVideo(null),
  }
}
