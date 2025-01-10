<!-- frontend\src\views\admin\ServicesView.vue -->

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Services Management</h2>
      <button
        @click="openServiceModal()"
        class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
      >
        <i class="fas fa-plus mr-2"></i>
        Add Service
      </button>
    </div>

    <!-- Services Table -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
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
            <th class="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="service in services" :key="service._id">
            <td class="px-6 py-4">
              <div class="flex items-center">
                <img
                  :src="service.image || '/images/default-service.jpg'"
                  class="h-10 w-10 rounded-lg object-cover"
                />
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ service.title }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ service.category }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-900">
                {{ service.description.substring(0, 50) }}...
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-900">
                KSH {{ service.price.toLocaleString() }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-900">
                {{ formatDuration(service.duration) }}
              </div>
            </td>
            <td class="px-6 py-4 text-right space-x-2">
              <button
                @click="openServiceModal(service)"
                class="text-primary hover:text-primary-dark"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                @click="deleteService(service._id)"
                class="text-red-600 hover:text-red-800"
              >
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Service Modal -->
    <ServiceModal
      v-if="showServiceModal"
      :service="selectedService"
      @close="closeServiceModal"
      @save="saveService"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "@/utils/axios";
import ServiceModal from "@/components/admin/ServiceModal.vue";

export default {
  name: "AdminServices",
  components: {
    ServiceModal,
  },
  setup() {
    const services = ref([]);
    const showServiceModal = ref(false);
    const selectedService = ref(null);

    const tableHeaders = [
      "Service",
      "Description",
      "Price",
      "Duration",
      "Actions",
    ];

    const fetchServices = async () => {
      try {
        const response = await api.get("/admin/services");
        services.value = response.data;
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    const openServiceModal = (service = null) => {
      selectedService.value = service;
      showServiceModal.value = true;
    };

    const closeServiceModal = () => {
      selectedService.value = null;
      showServiceModal.value = false;
    };

    const saveService = async (serviceData) => {
      try {
        if (serviceData._id) {
          await api.put(`/admin/services/${serviceData._id}`, serviceData);
        } else {
          await api.post("/admin/services", serviceData);
        }
        await fetchServices();
        closeServiceModal();
      } catch (error) {
        console.error("Error saving service:", error);
      }
    };

    const deleteService = async (serviceId) => {
      if (confirm("Are you sure you want to delete this service?")) {
        try {
          await api.delete(`/admin/services/${serviceId}`);
          await fetchServices();
        } catch (error) {
          console.error("Error deleting service:", error);
        }
      }
    };

    const formatDuration = (minutes) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return hours > 0 ? `${hours}h ${remainingMinutes}m` : `${minutes}m`;
    };

    onMounted(fetchServices);

    return {
      services,
      tableHeaders,
      showServiceModal,
      selectedService,
      openServiceModal,
      closeServiceModal,
      saveService,
      deleteService,
      formatDuration,
    };
  },
};
</script>
