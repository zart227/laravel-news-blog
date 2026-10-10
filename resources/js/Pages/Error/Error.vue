<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';

interface Props {
  status: number;
  message?: string;
  ziggy: {
    location: string;
    query: Record<string, string>;
  };
}

const props = defineProps<Props>();

const title = {
  404: 'Страница не найдена',
  500: 'Ошибка сервера',
  503: 'Сервис недоступен',
}[props.status] || 'Ошибка';

const goToHome = () => {
  router.visit(route('articles.index'));
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <Head :title="title" />
    
    <div class="max-w-xl w-full bg-white shadow-lg rounded-lg p-8 text-center">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">{{ status }}</h1>
      <p class="text-xl text-gray-600 mb-6">{{ title }}</p>
      <p v-if="message" class="text-gray-500 mb-8">{{ message }}</p>
      <button
        @click="goToHome"
        class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Вернуться на главную
      </button>
    </div>
  </div>
</template> 