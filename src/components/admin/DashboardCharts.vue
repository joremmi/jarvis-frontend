<script setup>
import { ref, onMounted } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "@/services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const bookingsData = ref({
  labels: [],
  datasets: [
    {
      label: "Bookings",
      data: [],
      borderColor: "#4F46E5",
      tension: 0.1,
    },
  ],
});

const revenueData = ref({
  labels: [],
  datasets: [
    {
      label: "Revenue",
      data: [],
      borderColor: "#10B981",
      tension: 0.1,
    },
  ],
});

const usersData = ref({
  labels: [],
  datasets: [
    {
      label: "New Users",
      data: [],
      borderColor: "#F59E0B",
      tension: 0.1,
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const loading = ref(true);
const error = ref(null);

const fetchChartData = async () => {
  try {
    loading.value = true;
    error.value = null;

    const [bookingsRes, revenueRes, usersRes] = await Promise.all([
      api.get("/admin/stats/bookings-chart"),
      api.get("/admin/stats/revenue-chart"),
      api.get("/admin/stats/users-chart"),
    ]);

    // Update bookings chart
    if (bookingsRes.data?.labels?.length) {
      bookingsData.value.labels = bookingsRes.data.labels;
      bookingsData.value.datasets[0].data = bookingsRes.data.values;
    }

    // Update revenue chart
    if (revenueRes.data?.labels?.length) {
      revenueData.value.labels = revenueRes.data.labels;
      revenueData.value.datasets[0].data = revenueRes.data.values;
    }

    // Update users chart
    if (usersRes.data?.labels?.length) {
      usersData.value.labels = usersRes.data.labels;
      usersData.value.datasets[0].data = usersRes.data.values;
    }
  } catch (err) {
    console.error("Error fetching chart data:", err);
    error.value = "Failed to load dashboard data";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchChartData();
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-if="loading" class="col-span-3 flex justify-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
      ></div>
    </div>

    <div
      v-else-if="error"
      class="col-span-3 bg-red-50 text-red-600 p-4 rounded-lg"
    >
      {{ error }}
    </div>

    <template v-else>
      <!-- Bookings Chart -->
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Bookings Trend</h3>
        <Line
          v-if="bookingsData.labels.length"
          :data="bookingsData"
          :options="chartOptions"
          class="h-64"
        />
      </div>

      <!-- Revenue Chart -->
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">Revenue Trend</h3>
        <Line
          v-if="revenueData.labels.length"
          :data="revenueData"
          :options="chartOptions"
          class="h-64"
        />
      </div>

      <!-- Users Chart -->
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-semibold mb-4">New Users Trend</h3>
        <Line
          v-if="usersData.labels.length"
          :data="usersData"
          :options="chartOptions"
          class="h-64"
        />
      </div>
    </template>
  </div>
</template>
