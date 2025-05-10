<template>
  <div
    :class="[
      'fixed z-50 p-4 rounded-lg shadow-lg max-w-md transition-all duration-300',
      positionClasses,
      typeClasses
    ]"
    v-show="isVisible"
    @click="close"
  >
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <component :is="icon" class="h-5 w-5" />
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium">
          {{ message }}
        </p>
      </div>
      <div class="ml-auto pl-3">
        <button
          class="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
          :class="closeButtonClasses"
          @click="close"
        >
          <span class="sr-only">Закрыть</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'info', 'warning'].includes(value)
  },
  message: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'top-right',
    validator: (value) => ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const isVisible = ref(false)
let timeout = null

const typeClasses = computed(() => ({
  'bg-green-50 text-green-800': props.type === 'success',
  'bg-red-50 text-red-800': props.type === 'error',
  'bg-blue-50 text-blue-800': props.type === 'info',
  'bg-yellow-50 text-yellow-800': props.type === 'warning'
}))

const closeButtonClasses = computed(() => ({
  'text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50': props.type === 'success',
  'text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50': props.type === 'error',
  'text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50': props.type === 'info',
  'text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50': props.type === 'warning'
}))

const positionClasses = computed(() => ({
  'top-0 right-0': props.position === 'top-right',
  'top-0 left-0': props.position === 'top-left',
  'bottom-0 right-0': props.position === 'bottom-right',
  'bottom-0 left-0': props.position === 'bottom-left'
}))

const icon = computed(() => {
  switch (props.type) {
    case 'success':
      return CheckCircleIcon
    case 'error':
      return XCircleIcon
    case 'info':
      return InformationCircleIcon
    case 'warning':
      return ExclamationCircleIcon
  }
})

const close = () => {
  isVisible.value = false
  if (timeout) {
    clearTimeout(timeout)
  }
}

onMounted(() => {
  isVisible.value = true
  if (props.duration > 0) {
    timeout = setTimeout(close, props.duration)
  }
})

onBeforeUnmount(() => {
  if (timeout) {
    clearTimeout(timeout)
  }
})
</script> 