<template>
    <Head :title="page.props.tag.name" />

    <AppLayout :title="page.props.tag.name">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white shadow sm:rounded-lg mb-6">
                <div class="px-4 py-5 sm:p-6">
                    <h3 class="text-xl font-semibold text-gray-900">
                        {{ page.props.tag.name }}
                    </h3>
                    <div class="mt-2 text-gray-600">
                        <p>{{ page.props.tag.description }}</p>
                    </div>
                </div>
            </div>

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
                <p class="mb-4">В этом теге пока нет статей</p>
                <Link
                    :href="route('articles.index')"
                    class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700"
                    prefetch="hover"
                >
                    Все статьи
                </Link>
            </div>
            <div v-else>
                <div ref="loadingTrigger" class="h-20 mt-6"></div>
                <WhenVisible
                    v-if="hasMorePages"
                    :params="{
                        data: {
                            page: page.props.articlesPagination.current_page + 1,
                        },
                        only: ['articles', 'articlesPagination'],
                        preserveScroll: true,
                        preserveState: true
                    }"
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
    </AppLayout>
</template>

<script setup lang="ts">
import { Head, Link, usePage, WhenVisible } from '@inertiajs/vue3';
import { computed, ref, onMounted, watch } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import ArticleCard from '@/Components/Articles/ArticleCard.vue';
import LoadingSpinner from '@/Components/UI/LoadingSpinner.vue';

const page = usePage();
const loadingTrigger = ref(null);

// Сохраняем все загруженные статьи
const allArticles = ref([]);

// При изменении данных статей обновляем массив всех статей
watch(() => page.props.articles.data, (newArticles) => {
  if (page.props.articlesPagination.current_page === 1) {
    // Если это первая страница, заменяем весь массив
    allArticles.value = [...newArticles];
  } else {
    // Иначе добавляем новые статьи в конец массива
    const newArticleIds = new Set(newArticles.map(a => a.id));
    const uniqueNewArticles = newArticles.filter(a => !allArticles.value.some(existing => existing.id === a.id));
    allArticles.value = [...allArticles.value, ...uniqueNewArticles];
  }
}, { immediate: true });

// Используем вычисляемый массив для отображения статей
const articles = computed(() => {
  return allArticles.value;
});

const hasMorePages = computed(() => {
    const pagination = page.props.articlesPagination;
    return pagination && pagination.current_page < pagination.last_page;
});

const isFirstPage = computed(() => {
    return page.props.articlesPagination?.current_page === 1;
});
</script> 