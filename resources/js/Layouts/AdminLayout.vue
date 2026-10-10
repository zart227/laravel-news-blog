<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import AdminSidebar from '@/Components/Navigation/AdminSidebar.vue';
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

interface User {
  name: string;
  is_admin: boolean;
}

interface CustomPageProps {
  auth: {
    user: User;
  };
  [key: string]: any;
}

interface Props {
  title?: string;
}

const props = defineProps<Props>();
const page = usePage<CustomPageProps>();
const user = computed(() => page.props.auth.user);
</script>

<template>
  <div>
    <Head :title="title" />

    <div class="min-h-screen bg-gray-100">
      <!-- Верхняя навигационная панель -->
      <nav class="bg-white border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <!-- Логотип -->
              <div class="shrink-0 flex items-center">
                <Link :href="route('home')" class="text-xl font-bold text-gray-800">
                  Laravel News Blog
                </Link>
              </div>
            </div>

            <!-- Правая часть навигации -->
            <div class="hidden sm:flex sm:items-center sm:ml-6">
              <div class="ml-3 relative">
                <div class="flex items-center space-x-4">
                  <Link 
                    :href="route('home')" 
                    class="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Вернуться на сайт
                  </Link>
                  <span class="text-gray-500">|</span>
                  <span class="text-sm text-gray-700">{{ user?.name }}</span>
                  <Link
                    :href="route('logout')"
                    method="post"
                    as="button"
                    class="text-sm text-red-600 hover:text-red-800"
                  >
                    Выйти
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="flex">
        <!-- Боковая панель -->
        <AdminSidebar />

        <!-- Основной контент -->
        <main class="flex-1 p-8">
          <div class="max-w-7xl mx-auto">
            <div class="mb-6">
              <h1 class="text-3xl font-bold text-gray-900">
                {{ title }}
              </h1>
            </div>

            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template> 