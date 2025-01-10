<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg w-full max-w-2xl mx-4">
      <!-- Modal Header -->
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-xl font-semibold text-gray-900">
          {{ user ? "Edit User" : "Add New User" }}
        </h3>
      </div>

      <!-- Modal Body -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Name -->
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              v-model="formData.name"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <!-- Email -->
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              v-model="formData.email"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <!-- Password (only for new users) -->
          <div class="col-span-2" v-if="!user">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              v-model="formData.password"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <!-- Role -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              v-model="formData.role"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <!-- Status -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              v-model="formData.isActive"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            >
              <option :value="true">Active</option>
              <option :value="false">Inactive</option>
            </select>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-600 text-sm">
          {{ error }}
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary-dark disabled:opacity-50"
          >
            {{ isSubmitting ? "Saving..." : "Save User" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "UserModal",
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  emits: ["close", "save"],
  setup(props, { emit }) {
    const formData = ref({
      name: "",
      email: "",
      password: "",
      role: "user",
      isActive: true,
    });

    const error = ref("");
    const isSubmitting = ref(false);

    const initializeForm = () => {
      if (props.user) {
        formData.value = {
          ...props.user,
          password: "", // Don't include password when editing
        };
      }
    };

    const handleSubmit = async () => {
      try {
        isSubmitting.value = true;
        error.value = "";

        if (!formData.value.name.trim()) {
          throw new Error("Name is required");
        }

        if (!formData.value.email.trim()) {
          throw new Error("Email is required");
        }

        if (!props.user && !formData.value.password) {
          throw new Error("Password is required for new users");
        }

        emit("save", { ...formData.value });
      } catch (err) {
        error.value = err.message;
      } finally {
        isSubmitting.value = false;
      }
    };

    onMounted(initializeForm);

    return {
      formData,
      error,
      isSubmitting,
      handleSubmit,
    };
  },
};
</script>
