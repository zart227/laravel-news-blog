<template>
  <Head :title="article.title" />

  <AppLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        {{ article.title }}
      </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div class="p-6">
            <!-- Article Header -->
            <div class="mb-8">
              <h1 class="text-3xl font-bold mb-4">{{ article.title }}</h1>
              <div class="flex items-center text-gray-600 text-sm mb-4">
                <span>{{ article.user.name }}</span>
                <span class="mx-2">•</span>
                <span>{{ formatDate(article.created_at) }}</span>
              </div>
              <div class="flex gap-2">
                <span v-for="tag in article.tags" 
                      :key="tag.id"
                      class="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-md">
                  {{ tag.name }}
                </span>
              </div>
            </div>

            <!-- Article Image -->
            <img v-if="article.image_url" 
                 :src="article.image_url" 
                 :alt="article.title"
                 class="w-full h-96 object-cover rounded-lg mb-8">

            <!-- Article Content -->
            <div class="prose max-w-none" v-html="article.content"></div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { Head } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<style>
.prose {
  @apply text-gray-800 leading-relaxed;
}

.prose h2 {
  @apply text-2xl font-bold mt-8 mb-4;
}

.prose p {
  @apply mb-4;
}

.prose a {
  @apply text-blue-600 hover:text-blue-800;
}

.prose ul {
  @apply list-disc list-inside mb-4;
}

.prose ol {
  @apply list-decimal list-inside mb-4;
}

.prose blockquote {
  @apply border-l-4 border-gray-300 pl-4 italic my-4;
}

.prose code {
  @apply bg-gray-100 px-1 rounded;
}

.prose pre {
  @apply bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto;
}
</style> 