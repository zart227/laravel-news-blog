# Laravel News Blog

Новостной блог на **Laravel 11, Inertia.js 2 и Vue 3**. Публичная часть содержит статьи, поиск по заголовку, теги, комментарии с ответами, лайки и дизлайки. В административной панели доступны страницы управления статьями и тегами, а также отчёт о просмотрах и активности.

Контент хранится в **MySQL**, события просмотров и агрегаты — в **MongoDB**. Документ описывает текущую ветку `main`.

## Стек и требования

- PHP 8.2+ и Composer 2; Docker dev-образ использует PHP 8.3.
- Laravel 11, Laravel Sanctum, `mongodb/laravel-mongodb`.
- Vue 3, TypeScript, Inertia.js 2, Tailwind CSS 3, Vite 6, Ziggy.
- Chart.js / vue-chartjs для графиков, Papa Parse для CSV, axios для JSON-запросов.
- Laravel Reverb и Laravel Echo для необязательных WebSocket-обновлений.
- MySQL 8.0; MongoDB 5.0+ для `$dateTrunc` (в dev Compose — MongoDB 8.0).
- Node.js **20+** и npm: установленный Laravel Echo требует Node 20 или новее.
- PHP-расширения, требуемые Composer, включая `pdo_mysql`, `mongodb`, `mbstring`, XML и GD. Для тестов с настройками по умолчанию нужен `pdo_sqlite`.

Используйте `composer install` и `npm ci`, чтобы устанавливать версии из lock-файлов. Текущий `composer.lock` содержит PHP MongoDB library 1.20.0: ему требуется расширение `ext-mongodb` **1.20.x**, а не 2.x. В dev Dockerfile закреплена версия расширения 1.20.1.

## Хранение данных

**MySQL:** пользователи и их роли (`admin`, `user`), статьи, теги и связи между ними, комментарии и ответы, полиморфные лайки/дизлайки. Изображения статей сохраняются на диске `public` в `storage/app/public/articles` и доступны через `public/storage`.

**MongoDB:**

- `article_view_events` — каждый просмотр: `article_id`, `user_id` или `null`, `ip_hash`, `user_agent_family`, `referrer_host` или `null`, `viewed_at`.
- `statistics` — общий счётчик просмотров и суточных уникальных просмотров на статью; браузеры и рефереры представлены массивами `{name, count}`.
- `article_view_daily` — ключи для определения уникальности просмотра статьи в московские сутки.

`ViewTracker` вызывается из страницы статьи и из `POST /api/articles/{slug}/views`. Открытие страницы уже записывает просмотр; дополнительный POST считается ещё одним просмотром. IP сохраняется как SHA-256 от IP + `APP_KEY`, User-Agent — как семейство браузера, реферер — как hostname без пути и параметров.

Счётчики увеличиваются атомарным `$inc`. Один авторизованный пользователь, а для гостя один `ip_hash`, увеличивает `unique_views` статьи не более одного раза за сутки в `Europe/Moscow`. Счётчики карточек статей загружаются пакетно из MongoDB.

Команда `php artisan statistics:index` создаёт индексы событий `(article_id, viewed_at)` и `(viewed_at)`, уникальный индекс `statistics.article_id` и преобразует старые карты браузеров/рефереров в массивы. Её необходимо выполнить перед использованием новой реализации статистики; повторный запуск допустим.

Старая SQL-таблица `article_views` сохранена для совместимости. Новые просмотры туда не записываются, а её история автоматически не импортируется в MongoDB и не входит в событийный отчёт. [ER-диаграмма](database/ER-diagram.md) описывает SQL-структуру; коллекции MongoDB перечислены выше.

## Быстрый запуск через Docker Compose

Нужны Docker Engine и Docker Compose v2 с поддержкой секции `develop`.

**Ограничение текущего dev Dockerfile:** он устанавливает Node 18 и затем последнюю npm, тогда как зависимости фронтенда требуют Node 20+. До сборки приведите Node.js в `docker/Dockerfile.dev` к версии 20+ и используйте совместимую npm. Это ограничение образа, а не дополнительный шаг настройки Laravel.

```bash
git clone https://github.com/zart227/laravel-news-blog.git
cd laravel-news-blog
git switch main
cp .env.example .env
# Задайте DB_PASSWORD=secret или своё значение.
docker compose -f docker-compose.dev.yml up --build -d
docker compose -f docker-compose.dev.yml logs -f app
```

Скрипт `docker/init.sh` устанавливает Composer/npm-зависимости, генерирует `APP_KEY` при его отсутствии, запускает SQL-миграции, Mongo-индексы, `storage:link`, Vite и обработчик очереди, затем PHP-FPM. Первый запуск занимает время; готовность проверяйте по логам `app`.

- Блог: http://localhost:8084 (Nginx → PHP-FPM).
- Vite: http://127.0.0.1:5173.
- MySQL с хоста: `127.0.0.1:3307`, база `laravel_news_blog`, пользователь `laravel`.
- MongoDB с хоста: `127.0.0.1:27018`, база `laravel_news_blog`.
- Redis с хоста: `127.0.0.1:6381`.
- Порт `8080` контейнера `app` предназначен для вручную запущенного Reverb.

