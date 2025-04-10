<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import axios from 'axios';
import CommentComponent from './Comment.vue';
import { usePage } from '@inertiajs/vue3';
import type { User } from '@/types/inertia';
import type { Comment } from '@/types';

interface Props {
  articleSlug: string;
  currentUser: User | null;
  initialComments: Comment[];
}

interface EchoChannel {
  listen(event: string, callback: (e: any) => void): EchoChannel;
  leave(): void;
}

interface Echo {
  channel(name: string): EchoChannel;
  leave(name: string): void;
}

declare const Echo: Echo;

const props = defineProps<Props>();
const page = usePage();

const comments = ref<Comment[]>(props.initialComments);
const newComment = ref('');
const replyToId = ref<number>();
const isLoading = ref(false);
const isSubmitting = ref(false);

// Делаем replyToId доступным в шаблоне
const isReplying = computed(() => replyToId.value !== undefined);
const replyPlaceholder = computed(() => replyToId.value ? 'Напишите ответ...' : 'Напишите комментарий...');

// Загрузка комментариев больше не нужна, так как они приходят через пропсы
// const loadComments = async () => { ... };

// Преобразование плоского списка комментариев в древовидную структуру
const organizeComments = (flatComments: Comment[]): Comment[] => {
  // Создаем Map для хранения всех комментариев с их replies
  const commentMap = new Map<number, Comment>();
  const rootComments: Comment[] = [];

  // Сначала сортируем комментарии по дате создания (новые сверху)
  const sortedComments = [...flatComments].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Первый проход: создаем Map всех комментариев, сохраняя существующие replies
  sortedComments.forEach(comment => {
    commentMap.set(comment.id, { ...comment });
  });

  // Второй проход: организуем древовидную структуру
  sortedComments.forEach(comment => {
    const processedComment = commentMap.get(comment.id);
    if (!processedComment) return;

    if (!comment.parent_id) {
      rootComments.push(processedComment);
    } else {
      const parentComment = commentMap.get(comment.parent_id);
      if (parentComment) {
        if (!Array.isArray(parentComment.replies)) {
          parentComment.replies = [];
        }
        parentComment.replies.push(processedComment);
      } else {
        // Если родитель не найден, добавляем как корневой комментарий
        rootComments.push(processedComment);
      }
    }
  });

  // Сортируем replies во всех комментариях
  const sortReplies = (comment: Comment) => {
    if (comment.replies && comment.replies.length > 0) {
      comment.replies.sort((a, b) => 
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      comment.replies.forEach(sortReplies);
    }
  };

  rootComments.forEach(sortReplies);

  return rootComments;
};

// Отправка нового комментария
const submitComment = async () => {
  if (!newComment.value.trim()) return;

  isSubmitting.value = true;
  try {
    const response = await axios.post(`/api/articles/${props.articleSlug}/comments`, {
      content: newComment.value,
      parent_id: replyToId.value
    });

    if (replyToId.value) {
      // Добавляем ответ к родительскому комментарию
      const parentComment = findComment(comments.value, replyToId.value);
      if (parentComment) {
        if (!parentComment.replies) {
          parentComment.replies = [];
        }
        parentComment.replies.push(response.data);
      }
    } else {
      // Добавляем корневой комментарий
      comments.value.unshift(response.data);
    }

    newComment.value = '';
    replyToId.value = undefined;
  } catch (error) {
    console.error('Ошибка при отправке комментария:', error);
  } finally {
    isSubmitting.value = false;
  }
};

// Обновление комментария
const updateComment = async (commentId: number, content: string) => {
  try {
    const response = await axios.put(`/api/comments/${commentId}`, { content });
    const comment = findComment(comments.value, commentId);
    if (comment) {
      comment.content = content;
      comment.updated_at = response.data.updated_at;
    }
  } catch (error) {
    console.error('Ошибка при обновлении комментария:', error);
  }
};

// Удаление комментария
const deleteComment = async (commentId: number) => {
  try {
    await axios.delete(`/api/comments/${commentId}`);
    removeComment(comments.value, commentId);
  } catch (error) {
    console.error('Ошибка при удалении комментария:', error);
  }
};

// Поиск комментария по ID в древовидной структуре
const findComment = (comments: Comment[], id: number): Comment | null => {
  for (const comment of comments) {
    if (comment.id === id) return comment;
    if (comment.replies) {
      const found = findComment(comment.replies, id);
      if (found) return found;
    }
  }
  return null;
};

// Удаление комментария из древовидной структуры
const removeComment = (comments: Comment[], id: number): boolean => {
  const index = comments.findIndex(c => c.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    return true;
  }
  
  for (const comment of comments) {
    if (comment.replies && removeComment(comment.replies, id)) {
      return true;
    }
  }
  return false;
};

// WebSocket подписка
onMounted(() => {
  const channel = Echo.channel(`article.${props.articleSlug}`);
  
  channel
    .listen('.comment.created', (e: { comment: Comment }) => {
      const newComment = e.comment;
      if (newComment.parent_id) {
        const parentComment = findComment(comments.value, newComment.parent_id);
        if (parentComment) {
          if (!parentComment.replies) parentComment.replies = [];
          parentComment.replies.push(newComment);
        }
      } else {
        comments.value.unshift(newComment);
      }
    })
    .listen('.comment.updated', (e: { comment: Comment }) => {
      const comment = findComment(comments.value, e.comment.id);
      if (comment) {
        comment.content = e.comment.content;
        comment.updated_at = e.comment.updated_at;
      }
    })
    .listen('.comment.deleted', (e: { commentId: number }) => {
      removeComment(comments.value, e.commentId);
    });
});

// Отписка от WebSocket
onBeforeUnmount(() => {
  Echo.leave(`article.${props.articleSlug}`);
});

// Обработка ответа на комментарий
const handleReply = (commentId: number) => {
  replyToId.value = commentId;
  // Прокручиваем к форме ответа
  document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<template>
  <div class="space-y-6">
    <!-- Форма комментария -->
    <div v-if="currentUser" id="comment-form" class="bg-white p-4 rounded-lg shadow-sm">
      <form @submit.prevent="submitComment" class="space-y-4">
        <div>
          <label v-if="isReplying" class="block text-sm text-gray-600 mb-2">
            Ответ на комментарий
            <button
              @click="replyToId = undefined"
              class="ml-2 text-blue-600 hover:text-blue-800"
            >
              отменить
            </button>
          </label>
          <textarea
            v-model="newComment"
            rows="3"
            class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            :placeholder="replyPlaceholder"
            required
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button
            type="submit"
            class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            :disabled="isSubmitting || !newComment.trim()"
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
    <div v-if="isLoading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
    
    <div v-else-if="comments.length" class="space-y-4">
      <CommentComponent
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :current-user="currentUser"
        :level="0"
        @reply="handleReply"
        @update="updateComment"
        @delete="deleteComment"
      />
    </div>
    
    <div v-else class="text-center py-8">
      <p class="text-gray-500">Пока нет комментариев. Будьте первым!</p>
    </div>
  </div>
</template> 