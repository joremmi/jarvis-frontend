<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary">404</h1>
      <h2 class="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h2>
      <p class="mt-2 text-lg text-gray-600">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <div class="mt-6">
        <router-link
          to="/"
          class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Go Back Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
};
</script>
