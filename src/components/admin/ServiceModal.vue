<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg w-full max-w-2xl mx-4">
      <!-- Modal Header -->
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-xl font-semibold text-gray-900">
          {{ service ? "Edit Service" : "Add New Service" }}
        </h3>
      </div>

      <!-- Modal Body -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Title -->
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Service Title
            </label>
            <input
              type="text"
              v-model="formData.title"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              v-model="formData.category"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            >
              <option value="">Select Category</option>
              <option
                v-for="category in categories"
                :key="category"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>

          <!-- Price -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Price (KSH)
            </label>
            <input
              type="number"
              v-model="formData.price"
              min="0"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <!-- Duration -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              v-model="formData.duration"
              min="15"
              step="15"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <!-- Image URL -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              v-model="formData.image"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <!-- Description -->
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              v-model="formData.description"
              rows="4"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            ></textarea>
          </div>

          <!-- Documents Required -->
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Required Documents
            </label>
            <div class="space-y-2">
              <div
                v-for="(doc, index) in formData.documents"
                :key="index"
                class="flex items-center space-x-2"
              >
                <input
                  type="text"
                  v-model="formData.documents[index]"
                  class="flex-1 p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  placeholder="Document name"
                />
                <button
                  type="button"
                  @click="removeDocument(index)"
                  class="text-red-600 hover:text-red-800"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <button
                type="button"
                @click="addDocument"
                class="text-primary hover:text-primary-dark text-sm"
              >
                <i class="fas fa-plus mr-1"></i>
                Add Document
              </button>
            </div>
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
            {{ isSubmitting ? "Saving..." : "Save Service" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "ServiceModal",
  props: {
    service: {
      type: Object,
      default: null,
    },
  },
  emits: ["close", "save"],
  setup(props, { emit }) {
    const categories = [
      "Safety Audit",
      "Training",
      "Certification",
      "Consultation",
      "Risk Assessment",
      "Environmental Services",
    ];

    const formData = ref({
      title: "",
      description: "",
      price: 0,
      duration: 60,
      category: "",
      image: "",
      documents: [],
    });

    const error = ref("");
    const isSubmitting = ref(false);

    const initializeForm = () => {
      if (props.service) {
        formData.value = {
          ...props.service,
          documents: [...(props.service.documents || [])],
        };
      }
    };

    const addDocument = () => {
      formData.value.documents.push("");
    };

    const removeDocument = (index) => {
      formData.value.documents.splice(index, 1);
    };

    const handleSubmit = async () => {
      try {
        isSubmitting.value = true;
        error.value = "";

        // Filter out empty document entries
        formData.value.documents = formData.value.documents.filter((doc) =>
          doc.trim()
        );

        // Validate form
        if (!formData.value.title.trim()) {
          throw new Error("Service title is required");
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
      categories,
      error,
      isSubmitting,
      addDocument,
      removeDocument,
      handleSubmit,
    };
  },
};
</script>
