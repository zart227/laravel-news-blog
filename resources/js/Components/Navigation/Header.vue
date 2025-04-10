/// <reference types="vite/client" />
<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import NavLink from '@/Components/Navigation/NavLink.vue';
import { router } from '@inertiajs/core';

interface User {
    name: string;
    isAdmin: boolean;
}

interface CustomPageProps {
    auth: {
        user: User | null;
    };
    app: {
        name: string;
    };
    [key: string]: any;
}

const page = usePage<CustomPageProps>();
const user = computed(() => page.props.auth?.user);
const appName = computed(() => page.props.app?.name || 'Laravel News Blog');
const currentComponent = computed(() => page.component);

interface NavigationItem {
    name: string;
    href: string;
    show?: () => boolean;
    method?: string;
    active: (component: string) => boolean;
}

const navigation: NavigationItem[] = [
    { 
        name: 'Статьи', 
        href: route('articles.index'),
        active: (component: string) => component === 'Articles/Index' || component === 'Articles/Show'
    },
    { 
        name: 'Теги', 
        href: route('tags.index'),
        active: (component: string) => component === 'Tags/Index' || component === 'Tags/Show'
    },
    { 
        name: 'Панель администратора', 
        href: route('admin.dashboard'),
        show: () => Boolean(user.value?.isAdmin),
        active: (component: string) => component.startsWith('Admin/')
    }
];

declare function route(name: string): string;
</script>

<template>
    <header class="bg-white shadow">
        <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
            <div class="flex w-full items-center justify-between border-b border-gray-100 py-6">
                <div class="flex items-center">
                    <div class="shrink-0 flex items-center">
                        <Link :href="route('articles.index')" class="text-xl font-bold text-gray-800">
                            {{ appName }}
                        </Link>
                    </div>

                    <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                        <NavLink
                            v-for="link in navigation"
                            :key="link.name"
                            v-show="!link.show || link.show()"
                            :href="link.href"
                            :active="link.active(currentComponent)"
                        >
                            {{ link.name }}
                        </NavLink>
                    </div>
                </div>

                <div class="hidden sm:flex sm:items-center sm:ml-6">
                    <div class="ml-3 relative">
                        <div v-if="user" class="flex items-center space-x-4">
                            <Link 
                                :href="route('profile.edit')" 
                                class="text-gray-600 hover:text-gray-900"
                            >
                                {{ user.name }}
                            </Link>
                            <button 
                                @click="() => router.post(route('logout'))"
                                class="text-sm text-red-600 hover:text-red-800"
                            >
                                Выйти
                            </button>
                        </div>
                        <div v-else>
                            <Link 
                                :href="route('login')" 
                                class="text-gray-600 hover:text-gray-900"
                                as="button" 
                                method="get"
                            >
                                Войти
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template> 