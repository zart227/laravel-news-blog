<script setup lang="ts">
import { computed } from 'vue';
import { formatNumber } from '@/utils/statistics.utils';
import type { Component } from 'vue';

interface Props {
  title: string;
  value: number;
  growth?: number;
  icon?: Component;
  positiveColor?: string;
  negativeColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  growth: undefined,
  icon: undefined,
  positiveColor: 'text-green-500',
  negativeColor: 'text-red-500'
});

const growthClass = computed(() => {
  if (!props.growth) return '';
  return props.growth > 0 ? props.positiveColor : props.negativeColor;
});

const growthIcon = computed(() => {
  if (!props.growth) return '';
  return props.growth > 0 ? '↑' : '↓';
});
</script>

<template>
  <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 transition-all duration-300">
    <div class="flex items-center justify-between">
      <div>
        <slot name="header">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            {{ title }}
          </h3>
        </slot>
        <slot name="content">
          <p class="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100 transition-all duration-300">
            {{ formatNumber(value) }}
          </p>
          <p v-if="growth !== undefined" :class="growthClass" class="mt-2 text-sm transition-all duration-300">
            {{ growthIcon }} {{ Math.abs(growth) }}% с прошлого периода
          </p>
        </slot>
      </div>
      <slot name="icon">
        <div v-if="icon" class="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
          <component :is="icon" class="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </div>
      </slot>
    </div>
  </div>
</template> 