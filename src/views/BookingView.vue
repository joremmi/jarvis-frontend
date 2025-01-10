<!-- frontend\src\views\BookingView.vue -->

<template>
  <div class="container mx-auto px-4 py-12 pt-24">
    <div class="max-w-2xl mx-auto">
      <div v-if="loading" class="flex justify-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
        ></div>
      </div>

      <template v-else>
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Book a Service</h1>

        <div v-if="serviceDetails" class="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 class="font-semibold text-xl mb-2">{{ serviceDetails.name }}</h2>
          <p class="text-gray-600">{{ serviceDetails.description }}</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Customer Information -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Name</label
              >
              <input
                v-model="formData.name"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Email</label
              >
              <input
                v-model="formData.email"
                type="email"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Phone</label
              >
              <input
                v-model="formData.phone"
                type="tel"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <!-- Date Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Preferred Date</label
            >
            <input
              v-model="formData.date"
              type="date"
              required
              :min="minDate"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>

          <!-- Notes -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Additional Notes</label
            >
            <textarea
              v-model="formData.notes"
              rows="4"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            ></textarea>
          </div>

          <div v-if="error" class="text-red-600 text-sm">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="submitting"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {{ submitting ? "Processing..." : "Book Service" }}
          </button>
        </form>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "@/services/api";

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const error = ref(null);
const submitting = ref(false);
const serviceDetails = ref(null);

const formData = ref({
  name: "",
  email: "",
  phone: "",
  date: "",
  notes: "",
});

const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split("T")[0];
});

const selectedServiceId = computed(() => route.params.serviceId);

onMounted(async () => {
  if (!selectedServiceId.value) {
    router.push("/services");
    return;
  }
  try {
    loading.value = true;
    const response = await api.get(`/services/${selectedServiceId.value}`);
    serviceDetails.value = response.data;
  } catch (err) {
    error.value = "Service not found";
    router.push("/services");
  } finally {
    loading.value = false;
  }
});

const handleSubmit = async () => {
  try {
    submitting.value = true;
    error.value = null;

    console.log("Submitting booking with data:", {
      serviceId: selectedServiceId.value,
      ...formData.value,
    });

    const response = await api.post("/bookings", {
      serviceId: selectedServiceId.value,
      ...formData.value,
    });

    console.log("Booking response:", response.data);

    if (response.data.success) {
      router.push({
        path: "/booking-confirmation",
        query: {
          bookingId: response.data.booking.id,
          success: true,
        },
      });
    }
  } catch (err) {
    console.error("Booking error:", err);
    error.value =
      err.response?.data?.message ||
      "Failed to create booking. Please try again.";
  } finally {
    submitting.value = false;
  }
};
</script>
