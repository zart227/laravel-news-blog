<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Статьи</h1>
    
    <div v-if="loading" class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ error }}
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="article in articles.data" :key="article.id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <img v-if="article.image" :src="article.image" :alt="article.title" class="w-full h-48 object-cover">
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-2">
            <Link :href="route('articles.show', article.id)" class="hover:text-blue-600">
              {{ article.title }}
            </Link>
          </h2>
          <p class="text-gray-600 mb-4">{{ article.excerpt }}</p>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img :src="article.user.avatar" :alt="article.user.name" class="w-8 h-8 rounded-full mr-2">
              <span class="text-sm text-gray-600">{{ article.user.name }}</span>
            </div>
            <span class="text-sm text-gray-500">{{ formatDate(article.created_at) }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="articles.data?.length === 0" class="text-center text-gray-600 mt-8">
      Статьи не найдены
    </div>
    
    <div v-if="articles.links" class="mt-8">
      <Pagination :links="articles.links" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Link } from '@inertiajs/vue3';
import axios from 'axios';
import Pagination from '@/Components/Pagination.vue';

const articles = ref({ data: [] });
const loading = ref(true);
const error = ref(null);

const loadArticles = async () => {
  try {
    const response = await axios.get('/api/articles');
    articles.value = response.data;
  } catch (err) {
    error.value = 'Ошибка при загрузке статей: ' + err.message;
    console.error('Error loading articles:', err);
  } finally {
    loading.value = false;
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

onMounted(() => {
  loadArticles();
});
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