<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';

const page = usePage();
const isAuthenticated = computed(() => !!page.props?.auth?.user);
const user = computed(() => page.props?.auth?.user || null);
</script>

<template>
  <Head title="Тест авторизации" />
  <AppLayout title="Тест авторизации">
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6">
          <h2 class="text-2xl font-bold mb-4">Тест авторизации</h2>
          
          <div class="space-y-4">
            <div>
              <strong>Статус авторизации:</strong>
              <span :class="isAuthenticated ? 'text-green-600' : 'text-red-600'">
                {{ isAuthenticated ? 'Авторизован' : 'Не авторизован' }}
              </span>
            </div>

            <div v-if="user">
              <h3 class="text-xl font-semibold mb-2">Информация о пользователе:</h3>
              <ul class="list-disc list-inside space-y-2">
                <li><strong>ID:</strong> {{ user.id }}</li>
                <li><strong>Имя:</strong> {{ user.name }}</li>
                <li><strong>Email:</strong> {{ user.email }}</li>
                <li><strong>Роль:</strong> {{ user.role || 'Не указана' }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template> 