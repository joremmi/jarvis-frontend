<!-- frontend\src\views\admin\BookingsView.vue -->
<template>
  <div class="space-y-6">
    <!-- Header with Filters -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <h2 class="text-2xl font-bold text-gray-900">Bookings Management</h2>

        <!-- Filters -->
        <div class="flex flex-wrap gap-4">
          <select
            v-model="filters.status"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          >
            <option value="">All Statuses</option>
            <option
              v-for="status in statusOptions"
              :key="status"
              :value="status"
            >
              {{ status }}
            </option>
          </select>

          <input
            type="date"
            v-model="filters.date"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          />

          <input
            type="text"
            v-model="filters.search"
            placeholder="Search bookings..."
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          />
        </div>
      </div>
    </div>

    <!-- Bookings Table -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                v-for="header in tableHeaders"
                :key="header"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="booking in filteredBookings" :key="booking._id">
              <!-- Booking ID -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  #{{ booking._id.slice(-6).toUpperCase() }}
                </div>
              </td>

              <!-- Service -->
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">
                  {{ booking.service.title }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ formatDuration(booking.service.duration) }}
                </div>
              </td>

              <!-- Client -->
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ booking.user.name }}</div>
                <div class="text-sm text-gray-500">
                  {{ booking.user.email }}
                </div>
              </td>

              <!-- Date & Time -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatDate(booking.date) }}
                </div>
                <div class="text-sm text-gray-500">{{ booking.time }}</div>
              </td>

              <!-- Status -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="getStatusClass(booking.status)"
                >
                  {{ booking.status }}
                </span>
              </td>

              <!-- Actions -->
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <button
                  @click="openBookingModal(booking)"
                  class="text-primary hover:text-primary-dark mr-3"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  v-if="booking.status === 'pending'"
                  @click="updateStatus(booking._id, 'confirmed')"
                  class="text-green-600 hover:text-green-800 mr-3"
                  title="Confirm Booking"
                >
                  <i class="fas fa-check"></i>
                </button>
                <button
                  v-if="['pending', 'confirmed'].includes(booking.status)"
                  @click="updateStatus(booking._id, 'cancelled')"
                  class="text-red-600 hover:text-red-800"
                  title="Cancel Booking"
                >
                  <i class="fas fa-times"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div
            class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
          >
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ paginationStart }}</span>
                to
                <span class="font-medium">{{ paginationEnd }}</span>
                of
                <span class="font-medium">{{ totalBookings }}</span>
                results
              </p>
            </div>
            <div>
              <nav
                class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              >
                <button
                  v-for="page in totalPages"
                  :key="page"
                  @click="currentPage = page"
                  :class="[
                    currentPage === page
                      ? 'z-10 bg-primary text-white'
                      : 'bg-white text-gray-500 hover:bg-gray-50',
                    'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium',
                  ]"
                >
                  {{ page }}
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Modal -->
    <BookingModal
      v-if="showBookingModal"
      :booking="selectedBooking"
      @close="closeBookingModal"
      @save="saveBooking"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import api from "@/utils/axios";
import BookingModal from "@/components/admin/BookingModal.vue";

export default {
  name: "AdminBookings",
  components: {
    BookingModal,
  },
  setup() {
    const bookings = ref([]);
    const showBookingModal = ref(false);
    const selectedBooking = ref(null);
    const currentPage = ref(1);
    const itemsPerPage = 10;

    const filters = ref({
      status: "",
      date: "",
      search: "",
    });

    const tableHeaders = [
      "Booking ID",
      "Service",
      "Client",
      "Date & Time",
      "Status",
      "Actions",
    ];

    const statusOptions = [
      "pending",
      "confirmed",
      "completed",
      "cancelled",
      "rescheduled",
    ];

    // Computed properties for filtering and pagination
    const filteredBookings = computed(() => {
      let filtered = [...bookings.value];

      if (filters.value.status) {
        filtered = filtered.filter((b) => b.status === filters.value.status);
      }

      if (filters.value.date) {
        filtered = filtered.filter((b) =>
          b.date.startsWith(filters.value.date)
        );
      }

      if (filters.value.search) {
        const search = filters.value.search.toLowerCase();
        filtered = filtered.filter(
          (b) =>
            b.user.name.toLowerCase().includes(search) ||
            b.user.email.toLowerCase().includes(search) ||
            b.service.title.toLowerCase().includes(search)
        );
      }

      return filtered;
    });

    const totalBookings = computed(() => filteredBookings.value.length);
    const totalPages = computed(() =>
      Math.ceil(totalBookings.value / itemsPerPage)
    );
    const paginationStart = computed(
      () => (currentPage.value - 1) * itemsPerPage + 1
    );
    const paginationEnd = computed(() =>
      Math.min(currentPage.value * itemsPerPage, totalBookings.value)
    );

    // Methods
    const fetchBookings = async () => {
      try {
        const response = await api.get("/admin/bookings");
        bookings.value = response.data;
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    const updateStatus = async (bookingId, status) => {
      try {
        await api.patch(`/admin/bookings/${bookingId}/status`, { status });
        await fetchBookings();
      } catch (error) {
        console.error("Error updating booking status:", error);
      }
    };

    const openBookingModal = (booking) => {
      selectedBooking.value = booking;
      showBookingModal.value = true;
    };

    const closeBookingModal = () => {
      selectedBooking.value = null;
      showBookingModal.value = false;
    };

    const saveBooking = async (bookingData) => {
      try {
        await api.put(`/admin/bookings/${bookingData._id}`, bookingData);
        await fetchBookings();
        closeBookingModal();
      } catch (error) {
        console.error("Error saving booking:", error);
      }
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    };

    const formatDuration = (minutes) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return hours > 0 ? `${hours}h ${remainingMinutes}m` : `${minutes}m`;
    };

    const getStatusClass = (status) => {
      const classes = {
        pending: "bg-yellow-100 text-yellow-800",
        confirmed: "bg-green-100 text-green-800",
        completed: "bg-blue-100 text-blue-800",
        cancelled: "bg-red-100 text-red-800",
        rescheduled: "bg-purple-100 text-purple-800",
      };
      return classes[status] || classes.pending;
    };

    // Watch for filter changes to reset pagination
    watch(filters, () => {
      currentPage.value = 1;
    });

    onMounted(fetchBookings);

    return {
      bookings,
      filteredBookings,
      showBookingModal,
      selectedBooking,
      currentPage,
      totalPages,
      paginationStart,
      paginationEnd,
      totalBookings,
      filters,
      tableHeaders,
      statusOptions,
      openBookingModal,
      closeBookingModal,
      saveBooking,
      updateStatus,
      formatDate,
      formatDuration,
      getStatusClass,
    };
  },
};
</script>
