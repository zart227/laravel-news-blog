<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { EyeIcon, HeartIcon, ChatBubbleLeftIcon } from '@heroicons/vue/24/outline';

interface Article {
  id: number;
  title: string;
  views: number;
  likes: number;
  comments: number;
}

interface Props {
  articles: Article[];
}

defineProps<Props>();
</script>

<template>
  <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
    <div class="p-6 text-gray-900">
      <h3 class="text-lg font-semibold mb-4">Популярные статьи</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Название
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Просмотры
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Лайки
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Комментарии
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="article in articles" :key="article.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <Link 
                  :href="route('articles.show', { id: article.id })"
                  class="text-blue-600 hover:text-blue-900"
                >
                  {{ article.title }}
                </Link>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center text-gray-600">
                  <EyeIcon class="h-4 w-4 mr-1" />
                  {{ article.views }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center text-gray-600">
                  <HeartIcon class="h-4 w-4 mr-1" />
                  {{ article.likes }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center text-gray-600">
                  <ChatBubbleLeftIcon class="h-4 w-4 mr-1" />
                  {{ article.comments }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template> 