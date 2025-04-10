<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { route } from 'ziggy-js';
import type { PageProps } from '@/types/inertia';
import { h } from 'vue';

const page = usePage<PageProps>();
const currentYear = new Date().getFullYear();
const appName = computed(() => page.props.app?.name || 'Laravel News Blog');

const footerNavigation = {
    main: [
        { name: 'Главная', href: route('articles.index') },
        { name: 'Теги', href: route('tags.index') },
    ],
    social: [
        {
            name: 'GitHub',
            href: 'https://github.com',
            icon: (props: any) => h('svg', {
                fill: 'currentColor',
                viewBox: '0 0 24 24',
                ...props,
            }, [
                h('path', {
                    'fill-rule': 'evenodd',
                    'd': 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
                    'clip-rule': 'evenodd',
                }),
            ]),
        },
        {
            name: 'Telegram',
            href: 'https://t.me',
            icon: (props: any) => h('svg', {
                fill: 'currentColor',
                viewBox: '0 0 24 24',
                ...props,
            }, [
                h('path', {
                    'd': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06-.01.13-.02.2z',
                }),
            ]),
        },
    ],
};
</script>

<template>
    <footer class="bg-white">
        <div class="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
            <nav class="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
                <div v-for="item in footerNavigation.main" :key="item.name" class="pb-6">
                    <Link :href="item.href" class="text-sm leading-6 text-gray-600 hover:text-gray-900">
                        {{ item.name }}
                    </Link>
                </div>
            </nav>
            <div class="mt-10 flex justify-center space-x-10">
                <a v-for="item in footerNavigation.social" :key="item.name" :href="item.href" class="text-gray-400 hover:text-gray-500" target="_blank" rel="noopener noreferrer">
                    <span class="sr-only">{{ item.name }}</span>
                    <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                </a>
            </div>
            <p class="mt-10 text-center text-xs leading-5 text-gray-500">
                &copy; {{ currentYear }} {{ appName }}. Все права защищены.
            </p>
        </div>
    </footer>
</template> 