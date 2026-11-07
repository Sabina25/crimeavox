// Стан списку: завантаження, помилка або «порожньо»
export function Status({ status, empty, text }) {
  if (!empty) return null
  if (status === 'loading') return <p className="empty loading" role="status">Завантаження…</p>
  if (status === 'error') return <p className="empty" role="status">Не вдалося завантажити матеріали. Оновіть сторінку трохи пізніше.</p>
  return <p className="empty">{text}</p>
}
