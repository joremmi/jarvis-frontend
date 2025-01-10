<template>
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <h3 class="text-lg font-semibold mb-4">Revenue Over Time</h3>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "RevenueChart",
  components: { Line },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => `KSH ${value.toLocaleString()}`,
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
      },
    };

    return { chartOptions };
  },
};
</script>
