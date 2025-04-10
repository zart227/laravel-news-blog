<template>
  <div>
    <div class="flex items-center justify-center w-full">
      <label
        :for="inputId"
        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        :class="{ 
          'border-indigo-500': isDragging,
          'border-red-500': error
        }"
        @dragenter.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @dragover.prevent
        @drop.prevent="handleDrop"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6" v-if="!preview">
          <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p class="mb-2 text-sm text-gray-500">
            <span class="font-semibold">Нажмите для загрузки</span> или перетащите файл
          </p>
          <p class="text-xs text-gray-500">
            {{ acceptedFileTypes }} (макс. {{ formatFileSize(maxFileSize) }})
          </p>
        </div>
        <div v-else class="relative w-full h-full">
          <img
            :src="preview"
            class="w-full h-full object-contain"
            :alt="currentFile?.name || 'Preview'"
          >
          <button
            @click.prevent="clearFile"
            class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </label>
      <input
        :id="inputId"
        type="file"
        class="hidden"
        :accept="accept"
        @change="handleFileSelect"
      >
    </div>
    
    <div v-if="error" class="mt-2 text-sm text-red-600">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  props: {
    modelValue: {
      type: [File, null],
      default: null
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    maxFileSize: {
      type: Number,
      default: 2 * 1024 * 1024 // 2MB
    },
    initialPreview: {
      type: String,
      default: null
    }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const isDragging = ref(false);
    const error = ref('');
    const currentFile = ref(null);
    const preview = ref(props.initialPreview);
    const inputId = `file-upload-${Math.random().toString(36).substr(2, 9)}`;

    const acceptedFileTypes = computed(() => {
      return props.accept
        .split(',')
        .map(type => type.trim())
        .map(type => {
          if (type === 'image/*') return 'Изображения';
          return type.replace('image/', '').toUpperCase();
        })
        .join(', ');
    });

    const validateFile = (file) => {
      if (!file) return 'Файл не выбран';
      
      if (!file.type.startsWith('image/')) {
        return 'Пожалуйста, загрузите изображение';
      }

      if (file.size > props.maxFileSize) {
        return `Размер файла не должен превышать ${formatFileSize(props.maxFileSize)}`;
      }

      return '';
    };

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleFile = (file) => {
      error.value = validateFile(file);
      if (error.value) {
        clearFile();
        return;
      }

      currentFile.value = file;
      emit('update:modelValue', file);

      const reader = new FileReader();
      reader.onload = (e) => {
        preview.value = e.target.result;
      };
      reader.readAsDataURL(file);
    };

    const handleFileSelect = (event) => {
      const file = event.target.files[0];
      handleFile(file);
    };

    const handleDrop = (event) => {
      isDragging.value = false;
      const file = event.dataTransfer.files[0];
      handleFile(file);
    };

    const clearFile = () => {
      currentFile.value = null;
      preview.value = null;
      emit('update:modelValue', null);
    };

    return {
      isDragging,
      error,
      preview,
      currentFile,
      inputId,
      acceptedFileTypes,
      formatFileSize,
      handleFileSelect,
      handleDrop,
      clearFile
    };
  }
};
</script> 