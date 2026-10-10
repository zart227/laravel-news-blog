<template>
  <AdminLayout>
    <template #header>
      <h2 class="text-xl font-semibold leading-tight text-gray-800">
        Создание статьи
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
  </AdminLayout>
</template>

<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import { notify } from '@/utils/notifications';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import InputLabel from '@/Components/UI/InputLabel.vue';
import TextInput from '@/Components/UI/TextInput.vue';
import InputError from '@/Components/UI/InputError.vue';
import PrimaryButton from '@/Components/UI/PrimaryButton.vue';

const form = useForm({
  title: '',
  content: '',
  image: null as File | null,
  tags: [] as number[]
});

const handleSubmit = () => {
  form.post(route('admin.articles.store'), {
    preserveScroll: true,
    onSuccess: () => {
      notify.success('Статья успешно создана');
    },
    onError: () => {
      notify.error('Ошибка при создании статьи');
    },
  });
};
</script> 