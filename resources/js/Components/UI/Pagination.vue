<template>
  <div v-if="links?.length > 3" class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <Link
        v-for="link in mobileLinks"
        :key="link.label"
        :href="link.url || '#'"
        :class="[
          link.url
            ? 'relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
            : 'relative inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 cursor-not-allowed',
        ]"
      >
        {{ link.label === 'Previous' ? 'Назад' : 'Вперед' }}
      </Link>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <Link
            v-for="link in links"
            :key="link.label"
            :href="link.url || '#'"
            :class="[
              link.url
                ? link.active
                  ? 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-500 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 cursor-not-allowed',
            ]"
            v-html="link.label"
          />
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Props {
  links: PaginationLink[];
}

const props = withDefaults(defineProps<Props>(), {
  links: () => []
});

const mobileLinks = computed(() => 
  props.links?.filter(link => link.label === 'Previous' || link.label === 'Next') || []
);
</script> 