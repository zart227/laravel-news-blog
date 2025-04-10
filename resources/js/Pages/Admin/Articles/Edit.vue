<template>
  <AppLayout>
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-gray-800">
        Редактирование статьи
      </h2>
    </template>

    <div class="py-12">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
          <div class="p-6 bg-white border-b border-gray-200">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Form fields -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import InputLabel from '@/Components/UI/InputLabel.vue';
import TextInput from '@/Components/UI/TextInput.vue';
import InputError from '@/Components/UI/InputError.vue';
import PrimaryButton from '@/Components/UI/PrimaryButton.vue';
import type { Article } from '@/types';
import { notify } from '@/utils/notifications';

interface Props {
  article: Article;
}

const props = defineProps<Props>();

const form = useForm({
  title: props.article.title,
  content: props.article.content,
  image: null as File | null,
  tags: props.article.tags?.map(tag => tag.id) ?? [],
  _method: 'PUT'
});

const handleSubmit = () => {
  form.post(route('admin.articles.update', { slug: props.article.slug }), {
    preserveScroll: true,
    onSuccess: () => {
      notify.success('Статья успешно обновлена');
    },
    onError: () => {
      notify.error('Ошибка при обновлении статьи');
    },
  });
};
</script> 