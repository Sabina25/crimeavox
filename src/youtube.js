// Відео з YouTube-каналу. Файл content/youtube.json щогодини оновлює scripts/fetch-youtube.mjs (GitHub Actions).
import yt from './content/youtube.json'

export const videos = yt.videos || []
export const shorts = yt.shorts || []
