<script setup lang="ts">
import AppLayout from '@/Layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';

defineProps<{
  errors: Record<string, string[]>;
}>();
</script>

<template>
  <Head title="Панель администратора" />

  <AppLayout title="Панель администратора">
    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
      <div class="p-6 text-gray-900">
        <h2 class="text-2xl font-semibold mb-4">Добро пожаловать в панель администратора</h2>
        <p class="mb-4">Здесь вы можете управлять содержимым сайта:</p>
        <ul class="list-disc list-inside space-y-2">
          <li>Управление статьями</li>
          <li>Управление тегами</li>
          <li>Управление категориями</li>
          <li>Управление пользователями</li>
          <li>Управление комментариями</li>
          <li>Просмотр статистики</li>
        </ul>
      </div>
    </div>
  </AppLayout>
</template> 