Внутри Docker подключения идут к `mysql:3306`, `mongodb:27017` и `redis:6379`; Compose задаёт эти параметры через окружение. Папка проекта смонтирована в `/var/www`, поэтому изменения кода и установленные зависимости сохраняются на хосте. Dev-пользователь образа по умолчанию имеет UID/GID 1000; ему нужен доступ на запись в проект, `storage` и `bootstrap/cache`.

После изменения `.env` очистите кэш конфигурации и перезапустите процессы:

```bash
docker compose -f docker-compose.dev.yml exec app php artisan optimize:clear
docker compose -f docker-compose.dev.yml restart app
```

Остановить окружение с сохранением данных:

```bash
docker compose -f docker-compose.dev.yml down
```

В Compose также присутствует Soketi, но клиент `resources/js/echo.js` настроен на Reverb. Само наличие Soketi не включает живые обновления.

## Локальный запуск без Docker

Заранее запустите MySQL и MongoDB, создайте MySQL-базу и настройте в `.env` параметры `DB_*` и `MONGODB_*` для своих серверов. При использовании баз из dev Compose с хоста применяйте порты `3307` и `27018`.

```bash
cp .env.example .env
composer install
npm ci
php artisan key:generate
```

Для сервера Artisan задайте `APP_URL=http://127.0.0.1:8000`. Оставьте `APP_TIMEZONE=UTC`: SQL-временные метки используются отчётом как UTC. Для MongoDB предусмотрены `MONGODB_HOST`, `MONGODB_PORT`, `MONGODB_DATABASE`, `MONGODB_USERNAME`, `MONGODB_PASSWORD` и `MONGODB_AUTHENTICATION_DATABASE`.

```bash
php artisan migrate
php artisan statistics:index
php artisan storage:link
```

Запустите в отдельных терминалах:

```bash
php artisan serve --host=127.0.0.1 --port=8000
npm run dev
php artisan queue:work --tries=3
```

Для браузерной авторизации API домен с портом должен присутствовать в `SANCTUM_STATEFUL_DOMAINS`. В примере окружения перечислены адреса для Docker (`localhost:8084`, `127.0.0.1:8084`) и Artisan (`127.0.0.1:8000`). MongoDB требуется и для публичного списка/страницы статьи, а не только для панели статистики.

## Демо-данные

Сидеры не запускаются автоматически. Добавляйте их в отдельное окружение разработки:

```bash
php artisan db:seed
# В Docker:
docker compose -f docker-compose.dev.yml exec app php artisan db:seed
```

`DatabaseSeeder` создаёт статьи, теги, пользователей, комментарии, реакции и Mongo-просмотры. Сидер удаляет каталог изображений статей и пересоздаёт коллекции статистики просмотров; повторный запуск общего сидера также может столкнуться с существующим `admin@example.com`.

Демо-администратор: **admin@example.com / password**. Email остальных пользователей генерируется Faker; фиксированной учётной записи `user@example.com` нет. Для обычного пользователя можно воспользоваться регистрацией `/register`.

Сидеры и фабрики статей получают изображения с `placehold.co`, поэтому могут выполнять внешние HTTP-запросы.

## Живые обновления через Reverb

По умолчанию `BROADCAST_CONNECTION=log`: приложение запускается без ключей Pusher/Reverb и работает через HTTP. Для WebSocket-обновлений задайте собственные значения:

```dotenv
BROADCAST_CONNECTION=reverb
REVERB_APP_ID=news-blog
REVERB_APP_KEY=your-reverb-key
REVERB_APP_SECRET=your-reverb-secret
REVERB_HOST=127.0.0.1
REVERB_PORT=8080
REVERB_SCHEME=http
```

`VITE_REVERB_*` в `.env.example` ссылаются на соответствующие `REVERB_*`; host должен быть доступен браузеру. После изменения этих значений очистите кэш конфигурации и перезапустите Vite либо пересоберите фронтенд. Затем запустите Reverb вместе с обработчиком очереди:

```bash
php artisan reverb:start --host=0.0.0.0 --port=8080
# В Docker, после перезапуска app:
docker compose -f docker-compose.dev.yml exec -d app php artisan reverb:start --host=0.0.0.0 --port=8080
```

События `comment.created`, `comment.updated`, `comment.deleted` используют канал `article.{slug}`. `StatisticsUpdated` публикуется в приватный `admin.statistics`, доступный только администратору; страница статистики обновляет отчёт при получении события. `/websocket-test` и `/websocket-test/send` также закрыты авторизацией и ролью администратора.

## Как считается статистика

Страница: `/admin/statistics`. API: `GET /api/statistics?period=week|month|year`, только для администратора. Ответ содержит `summary`, `activity`, `popular`, `browsers`, `referrers`.

