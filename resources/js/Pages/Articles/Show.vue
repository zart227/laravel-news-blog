<template>
  <Head :title="article?.title || 'Статья'" />

  <AppLayout :title="article?.title || 'Статья'">
    <template #header>
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
          {{ article?.title }}
        </h2>
        <div v-if="article?.tags?.length" class="flex gap-2">
          <span v-for="tag in article.tags" 
                :key="tag.id"
                class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
            #{{ tag.name }}
          </span>
        </div>
      </div>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <div class="flex flex-col space-y-4">
            <h1 class="text-3xl font-bold">{{ article?.title }}</h1>
            
            <!-- Метаданные -->
            <div class="flex items-center justify-between text-sm text-gray-500">
              <div class="flex items-center space-x-4">
                <span>{{ formatDate(article.created_at) }}</span>
                <span>{{ article.user.name }}</span>
              </div>
              <div class="flex items-center space-x-4">
                <span class="flex items-center">
                  <EyeIcon class="w-5 h-5 mr-1" />
                  {{ article.views_count }}
                </span>
                <span class="flex items-center">
                  <ChatBubbleLeftIcon class="w-5 h-5 mr-1" />
                  {{ totalComments }}
                </span>
              </div>
            </div>

            <!-- Рейтинг и кнопки лайков -->
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <LikeButtons
                  type="article"
                  :id="article.id"
                  :initial-likes="article.likes_count"
                  :initial-dislikes="article.dislikes_count"
                  :is-liked="article.is_liked_by_user"
                  :is-disliked="article.is_disliked_by_user"
                />
              </div>
              <span :class="ratingClass" class="text-sm font-medium">
                Рейтинг: {{ rating > 0 ? '+' : '' }}{{ rating }}
              </span>
            </div>

            <!-- Теги -->
            <div v-if="article?.tags?.length" class="flex flex-wrap gap-2">
              <span 
                v-for="tag in article.tags" 
                :key="tag.id"
                class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 cursor-pointer"
              >
                #{{ tag.name }}
              </span>
            </div>

            <!-- Изображение -->
            <img 
              v-if="article?.image_url" 
              :src="article.image_url"
              :alt="article?.title"
              class="w-full h-64 object-cover rounded-lg"
            />

            <!-- Контент -->
            <div class="prose max-w-none" v-html="article?.content"></div>
          </div>
        </div>

        <!-- Секция комментариев -->
        <div v-if="article" class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold">
              Комментарии
              <span class="text-gray-500 text-lg ml-2">({{ totalComments }})</span>
            </h2>
          </div>
          <CommentSection
            :article-slug="article.slug"
            :current-user="currentUser"
            :initial-comments="comments"
          />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import CommentSection from '@/Components/Comments/CommentSection.vue';
import LikeButtons from '@/Components/UI/LikeButtons.vue';
import { EyeIcon, ChatBubbleLeftIcon } from '@heroicons/vue/24/outline';
import type { Article, Comment, PageProps, User } from '@/types';

interface Props {
  article: Article;
  comments: Comment[];
  totalComments: number;
}

const props = defineProps<Props>();
const page = usePage<PageProps>();

// Вычисляемое свойство для текущего пользователя
const currentUser = computed<User | null>(() => page.props.auth.user);

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

const formatDate = (date: string) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<style lang="postcss">
.prose {
  @apply text-gray-800 leading-relaxed;
}

.prose h2 {
  @apply text-2xl font-bold mt-8 mb-4;
}

.prose p {
  @apply mb-4;
}

.prose a {
  @apply text-blue-600 hover:text-blue-800;
}

.prose ul {
  @apply list-disc list-inside mb-4;
}

.prose ol {
  @apply list-decimal list-inside mb-4;
}

.prose blockquote {
  @apply border-l-4 border-gray-300 pl-4 italic my-4;
}

.prose code {
  @apply bg-gray-100 px-1 rounded;
}

.prose pre {
  @apply bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto;
}
</style> 