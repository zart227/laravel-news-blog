<template>
  <AppLayout>
    <div class="max-w-4xl mx-auto">
      <div class="bg-white shadow rounded-lg p-6">
        <h1 class="text-2xl font-bold mb-6">
          {{ isEditing ? 'Редактирование статьи' : 'Создание новой статьи' }}
        </h1>

        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Заголовок -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Заголовок</label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
          </div>

          <!-- Изображение -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Изображение</label>
            <FileUpload
              v-model="form.image"
              :initial-preview="initialImageUrl"
              :max-file-size="5 * 1024 * 1024"
            />
          </div>

          <!-- Содержание -->
          <div>
            <label for="content" class="block text-sm font-medium text-gray-700">Содержание</label>
            <textarea
              id="content"
              v-model="form.content"
              rows="10"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            ></textarea>
          </div>

          <!-- Теги -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Теги</label>
            <div class="flex flex-wrap gap-2">
              <label
                v-for="tag in availableTags"
                :key="tag.id"
                class="inline-flex items-center"
              >
                <input
                  type="checkbox"
                  :value="tag.id"
                  v-model="form.tags"
                  class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                <span class="ml-2">{{ tag.name }}</span>
              </label>
            </div>
          </div>

          <!-- Статус -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Статус</label>
            <div class="mt-1">
              <label class="inline-flex items-center mr-4">
                <input
                  type="radio"
                  v-model="form.status"
                  value="draft"
                  class="border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                <span class="ml-2">Черновик</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  v-model="form.status"
                  value="published"
                  class="border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                <span class="ml-2">Опубликовано</span>
              </label>
            </div>
          </div>

          <!-- Кнопки -->
          <div class="flex justify-end space-x-3">
            <Link
              :href="route('admin.articles')"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Отмена
            </Link>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {{ isSubmitting ? 'Сохранение...' : (isEditing ? 'Сохранить' : 'Создать') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import { ref, computed } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import FileUpload from '@/Components/FileUpload.vue';

export default {
  components: {
    AppLayout,
    FileUpload,
    Link,
  },

  props: {
    article: {
      type: Object,
      default: null,
    },
    availableTags: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    const isSubmitting = ref(false);
    const isEditing = computed(() => !!props.article);
    
    const initialImageUrl = computed(() => {
      if (props.article?.image_path) {
        return `/storage/${props.article.image_path}`;
      }
      return null;
    });

    const form = ref({
      title: props.article?.title || '',
      content: props.article?.content || '',
      image: null,
      tags: props.article?.tags?.map(tag => tag.id) || [],
      status: props.article?.status || 'draft',
    });

    const submitForm = async () => {
      isSubmitting.value = true;

      const formData = new FormData();
      formData.append('title', form.value.title);
      formData.append('content', form.value.content);
      formData.append('status', form.value.status);
      
      if (form.value.image) {
        formData.append('image', form.value.image);
      }
      
      form.value.tags.forEach(tagId => {
        formData.append('tags[]', tagId);
      });

      try {
        if (isEditing.value) {
          formData.append('_method', 'PUT');
          await router.post(`/api/articles/${props.article.id}`, formData);
        } else {
          await router.post('/api/articles', formData);
        }
        
        router.visit(route('admin.articles'));
      } catch (error) {
        console.error('Ошибка при сохранении статьи:', error);
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      form,
      isEditing,
      isSubmitting,
      initialImageUrl,
      submitForm,
    };
  },
};
</script> 