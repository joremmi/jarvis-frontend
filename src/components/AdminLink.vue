<template>
  <div class="fixed bottom-4 right-4 z-50">
    <transition name="fade">
      <router-link
        v-if="!isAdminRoute"
        :to="{ name: 'AdminLogin' }"
        class="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-3 shadow-lg flex items-center justify-center opacity-50 hover:opacity-100 transition-all duration-300 transform hover:scale-105"
        title="Admin Access"
      >
        <i class="fas fa-shield-alt text-lg"></i>
      </router-link>
    </transition>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "AdminLink",
  setup() {
    const route = useRoute();

    const isAdminRoute = computed(() => {
      return route.path.includes("/admin");
    });

    return {
      isAdminRoute,
    };
  },
};
</script>

<style scoped>
.transform {
  transition: transform 0.2s ease;
}
</style>
