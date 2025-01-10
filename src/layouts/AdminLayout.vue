<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <h1 class="text-2xl font-bold text-primary">Admin Dashboard</h1>
        <button
          @click="handleLogout"
          class="px-4 py-2 text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </header>

    <div class="flex container mx-auto mt-6">
      <!-- Sidebar -->
      <aside class="w-64 bg-white rounded-lg shadow-sm h-fit">
        <nav class="p-4">
          <router-link
            to="/admin"
            class="flex items-center px-4 py-3 rounded-lg transition-colors mb-2"
            :class="[
              $route.path === '/admin'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-50 hover:text-primary',
            ]"
          >
            <i class="fas fa-home mr-3"></i>
            Dashboard
          </router-link>

          <router-link
            to="/admin/services"
            class="flex items-center px-4 py-3 rounded-lg transition-colors mb-2"
            :class="[
              $route.path.includes('/admin/services')
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-50 hover:text-primary',
            ]"
          >
            <i class="fas fa-cogs mr-3"></i>
            Services
          </router-link>

          <router-link
            to="/admin/bookings"
            class="flex items-center px-4 py-3 rounded-lg transition-colors mb-2"
            :class="[
              $route.path.includes('/admin/bookings')
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-50 hover:text-primary',
            ]"
          >
            <i class="fas fa-calendar-alt mr-3"></i>
            Bookings
          </router-link>

          <router-link
            to="/admin/users"
            class="flex items-center px-4 py-3 rounded-lg transition-colors mb-2"
            :class="[
              $route.path.includes('/admin/users')
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-50 hover:text-primary',
            ]"
          >
            <i class="fas fa-users mr-3"></i>
            Users
          </router-link>

          <router-link
            to="/admin/settings"
            class="flex items-center px-4 py-3 rounded-lg transition-colors mb-2"
            :class="[
              $route.path.includes('/admin/settings')
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-50 hover:text-primary',
            ]"
          >
            <i class="fas fa-cog mr-3"></i>
            Settings
          </router-link>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 ml-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

export default {
  name: "AdminLayout",
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const handleLogout = async () => {
      authStore.logout();
      router.push("/login");
    };

    return {
      handleLogout,
    };
  },
};
</script>
