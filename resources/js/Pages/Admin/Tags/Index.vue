<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3';
import { notify } from '@/utils/notifications';
import AppLayout from '@/Layouts/AppLayout.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DangerButton from '@/Components/DangerButton.vue';
import Pagination from '@/Components/UI/Pagination.vue';
import type { Tag } from '@/types/inertia';

interface Props {
  tags: {
    data: Tag[];
    links: any[];
    total: number;
    current_page: number;
    last_page: number;
  };
}

const props = defineProps<Props>();

const deleteTag = (tag: Tag) => {
  if (confirm(`Вы уверены, что хотите удалить тег "${tag.name}"?`)) {
    router.delete(route('admin.tags.destroy', tag.id), {
      preserveScroll: true,
      onSuccess: () => {
        notify.success('Тег успешно удален');
      },
      onError: () => {
        notify.error('Ошибка при удалении тега');
      },
    });
  }
};
</script>

<template>
  <AppLayout title="Управление тегами">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Теги</h1>
        <p class="mt-2 text-sm text-gray-700">
          Список всех тегов в блоге
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <Link
          :href="route('admin.tags.create')"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Создать тег
        </Link>
      </div>
    </div>

    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Название
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Описание
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Статей
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Действия</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="tag in tags.data" :key="tag.id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {{ tag.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ tag.description || '—' }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ tag.articles_count }}
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <Link
                      :href="route('admin.tags.edit', tag.id)"
                      class="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Редактировать
                    </Link>
                    <button
                      @click="deleteTag(tag)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <Pagination :links="tags.links" />
    </div>
  </AppLayout>
</template> 