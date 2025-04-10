<script setup lang="ts">
import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import StatisticsCard from '@/Components/Statistics/StatisticsCard.vue';
import { ChartBarIcon, DocumentTextIcon, TagIcon, UserGroupIcon } from '@heroicons/vue/24/outline';
import { formatDate, exportToCSV } from '@/utils/statistics.utils';

interface PopularArticle {
  id: number;
  title: string;
  views: number;
  created_at: string;
}

interface Props {
  statistics: {
    views: {
      total: number;
      growth: number;
    };
    users: {
      total: number;
      growth: number;
    };
    articles: {
      total: number;
      growth: number;
    };
    tags: {
      total: number;
      growth: number;
    };
  };
  popularArticles: PopularArticle[];
}

defineProps<Props>();

const period = ref('week');
</script>

<template>
  <AppLayout>
    <Head title="Статистика" />

    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
        Статистика
      </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="mb-6 flex justify-end space-x-4">
          <select
            v-model="period"
            class="rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 shadow-sm"
          >
            <option value="week">За неделю</option>
            <option value="month">За месяц</option>
            <option value="year">За год</option>
          </select>
          <button
            @click="exportToCSV(popularArticles)"
            class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
          >
            Экспорт в CSV
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatisticsCard
            title="Просмотры"
            :value="statistics.views.total"
            :growth="statistics.views.growth"
            :icon="ChartBarIcon"
          />
          <StatisticsCard
            title="Пользователи"
            :value="statistics.users.total"
            :growth="statistics.users.growth"
            :icon="UserGroupIcon"
          />
          <StatisticsCard
            title="Статьи"
            :value="statistics.articles.total"
            :growth="statistics.articles.growth"
            :icon="DocumentTextIcon"
          />
          <StatisticsCard
            title="Теги"
            :value="statistics.tags.total"
            :growth="statistics.tags.growth"
            :icon="TagIcon"
          />
        </div>

        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              Популярные статьи
            </h3>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Название
                    </th>
                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Просмотры
                    </th>
                    <th class="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Дата создания
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="article in popularArticles" :key="article.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {{ article.title }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {{ article.views }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {{ formatDate(article.created_at) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template> 