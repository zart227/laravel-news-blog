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
        id int PK
        name varchar
        email varchar
        password varchar
        role enum
        created_at timestamp
        updated_at timestamp
    }

    articles {
        id int PK
        title varchar
        content text
        image_path varchar
        user_id int FK
        status enum
        created_at timestamp
        updated_at timestamp
    }

    comments {
        id int PK
        content text
        article_id int FK
        user_id int FK
        parent_id int FK
        created_at timestamp
        updated_at timestamp
    }

    article_views {
        id int PK
        article_id int FK
        user_id int FK
        ip_address varchar
        viewed_at timestamp
    }

    tags {
        id int PK
        name varchar
        slug varchar
        created_at timestamp
        updated_at timestamp
    }

    article_tag {
        article_id int FK
        tag_id int FK
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