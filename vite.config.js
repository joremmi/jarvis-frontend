// vite.config.js

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  define: {
    __VUE_PROD_DEVTOOLS__: false, // Disable devtools in production
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // Add this flag
  },
});