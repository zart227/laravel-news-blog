<template>
    <Head :title="tag.name" />

    <AppLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Статьи с тегом "{{ tag.name }}"
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div class="p-6">
                        <div v-if="articles.data.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div v-for="article in articles.data" 
                                 :key="article.id" 
                                 class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                                <Link :href="route('articles.show', article.id)">
                                    <img v-if="article.image" 
                                         :src="article.image" 
                                         :alt="article.title"
                                         class="w-full h-48 object-cover">
                                    <div class="p-4">
                                        <h3 class="text-lg font-semibold text-gray-800 mb-2">
                                            {{ article.title }}
                                        </h3>
                                        <div class="flex items-center text-sm text-gray-600 mb-2">
                                            <span>{{ article.user.name }}</span>
                                            <span class="mx-2">•</span>
                                            <span>{{ formatDate(article.created_at) }}</span>
                                        </div>
                                        <p class="text-gray-600 text-sm mb-4">
                                            {{ truncate(article.content, 150) }}
                                        </p>
                                        <div class="flex gap-2">
                                            <span v-for="tag in article.tags" 
                                                  :key="tag.id"
                                                  class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                                                {{ tag.name }}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div v-else class="text-center py-12">
                            <p class="text-gray-600">Нет статей с этим тегом</p>
                        </div>

                        <!-- Pagination -->
                        <div v-if="articles.data.length" class="mt-6">
                            <Pagination :links="articles.links" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup>
import { Head, Link } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import Pagination from '@/Components/Pagination.vue';

const props = defineProps({
    tag: {
        type: Object,
        required: true
    },
    articles: {
        type: Object,
        required: true
    }
});

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const truncate = (text, length) => {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
};
</script> 