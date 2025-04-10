<template>
  <Head title="Статистика" />
  <AppLayout title="Статистика">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Статистика блога</h1>

      <!-- Общая статистика -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Общие просмотры</h2>
          <p class="text-4xl font-bold text-blue-600">{{ statistics.total_views }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Уникальные просмотры</h2>
          <p class="text-4xl font-bold text-green-600">{{ statistics.total_unique_views }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Среднее количество просмотров</h2>
          <p class="text-4xl font-bold text-purple-600">{{ Math.round(statistics.average_views_per_article) }}</p>
        </div>
      </div>

      <!-- Популярные браузеры -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-6">Популярные браузеры</h2>
        <div class="space-y-4">
          <div v-for="browser in statistics.most_used_browsers" :key="browser._id" class="flex justify-between items-center">
            <span class="text-gray-700">{{ browser._id }}</span>
            <span class="text-blue-600 font-semibold">{{ browser.count }} просмотров</span>
          </div>
        </div>
      </div>

      <!-- Источники трафика -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-6">Источники трафика</h2>
        <div class="space-y-4">
          <div v-for="referrer in statistics.top_referrers" :key="referrer._id" class="flex justify-between items-center">
            <span class="text-gray-700">{{ referrer._id || 'Прямой переход' }}</span>
            <span class="text-green-600 font-semibold">{{ referrer.count }} переходов</span>
          </div>
        </div>
      </div>

      <!-- Популярные статьи -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-semibold mb-6">Популярные статьи</h2>
        <div class="space-y-6">
          <div v-for="item in popularArticles" :key="item.article.id" class="border-b pb-4 last:border-0">
            <h3 class="text-xl font-medium mb-2">
              <Link 
                :href="route('articles.show', item.article.slug)" 
                class="text-blue-600 hover:text-blue-800"
              >
                {{ item.article.title }}
              </Link>
            </h3>
            <div class="flex space-x-6 text-sm text-gray-600">
              <span>{{ item.statistics.views }} просмотров</span>
              <span>{{ item.statistics.unique_views }} уникальных просмотров</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { Link, Head } from '@inertiajs/vue3';
import { PropType } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';

interface Statistics {
  total_views: number;
  total_unique_views: number;
  average_views_per_article: number;
  most_used_browsers: Array<{
    _id: string;
    count: number;
  }>;
  top_referrers: Array<{
    _id: string;
    count: number;
  }>;
}

interface Article {
  id: number;
  title: string;
  slug: string;
}

interface PopularArticle {
  article: Article;
  statistics: {
    views: number;
    unique_views: number;
  };
}

defineProps({
  statistics: {
    type: Object as PropType<Statistics>,
    required: true
  },
  popularArticles: {
    type: Array as PropType<Array<PopularArticle>>,
    required: true
  }
});
</script> 