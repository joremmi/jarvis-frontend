<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg w-full max-w-2xl mx-4">
      <!-- Modal Header -->
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-xl font-semibold text-gray-900">
          Edit Booking #{{ booking._id.slice(-6).toUpperCase() }}
        </h3>
      </div>

      <!-- Modal Body -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              v-model="formData.date"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <!-- Time -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <input
              type="time"
              v-model="formData.time"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <!-- Status -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              v-model="formData.status"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              required
            >
              <option
                v-for="status in statusOptions"
                :key="status"
                :value="status"
              >
                {{ status }}
              </option>
            </select>
          </div>

          <!-- Notes -->
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Admin Notes
            </label>
            <textarea
              v-model="formData.adminNotes"
              rows="4"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              placeholder="Add any internal notes about this booking..."
            ></textarea>
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
            {{ isSubmitting ? "Saving..." : "Save Changes" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "BookingModal",
  props: {
    booking: {
      type: Object,
      required: true,
    },
  },
  emits: ["close", "save"],
  setup(props, { emit }) {
    const formData = ref({
      date: "",
      time: "",
      status: "",
      adminNotes: "",
    });

    const error = ref("");
    const isSubmitting = ref(false);

    const statusOptions = [
      "pending",
      "confirmed",
      "completed",
      "cancelled",
      "rescheduled",
    ];

    const initializeForm = () => {
      formData.value = {
        date: props.booking.date,
        time: props.booking.time,
        status: props.booking.status,
        adminNotes: props.booking.adminNotes || "",
      };
    };

    const handleSubmit = async () => {
      try {
        isSubmitting.value = true;
        error.value = "";

        emit("save", {
          _id: props.booking._id,
          ...formData.value,
        });
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
      statusOptions,
      handleSubmit,
    };
  },
};
</script>
