<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import { notify } from '@/utils/notifications';
import AppLayout from '@/Layouts/AppLayout.vue';
import InputLabel from '@/Components/UI/InputLabel.vue';
import TextInput from '@/Components/UI/TextInput.vue';
import InputError from '@/Components/UI/InputError.vue';
import PrimaryButton from '@/Components/UI/PrimaryButton.vue';
import type { Tag } from '@/types/inertia';

interface Props {
  tag: Tag;
}

const props = defineProps<Props>();

const form = useForm({
  name: props.tag.name,
  description: props.tag.description || '',
  _method: 'PUT'
});

const handleSubmit = () => {
  form.post(route('admin.tags.update', props.tag.id), {
    preserveScroll: true,
    onSuccess: () => {
      notify.success('Тег успешно обновлен');
    },
    onError: () => {
      notify.error('Ошибка при обновлении тега');
    },
  });
};
</script>

<template>
  <AppLayout title="Редактирование тега">
    <div class="py-12">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
          <div class="p-6 bg-white border-b border-gray-200">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <InputLabel for="name" value="Название" />
                <TextInput
                  id="name"
                  v-model="form.name"
                  type="text"
                  class="mt-1 block w-full"
                  required
                  autofocus
                />
                <InputError :message="form.errors.name" class="mt-2" />
              </div>

              <div>
                <InputLabel for="description" value="Описание" />
                <textarea
                  id="description"
                  v-model="form.description"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  rows="3"
                />
                <InputError :message="form.errors.description" class="mt-2" />
              </div>

              <div class="flex items-center justify-end">
                <PrimaryButton
                  :class="{ 'opacity-25': form.processing }"
                  :disabled="form.processing"
                >
                  Сохранить
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template> 