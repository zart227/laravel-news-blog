<template>
    <div>
        <div class="min-h-screen bg-gray-100">
            <nav class="bg-white border-b border-gray-100">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex">
                            <!-- Логотип -->
                            <div class="shrink-0 flex items-center">
                                <Link :href="route('home')">
                                    <ApplicationLogo class="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <!-- Навигационные ссылки -->
                            <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink :href="route('home')" :active="isCurrentRoute('home')">
                                    Главная
                                </NavLink>
                                <NavLink :href="route('articles.index')" :active="routeStartsWith('articles.')">
                                    Статьи
                                </NavLink>
                                <NavLink :href="route('tags.index')" :active="routeStartsWith('tags.')">
                                    Теги
                                </NavLink>
                                <template v-if="page.props.auth.user.is_admin">
                                    <NavLink :href="route('admin.articles.index')" :active="routeStartsWith('admin.articles.')">
                                        Управление статьями
                                    </NavLink>
                                    <NavLink :href="route('admin.tags.index')" :active="routeStartsWith('admin.tags.')">
                                        Управление тегами
                                    </NavLink>
                                    <NavLink :href="route('admin.statistics')" :active="isCurrentRoute('admin.statistics')">
                                        Статистика
                                    </NavLink>
                                </template>
                            </div>
                        </div>

                        <div class="hidden sm:flex sm:items-center sm:ms-6">
                            <!-- Выпадающее меню настроек -->
                            <div class="ms-3 relative">
                                <Dropdown align="right" width="48">
                                    <template #trigger>
                                        <span class="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {{ page.props.auth.user.name }}

                                                <svg
                                                    class="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clip-rule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </template>

                                    <template #content>
                                        <DropdownLink :href="route('profile.edit')">
                                            Профиль
                                        </DropdownLink>
                                        <DropdownLink :href="route('logout')" method="post" as="button">
                                            Выйти
                                        </DropdownLink>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>

                        <!-- Гамбургер меню -->
                        <div class="-me-2 flex items-center sm:hidden">
                            <button
                                @click="showingNavigationDropdown = !showingNavigationDropdown"
                                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        :class="{
                                            hidden: showingNavigationDropdown,
                                            'inline-flex': !showingNavigationDropdown,
                                        }"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        :class="{
                                            hidden: !showingNavigationDropdown,
                                            'inline-flex': showingNavigationDropdown,
                                        }"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Мобильное меню -->
                <div
                    :class="{ block: showingNavigationDropdown, hidden: !showingNavigationDropdown }"
                    class="sm:hidden"
                >
                    <div class="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink :href="route('home')" :active="isCurrentRoute('home')">
                            Главная
                        </ResponsiveNavLink>
                        <ResponsiveNavLink :href="route('articles.index')" :active="routeStartsWith('articles.')">
                            Статьи
                        </ResponsiveNavLink>
                        <ResponsiveNavLink :href="route('tags.index')" :active="routeStartsWith('tags.')">
                            Теги
                        </ResponsiveNavLink>
                        <template v-if="page.props.auth.user.is_admin">
                            <ResponsiveNavLink :href="route('admin.articles.index')" :active="routeStartsWith('admin.articles.')">
                                Управление статьями
                            </ResponsiveNavLink>
                            <ResponsiveNavLink :href="route('admin.tags.index')" :active="routeStartsWith('admin.tags.')">
                                Управление тегами
                            </ResponsiveNavLink>
                            <ResponsiveNavLink :href="route('admin.statistics')" :active="isCurrentRoute('admin.statistics')">
                                Статистика
                            </ResponsiveNavLink>
                        </template>
                    </div>

                    <!-- Мобильные настройки -->
                    <div class="pt-4 pb-1 border-t border-gray-200">
                        <div class="px-4">
                            <div class="font-medium text-base text-gray-800">
                                {{ page.props.auth.user.name }}
                            </div>
                            <div class="font-medium text-sm text-gray-500">{{ page.props.auth.user.email }}</div>
                        </div>

                        <div class="mt-3 space-y-1">
                            <ResponsiveNavLink :href="route('profile.edit')">
                                Профиль
                            </ResponsiveNavLink>
                            <ResponsiveNavLink :href="route('logout')" method="post" as="button">
                                Выйти
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Заголовок страницы -->
            <header class="bg-white shadow" v-if="$slots.header">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <slot name="header" />
                </div>
            </header>

            <!-- Основной контент страницы -->
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/Navigation/ApplicationLogo.vue';
import Dropdown from '@/Components/Navigation/Dropdown.vue';
import DropdownLink from '@/Components/Navigation/DropdownLink.vue';
import NavLink from '@/Components/Navigation/NavLink.vue';
import ResponsiveNavLink from '@/Components/Navigation/ResponsiveNavLink.vue';
import { usePage } from '@inertiajs/vue3';

interface User {
  name: string;
  email: string;
  is_admin: boolean;
}

interface CustomPageProps {
  auth: {
    user: User;
  };
  [key: string]: any;
}

const page = usePage<CustomPageProps>();
const showingNavigationDropdown = ref(false);

const isCurrentRoute = (name: string) => route().current() === name;
const routeStartsWith = (pattern: string) => {
  const current = route().current();
  return current ? current.startsWith(pattern) : false;
};
</script> 