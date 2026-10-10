/// <reference types="vite/client" />
<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import Header from '@/Components/Navigation/Header.vue';
import Footer from '@/Components/Navigation/Footer.vue';

interface Props {
  title?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header />

    <header v-if="title" class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ title }}
        </h1>
      </div>
    </header>

    <main class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>

    <Footer />
  </div>
</template> 