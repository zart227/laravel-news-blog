<script setup lang="ts">
import { computed } from 'vue';
import { formatNumber } from '@/utils/statistics.utils';

interface Props {
  title: string;
  value: number;
  icon?: any;
  trend?: number;
  trendLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  trend: undefined,
  trendLabel: ''
});

const formattedValue = computed(() => formatNumber(props.value));

const growthClass = computed(() => {
  if (!props.trend) return '';
  return props.trend > 0 ? 'text-green-600' : 'text-red-600';
});

const growthIcon = computed(() => {
  if (!props.trend) return '';
  return props.trend > 0 ? '↑' : '↓';
});

const iconMap = {
  article: 'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
  view: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z',
  like: 'M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z',
  comment: 'M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z'
};

const colorMap = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-800'
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-800'
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-800'
  },
  yellow: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800'
  }
};
</script>

<template>
  <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
    <div class="p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600">
            {{ title }}
          </p>
          <p class="mt-1 text-3xl font-semibold text-gray-900">
            {{ formattedValue }}
          </p>
          <div v-if="trend !== undefined" class="mt-2 flex items-center text-sm">
            <span 
              :class="[
                trend > 0 ? 'text-green-600' : 'text-red-600',
                'font-medium'
              ]"
            >
              {{ trend > 0 ? '+' : '' }}{{ trend }}%
            </span>
            <span class="text-gray-600 ml-2">{{ trendLabel }}</span>
          </div>
        </div>
        <div v-if="icon" class="p-3 bg-blue-50 rounded-full">
          <component 
            :is="icon" 
            class="h-6 w-6 text-blue-600"
          />
        </div>
      </div>
    </div>
  </div>
</template> 