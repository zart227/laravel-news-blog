<template>
  <div class="articles-list">
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-else>
      <!-- Список статей -->
      <div class="row">
        <div v-for="article in articles.data" :key="article.id" class="col-md-6 mb-4">
          <div class="card h-100">
            <img
              v-if="article.image_path"
              :src="'/storage/' + article.image_path"
              class="card-img-top"
              :alt="article.title"
            >
            <div class="card-body">
              <h5 class="card-title">{{ article.title }}</h5>
              <div class="card-meta text-muted mb-2">
                <small>
                  Автор: {{ article.user.name }} |
                  {{ formatDate(article.created_at) }}
                </small>
              </div>
              <div class="tags mb-2">
                <span
                  v-for="tag in article.tags"
                  :key="tag.id"
                  class="badge bg-secondary me-1"
                >
                  {{ tag.name }}
                </span>
              </div>
              <p class="card-text">
                {{ truncateText(article.content, 150) }}
              </p>
              <router-link
                :to="{ name: 'article', params: { id: article.id }}"
                class="btn btn-primary"
              >
                Читать далее
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Пагинация -->
      <nav v-if="articles.meta" aria-label="Page navigation" class="mt-4">
        <ul class="pagination justify-content-center">
          <li
            v-for="link in articles.meta.links"
            :key="link.url"
            class="page-item"
            :class="{ active: link.active, disabled: !link.url }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="loadPage(link.url)"
              v-html="link.label"
            ></a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'ArticlesList',

  setup() {
    const articles = ref({ data: [] });
    const loading = ref(true);
    const error = ref(null);

    const loadArticles = async (url = '/api/articles') => {
      try {
        loading.value = true;
        const response = await axios.get(url);
        articles.value = response.data;
      } catch (err) {
        error.value = 'Ошибка при загрузке статей';
        console.error('Error loading articles:', err);
      } finally {
        loading.value = false;
      }
    };

    const loadPage = (url) => {
      if (url) {
        loadArticles(url);
        window.scrollTo(0, 0);
      }
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleString();
    };

    const truncateText = (text, length) => {
      if (text.length <= length) return text;
      return text.substring(0, length) + '...';
    };

    onMounted(() => {
      loadArticles();
    });

    return {
      articles,
      loading,
      error,
      loadPage,
      formatDate,
      truncateText
    };
  }
};
</script>

<style scoped>
.card-img-top {
  height: 200px;
  object-fit: cover;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.card-meta {
  font-size: 0.875rem;
}

.badge {
  font-size: 0.8rem;
}

.pagination {
  margin-bottom: 2rem;
}
</style> 