<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Статья -->
    <article class="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        v-if="article.image"
        :src="'/storage/' + article.image"
        :alt="article.title"
        class="w-full h-64 object-cover"
      >
      <div class="p-6">
        <h1 class="text-3xl font-bold mb-4">{{ article.title }}</h1>
        <div class="flex items-center text-gray-600 mb-4">
          <span>Автор: {{ article.user.name }}</span>
          <span class="mx-2">•</span>
          <span>{{ formatDate(article.created_at) }}</span>
        </div>
        <div class="prose max-w-none" v-html="article.content"></div>
        
        <!-- Теги -->
        <div v-if="article.tags && article.tags.length" class="mt-6 flex gap-2">
          <span
            v-for="tag in article.tags"
            :key="tag.id"
            class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {{ tag.name }}
          </span>
        </div>
      </div>
    </article>

    <!-- Секция комментариев -->
    <section class="mt-8">
      <h2 class="text-2xl font-bold mb-6">Комментарии</h2>
      
      <!-- Форма добавления комментария -->
      <form v-if="$page.props.auth.user" @submit.prevent="addComment" class="mb-8">
        <textarea
          v-model="newComment"
          rows="3"
          placeholder="Оставьте свой комментарий..."
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
        <button
          type="submit"
          class="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
        </button>
      </form>
      <div v-else class="mb-8 p-4 bg-gray-50 rounded-lg">
        <p class="text-gray-600">
          Чтобы оставить комментарий, пожалуйста,
          <Link href="/login" class="text-blue-500 hover:underline">войдите</Link>
          или
          <Link href="/register" class="text-blue-500 hover:underline">зарегистрируйтесь</Link>
        </p>
      </div>

      <!-- Список комментариев -->
      <div class="space-y-6">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="bg-white p-4 rounded-lg shadow"
        >
          <div class="flex justify-between items-start mb-2">
            <div>
              <span class="font-semibold">{{ comment.user.name }}</span>
              <span class="text-gray-500 text-sm ml-2">
                {{ formatDate(comment.created_at) }}
              </span>
            </div>
            <div v-if="canModifyComment(comment)" class="flex space-x-2">
              <button
                v-if="!comment.isEditing"
                @click="startEditing(comment)"
                class="text-blue-500 hover:text-blue-600"
              >
                Редактировать
              </button>
              <button
                @click="deleteComment(comment)"
                class="text-red-500 hover:text-red-600"
              >
                Удалить
              </button>
            </div>
          </div>
          
          <div v-if="comment.isEditing">
            <textarea
              v-model="comment.editContent"
              rows="3"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            ></textarea>
            <div class="flex space-x-2">
              <button
                @click="updateComment(comment)"
                class="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Сохранить
              </button>
              <button
                @click="cancelEditing(comment)"
                class="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Отмена
              </button>
            </div>
          </div>
          <p v-else>{{ comment.content }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'
import axios from 'axios'
import { notify } from '@/utils/notifications'

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const comments = ref([])
const newComment = ref('')
const isSubmitting = ref(false)

const fetchComments = async () => {
  try {
    const response = await axios.get(`/api/articles/${props.article.id}/comments`)
    comments.value = response.data.map(comment => ({
      ...comment,
      isEditing: false,
      editContent: comment.content
    }))
  } catch (error) {
    notify.error('Ошибка при загрузке комментариев')
  }
}

const addComment = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true
  try {
    const response = await axios.post(`/api/articles/${props.article.id}/comments`, {
      content: newComment.value
    })
    comments.value.unshift({
      ...response.data.comment,
      isEditing: false,
      editContent: response.data.comment.content
    })
    newComment.value = ''
    notify.success('Комментарий успешно добавлен')
  } catch (error) {
    notify.error('Ошибка при добавлении комментария')
  } finally {
    isSubmitting.value = false
  }
}

const startEditing = (comment) => {
  comment.isEditing = true
  comment.editContent = comment.content
}

const cancelEditing = (comment) => {
  comment.isEditing = false
  comment.editContent = comment.content
}

const updateComment = async (comment) => {
  try {
    const response = await axios.put(`/api/comments/${comment.id}`, {
      content: comment.editContent
    })
    Object.assign(comment, {
      ...response.data.comment,
      isEditing: false
    })
    notify.success('Комментарий успешно обновлен')
  } catch (error) {
    notify.error('Ошибка при обновлении комментария')
  }
}

const deleteComment = async (comment) => {
  if (!confirm('Вы уверены, что хотите удалить этот комментарий?')) {
    return
  }

  try {
    await axios.delete(`/api/comments/${comment.id}`)
    const index = comments.value.findIndex(c => c.id === comment.id)
    if (index !== -1) {
      comments.value.splice(index, 1)
    }
    notify.success('Комментарий успешно удален')
  } catch (error) {
    notify.error('Ошибка при удалении комментария')
  }
}

const canModifyComment = (comment) => {
  const user = usePage().props.auth.user
  return user && (user.id === comment.user_id || user.is_admin)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Загружаем комментарии при монтировании компонента
fetchComments()
</script> 