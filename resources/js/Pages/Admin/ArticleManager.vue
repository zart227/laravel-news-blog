<template>
  <AppLayout>
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Управление статьями</h1>
        <Link
          :href="route('admin.articles.create')"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Создать статью
        </Link>
      </div>

      <!-- Фильтры -->
      <div class="bg-white shadow rounded-lg p-4 mb-6">
        <div class="flex flex-wrap gap-4">
          <!-- Поиск -->
          <div class="flex-1 min-w-[200px]">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Поиск по заголовку..."
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              @input="debouncedSearch"
            >
          </div>

          <!-- Фильтр по статусу -->
          <div class="w-48">
            <select
              v-model="filters.status"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              @change="fetchArticles"
            >
              <option value="">Все статусы</option>
              <option value="published">Опубликованные</option>
              <option value="draft">Черновики</option>
            </select>
          </div>

          <!-- Фильтр по тегам -->
          <div class="w-48">
            <select
              v-model="filters.tag"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              @change="fetchArticles"
            >
              <option value="">Все теги</option>
              <option v-for="tag in tags" :key="tag.id" :value="tag.id">
                {{ tag.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Таблица статей -->
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Заголовок
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Автор
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата создания
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="article in articles.data" :key="article.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img
                    v-if="article.image_path"
                    :src="`/storage/${article.image_path}`"
                    class="h-10 w-10 rounded-md object-cover mr-3"
                    :alt="article.title"
                  >
                  <div class="text-sm font-medium text-gray-900">
                    {{ article.title }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ article.user.name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': article.status === 'published',
                    'bg-gray-100 text-gray-800': article.status === 'draft'
                  }"
                >
                  {{ article.status === 'published' ? 'Опубликовано' : 'Черновик' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(article.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <Link
                  :href="route('articles.show', article.id)"
                  class="text-indigo-600 hover:text-indigo-900"
                  target="_blank"
                >
                  Просмотр
                </Link>
                <Link
                  :href="route('admin.articles.edit', article.id)"
                  class="text-yellow-600 hover:text-yellow-900"
                >
                  Редактировать
                </Link>
                <button
                  @click="deleteArticle(article.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Удалить
                </button>
              </td>
            </tr>
            <tr v-if="articles.data.length === 0">
              <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                Статьи не найдены
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Пагинация -->
        <div class="px-6 py-4 bg-gray-50">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Показано {{ articles.from }}-{{ articles.to }} из {{ articles.total }} результатов
            </div>
            <div class="flex space-x-2">
              <button
                v-for="link in articles.links"
                :key="link.label"
                @click="goToPage(link.url)"
                class="px-3 py-1 rounded-md text-sm"
                :class="{
                  'bg-indigo-600 text-white': link.active,
                  'text-gray-700 hover:bg-gray-100': !link.active,
                  'opacity-50 cursor-not-allowed': !link.url
                }"
                :disabled="!link.url"
                v-html="link.label"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Link } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { notify } from '@/utils/notifications';

export default {
  components: {
    AppLayout,
    Link,
  },

  props: {
    tags: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    const articles = ref({
      data: [],
      links: [],
      from: 0,
      to: 0,
      total: 0,
    });

    const filters = ref({
      search: '',
      status: '',
      tag: '',
      page: 1,
    });

    const searchQuery = ref('');

    const fetchArticles = async (url = '/api/articles', params = {}) => {
      try {
        const response = await axios.get(url, { params });
        articles.value = response.data;
      } catch (error) {
        notify.error('Ошибка при загрузке статей');
        console.error('Error fetching articles:', error);
      }
    };

    const debouncedSearch = debounce(() => {
      filters.value.page = 1;
      fetchArticles('/api/articles', { search: searchQuery.value });
    }, 300);

    const goToPage = (url) => {
      if (url) {
        fetchArticles(url);
      }
    };

    const deleteArticle = async (id) => {
      if (!confirm('Вы уверены, что хотите удалить эту статью?')) {
        return;
      }

      try {
        await axios.delete(`/api/articles/${id}`);
        notify.success('Статья успешно удалена');
        fetchArticles();
      } catch (error) {
        notify.error('Ошибка при удалении статьи');
        console.error('Error deleting article:', error);
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
      fetchArticles();
    });

    return {
      articles,
      filters,
      formatDate,
      fetchArticles,
      debouncedSearch,
      goToPage,
      deleteArticle,
      tags: props.tags,
      searchQuery,
    };
  },
};
</script> 