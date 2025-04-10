<template>
  <Head title="Статистика" />

  <AdminLayout title="Статистика">
    <div class="space-y-6">
      <!-- Основные метрики -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticsCard
          title="Всего статей"
          :value="totalArticles"
          icon="document"
          color="blue"
        />
        <StatisticsCard
          title="Всего просмотров"
          :value="totalViews"
          icon="eye"
          color="green"
        />
        <StatisticsCard
          title="Всего лайков"
          :value="totalLikes"
          icon="heart"
          color="red"
        />
        <StatisticsCard
          title="Всего комментариев"
          :value="totalComments"
          icon="chat"
          color="purple"
        />
      </div>

      <!-- Популярные статьи -->
      <div class="bg-white shadow rounded-lg">
        <div class="p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">
            Популярные статьи
          </h2>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Название
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Просмотры
                  </th>
                  <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Лайки
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="article in popularArticles" :key="article.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ article.title }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {{ article.views }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {{ article.likes }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import StatisticsCard from '@/Components/Statistics/StatisticsCard.vue';
import { Head } from '@inertiajs/vue3';

interface Props {
  totalArticles: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  popularArticles: Array<{
    id: number;
    title: string;
    views: number;
    likes: number;
  }>;
}

defineProps<Props>();
</script> 