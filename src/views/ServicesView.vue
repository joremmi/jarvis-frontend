<template>
  <div class="min-h-screen flex flex-col">
    <div class="container mx-auto px-4 py-12 flex-grow">
      <h1 class="text-2xl font-bold mb-4">Our Services</h1>
      <p class="text-gray-600 mb-8">
        Explore our comprehensive range of health and safety services designed
        to keep your workplace safe and compliant.
      </p>

      <div class="flex gap-8 relative">
        <!-- Categories Sidebar - Fixed -->
        <div class="w-1/4">
          <div class="fixed">
            <h2 class="font-semibold mb-4">Categories</h2>
            <div class="space-y-2 w-vw">
              <button
                @click="setActiveCategory('all')"
                class="w-full flex justify-between items-center px-4 py-2 rounded-lg"
                :class="
                  activeCategory === 'all'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                "
              >
                All <span>{{ services.length }}</span>
              </button>
              <button
                v-for="category in categories"
                :key="category.id"
                @click="setActiveCategory(category.id)"
                class="w-full flex justify-between items-center px-4 py-2 text-left rounded-lg"
                :class="
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                "
              >
                {{ category.name }}
                <span>{{ getServiceCountByCategory(category.id) }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Services List - Scrollable -->
        <div class="w-3/4">
          <div v-if="loading" class="flex justify-center py-12">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
            ></div>
          </div>

          <div v-else class="space-y-6 pb-12">
            <div
              v-for="service in filteredServices"
              :key="service._id"
              class="bg-white rounded-lg p-6"
            >
              <div class="flex items-start gap-4">
                <div class="p-3 bg-blue-50 rounded-lg">
                  <i class="fas fa-graduation-cap text-primary text-xl"></i>
                </div>

                <div class="flex-1">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="text-xl font-semibold mb-2">
                        {{ service.title }}
                      </h3>
                      <p class="text-gray-600 mb-4">
                        {{ service.description }}
                      </p>
                    </div>
                    <span
                      class="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {{ service.type }}
                    </span>
                  </div>

                  <div class="flex gap-6 mb-4">
                    <div class="flex items-center gap-2">
                      <i class="far fa-clock text-primary"></i>
                      <span>{{ service.duration }} hours</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <i class="far fa-money-bill-alt text-primary"></i>
                      <span>KSH {{ service.price }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-green-600">
                      <i class="far fa-check-circle"></i>
                      <span>Includes Certification</span>
                    </div>
                  </div>

                  <button
                    @click="handleBookService(service._id)"
                    class="w-full py-3 text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <i class="fas fa-calendar-plus"></i>
                    <span>Book Service</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";

export default {
  name: "ServicesView",
  setup() {
    const router = useRouter();
    const services = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const activeCategory = ref("all");

    const categories = [
      { id: "TRAINING", name: "Training & certification" },
      { id: "AUDIT", name: "Audits & inspections" },
      { id: "CONSULTING", name: "Consulting Services" },
      { id: "EXAMINATION", name: "Examinations" },
    ];

    const filteredServices = computed(() => {
      if (activeCategory.value === "all") {
        return services.value;
      }
      return services.value.filter(
        (service) => service.type === activeCategory.value
      );
    });

    const getServiceCountByCategory = (categoryId) => {
      return services.value.filter((service) => service.type === categoryId)
        .length;
    };

    const setActiveCategory = (categoryId) => {
      activeCategory.value = categoryId;
    };

    const handleBookService = (serviceId) => {
      console.log("Attempting to book service with ID:", serviceId);
      if (serviceId) {
        router.push({
          name: "Booking",
          params: { serviceId: serviceId },
        });
      }
    };

    const fetchServices = async () => {
      try {
        loading.value = true;
        const response = await api.get("/services");
        console.log("Fetched services:", response.data);
        services.value = response.data;
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchServices);

    return {
      services,
      loading,
      error,
      categories,
      activeCategory,
      filteredServices,
      handleBookService,
      getServiceCountByCategory,
      setActiveCategory,
    };
  },
};
</script>
