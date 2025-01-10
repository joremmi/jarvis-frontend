<template>
  <div>
    <Header v-if="!isAdminRoute" />
    <router-view v-slot="{ Component, route }">
      <transition :name="getTransitionName(route)" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
    <Footer v-if="!isAdminRoute" />
    <AdminLink />
  </div>
</template>

<script>
import AdminLink from "@/components/AdminLink.vue";
import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import "@/assets/styles/transitions.css";

export default {
  name: "App",
  components: {
    AdminLink,
    Header,
    Footer,
  },
  setup() {
    const route = useRoute();

    const isAdminRoute = computed(() => {
      return route.path.includes("/admin");
    });

    const getTransitionName = (route) => {
      // Use different transitions for different route types
      if (route.path.startsWith("/admin")) {
        return "admin";
      }
      if (route.meta.transition) {
        return route.meta.transition;
      }
      return "page";
    };

    return {
      getTransitionName,
      isAdminRoute,
    };
  },
};
</script>

<style>
#app {
  min-height: 100vh;
  position: relative;
}
</style>
