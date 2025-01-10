<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

    <div v-if="loading" class="flex justify-center py-8">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
      ></div>
    </div>

    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
      {{ error }}
    </div>

    <div
      v-else-if="sortedBookings.length === 0"
      class="text-center py-12 bg-white rounded-lg shadow-sm"
    >
      <h2 class="text-xl text-gray-600">No bookings found</h2>
      <router-link
        to="/services"
        class="mt-4 inline-block text-primary hover:text-primary-dark"
      >
        Browse Services
      </router-link>
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="booking in sortedBookings"
        :key="booking.id"
        class="bg-white rounded-lg shadow-sm p-6"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-xl font-semibold text-gray-900">
              {{ booking.service_title }}
            </h3>
            <p class="text-gray-600">
              {{ formatDate(booking.booking_date) }} at
              {{ booking.booking_time }}
            </p>
          </div>
          <span
            :class="getStatusClass(booking.status)"
            class="px-3 py-1 rounded-full text-sm font-medium"
          >
            {{ booking.status }}
          </span>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-primary font-semibold">
            KSH {{ booking.service_price.toLocaleString() }}
          </span>
          <button
            v-if="booking.status === 'PENDING'"
            @click="handleCancel(booking.id)"
            class="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "MyBookingsView",
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("bookings/fetchMyBookings");
    });

    const handleCancel = async (bookingId) => {
      if (confirm("Are you sure you want to cancel this booking?")) {
        try {
          await store.dispatch("bookings/cancelBooking", bookingId);
        } catch (error) {
          alert("Failed to cancel booking");
        }
      }
    };

    const getStatusClass = (status) => {
      const classes = {
        PENDING: "bg-blue-100 text-blue-800",
        CONFIRMED: "bg-green-100 text-green-800",
        CANCELLED: "bg-red-100 text-red-800",
        COMPLETED: "bg-gray-100 text-gray-800",
      };
      return classes[status] || classes.PENDING;
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    return {
      loading: computed(() => store.state.bookings.loading),
      error: computed(() => store.state.bookings.error),
      sortedBookings: computed(() => store.getters["bookings/sortedBookings"]),
      handleCancel,
      getStatusClass,
      formatDate,
    };
  },
};
</script>
