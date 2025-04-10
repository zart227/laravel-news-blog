<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import { EyeIcon, ChatBubbleLeftIcon } from '@heroicons/vue/24/outline';
import LikeButtons from '@/Components/UI/LikeButtons.vue';
import type { LinkPrefetchOption } from '@inertiajs/core';

interface Article {
    id: number;
    slug: string;
    title: string;
    content: string;
    image_url: string | null;
    created_at: string;
    user: {
        name: string;
    };
    tags: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
    views_count: number;
    comments_count: number;
    likes_count: number;
    dislikes_count: number;
    is_liked_by_user: boolean;
    is_disliked_by_user: boolean;
}

const props = defineProps<{
    article: Article;
    prefetch?: LinkPrefetchOption | false;
}>();

const truncate = (text: string, length: number): string => {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
};

const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const rating = computed(() => {
    return (props.article.likes_count || 0) - (props.article.dislikes_count || 0);
});

const ratingClass = computed(() => {
    if (rating.value > 0) {
        return 'text-green-600 dark:text-green-400';
    } else if (rating.value < 0) {
        return 'text-red-600 dark:text-red-400';
    }
    return 'text-gray-600 dark:text-gray-400';
});
</script>

<template>
    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg h-full flex flex-col hover:shadow-md transition-shadow duration-200">
        <Link 
            :href="route('articles.show', { slug: article.slug })"
            class="flex-1 flex flex-col"
            :prefetch="prefetch"
        >
            <img v-if="article.image_url" 
                 :src="article.image_url" 
                 :alt="article.title" 
                 class="w-full h-48 object-cover">
            <div class="p-6 flex-1 flex flex-col">
                <h2 class="text-xl font-semibold mb-2 hover:text-gray-600 transition-colors duration-200">
                    {{ article.title }}
                </h2>
                <p class="text-gray-600 mb-4 flex-1">
                    {{ truncate(article.content, 150) }}
                </p>
            </div>
        </Link>

        <div class="px-6 pb-4 mt-auto">
            <!-- Статистика -->
            <div class="flex items-center justify-between mb-4 text-sm text-gray-500">
                <div class="flex items-center space-x-4">
                    <span class="flex items-center">
                        <EyeIcon class="w-4 h-4 mr-1" />
                        {{ article.views_count }}
                    </span>
                    <span class="flex items-center">
                        <ChatBubbleLeftIcon class="w-4 h-4 mr-1" />
                        {{ article.comments_count }}
                    </span>
                </div>
                <span :class="ratingClass" class="font-medium">
                    {{ rating > 0 ? '+' : '' }}{{ rating }}
                </span>
            </div>

            <!-- Лайки -->
            <div class="mb-4">
                <LikeButtons
                    type="article"
                    :id="article.id"
                    :initial-likes="article.likes_count"
                    :initial-dislikes="article.dislikes_count"
                    :is-liked="article.is_liked_by_user"
                    :is-disliked="article.is_disliked_by_user"
                />
            </div>

            <!-- Метаданные -->
            <div class="flex items-center justify-between mb-4">
                <span class="text-sm text-gray-600">
                    {{ article.user.name }}
                </span>
                <span class="text-sm text-gray-500">
                    {{ formatDate(article.created_at) }}
                </span>
            </div>

            <!-- Теги -->
            <div class="flex flex-wrap gap-2">
                <Link
                    v-for="tag in article.tags" 
                    :key="tag.id"
                    :href="route('tags.show', { slug: tag.slug })"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200"
                    prefetch="hover"
                >
                    {{ tag.name }}
                </Link>
            </div>
        </div>
    </div>
</template> 