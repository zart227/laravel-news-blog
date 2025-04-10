<script setup lang="ts">
import { ref, computed } from 'vue';
import LikeButtons from '@/Components/UI/LikeButtons.vue';
import type { Comment } from '@/types';

interface Props {
  comment: Comment;
  showReplyForm?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showReplyForm: false
});

const isReplying = ref(props.showReplyForm);

const rating = computed(() => {
  const likes = props.comment.likes_count || 0;
  const dislikes = props.comment.dislikes_count || 0;
  return likes - dislikes;
});

const commentClass = computed(() => {
  const baseClasses = 'p-4 rounded-lg shadow mb-4 transition-all duration-300';
  
  if (rating.value >= 10) {
    return `${baseClasses} bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800`;
  } else if (rating.value >= 5) {
    return `${baseClasses} bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-900`;
  } else if (rating.value <= -5) {
    return `${baseClasses} bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900`;
  } else if (rating.value <= -10) {
    return `${baseClasses} bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800`;
  }
  
  return `${baseClasses} bg-white dark:bg-gray-800`;
});

const ratingClass = computed(() => {
  if (rating.value > 0) {
    return 'text-green-600 dark:text-green-400';
  } else if (rating.value < 0) {
    return 'text-red-600 dark:text-red-400';
  }
  return 'text-gray-600 dark:text-gray-400';
});

const getPluralForm = (number: number, forms: [string, string, string]): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  const index = (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5];
  return forms[index];
};
</script>

<template>
  <div :class="commentClass">
    <div class="flex justify-between">
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <span class="font-medium">{{ comment.user.name }}</span>
          <span class="text-sm text-gray-500">
            {{ new Date(comment.created_at).toLocaleDateString() }}
          </span>
        </div>
        <span :class="ratingClass" class="text-sm font-medium">
          {{ rating > 0 ? '+' : '' }}{{ rating }}
        </span>
      </div>
      
      <!-- Like Buttons -->
      <LikeButtons
        type="comment"
        :id="comment.id"
        :initial-likes="comment.likes_count"
        :initial-dislikes="comment.dislikes_count"
        :is-liked="comment.is_liked_by_user"
        :is-disliked="comment.is_disliked_by_user"
      />
    </div>

    <p class="mt-2 text-gray-700 dark:text-gray-300">{{ comment.content }}</p>

    <div class="mt-2 flex items-center space-x-4">
      <button
        v-if="!isReplying"
        @click="isReplying = true"
        class="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
      >
        Ответить
      </button>
      <span v-if="comment.replies?.length" class="text-sm text-gray-500">
        {{ comment.replies.length }} {{ getPluralForm(comment.replies.length, ['ответ', 'ответа', 'ответов']) }}
      </span>
    </div>

    <!-- Reply Form -->
    <div v-if="isReplying" class="mt-4">
      <!-- Add reply form component here -->
    </div>

    <!-- Nested Replies -->
    <div v-if="comment.replies?.length" class="mt-4 ml-8">
      <Comment
        v-for="reply in comment.replies"
        :key="reply.id"
        :comment="reply"
      />
    </div>
  </div>
</template> 