- Неделя — последние 7 московских дней, включая сегодня.
- Месяц/год — от даты месяц/год назад плюс один день до начала завтрашнего дня. Это скользящий период, а не предыдущий календарный месяц/год.
- Для недели и месяца события группируются по дням через Mongo `$dateTrunc` с `Europe/Moscow`; для года — по неделям с понедельника. Неполные крайние недели входят в ряд.
- Комментарии группируются в SQL после сдвига UTC на +03:00 и объединяются с Mongo-рядом в PHP. Пропущенные интервалы заполнены нулями.
- Карточки за выбранный период: просмотры и различные `ip_hash` — из событий Mongo; сохранившиеся лайки и комментарии, созданные за период, — из MySQL. Дизлайки в число лайков не входят.
- Уникальные IP графика считаются отдельно в каждом дне/неделе. Их сумма может отличаться от уникальных IP за весь период и от суточных уникальных пользователей конкретной статьи.
- Топ-5 статей и топы браузеров/рефереров относятся ко всему времени. Браузеры/рефереры ранжируются по сумме `count`, а не по количеству документов.

Отчёт кэшируется по периоду через `Cache::remember` на 60 секунд, без тегов. Кэш сбрасывается при просмотре статьи, создании и удалении комментария. Экспорт CSV через Papa Parse включает карточки, активность и топы.

## Маршруты и API

Публичные страницы: `/`, `/articles`, `/articles/{slug}`, `/tags`, `/tags/{slug}`. Административная панель начинается с `/admin/dashboard`; отдельного `/dashboard` нет.

Основные JSON-запросы:

- `GET /api/articles` — список статей.
- `GET /api/articles/{slug}/comments` — комментарии статьи.
- `POST /api/articles/{slug}/views` — запись просмотра из данных HTTP-запроса; передавать IP в JSON не требуется.
- `POST /api/articles/{slug}/comments` — создание комментария/ответа (`content`, необязательный `parent_id`).
- `PATCH /api/comments/{id}` — редактирование; `DELETE /api/comments/{id}` — удаление с проверкой прав.
- `POST /like` и `POST /dislike` — переключение реакции (`type`: `article` или `comment`, `id`); ответ содержит `action`, `likes_count`, `dislikes_count`.
- `GET /api/statistics` — отчёт администратора.

Для API-комментариев используется `auth:sanctum`; реакции находятся в группе web с авторизацией и CSRF-защитой. API-маршруты в группе `throttle:api` ограничены 60 запросами в минуту на пользователя либо IP. CRUD-маршруты статей и тегов и их middleware смотрите в `routes/web.php` и `routes/api.php`.

Полный список маршрутов и генерация Swagger-документации:

```bash
php artisan route:list
php artisan l5-swagger:generate
```

Swagger UI: `/api/documentation`. Генерация документации использует аннотации контроллеров; фактические маршруты и контракт статистики описаны выше.

## Тесты и сборка

```bash
php artisan test
php artisan route:list
npm run typecheck  # vue-tsc --noEmit
npm run build
```

В Docker выполняйте те же команды через `docker compose -f docker-compose.dev.yml exec app`, например:

```bash
docker compose -f docker-compose.dev.yml exec app php artisan test
docker compose -f docker-compose.dev.yml exec app php artisan route:list
docker compose -f docker-compose.dev.yml exec app npm run typecheck
docker compose -f docker-compose.dev.yml exec app npm run build
```

PHPUnit использует SQLite in-memory для SQL-моделей, array-кэш/сессии и отключённый broadcast. Mongo-интеграции помечены группой `mongo`; если соединение недоступно, они пропускаются. При наличии MongoDB тесты используют и очищают отдельную базу `news_blog_test_<pid>`.

```bash
php artisan test --group=mongo
php artisan test --exclude-group=mongo
```

Тесты покрывают авторизацию статистики и приватного канала, маршруты, лайки и комментарии, поиск и кэш статей, московские границы суток, суточную уникальность, параллельные Mongo-инкременты, объединение SQL/Mongo, заполнение пропусков и фиксированное число запросов. Пропуск Mongo-группы не означает, что Mongo-операции проверены.

Для SQL-тестов на MySQL сначала создайте **отдельную тестовую базу** и выдайте пользователю права на неё: `RefreshDatabase` пересоздаёт таблицы. При запуске внутри контейнера:

```bash
docker compose -f docker-compose.dev.yml exec \
  -e DB_DATABASE=news_blog_test app php artisan test
```

Остальные MySQL-параметры берутся из окружения dev Compose. При локальном запуске укажите их явно вместе с `DB_CONNECTION=mysql` и `DB_DATABASE=news_blog_test`.

## Production

`npm run build` создаёт фронтенд в `public/build`; эта команда сама по себе не развёртывает приложение. На сервере нужны настроенные MySQL, MongoDB, PHP-FPM/веб-сервер и обработчик очереди, а для живых обновлений — Reverb. После обновления кода выполните SQL-миграции и `statistics:index`, сохраните `APP_KEY` и каталог загруженных изображений.

`docker-compose.yml` и `docker/Dockerfile.prod` пока не соответствуют текущей архитектуре: в Compose отсутствует MongoDB, в production-образе нет её PHP-расширения, а общий entrypoint запускает dev-инструменты. Их необходимо доработать перед production-развёртыванием; dev Compose предназначен для разработки.

## Лицензия

В `composer.json` указан MIT. Отдельного файла `LICENSE` в репозитории сейчас нет.
