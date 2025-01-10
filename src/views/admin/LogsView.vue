<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Admin Logs</h2>

      <!-- Filters -->
      <div class="flex gap-4">
        <select
          v-model="filters.entityType"
          class="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Types</option>
          <option value="booking">Bookings</option>
          <option value="service">Services</option>
          <option value="user">Users</option>
          <option value="setting">Settings</option>
        </select>

        <select
          v-model="filters.action"
          class="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Actions</option>
          <option value="create">Create</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>

        <input
          type="date"
          v-model="filters.date"
          class="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
    </div>

    <!-- Logs Table -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Timestamp
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Admin
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Action
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Entity Type
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
            >
              Details
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="log in filteredLogs" :key="log._id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ formatDate(log.timestamp) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">
                {{ log.adminId.name }}
              </div>
              <div class="text-sm text-gray-500">
                {{ log.ipAddress }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="getActionClass(log.action)"
              >
                {{ log.action }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ log.entityType }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500">
              <button
                @click="showLogDetails(log)"
                class="text-primary hover:text-primary-dark"
              >
                View Changes
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Log Details Modal -->
    <div
      v-if="selectedLog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg w-full max-w-3xl mx-4 p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Log Details</h3>
          <button
            @click="selectedLog = null"
            class="text-gray-500 hover:text-gray-700"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <pre class="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96">
          {{ JSON.stringify(selectedLog.changes, null, 2) }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import api from "@/utils/axios";

export default {
  name: "LogsView",
  setup() {
    const logs = ref([]);
    const selectedLog = ref(null);
    const filters = ref({
      entityType: "",
      action: "",
      date: "",
    });

    const fetchLogs = async () => {
      try {
        const response = await api.get("/admin/logs");
        logs.value = response.data;
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    const filteredLogs = computed(() => {
      let filtered = [...logs.value];

      if (filters.value.entityType) {
        filtered = filtered.filter(
          (log) => log.entityType === filters.value.entityType
        );
      }

      if (filters.value.action) {
        filtered = filtered.filter(
          (log) => log.action === filters.value.action
        );
      }

      if (filters.value.date) {
        const filterDate = new Date(filters.value.date).toDateString();
        filtered = filtered.filter(
          (log) => new Date(log.timestamp).toDateString() === filterDate
        );
      }

      return filtered;
    });

    const formatDate = (date) => {
      return new Date(date).toLocaleString();
    };

    const getActionClass = (action) => {
      const classes = {
        create: "bg-green-100 text-green-800",
        update: "bg-blue-100 text-blue-800",
        delete: "bg-red-100 text-red-800",
        view: "bg-gray-100 text-gray-800",
      };
      return classes[action] || classes.view;
    };

    const showLogDetails = (log) => {
      selectedLog.value = log;
    };

    fetchLogs();

    return {
      logs,
      selectedLog,
      filters,
      filteredLogs,
      formatDate,
      getActionClass,
      showLogDetails,
    };
  },
};
</script>
