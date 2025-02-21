<template>
  <AppLayout>
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Период и экспорт -->
        <div class="flex justify-between items-center mb-6">
          <div class="w-64">
            <label class="block text-sm font-medium text-gray-700">Период</label>
            <select
              v-model="period"
              @change="fetchStatistics"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="week">Неделя</option>
              <option value="month">Месяц</option>
              <option value="year">Год</option>
            </select>
          </div>
          <button
            @click="exportStatistics"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Экспорт CSV
          </button>
        </div>

        <!-- Общая статистика -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-6">
          <div v-for="(stat, key) in summary" :key="key" class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <dt class="text-sm font-medium text-gray-500 truncate">{{ formatStatName(key) }}</dt>
              <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stat }}</dd>
            </div>
          </div>
        </div>

        <!-- Таблица статей -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg font-medium text-gray-900">Статистика по статьям</h3>
          </div>
          <div class="border-t border-gray-200">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Название
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Просмотры
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Комментарии
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Дата создания
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="article in articlesStats" :key="article.id" :class="{ 'bg-green-50': article.isUpdated }">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ article.title }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="{
                        'px-2 py-1 text-xs rounded-full': true,
                        'bg-green-100 text-green-800': article.status === 'published',
                        'bg-gray-100 text-gray-800': article.status === 'draft'
                      }">
                        {{ article.status === 'published' ? 'Опубликовано' : 'Черновик' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap" :class="{ 'text-green-600': article.updatedField === 'views' }">
                      {{ article.views }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap" :class="{ 'text-green-600': article.updatedField === 'comments' }">
                      {{ article.comments }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      {{ formatDate(article.created_at) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Графики -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <!-- График просмотров -->
          <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Просмотры</h3>
            <LineChart
              v-if="viewsChartData"
              :chart-data="viewsChartData"
              :options="chartOptions"
            />
          </div>

          <!-- График комментариев -->
          <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Комментарии</h3>
            <LineChart
              v-if="commentsChartData"
              :chart-data="commentsChartData"
              :options="chartOptions"
            />
          </div>
        </div>

        <!-- Популярные статьи и активные пользователи -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Популярные статьи -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg font-medium text-gray-900">Популярные статьи</h3>
            </div>
            <div class="border-t border-gray-200">
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="article in popularArticles" :key="article.id" class="px-4 py-4 sm:px-6">
                  <div class="flex items-center justify-between">
                    <div class="truncate">
                      <p class="font-medium text-indigo-600 truncate">{{ article.title }}</p>
                      <p class="text-sm text-gray-500">{{ article.author }}</p>
                    </div>
                    <div class="ml-2 flex-shrink-0 flex">
                      <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {{ article.views }} просмотров
                      </p>
                      <p class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {{ article.comments }} комментариев
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Активные пользователи -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg font-medium text-gray-900">Активные пользователи</h3>
            </div>
            <div class="border-t border-gray-200">
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="(user, index) in activeUsers" :key="index" class="px-4 py-4 sm:px-6">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-900">{{ user.user }}</p>
                    <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {{ user.comments }} комментариев
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Line as LineChart } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { notify } from '@/utils/notifications';
import Papa from 'papaparse';

// Регистрируем компоненты Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const period = ref('week');
const summary = ref({});
const views = ref([]);
const comments = ref([]);
const popularArticles = ref([]);
const activeUsers = ref([]);
const articlesStats = ref([]);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const viewsChartData = computed(() => {
  if (!views.value.length) return null;

  const labels = views.value.map(item => item.date);
  return {
    labels,
    datasets: [
      {
        label: 'Все просмотры',
        data: views.value.map(item => item.views),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Уникальные просмотры',
        data: views.value.map(item => item.unique_views),
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1
      }
    ]
  };
});

const commentsChartData = computed(() => {
  if (!comments.value.length) return null;

  const labels = comments.value.map(item => item.date);
  return {
    labels,
    datasets: [
      {
        label: 'Комментарии',
        data: comments.value.map(item => item.count),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };
});

const formatStatName = (key) => {
  const names = {
    total_articles: 'Всего статей',
    published_articles: 'Опубликовано',
    total_views: 'Просмотров',
    total_comments: 'Комментариев',
    unique_viewers: 'Уникальных просмотров'
  };
  return names[key] || key;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const fetchStatistics = async () => {
  try {
    const response = await axios.get('/api/statistics', {
      params: { period: period.value }
    });
    
    summary.value = response.data.summary;
    views.value = response.data.views;
    comments.value = response.data.comments;
    popularArticles.value = response.data.popular_articles;
    activeUsers.value = response.data.active_users;
    articlesStats.value = response.data.articles_stats;
  } catch (error) {
    notify.error('Ошибка при загрузке статистики');
  }
};

const updateArticleStats = (articleId, type, count) => {
  const article = articlesStats.value.find(a => a.id === articleId);
  if (article) {
    article[type] = count;
    article.isUpdated = true;
    article.updatedField = type;
    
    // Сбрасываем флаг обновления через 2 секунды
    setTimeout(() => {
      article.isUpdated = false;
      article.updatedField = null;
    }, 2000);
    
    articlesStats.value = [...articlesStats.value].sort((a, b) => b.views - a.views);
  }
};

const exportStatistics = () => {
  const data = articlesStats.value.map(article => ({
    'Название': article.title,
    'Статус': article.status === 'published' ? 'Опубликовано' : 'Черновик',
    'Просмотры': article.views,
    'Комментарии': article.comments,
    'Дата создания': formatDate(article.created_at)
  }));
  
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `statistics_${period.value}_${new Date().toISOString()}.csv`;
  link.click();
};

// Подписываемся на канал статистики
let echo = null;
let updateInterval = null;

onMounted(() => {
  fetchStatistics();
  
  echo = window.Echo.channel('statistics')
    .listen('StatisticsUpdated', (e) => {
      updateArticleStats(e.article_id, e.type, e.count);
      notify.info(`Обновлена статистика: ${e.type} для статьи #${e.article_id}`);
    })
    .error((error) => {
      notify.error('Ошибка подключения к WebSocket');
      console.error('WebSocket error:', error);
    });

  // Добавляем обработчики состояния соединения
  echo.connector.pusher.connection.bind('disconnected', () => {
    notify.warning('Соединение потеряно, пытаемся переподключиться...');
  });

  echo.connector.pusher.connection.bind('connected', () => {
    notify.success('Соединение восстановлено');
    fetchStatistics();
  });

  // Автообновление каждые 5 минут
  updateInterval = setInterval(fetchStatistics, 5 * 60 * 1000);
});

onBeforeUnmount(() => {
  if (echo) {
    echo.stopListening('StatisticsUpdated');
    echo.connector.pusher.connection.unbind_all();
  }
  if (updateInterval) {
    clearInterval(updateInterval);
  }
});
</script>

<style scoped>
.updated-value {
  animation: highlight 2s ease-out;
}

@keyframes highlight {
  0% {
    background-color: rgba(59, 130, 246, 0.1);
  }
  100% {
    background-color: transparent;
  }
}
</style> 