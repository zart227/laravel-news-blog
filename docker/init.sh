#!/bin/bash

set -e

echo "Starting initialization script..."

# Функция для логирования
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Функция проверки готовности MySQL
wait_for_mysql() {
    local retries=30
    local wait_time=2

    log "Waiting for MySQL to be ready..."
    
    while [ $retries -gt 0 ]; do
        if mysql -h mysql -u laravel -psecret -e "SELECT 1;" >/dev/null 2>&1; then
            log "MySQL is ready!"
            return 0
        fi
        
        retries=$((retries-1))
        if [ $retries -eq 0 ]; then
            log "ERROR: MySQL is not ready after 60 seconds"
            return 1
        fi
        
        log "MySQL is not ready yet. Waiting $wait_time seconds... ($retries attempts left)"
        sleep $wait_time
    done
}

# Функция проверки готовности Redis
wait_for_redis() {
    local retries=30
    local wait_time=2

    log "Waiting for Redis to be ready..."
    
    while [ $retries -gt 0 ]; do
        if timeout 2 redis-cli -h redis -p 6379 ping >/dev/null 2>&1; then
            log "Redis is ready!"
            return 0
        fi
        
        retries=$((retries-1))
        if [ $retries -eq 0 ]; then
            log "ERROR: Redis is not ready after 60 seconds"
            return 1
        fi
        
        log "Redis is not ready yet. Waiting $wait_time seconds... ($retries attempts left)"
        sleep $wait_time
    done
}

# Проверка и создание .env файла
if [ ! -f .env ]; then
    log "No .env file found. Creating from .env.example..."
    cp .env.example .env
    log ".env file created"
else
    log "Using existing .env file"
fi

# Проверка на наличие лишних файлов окружения
if [ -f .env.local ]; then
    log "WARNING: Found .env.local file which is not needed. Settings should be in .env"
    rm -f .env.local
    log "Removed .env.local file"
fi

# Настройка подключения к базе данных
log "Configuring database connection..."
sed -i "s#DB_CONNECTION=.*#DB_CONNECTION=mysql#" .env
sed -i "s#DB_HOST=.*#DB_HOST=mysql#" .env
sed -i "s#DB_PORT=.*#DB_PORT=3306#" .env
sed -i "s#DB_DATABASE=.*#DB_DATABASE=laravel_news_blog#" .env
sed -i "s#DB_USERNAME=.*#DB_USERNAME=laravel#" .env
sed -i "s#DB_PASSWORD=.*#DB_PASSWORD=secret#" .env

# Настройка Redis
log "Configuring Redis connection..."
sed -i "s#REDIS_HOST=.*#REDIS_HOST=redis#" .env
sed -i "s#REDIS_PASSWORD=.*#REDIS_PASSWORD=null#" .env
sed -i "s#REDIS_PORT=.*#REDIS_PORT=6379#" .env
sed -i "s#REDIS_CLIENT=.*#REDIS_CLIENT=phpredis#" .env

# Настройка драйверов кэша и сессий
log "Configuring cache and session drivers..."
sed -i "s#SESSION_DRIVER=.*#SESSION_DRIVER=redis#" .env
sed -i "s#CACHE_STORE=.*#CACHE_STORE=redis#" .env

# Настройка Vite и Asset URL
log "Configuring Vite and Asset URL..."
sed -i "s#VITE_PORT=.*#VITE_PORT=5173#" .env
sed -i "s#VITE_HOST=.*#VITE_HOST=0.0.0.0#" .env
sed -i "s#ASSET_URL=.*#ASSET_URL=http://localhost:5173#" .env

# Ожидание готовности MySQL и Redis
if ! wait_for_mysql; then
    log "ERROR: Failed to connect to MySQL"
    exit 1
fi

if ! wait_for_redis; then
    log "ERROR: Failed to connect to Redis"
    exit 1
fi

log "Initialization completed successfully"

# Запуск основного процесса
log "Starting main process..."
exec "$@" 