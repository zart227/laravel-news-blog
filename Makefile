SHELL = sh
.EXPORT_ALL_VARIABLES:
.ONESHELL:

PHP = php
ARTISAN = $(PHP) artisan
NPM = npm
PSQL = psql
DB_NAME = laravel_news_blog
DB_USER = postgres
COMPOSER = composer
REVERB_HOST = 127.0.0.1
REVERB_PORT = 6001

.PHONY: help install dev prod clear cache-clear test lint fix-lint docker-up docker-down docker-build docker-rebuild ide-helper db-fresh routes-list queue-work schedule-work reverb-start reverb-dev db-seed db-refresh db-reset

help: ## Показать это сообщение
	@echo "Доступные команды:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Установка проекта
	$(COMPOSER) install
	$(NPM) install
	cp -n .env.example .env || true
	$(ARTISAN) key:generate
	$(ARTISAN) storage:link
	$(ARTISAN) ziggy:generate
	$(ARTISAN) vendor:publish --tag=ziggy
	$(NPM) run build

dev: ## Запуск в режиме разработки
	$(ARTISAN) serve & $(NPM) run dev

dev-full: ## Запуск в режиме разработки с WebSocket
	$(NPM) exec concurrently "$(ARTISAN) serve" "$(NPM) run dev" "make reverb-dev"

prod: ## Запуск в production режиме
	$(NPM) run build
	$(ARTISAN) optimize
	$(ARTISAN) serve

clear: ## Очистка всего кэша
	$(ARTISAN) optimize:clear
	$(ARTISAN) route:clear
	$(ARTISAN) view:clear
	$(ARTISAN) cache:clear
	$(ARTISAN) config:clear
	$(ARTISAN) ziggy:generate
	$(NPM) run build

cache-clear: ## Очистка только кэша приложения
	$(ARTISAN) cache:clear
	$(ARTISAN) config:clear

cache-warm: ## Прогрев кэша
	$(ARTISAN) optimize
	$(ARTISAN) route:cache
	$(ARTISAN) view:cache
	$(ARTISAN) config:cache
	$(ARTISAN) ziggy:generate

test: ## Запуск тестов
	$(ARTISAN) test
	$(NPM) run test

lint: ## Проверка кода
	./vendor/bin/pint --test
	$(NPM) run lint

fix-lint: ## Исправление кода
	./vendor/bin/pint
	$(NPM) run lint -- --fix

docker-up: ## Запуск Docker контейнеров
	docker compose up -d

docker-down: ## Остановка Docker контейнеров
	docker compose down

docker-build: ## Сборка Docker контейнеров
	docker compose build

docker-rebuild: ## Пересборка Docker контейнеров
	docker compose down
	docker compose build --no-cache
	docker compose up -d

ide-helper: ## Генерация файлов для IDE
	$(ARTISAN) ide-helper:generate
	$(ARTISAN) ide-helper:meta
	$(ARTISAN) ide-helper:models --nowrite

db-fresh: ## Пересоздание БД и запуск ВСЕХ сидеров
	$(ARTISAN) migrate:fresh --seed

db-seed: ## Запуск всех сидеров без пересоздания таблиц
	$(ARTISAN) db:seed

db-refresh: ## Откат и повторное выполнение всех миграций с сидерами
	$(ARTISAN) migrate:refresh --seed

db-reset: ## Пересоздание БД и запуск ТОЛЬКО главного сидера (DatabaseSeeder)
	$(ARTISAN) migrate:fresh
	$(ARTISAN) db:seed --class=DatabaseSeeder
	@echo "База данных успешно сброшена и заполнена тестовыми данными"

routes-list: ## Список всех маршрутов
	$(ARTISAN) route:list

queue-work: ## Запуск обработчика очередей
	$(ARTISAN) queue:work

schedule-work: ## Запуск планировщика задач
	$(ARTISAN) schedule:work

reverb-start: ## Запуск Reverb сервера (production)
	$(ARTISAN) reverb:start

reverb-dev: ## Запуск Reverb сервера (разработка)
	$(ARTISAN) reverb:start --host=$(REVERB_HOST) --port=$(REVERB_PORT) 