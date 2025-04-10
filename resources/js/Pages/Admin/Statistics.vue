<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import StatisticsCard from '@/Components/Statistics/StatisticsCard.vue';
import PopularArticles from '@/Components/Statistics/PopularArticles.vue';
import { 
  DocumentTextIcon, 
  EyeIcon, 
  HeartIcon, 
  ChatBubbleLeftIcon 
} from '@heroicons/vue/24/outline';

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
    comments: number;
  }>;
}

defineProps<Props>();
</script>

<template>
  <Head title="Статистика" />

  <AdminLayout>
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-gray-800">
        Статистика
      </h2>
    </template>

    <div class="py-12">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <StatisticsCard
            title="Всего статей"
            :value="totalArticles"
            :icon="DocumentTextIcon"
          />
          <StatisticsCard
            title="Всего просмотров"
            :value="totalViews"
            :icon="EyeIcon"
          />
          <StatisticsCard
            title="Всего лайков"
            :value="totalLikes"
            :icon="HeartIcon"
          />
          <StatisticsCard
            title="Всего комментариев"
            :value="totalComments"
            :icon="ChatBubbleLeftIcon"
          />
        </div>

        <div class="mt-8">
          <PopularArticles :articles="popularArticles" />
        </div>
      </div>
    </div>
  </AdminLayout>
</template> 