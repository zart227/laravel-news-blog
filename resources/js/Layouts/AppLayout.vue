<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="shrink-0 flex items-center">
              <Link :href="route('articles.index')" class="text-xl font-bold text-gray-800">
                {{ appName }}
              </Link>
            </div>

            <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
              <NavLink :href="route('articles.index')" :active="$page.component === 'Articles/Index'">
                Статьи
              </NavLink>
              <NavLink :href="route('tags.index')" :active="$page.component === 'Tags/Index'">
                Теги
              </NavLink>
              <NavLink v-if="$page.props.auth?.user?.role === 'admin'" 
                      :href="route('admin.articles')" 
                      :active="$page.component.startsWith('Admin/Articles')">
                Управление статьями
              </NavLink>
              <NavLink v-if="$page.props.auth?.user?.role === 'admin'" 
                      :href="route('admin.statistics')" 
                      :active="$page.component === 'Admin/Statistics'">
                Статистика
              </NavLink>
            </div>
          </div>

          <div class="hidden sm:flex sm:items-center sm:ml-6">
            <div class="ml-3 relative">
              <div v-if="$page.props.auth?.user">
                <span class="text-gray-600">{{ $page.props.auth.user.name }}</span>
              </div>
              <div v-else>
                <Link :href="route('login')" class="text-gray-600 hover:text-gray-900">
                  Войти
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Навигация для админа -->
    <div v-if="$page.props.auth?.user?.role === 'admin'" class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex space-x-8 h-16">
          <NavLink :href="route('admin.articles')" :active="$page.component.startsWith('Admin/Articles')">
            Управление статьями
          </NavLink>
          <NavLink :href="route('admin.statistics')" :active="$page.component === 'Admin/Statistics'">
            Статистика
          </NavLink>
        </div>
      </div>
    </div>

    <header class="bg-white shadow" v-if="$slots.header">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <slot name="header" />
      </div>
    </header>

    <main class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import NavLink from '@/Components/NavLink.vue';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel News Blog';
</script> 