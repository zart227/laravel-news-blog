<script setup lang="ts">
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head } from '@inertiajs/vue3';

defineProps<{
  errors: Record<string, string[]>;
}>();
</script>

<template>
  <Head title="Панель администратора" />

  <AdminLayout title="Панель администратора">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Карточка статистики статей -->
      <div class="bg-white overflow-hidden shadow-sm rounded-lg">
        <div class="p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-indigo-100">
              <svg class="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-lg font-semibold text-gray-700">Статьи</h2>
              <p class="mt-2 text-sm text-gray-500">Управление статьями блога</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Карточка статистики тегов -->
      <div class="bg-white overflow-hidden shadow-sm rounded-lg">
        <div class="p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100">
              <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5a1.99 1.99 0 011.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-lg font-semibold text-gray-700">Теги</h2>
              <p class="mt-2 text-sm text-gray-500">Управление тегами</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Карточка статистики -->
      <div class="bg-white overflow-hidden shadow-sm rounded-lg">
        <div class="p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100">
              <svg class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-lg font-semibold text-gray-700">Статистика</h2>
              <p class="mt-2 text-sm text-gray-500">Аналитика и отчеты</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template> 