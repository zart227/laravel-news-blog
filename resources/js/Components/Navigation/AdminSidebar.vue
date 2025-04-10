<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import { route } from 'ziggy-js';

const currentRoute = computed(() => route().current());

const isActive = (routeName: string) => {
  return currentRoute.value?.startsWith(routeName);
};
</script>

<template>
  <div class="bg-white shadow w-64 min-h-screen">
    <div class="p-4 border-b border-gray-200">
      <h2 class="text-xl font-semibold text-gray-800">Панель управления</h2>
    </div>
    <nav class="p-4">
      <ul class="space-y-2">
        <li>
          <Link
            :href="route('admin.dashboard')"
            :class="[
              'flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100',
              { 'bg-gray-100 text-indigo-600': isActive('admin.dashboard') }
            ]"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Обзор
          </Link>
        </li>
        <li>
          <Link
            :href="route('admin.articles.index')"
            :class="[
              'flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100',
              { 'bg-gray-100 text-indigo-600': isActive('admin.articles') }
            ]"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
            </svg>
            Статьи
          </Link>
        </li>
        <li>
          <Link
            :href="route('admin.tags.index')"
            :class="[
              'flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100',
              { 'bg-gray-100 text-indigo-600': isActive('admin.tags') }
            ]"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5a1.99 1.99 0 011.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Теги
          </Link>
        </li>
        <li>
          <Link
            :href="route('admin.statistics')"
            :class="[
              'flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100',
              { 'bg-gray-100 text-indigo-600': isActive('admin.statistics') }
            ]"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Статистика
          </Link>
        </li>
      </ul>
    </nav>
  </div>
</template> 