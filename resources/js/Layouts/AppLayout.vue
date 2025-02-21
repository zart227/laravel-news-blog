<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <Link :href="route('home')" class="text-xl font-bold">
                Laravel News Blog
              </Link>
            </div>

            <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
              <NavLink :href="route('articles.index')" :active="route().current('articles.index')">
                Статьи
              </NavLink>
            </div>
          </div>

          <div class="flex items-center">
            <div v-if="$page.props.auth.user" class="ml-3 relative">
              <span class="text-gray-600">{{ $page.props.auth.user.name }}</span>
              <Link
                :href="route('logout')"
                method="post"
                as="button"
                class="ml-4 text-sm text-gray-500 hover:text-gray-700"
              >
                Выйти
              </Link>
            </div>
            <div v-else>
              <Link
                :href="route('login')"
                class="text-sm text-gray-500 hover:text-gray-700"
              >
                Войти
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <AdminNav v-if="$page.props.auth.user?.role === 'admin'" />

    <main class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import NavLink from '@/Components/NavLink.vue';
import AdminNav from '@/Components/AdminNav.vue';
</script>

<!-- Навигация для админа -->
<template v-if="$page.props.auth.user?.is_admin">
    <div class="px-3 py-3 space-y-1">
        <ResponsiveNavLink :href="route('admin.articles')" :active="route().current('admin.articles')">
            Управление статьями
        </ResponsiveNavLink>
        <ResponsiveNavLink :href="route('admin.statistics')" :active="route().current('admin.statistics')">
            Статистика
        </ResponsiveNavLink>
    </div>
</template> 