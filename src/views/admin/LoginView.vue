<!-- frontend\src\views\admin\LoginView.vue -->

<template>
  <div
    class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="formData.rememberMe"
              type="checkbox"
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <router-link
              to="/forgot-password"
              class="font-medium text-primary hover:text-primary-dark"
            >
              Forgot your password?
            </router-link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <i class="fas fa-lock"></i>
            </span>
            {{ isLoading ? "Signing in..." : "Sign in" }}
          </button>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-600 text-sm text-center">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "AdminLogin",
  setup() {
    const store = useStore();
    const router = useRouter();

    const formData = ref({
      email: "",
      password: "",
      rememberMe: false,
    });

    const error = ref("");
    const isLoading = ref(false);

    const handleSubmit = async () => {
      try {
        isLoading.value = true;
        error.value = "";

        const response = await store.dispatch(
          "auth/adminLogin",
          formData.value
        );

        if (response.user.role !== "admin") {
          throw new Error("Access denied. Admin privileges required.");
        }

        router.push("/admin");
      } catch (err) {
        error.value = err.message || "Invalid credentials";
      } finally {
        isLoading.value = false;
      }
    };

    return {
      formData,
      error,
      isLoading,
      handleSubmit,
    };
  },
};
</script>
