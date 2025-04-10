/// <reference types="vite/client" />
<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { route } from 'ziggy-js';
import ApplicationLogo from '@/Components/Navigation/ApplicationLogo.vue';
import NavLink from '@/Components/Navigation/NavLink.vue';
import Footer from '@/Components/Navigation/Footer.vue';
import type { PageProps } from '@/types/inertia';
import DropdownLink from '@/Components/Navigation/DropdownLink.vue';

interface Props {
  title?: string;
}

const props = defineProps<Props>();
const page = usePage<PageProps>();

const isAdmin = computed(() => page.props.auth.user?.role === 'admin');
const currentRoute = computed(() => route().current() || '');

const isCurrentRoute = (routeName: string) => currentRoute.value === routeName;
const routeStartsWith = (prefix: string) => currentRoute.value.startsWith(prefix);

const hasRoute = (name: string) => {
  try {
    route(name);
    return true;
  } catch {
    return false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ title }}
        </h1>
      </div>
    </header>

    <nav class="bg-white border-b border-gray-100">
      <!-- Primary Navigation Menu -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <!-- Logo -->
            <div class="shrink-0 flex items-center">
              <Link :href="route('home')">
                <ApplicationLogo class="block h-9 w-auto fill-current text-gray-800" />
              </Link>
            </div>

            <!-- Navigation Links -->
            <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
              <NavLink :href="route('home')" :active="isCurrentRoute('home')">
                Главная
              </NavLink>
              <NavLink :href="route('articles.index')" :active="isCurrentRoute('articles.index')">
                Статьи
              </NavLink>
              <NavLink :href="route('tags.index')" :active="isCurrentRoute('tags.index')">
                Теги
              </NavLink>
              <template v-if="isAdmin && hasRoute('admin.dashboard')">
                <NavLink :href="route('admin.dashboard')" :active="routeStartsWith('admin.dashboard')">
                  Панель администратора
                </NavLink>
                <NavLink v-if="hasRoute('admin.articles.index')" :href="route('admin.articles.index')" :active="routeStartsWith('admin.articles.')">
                  Управление статьями
                </NavLink>
                <NavLink v-if="hasRoute('admin.tags.index')" :href="route('admin.tags.index')" :active="routeStartsWith('admin.tags.')">
                  Управление тегами
                </NavLink>
                <NavLink v-if="hasRoute('admin.categories.index')" :href="route('admin.categories.index')" :active="routeStartsWith('admin.categories.')">
                  Управление категориями
                </NavLink>
                <NavLink v-if="hasRoute('admin.users.index')" :href="route('admin.users.index')" :active="routeStartsWith('admin.users.')">
                  Управление пользователями
                </NavLink>
                <NavLink v-if="hasRoute('admin.comments.index')" :href="route('admin.comments.index')" :active="routeStartsWith('admin.comments.')">
                  Управление комментариями
                </NavLink>
                <NavLink v-if="hasRoute('admin.statistics')" :href="route('admin.statistics')" :active="isCurrentRoute('admin.statistics')">
                  Статистика
                </NavLink>
              </template>
            </div>
          </div>

          <!-- Authentication Links -->
          <div class="hidden sm:flex sm:items-center sm:ml-6">
            <div class="ml-3 relative" v-if="page.props.auth.user">
              <Link
                :href="route('profile.edit')"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
              >
                {{ page.props.auth.user.name }}
              </Link>
              <Link
                :href="route('logout')"
                method="post"
                as="button"
                class="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
              >
                Выйти
              </Link>
            </div>
            <template v-else>
              <Link
                :href="route('login')"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
              >
                Войти
              </Link>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <main class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>

    <Footer />
  </div>
</template> 