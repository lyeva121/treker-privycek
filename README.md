# 21 — трекер привычек

Мобильное веб-приложение (PWA): привычка засчитывается после 21 выполнения по расписанию, один пропуск обнуляет серию. Без регистрации, данные хранятся на устройстве (`localStorage`), работает офлайн.

**Стек:** React 19, Vite 8, lucide-react.

## Запуск локально

```bash
npm ci
npm start        # http://localhost:3000
npm run build    # сборка в dist/
npm run preview  # проверка собранной версии
```

Нужен Node.js ≥ 20.19 (см. `.nvmrc`).

## Публикация на GitHub Pages

1. Создайте репозиторий на GitHub и загрузите файлы:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<ваш-логин>/<репозиторий>.git
   git push -u origin main
   ```
2. В репозитории: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. После пуша workflow `.github/workflows/deploy.yml` соберёт и опубликует сайт:
   `https://<ваш-логин>.github.io/<репозиторий>/`

Пути в проекте относительные (`base: './'`), поэтому сайт работает и в подпапке GitHub Pages, и в корне домена (например, на Amvera через `amvera.yaml`).

## Установка на смартфон

- **iPhone (Safari):** «Поделиться» → «На экран “Домой”».
- **Android (Chrome):** меню ⋮ → «Установить приложение» / «Добавить на главный экран».

После первого открытия приложение кэшируется service worker'ом и открывается без интернета.

## Обновление версии

При изменении ресурсов поднимите `VERSION` в `public/sw.js` — старый кэш у пользователей очистится.

## Структура

```
├── .github/workflows/deploy.yml   # автодеплой на GitHub Pages
├── public/                        # иконки, manifest.webmanifest, sw.js
├── src/main.jsx                   # приложение
├── src/styles.css                 # стили
├── index.html
├── vite.config.js
├── amvera.yaml                    # деплой на Amvera (опционально)
└── package.json
```
