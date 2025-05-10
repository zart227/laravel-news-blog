<template>
  <div v-if="$page.props.auth.user?.role === 'admin'" class="bg-white shadow mb-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex space-x-8 h-16">
        <NavLink :href="route('admin.articles')" :active="route().current('admin.articles')">
          Управление статьями
        </NavLink>
        <NavLink :href="route('admin.statistics')" :active="route().current('admin.statistics')">
          Статистика
        </NavLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavLink from '@/Components/NavLink.vue';
</script> 