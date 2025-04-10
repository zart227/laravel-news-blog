<script setup lang="ts">
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import { HandThumbUpIcon as ThumbUpIcon, HandThumbDownIcon as ThumbDownIcon } from '@heroicons/vue/24/outline';

interface Props {
  type: 'article' | 'comment';
  id: number;
  initialLikes: number;
  initialDislikes: number;
  isLiked?: boolean;
  isDisliked?: boolean;
}

interface LikeResponse {
  likes_count: number;
  dislikes_count: number;
  action: 'liked' | 'disliked' | null;
}

const props = withDefaults(defineProps<Props>(), {
  isLiked: false,
  isDisliked: false,
  initialLikes: 0,
  initialDislikes: 0
});

const likes = ref(props.initialLikes);
const dislikes = ref(props.initialDislikes);
const isLiked = ref(props.isLiked);
const isDisliked = ref(props.isDisliked);

const toggleLike = async () => {
  try {
    const response = await router.post('/like', {
      type: props.type,
      id: props.id
    });

    const data = response as unknown as LikeResponse;
    if (data) {
      likes.value = data.likes_count;
      dislikes.value = data.dislikes_count;
      isLiked.value = data.action === 'liked';
      isDisliked.value = false;
    }
  } catch (error) {
    console.error('Error toggling like:', error);
  }
};

const toggleDislike = async () => {
  try {
    const response = await router.post('/dislike', {
      type: props.type,
      id: props.id
    });

    const data = response as unknown as LikeResponse;
    if (data) {
      likes.value = data.likes_count;
      dislikes.value = data.dislikes_count;
      isDisliked.value = data.action === 'disliked';
      isLiked.value = false;
    }
  } catch (error) {
    console.error('Error toggling dislike:', error);
  }
};
</script>

<template>
  <div class="flex items-center space-x-4">
    <button
      @click="toggleLike"
      class="flex items-center space-x-1 text-sm"
      :class="{ 'text-blue-500': isLiked }"
    >
      <ThumbUpIcon class="w-5 h-5" />
      <span>{{ likes }}</span>
    </button>
    <button
      @click="toggleDislike"
      class="flex items-center space-x-1 text-sm"
      :class="{ 'text-red-500': isDisliked }"
    >
      <ThumbDownIcon class="w-5 h-5" />
      <span>{{ dislikes }}</span>
    </button>
  </div>
</template> 