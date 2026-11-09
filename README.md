# CrimeaVox — сайт

React + Vite + адмінка Sanity. Розділи: головна, Новини, Події, Блоги, Про нас, окрема сторінка для кожного матеріалу.

## Запуск

```bash
npm install
npm run dev      # локально: http://localhost:5173
npm run build    # готовий сайт у папці dist/
```

Папку `dist/` можна залити на будь-який хостинг (Netlify, Vercel, GitHub Pages, звичайний хостинг) — серверне налаштування не потрібне.

## Адмінка (Sanity)

Новини, події та блоги редакція додає в адмінці: **https://crimeavox.sanity.studio**
(адреса з'явиться після налаштування нижче). Опубліковано в адмінці → за хвилину на сайті.
Перебудовувати чи пушити сайт не потрібно.

### Як працювати в адмінці

- Ліворуч три розділи: **Новини**, **Події**, **Блоги**. Кнопка ✏️ (або «+») — новий матеріал.
- **Заголовок** → потім біля «Адреса сторінки» натисніть **Generate**.
- **Виділити червоним** (лише новини) — частина заголовка на червоній плашці, як в Instagram.
- **Фото** — обкладинка. Можна обрати, яка частина фото головна (кнопка з олівцем на фото → Hotspot).
- **Текст** — підзаголовки, списки, цитати, жирний, посилання, фото всередині тексту.
- Зміни зберігаються як чернетка. На сайт матеріал потрапляє лише після кнопки **Publish**.
- Щоб прибрати матеріал з сайту: меню «⋯» → **Unpublish** (або Delete).

### Налаштування (один раз)

1. Зареєструйтесь на https://www.sanity.io (можна через Google або GitHub).
2. https://www.sanity.io/manage → **Create new project** → назва `CrimeaVox`, тариф **Free**.
   Скопіюйте **Project ID** (короткий код).
3. У проєкті: **Datasets** → має бути `production` (якщо немає — **Add dataset**, назва `production`, **Public**).
4. **API** → **CORS origins** → **Add CORS origin**, додайте по черзі:
   - `https://sabina25.github.io`
   - `http://localhost:5173`
5. Вставте Project ID у два файли:
   - `src/cms.config.js` → `projectId: 'ваш-id'`
   - `studio/project.js` → `projectId = 'ваш-id'`
6. Опублікуйте адмінку:
   ```bash
   cd studio
   npm install
   npx sanity login
   npx sanity deploy
   ```
   Адмінка відкриється за адресою https://crimeavox.sanity.studio.
7. Запушити сайт: `git add .`, `git commit -m "CMS"`, `git push`.
8. Запросити редакторів: sanity.io/manage → проєкт → **Members** → **Invite members** (безкоштовно до 20 людей).

### Якщо змінили поля адмінки (папка studio/schemaTypes)

```bash
cd studio
npx sanity deploy
```

## Відео з YouTube

Сторінка **Відео** і блок на головній показують 10 останніх відео і до 15 Shorts з каналу
https://www.youtube.com/@crimea_vox. Нічого робити не треба: GitHub щогодини забирає нові відео
(скрипт `scripts/fetch-youtube.mjs`) і оновлює сайт. Нове відео на YouTube → протягом години на сайті.

Без ключа сайт бере відео з відкритих RSS-стрічок YouTube — це лише 15 останніх записів каналу.
Якщо на каналі виходять переважно Shorts, довгих відео серед них може бути мало.
Щоб на сайті **завжди було 10 останніх довгих відео**, додайте безкоштовний ключ YouTube Data API:

1. https://console.cloud.google.com → угорі «Select a project» → **New project** → назва `CrimeaVox` → Create.
2. **APIs & Services → Library** → знайдіть **YouTube Data API v3** → **Enable**.
3. **APIs & Services → Credentials → Create credentials → API key**. Скопіюйте ключ.
   Натисніть на ключ → **API restrictions → Restrict key** → оберіть YouTube Data API v3 → Save.
4. GitHub → репозиторій → Settings → Secrets and variables → Actions → **New repository secret**:
   назва `YT_API_KEY`, значення — ключ.

Безкоштовного ліміту (10 000 одиниць на добу) вистачає з величезним запасом: сайт витрачає близько 100.

Перевірити локально з живими даними:

```bash
node scripts/fetch-youtube.mjs
# або з ключем:
YT_API_KEY=ваш-ключ node scripts/fetch-youtube.mjs
npm run dev
```

Тест без інтернету: `YT_MOCK=scripts/mock-youtube.xml node scripts/fetch-youtube.mjs`
(після тесту поверніть файл: `git checkout src/content/youtube.json`).

### Instagram (поки вимкнено)

Сайт сам підтягує пости з Instagram **щогодини**. Нічого окремо публікувати на сайті не треба:
пост в Instagram → протягом години він на сайті.

### Куди потрапляє пост — хештеги в підписі

| Хештег у пості | Куди на сайті |
|---|---|
| без хештегу або `#новини` | Новини |
| `#подія` або `#анонс` | Події |
| `#блог` або `#колонка` | Блоги |
| `#несайт` | на сайт не потрапляє |

Рубрики всередині новин: `#історія`, `#культура`, `#праволюдини` (або `#політвʼязні`).

### Як писати підпис, щоб на сайті було гарно

- **Перший рядок** — заголовок.
- **Другий абзац** — короткий опис (лід).
- Решта абзаців — текст статті. Абзаци розділяйте порожнім рядком.
- Фото з поста стає обкладинкою. Для відео — обкладинка відео, а на сторінці є кнопка «Дивитися відео в Instagram».

Для **подій** додайте рядки (з емодзі або словом із двокрапкою):

```
📅 29 жовтня, 19:00          (або: Дата: 29.10 о 19:00)
📍 Київ, Театр Лесі Українки  (або: Місце: Київ, Театр Лесі Українки)
🔗 https://посилання-на-реєстрацію
```

Для **блогів** — рядок з автором:

```
Авторка: Ельмаз Алімова, журналістка
```

Ці службові рядки на сайті в текст не потрапляють.

### Налаштування (один раз)

1. Отримати токен Instagram API (інструкція — в листуванні з розробником / нижче коротко).
2. GitHub → репозиторій → Settings → Secrets and variables → Actions → **New repository secret**:
   назва `IG_TOKEN`, значення — токен.
3. Actions → Deploy → **Run workflow** — перший запуск вручну.

Токен живе 60 днів. Сайт сам продовжує його щоночі, але щоб зберегти новий токен,
GitHub потрібен ще один секрет — `GH_PAT`:
GitHub → аватар → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** →
доступ лише до репозиторію `crimeavox`, дозвіл **Secrets: Read and write**. Збережіть його як секрет `GH_PAT`.
Без `GH_PAT` сайт теж працює, але раз на ~2 місяці треба вручну вставити новий `IG_TOKEN`.

### Перевірка без токена

```bash
IG_MOCK=scripts/mock-posts.json node scripts/fetch-instagram.mjs
npm run dev
```

Сайт покаже тестові пости. Перед `git push` поверніть файл даних до порожнього стану:
`git checkout src/content/instagram.json`.

### Матеріали без Instagram

Їх можна додати вручну в `src/data.js` — масиви `manualNews`, `manualEvents`, `manualBlogs`.
Поки з Instagram нічого не прийшло, сайт показує демо-контент з того ж файлу.

## Структура

```
src/
  cms.config.js        Project ID адмінки Sanity
  cms.js               завантаження матеріалів з Sanity
  content.jsx          об'єднує Sanity, ручні матеріали і демо
  data.js              ручні матеріали, Instagram, демо-контент
  content/instagram.json  дані з Instagram (заповнюється автоматично)
  styles.css           стилі
  main.jsx             маршрути
  components/Layout.jsx  шапка, підвал, підписка
  components/Cards.jsx   картки новин, подій, блогів
  pages/Home.jsx         головна
  pages/Video.jsx        відео з YouTube
  pages/Lists.jsx        списки розділів
  pages/Detail.jsx       сторінки матеріалів
  pages/About.jsx        про нас
```

studio/ — адмінка Sanity (поля новин, подій, блогів — у studio/schemaTypes)
scripts/fetch-youtube.mjs — забирає відео з YouTube
scripts/fetch-instagram.mjs — забирає пости з Instagram (поки вимкнено)
.github/workflows/deploy.yml — щогодинне оновлення і публікація

## Що зробити перед запуском

- Налаштувати адмінку Sanity (див. вище) і внести перші матеріали.
- Підключити форму підписки до сервісу розсилок (`components/Layout.jsx`).
- Вставити посилання на Telegram, YouTube, контакти.
- Оновити цифру політв'язнів на головній.
- Коли контенту стане багато — перенести `data.js` у CMS (Sanity, Strapi, WordPress) і зробити адмінку для редакції.
