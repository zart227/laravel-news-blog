<template>
  <Head title="Статьи" />

  <AppLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Статьи
      </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="article in articles.data" :key="article.id" 
               class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <img v-if="article.image_url" 
                 :src="article.image_url" 
                 :alt="article.title" 
                 class="w-full h-48 object-cover">
            <div class="p-6">
              <h2 class="text-xl font-semibold mb-2">
                <Link :href="route('articles.show', article.id)" 
                      class="hover:text-blue-600">
                  {{ article.title }}
                </Link>
              </h2>
              <p class="text-gray-600 mb-4">
                {{ truncate(article.content, 150) }}
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <span class="text-sm text-gray-600">
                    {{ article.user.name }}
                  </span>
                </div>
                <span class="text-sm text-gray-500">
                  {{ formatDate(article.created_at) }}
                </span>
              </div>
              <div class="mt-2 flex flex-wrap gap-2">
                <span v-for="tag in article.tags" 
                      :key="tag.id"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ tag.name }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="articles.data.length === 0" 
             class="text-center text-gray-600 mt-8">
          Статьи не найдены
        </div>

        <div v-if="articles.links" class="mt-8">
          <Pagination :links="articles.links" />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import Pagination from '@/Components/Pagination.vue';

const props = defineProps({
    articles: {
        type: Object,
        required: true
    }
});

const truncate = (text, length) => {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};
</script> 