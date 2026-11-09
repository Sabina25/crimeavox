import { useState } from 'react'
import { videos, shorts } from '../youtube'
import { VideoCard, ShortCard, Player, usePlayer, CHANNEL_URL } from '../components/Video'
import '../video.css'

// 10 відео: одне велике і 9 рівною сіткою
const PAGE = 10

export default function VideoPage() {
  const player = usePlayer()
  const [n, setN] = useState(PAGE)
  const empty = !videos.length && !shorts.length

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Відео</h1>
          <p>Розслідування, пояснення та коротко про головне з нашого YouTube-каналу.</p>
          <a className="btn" href={CHANNEL_URL} target="_blank" rel="noreferrer">Підписатися на YouTube</a>
        </div>
      </section>

      {empty && (
        <section className="tight">
          <div className="wrap">
            <p className="empty">Відео з'являться тут найближчим часом. Поки що дивіться їх на нашому <a href={CHANNEL_URL} target="_blank" rel="noreferrer">YouTube-каналі</a>.</p>
          </div>
        </section>
      )}

      {shorts.length > 0 && (
        <section className="tight">
          <div className="wrap">
            <h2 className="sub-h">Shorts</h2>
            <div className="shorts" role="list">
              {shorts.map((v) => <ShortCard key={v.id} v={v} onPlay={player.play} />)}
            </div>
          </div>
        </section>
      )}

      {videos.length > 0 && (
        <section className="tight">
          <div className="wrap">
            <h2 className="sub-h">Усі відео</h2>
            <div className="vgrid">
              {videos.slice(0, n).map((v, i) => <VideoCard key={v.id} v={v} onPlay={player.play} size={i === 0 ? 'lead' : ''} />)}
            </div>
            {n < videos.length && (
              <div className="more"><button className="btn ghost" onClick={() => setN(n + PAGE)}>Показати ще</button></div>
            )}
          </div>
        </section>
      )}

      <Player video={player.video} onClose={player.close} />
    </>
  )
}
