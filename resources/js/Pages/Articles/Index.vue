<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Фильтры -->
    <div class="mb-8 flex flex-wrap gap-4">
      <div class="flex-1 min-w-[200px]">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Поиск по заголовку..."
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          @input="debouncedSearch"
        >
      </div>
      <div v-if="tags.length" class="flex-1 min-w-[200px]">
        <select
          v-model="selectedTag"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          @change="fetchArticles"
        >
          <option value="">Все теги</option>
          <option
            v-for="tag in tags"
            :key="tag.id"
            :value="tag.id"
          >
            {{ tag.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- Список статей -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article
        v-for="article in articles.data"
        :key="article.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
      >
        <Link :href="`/articles/${article.id}`">
          <img
            v-if="article.image"
            :src="'/storage/' + article.image"
            :alt="article.title"
            class="w-full h-48 object-cover"
          >
          <div class="p-4">
            <h2 class="text-xl font-semibold mb-2">{{ article.title }}</h2>
            <p class="text-gray-600 mb-4">{{ truncateText(article.content, 150) }}</p>
            
            <!-- Метаданные -->
            <div class="flex items-center justify-between text-sm text-gray-500">
              <span>{{ article.user.name }}</span>
              <span>{{ formatDate(article.created_at) }}</span>
            </div>
            
            <!-- Теги -->
            <div v-if="article.tags && article.tags.length" class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in article.tags"
                :key="tag.id"
                class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
              >
                {{ tag.name }}
              </span>
            </div>
          </div>
        </Link>
      </article>
    </div>

    <!-- Пагинация -->
    <div v-if="articles.links && articles.links.length > 3" class="mt-8 flex justify-center">
      <button
        v-for="link in articles.links"
        :key="link.label"
        @click="goToPage(link.url)"
        :disabled="!link.url"
        :class="[
          'px-4 py-2 mx-1 rounded',
          {
            'bg-blue-500 text-white': link.active,
            'bg-gray-200 text-gray-700 hover:bg-gray-300': !link.active && link.url,
            'bg-gray-100 text-gray-500 cursor-not-allowed': !link.url
          }
        ]"
        v-html="link.label"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Link } from '@inertiajs/vue3'
import debounce from 'lodash/debounce'
import axios from 'axios'
import { notify } from '@/utils/notifications'

const props = defineProps({
  tags: {
    type: Array,
    default: () => []
  }
})

const articles = ref({
  data: [],
  links: []
})
const searchQuery = ref('')
const selectedTag = ref('')

const fetchArticles = async (url = '/api/articles', params = {}) => {
  try {
    const response = await axios.get(url, {
      params: {
        ...params,
        search: searchQuery.value,
        tag: selectedTag.value
      }
    })
    articles.value = response.data
  } catch (error) {
    notify.error('Ошибка при загрузке статей')
  }
}

const debouncedSearch = debounce(() => {
  fetchArticles()
}, 300)

const goToPage = (url) => {
  if (url) {
    fetchArticles(url)
  }
}

const truncateText = (text, length) => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  fetchArticles()
})
</script> 