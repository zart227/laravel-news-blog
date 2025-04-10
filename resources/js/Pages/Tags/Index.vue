<template>
    <Head title="Теги" />
    <AppLayout title="Теги">
        <div class="min-h-screen bg-gray-100 py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-8">Теги</h1>

                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <div
                                v-for="tag in tags"
                                :key="tag.id"
                                class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                            >
                                <div class="min-w-0 flex-1">
                                    <Link :href="route('tags.show', tag.slug)" class="focus:outline-none">
                                        <span class="absolute inset-0" aria-hidden="true" />
                                        <p class="text-sm font-medium text-gray-900">{{ tag.name }}</p>
                                        <p class="truncate text-sm text-gray-500">{{ tag.description }}</p>
                                        <p class="mt-1 text-sm text-gray-500">
                                            {{ tag.articles_count }} статей
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import { Link } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import type { Tag } from '@/types/inertia';

interface Props {
    tags: Tag[];
}

const props = defineProps<Props>();
</script> 