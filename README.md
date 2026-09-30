# Бетонные лестницы

Лендинг `versal-lestnicy.by` на Next.js 16, React и TypeScript.

## Запуск

Требуется Node.js 20.9 или новее.

```bash
npm ci
copy .env.example .env.local
npm run dev
```

Сайт будет доступен на http://localhost:3000.

## Отправка заявок в Telegram

Сайт не содержит публичного API-маршрута для заявок. Форма вызывает серверное
действие Next.js, которое проверяет данные и отправляет сообщение через Telegram
Bot API. Токен бота не попадает в браузер.

Укажите в `.env.local`:

```dotenv
NEXT_PUBLIC_SITE_URL=https://versal-lestnicy.by
SITE_INDEXABLE=false
TELEGRAM_BOT_TOKEN=123456789:your_bot_token
TELEGRAM_CHAT_ID=123456789
```

- `TELEGRAM_BOT_TOKEN` — токен, выданный ботом `@BotFather`.
- `TELEGRAM_CHAT_ID` — ID пользователя, группы или канала, куда приходят заявки.
- Для группы добавьте бота в группу. Для канала добавьте его администратором.
- После изменения переменных перезапустите сервер или пересоберите проект.

Не добавляйте префикс `NEXT_PUBLIC_` к Telegram-переменным и не коммитьте
`.env.local`: эти значения должны храниться только на сервере.

Форма передаёт имя, телефон, населённый пункт, тип и отделку лестницы,
комментарий, а также доступные UTM-метки. Есть проверка телефона, ограничения
длины полей, обязательное согласие и скрытое поле против простых ботов.
К заявке можно прикрепить до пяти файлов JPG, PNG, WEBP, PDF, HEIF или HEIC:
до 10 МБ на файл и до 40 МБ суммарно.

## Публикация и SEO

Перед production-сборкой установите `SITE_INDEXABLE=true`. Настройте HTTPS и
основной домен `https://versal-lestnicy.by`, затем добавьте `/sitemap.xml` в
Google Search Console и Яндекс Вебмастер.

## События аналитики

Скрипты аналитики загружаются только после согласия пользователя. Предпочтительная
схема — Google Tag Manager, внутри которого настроен Google Analytics 4. Укажите:

```dotenv
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

При загрузке контейнера Measurement ID доступен в `dataLayer` как
`ga4_measurement_id`. В GTM создайте переменную типа Data Layer Variable с этим
именем, Google tag с этой переменной и триггером Initialization — All Pages.
Для события `page_view` создайте GA4 Event tag с одноимённым Custom Event
триггером. Аналогично настройте нужные конверсионные события из таблицы ниже.
Автоматическую отправку page view в Google tag отключите, чтобы не было дублей.

Если `NEXT_PUBLIC_GTM_ID` не задан, используется прямое подключение GA4 по
`NEXT_PUBLIC_GA_MEASUREMENT_ID`. После изменения публичных переменных проект
нужно пересобрать.

События передаются в `window.dataLayer` и DOM-событие
`betonlestnica:conversion`:

| Событие | Действие |
| --- | --- |
| `phone_click` | Клик по телефону |
| `email_click` | Клик по email |
| `lead_success` | Заявка успешно отправлена в Telegram |

Персональные данные формы в аналитику не передаются.

## Основные файлы

| Файл | Назначение |
| --- | --- |
| `app/actions.ts` | Проверка заявки и отправка в Telegram |
| `app/site.ts` | Название, домен, контакты и FAQ |
| `app/page.tsx` | Содержимое страницы |
| `app/ui.tsx` | Меню, галерея, форма и события |
| `app/layout.tsx` | Метаданные, Open Graph и canonical |
| `app/globals.css` | Стили и адаптивность |

## Проверка

```bash
npm run build
```

## Архивы для деплоя

Чтобы собрать приложение и создать архив со всем содержимым
`.next/standalone`, включая `public` и `.next/static`, выполните:

```bash
npm run deploy:archive:full
```

Чтобы создать такой же архив без корневой папки `node_modules`, выполните:

```bash
npm run deploy:archive:no-modules
```

Готовые ZIP-файлы сохраняются в папку `output`. В архив попадает содержимое
standalone, поэтому `server.js` находится прямо в корне архива.

Для реальной проверки доставки добавьте действительные значения Telegram в
`.env.local` и отправьте тестовую заявку.
