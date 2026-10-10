```mermaid
erDiagram
    users ||--o{ articles : "creates"
    users ||--o{ comments : "writes"
    articles ||--o{ comments : "has"
    articles ||--o{ article_views : "has"
    articles }|--|| users : "belongs_to"
    comments }|--|| users : "belongs_to"
    comments ||--o{ comments : "has_replies"
    articles }o--o{ tags : "has"
    article_views }|--o| users : "belongs_to"

    users {
        id int PK "Первичный ключ"
        name varchar "Имя пользователя"
        email varchar "Email пользователя"
        password varchar "Хэш пароля"
        role enum "Роль (admin/user)"
        email_verified_at timestamp "Дата верификации email"
        remember_token varchar "Токен для 'запомнить меня'"
        created_at timestamp "Дата создания"
        updated_at timestamp "Дата обновления"
    }

    articles {
        id int PK "Первичный ключ"
        title varchar "Заголовок статьи"
        content text "Содержание статьи"
        image_path varchar "Путь к изображению"
        user_id int FK "Внешний ключ на users"
        status enum "Статус (draft/published)"
        created_at timestamp "Дата создания"
        updated_at timestamp "Дата обновления"
    }

    comments {
        id int PK "Первичный ключ"
        content text "Текст комментария"
        article_id int FK "Внешний ключ на articles"
        user_id int FK "Внешний ключ на users"
        parent_id int FK "Внешний ключ на comments (для древовидных комментариев)"
        created_at timestamp "Дата создания"
        updated_at timestamp "Дата обновления"
    }

    article_views {
        id int PK "Первичный ключ"
        article_id int FK "Внешний ключ на articles"
        user_id int FK "Внешний ключ на users (может быть null для анонимных просмотров)"
        ip_address varchar "IP адрес просмотревшего"
        viewed_at timestamp "Дата и время просмотра"
    }

    tags {
        id int PK "Первичный ключ"
        name varchar "Название тега"
        slug varchar "URL-friendly версия названия"
        created_at timestamp "Дата создания"
        updated_at timestamp "Дата обновления"
    }

    article_tag {
        article_id int FK "Внешний ключ на articles"
        tag_id int FK "Внешний ключ на tags"
    }
```

## Тестовые данные (seeds)

### Users
1. Admin user:
   - name: "Admin User"
   - email: "admin@example.com"
   - role: "admin"

2. Regular user:
   - name: "Test User"
   - email: "user@example.com"
   - role: "user"

### Tags
1. Технологии (slug: technologies)
2. Новости (slug: news)
3. Туториалы (slug: tutorials)
4. Разработка (slug: development)

### Articles
1. Тестовая статья:
   - title: "Введение в Laravel"
   - user_id: 1 (admin)
   - status: "published"
   - tags: ["Технологии", "Туториалы"]

2. Черновик статьи:
   - title: "Работа с Docker"
   - user_id: 1 (admin)
   - status: "draft"
   - tags: ["Разработка", "Туториалы"]

### Comments
1. Родительский комментарий:
   - content: "Отличная статья!"
   - user_id: 2
   - article_id: 1

2. Ответ на комментарий:
   - content: "Спасибо за отзыв!"
   - user_id: 1
   - article_id: 1
   - parent_id: 1

### Article Views
Несколько тестовых просмотров с разными временными метками для тестирования статистики:
- Анонимные просмотры (ip_address: "127.0.0.1")
- Авторизованные просмотры (user_id: 2) 