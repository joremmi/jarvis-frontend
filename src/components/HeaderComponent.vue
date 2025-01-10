<template>
  <header class="bg-white">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <router-link to="/" class="text-2xl font-bold text-primary">
          Jarvis Safety
        </router-link>

        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="link in navigationLinks"
            :key="link.to"
            :to="link.to"
            class="text-gray-600 hover:text-primary transition-colors"
          >
            {{ link.text }}
          </router-link>
        </div>

        <div class="hidden md:flex items-center space-x-6">
          <template v-if="!isAuthenticated">
            <button
              @click="handleLogin"
              class="px-6 py-2 text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
            >
              Login
            </button>
          </template>

          <template v-if="isAuthenticated">
            <router-link
              to="/my-bookings"
              class="text-gray-600 hover:text-primary transition-colors"
            >
              My Bookings
            </router-link>
            <span class="text-gray-600">{{ currentUser?.name }}</span>
            <button
              @click="handleLogout"
              class="px-6 py-2 text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
            >
              Logout
            </button>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

export default {
  name: "HeaderComponent",
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const isMobileMenuOpen = ref(false);

    const navigationLinks = [
      { to: "/", text: "Home" },
      { to: "/services", text: "Services" },
      { to: "/about", text: "About" },
      { to: "/contact", text: "Contact" },
    ];

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const handleLogout = () => {
      authStore.logout();
      router.push("/");
    };

    const handleLogin = () => {
      router.push("/login");
    };

    return {
      navigationLinks,
      isMobileMenuOpen,
      toggleMobileMenu,
      handleLogout,
      handleLogin,
      isAuthenticated: computed(() => authStore.isAuthenticated),
      currentUser: computed(() => authStore.currentUser),
    };
  },
};
</script>

<style scoped>
header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
