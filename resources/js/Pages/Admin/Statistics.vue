<?php

<template>
  <AppLayout>
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Период -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700">Период</label>
          <select
            v-model="period"
            @change="fetchStatistics"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="week">Неделя</option>
            <option value="month">Месяц</option>
            <option value="year">Год</option>
          </select>
        </div>

        <!-- Общая статистика -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-6">
          <div v-for="(stat, key) in summary" :key="key" class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <dt class="text-sm font-medium text-gray-500 truncate">{{ formatStatName(key) }}</dt>
              <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stat }}</dd>
            </div>
          </div>
        </div>

        <!-- Графики -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <!-- График просмотров -->
          <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Просмотры</h3>
            <LineChart
              v-if="viewsChartData"
              :chart-data="viewsChartData"
              :options="chartOptions"
            />
          </div>

          <!-- График комментариев -->
          <div class="bg-white shadow rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Комментарии</h3>
            <LineChart
              v-if="commentsChartData"
              :chart-data="commentsChartData"
              :options="chartOptions"
            />
          </div>
        </div>

        <!-- Популярные статьи и активные пользователи -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Популярные статьи -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg font-medium text-gray-900">Популярные статьи</h3>
            </div>
            <div class="border-t border-gray-200">
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="article in popularArticles" :key="article.id" class="px-4 py-4 sm:px-6">
                  <div class="flex items-center justify-between">
                    <div class="truncate">
                      <p class="font-medium text-indigo-600 truncate">{{ article.title }}</p>
                      <p class="text-sm text-gray-500">{{ article.author }}</p>
                    </div>
                    <div class="ml-2 flex-shrink-0 flex">
                      <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {{ article.views }} просмотров
                      </p>
                      <p class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {{ article.comments }} комментариев
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Активные пользователи -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg font-medium text-gray-900">Активные пользователи</h3>
            </div>
            <div class="border-t border-gray-200">
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="(user, index) in activeUsers" :key="index" class="px-4 py-4 sm:px-6">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-900">{{ user.user }}</p>
                    <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {{ user.comments }} комментариев
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Line as LineChart } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { notify } from '@/utils/notifications';

// Регистрируем компоненты Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const period = ref('week');
const summary = ref({});
const views = ref([]);
const comments = ref([]);
const popularArticles = ref([]);
const activeUsers = ref([]);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const viewsChartData = computed(() => {
  if (!views.value.length) return null;

  const labels = views.value.map(item => item.date);
  return {
    labels,
    datasets: [
      {
        label: 'Все просмотры',
        data: views.value.map(item => item.views),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Уникальные просмотры',
        data: views.value.map(item => item.unique_views),
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1
      }
    ]
  };
});

const commentsChartData = computed(() => {
  if (!comments.value.length) return null;

  const labels = comments.value.map(item => item.date);
  return {
    labels,
    datasets: [
      {
        label: 'Комментарии',
        data: comments.value.map(item => item.count),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };
});

const formatStatName = (key) => {
  const names = {
    total_articles: 'Всего статей',
    published_articles: 'Опубликовано',
    total_views: 'Просмотров',
    total_comments: 'Комментариев',
    unique_viewers: 'Уникальных просмотров'
  };
  return names[key] || key;
};

const fetchStatistics = async () => {
  try {
    const response = await axios.get('/api/statistics', {
      params: { period: period.value }
    });
    
    summary.value = response.data.summary;
    views.value = response.data.views;
    comments.value = response.data.comments;
    popularArticles.value = response.data.popular_articles;
    activeUsers.value = response.data.active_users;
  } catch (error) {
    notify.error('Ошибка при загрузке статистики');
  }
};

onMounted(() => {
  fetchStatistics();
});
</script> 