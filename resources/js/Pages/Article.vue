<template>
  <AppLayout>
    <div class="bg-white shadow rounded-lg p-6">
      <div v-if="article" class="space-y-6">
        <!-- Статья -->
        <div>
          <h1 class="text-3xl font-bold">{{ article.title }}</h1>
          <div class="mt-2 flex items-center text-sm text-gray-500">
            <span>{{ article.user.name }}</span>
            <span class="mx-2">&bull;</span>
            <span>{{ formatDate(article.created_at) }}</span>
          </div>
          <img 
            v-if="article.image_path" 
            :src="`/storage/${article.image_path}`" 
            :alt="article.title"
            class="mt-4 w-full h-64 object-cover rounded-lg"
          >
          <div class="mt-6 prose max-w-none" v-html="article.content"></div>
          
          <!-- Теги -->
          <div v-if="article.tags.length" class="mt-6 flex gap-2">
            <span 
              v-for="tag in article.tags" 
              :key="tag.id"
              class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
            >
              {{ tag.name }}
            </span>
          </div>
        </div>

        <!-- Комментарии -->
        <Comments 
          :article-id="article.id" 
          :initial-comments="article.comments"
          :user="$page.props.auth.user"
        />
      </div>

      <div v-else class="text-center py-12">
        <p class="text-gray-500">Загрузка статьи...</p>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import { ref, onMounted } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import Comments from '@/Components/Comments.vue';
import axios from 'axios';

export default {
  components: {
    AppLayout,
    Comments,
  },

  props: {
    articleId: {
      type: [Number, String],
      required: true,
    },
  },

  setup(props) {
    const article = ref(null);

    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${props.articleId}`);
        article.value = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке статьи:', error);
      }
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    onMounted(() => {
      fetchArticle();
    });

    return {
      article,
      formatDate,
    };
  },
};
</script>

<style scoped>
.article-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.article-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.article-meta {
  margin-bottom: 1.5rem;
  color: #6c757d;
}

.article-meta > * {
  margin-right: 1rem;
}

.article-image {
  margin-bottom: 1.5rem;
}

.article-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.article-content {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.tags {
  margin-top: 0.5rem;
}

.badge {
  font-size: 0.9rem;
  padding: 0.4em 0.8em;
}
</style> 