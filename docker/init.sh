#!/bin/bash
set -e

if [ ! -f .env ]; then cp .env.example .env; fi
composer install --no-interaction --prefer-dist
npm ci
if ! grep -q '^APP_KEY=base64:' .env; then php artisan key:generate; fi

for attempt in $(seq 1 60); do
    if MYSQL_PWD="$DB_PASSWORD" mysql -h "${DB_HOST:-mysql}" -u "${DB_USERNAME:-laravel}" -e 'SELECT 1' >/dev/null 2>&1; then break; fi
    sleep 2
done
php artisan migrate --force
php artisan statistics:index
php artisan storage:link --force
npm run dev -- --host 0.0.0.0 > storage/logs/vite.log 2>&1 &
php artisan queue:work --tries=3 > storage/logs/queue.log 2>&1 &
exec "$@"
