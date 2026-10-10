<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import axios from 'axios';
import Papa from 'papaparse';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, type ChartOptions } from 'chart.js';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import StatisticsCard from '@/Components/Statistics/StatisticsCard.vue';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Period = 'week' | 'month' | 'year';
interface Report {
  summary: { total_views: number; unique_viewers: number; total_likes: number; total_comments: number };
  activity: Array<{ date: string; views: number; unique_views: number; comments: number }>;
  popular: Array<{ id: number; title: string; slug: string; views: number; unique_views: number; likes: number; comments: number }>;
  browsers: Array<{ name: string; count: number }>;
  referrers: Array<{ name: string; count: number }>;
}
const period = ref<Period>('week');
const report = ref<Report>({ summary: { total_views: 0, unique_viewers: 0, total_likes: 0, total_comments: 0 }, activity: [], popular: [], browsers: [], referrers: [] });
const loading = ref(false);
const error = ref('');
let request: AbortController | undefined;
let refreshTimer: ReturnType<typeof setTimeout> | undefined;

async function loadReport() {
  request?.abort();
  const current = new AbortController();
  request = current;
  loading.value = true;
  error.value = '';
  try {
    const response = await axios.get<Report>('/api/statistics', { params: { period: period.value }, signal: current.signal });
    if (!current.signal.aborted) report.value = response.data;
  } catch (e) {
    if (!axios.isCancel(e)) error.value = 'Не удалось загрузить статистику. Попробуйте ещё раз.';
  } finally {
    if (request === current) loading.value = false;
  }
}
watch(period, loadReport);
const charts = computed(() => [
  { key: 'views', title: 'Просмотры', color: '#2563eb' },
  { key: 'unique_views', title: 'Уникальные IP', color: '#059669' },
  { key: 'comments', title: 'Комментарии', color: '#9333ea' },
].map(metric => ({
  title: metric.title,
  data: {
    labels: report.value.activity.map(row => row.date),
    datasets: [{ label: metric.title, borderColor: metric.color, backgroundColor: metric.color,
      data: report.value.activity.map(row => row[metric.key as 'views' | 'unique_views' | 'comments']), tension: 0.2 }],
  },
})));
const options: ChartOptions<'line'> = { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } };

function exportCsv() {
  const rows: Record<string, string | number>[] = [
    ...Object.entries(report.value.summary).map(([name, count]) => ({ section: 'summary', name, count })),
    ...report.value.activity.map(row => ({ section: 'activity', ...row })),
    ...report.value.popular.map(row => ({ section: 'popular', name: row.title, views: row.views, unique_views: row.unique_views, likes: row.likes, comments: row.comments })),
    ...report.value.browsers.map(row => ({ section: 'browsers', ...row })),
    ...report.value.referrers.map(row => ({ section: 'referrers', ...row })),
  ];
  const csv = Papa.unparse({ fields: ['section', 'date', 'name', 'count', 'views', 'unique_views', 'likes', 'comments'], data: rows }, { escapeFormulae: true });
  const url = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8;' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `statistics-${period.value}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

onMounted(() => {
  void loadReport();
  window.Echo?.private('admin.statistics').listen('StatisticsUpdated', () => {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(loadReport, 200);
  });
});
onBeforeUnmount(() => {
  request?.abort();
  clearTimeout(refreshTimer);
  window.Echo?.leave('admin.statistics');
});
</script>

<template>
  <Head title="Статистика" />
  <AdminLayout title="Статистика">
    <div class="space-y-6" :aria-busy="loading">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <label class="flex items-center gap-3">Период
          <select v-model="period" class="rounded-md border-gray-300">
            <option value="week">Неделя</option><option value="month">Месяц</option><option value="year">Год</option>
          </select>
        </label>
        <div class="flex items-center gap-3">
          <span v-if="loading" role="status" class="text-sm text-gray-500">Обновление…</span>
          <button class="rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50" :disabled="loading || !!error" @click="exportCsv">Экспорт CSV</button>
        </div>
      </div>
      <div v-if="error" role="alert" class="rounded-md bg-red-50 p-4 text-red-700">
        {{ error }} <button class="ml-2 underline" @click="loadReport">Повторить</button>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard title="Просмотры" :value="report.summary.total_views" />
        <StatisticsCard title="Уникальные IP за период" :value="report.summary.unique_viewers" />
        <StatisticsCard title="Лайки за период" :value="report.summary.total_likes" />
        <StatisticsCard title="Комментарии за период" :value="report.summary.total_comments" />
      </div>
      <p class="text-sm text-gray-500">Часовой пояс: Москва. {{ period === 'year' ? 'Активность по неделям с понедельника.' : 'Активность по дням.' }} Уникальные IP считаются отдельно в каждом интервале.</p>
      <section v-for="chart in charts" :key="chart.title" class="rounded-lg bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-lg font-semibold">{{ chart.title }}</h2>
        <div class="h-64"><Line :data="chart.data" :options="options" :aria-label="chart.title" role="img" /></div>
      </section>
      <section class="rounded-lg bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-lg font-semibold">Топ-5 статей за всё время</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead><tr class="border-b"><th class="p-3">Статья</th><th class="p-3">Просмотры</th><th class="p-3">Лайки</th><th class="p-3">Комментарии</th></tr></thead>
            <tbody><tr v-for="article in report.popular" :key="article.id" class="border-b">
              <td class="p-3"><Link class="text-blue-600 hover:underline" :href="`/articles/${article.slug}`">{{ article.title }}</Link></td>
              <td class="p-3">{{ article.views }}</td><td class="p-3">{{ article.likes }}</td><td class="p-3">{{ article.comments }}</td>
            </tr></tbody>
          </table>
          <p v-if="!report.popular.length" class="py-4 text-gray-500">Просмотров пока нет.</p>
        </div>
      </section>
      <div class="grid gap-6 md:grid-cols-2">
        <section v-for="dimension in [{ title: 'Браузеры за всё время', rows: report.browsers }, { title: 'Рефереры за всё время', rows: report.referrers }]" :key="dimension.title" class="rounded-lg bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-lg font-semibold">{{ dimension.title }}</h2>
          <ol class="space-y-3"><li v-for="row in dimension.rows" :key="row.name" class="flex justify-between gap-4"><span class="break-all">{{ row.name }}</span><span class="font-medium">{{ row.count }}</span></li></ol>
          <p v-if="!dimension.rows.length" class="text-gray-500">Данных пока нет.</p>
        </section>
      </div>
    </div>
  </AdminLayout>
</template>
