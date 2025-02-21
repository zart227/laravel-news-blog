<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">Комментарии</h2>

    <!-- Форма добавления комментария -->
    <div v-if="user" class="bg-gray-50 p-4 rounded-lg">
      <form @submit.prevent="submitComment" class="space-y-4">
        <div>
          <label for="comment" class="sr-only">Ваш комментарий</label>
          <textarea
            id="comment"
            v-model="newComment"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Напишите комментарий..."
            required
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
          </button>
        </div>
      </form>
    </div>
    <div v-else class="bg-gray-50 p-4 rounded-lg text-center">
      <p class="text-gray-600">Войдите, чтобы оставить комментарий</p>
    </div>

    <!-- Список комментариев -->
    <div v-if="comments.length" class="space-y-4">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="bg-white p-4 rounded-lg shadow-sm space-y-2"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="font-medium">{{ comment.user.name }}</span>
            <span class="text-gray-500 text-sm">{{ formatDate(comment.created_at) }}</span>
          </div>
          
          <!-- Кнопки управления комментарием -->
          <div v-if="canManageComment(comment)" class="flex space-x-2">
            <button
              v-if="!comment.isEditing"
              @click="startEditing(comment)"
              class="text-gray-600 hover:text-gray-900"
            >
              Редактировать
            </button>
            <button
              @click="deleteComment(comment.id)"
              class="text-red-600 hover:text-red-900"
            >
              Удалить
            </button>
          </div>
        </div>

        <!-- Форма редактирования -->
        <div v-if="comment.isEditing" class="mt-2">
          <textarea
            v-model="comment.editedContent"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows="3"
          ></textarea>
          <div class="mt-2 flex justify-end space-x-2">
            <button
              @click="cancelEditing(comment)"
              class="text-gray-600 hover:text-gray-900"
            >
              Отмена
            </button>
            <button
              @click="updateComment(comment)"
              class="text-indigo-600 hover:text-indigo-900"
            >
              Сохранить
            </button>
          </div>
        </div>

        <!-- Текст комментария -->
        <div v-else class="text-gray-700">
          {{ comment.content }}
        </div>
      </div>
    </div>
    <div v-else class="text-center py-4 text-gray-500">
      Пока нет комментариев
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axios from 'axios';

export default {
  props: {
    articleId: {
      type: [Number, String],
      required: true,
    },
    initialComments: {
      type: Array,
      default: () => [],
    },
    user: {
      type: Object,
      default: null,
    },
  },

  setup(props) {
    const comments = ref(props.initialComments.map(comment => ({
      ...comment,
      isEditing: false,
      editedContent: comment.content,
    })));
    const newComment = ref('');
    const isSubmitting = ref(false);

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    const canManageComment = (comment) => {
      return props.user && (
        props.user.id === comment.user_id || 
        props.user.role === 'admin'
      );
    };

    const submitComment = async () => {
      if (!newComment.value.trim()) return;

      isSubmitting.value = true;
      try {
        const response = await axios.post(`/api/articles/${props.articleId}/comments`, {
          content: newComment.value,
        });
        comments.value.unshift({
          ...response.data,
          isEditing: false,
          editedContent: response.data.content,
        });
        newComment.value = '';
      } catch (error) {
        console.error('Ошибка при отправке комментария:', error);
      } finally {
        isSubmitting.value = false;
      }
    };

    const startEditing = (comment) => {
      comment.isEditing = true;
      comment.editedContent = comment.content;
    };

    const cancelEditing = (comment) => {
      comment.isEditing = false;
      comment.editedContent = comment.content;
    };

    const updateComment = async (comment) => {
      try {
        await axios.put(`/api/comments/${comment.id}`, {
          content: comment.editedContent,
        });
        comment.content = comment.editedContent;
        comment.isEditing = false;
      } catch (error) {
        console.error('Ошибка при обновлении комментария:', error);
      }
    };

    const deleteComment = async (commentId) => {
      if (!confirm('Вы уверены, что хотите удалить этот комментарий?')) return;

      try {
        await axios.delete(`/api/comments/${commentId}`);
        comments.value = comments.value.filter(c => c.id !== commentId);
      } catch (error) {
        console.error('Ошибка при удалении комментария:', error);
      }
    };

    const listenToComments = () => {
      window.Echo.channel(`article.${props.articleId}`)
        .listen('CommentCreated', (e) => {
          comments.value.unshift({
            ...e.comment,
            isEditing: false,
            editContent: e.comment.content
          });
          notify.info('Добавлен новый комментарий');
        })
        .listen('CommentUpdated', (e) => {
          const index = comments.value.findIndex(c => c.id === e.comment.id);
          if (index !== -1) {
            comments.value[index] = {
              ...e.comment,
              isEditing: false,
              editContent: e.comment.content
            };
            notify.info('Комментарий был обновлен');
          }
        })
        .listen('CommentDeleted', (e) => {
          const index = comments.value.findIndex(c => c.id === e.commentId);
          if (index !== -1) {
            comments.value.splice(index, 1);
            notify.info('Комментарий был удален');
          }
        });
    };

    onMounted(() => {
      fetchComments();
      listenToComments();
    });

    onBeforeUnmount(() => {
      window.Echo.leave(`article.${props.articleId}`);
    });

    return {
      comments,
      newComment,
      isSubmitting,
      formatDate,
      canManageComment,
      submitComment,
      startEditing,
      cancelEditing,
      updateComment,
      deleteComment,
    };
  },
};
</script> 