<template>
  <Head title="Статьи" />

  <AppLayout title="Статьи">
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Статьи
      </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="article in articles" 
               :key="article.id" 
               class="relative flex flex-col">
            <ArticleCard 
              :article="article" 
              prefetch="hover"
            />
          </div>
        </div>

        <!-- Индикатор загрузки и конца списка -->
        <div v-if="isFirstPage && articles.length === 0" 
             class="text-center py-6 text-gray-600">
          Статьи не найдены
        </div>
        <div v-else>
          <div ref="loadingTrigger" class="h-20 mt-6"></div>
          <WhenVisible
            v-if="hasMorePages"
            :params="visibleParams"
            :buffer="1000"
          >
            <div class="flex justify-center py-6">
              <LoadingSpinner />
            </div>
          </WhenVisible>
          <div v-if="!hasMorePages && articles.length > 0"
               class="text-center py-6 text-gray-600">
            Вы достигли конца списка
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { Head, usePage, WhenVisible } from '@inertiajs/vue3';
import { computed, ref, onMounted, watch } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import ArticleCard from '@/Components/Articles/ArticleCard.vue';
import LoadingSpinner from '@/Components/UI/LoadingSpinner.vue';
import type { Article, PageProps, ArticlesPagination } from '@/types';

interface WhenVisibleParams {
  data: {
    page: number;
  };
  only: string[];
  preserveState: boolean;
}

const page = usePage<PageProps>();
const loadingTrigger = ref<HTMLElement | null>(null);

// Сохраняем все загруженные статьи
const allArticles = ref<Article[]>([]);

// При изменении данных статей обновляем массив всех статей
watch(() => page.props.articles, (newArticles: Article[] | undefined) => {
  if (!newArticles) return;

  if (page.props.articlesPagination?.current_page === 1) {
    // Если это первая страница, заменяем весь массив
    allArticles.value = [...newArticles];
  } else {
    // Иначе добавляем новые статьи в конец массива
    const uniqueNewArticles = newArticles.filter(article => 
      !allArticles.value.some(existing => existing.id === article.id)
    );
    allArticles.value = [...allArticles.value, ...uniqueNewArticles];
  }
}, { immediate: true });

// Используем вычисляемый массив для отображения статей
const articles = computed(() => {
  return allArticles.value;
});

const hasMorePages = computed(() => {
  const pagination = page.props.articlesPagination;
  return pagination ? pagination.current_page < pagination.last_page : false;
});

const isFirstPage = computed(() => {
  return page.props.articlesPagination?.current_page === 1;
});

const visibleParams = computed<WhenVisibleParams>(() => ({
  data: {
    page: page.props.articlesPagination?.current_page ? page.props.articlesPagination.current_page + 1 : 1,
  },
  only: ['articles', 'articlesPagination'],
  preserveState: true
}));
</script> 