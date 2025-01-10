<!-- frontend\src\views\admin\UsersView.vue -->

<template>
  <div class="space-y-6">
    <!-- Header with Filters -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div
        class="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <h2 class="text-2xl font-bold text-gray-900">Users Management</h2>

        <!-- Filters -->
        <div class="flex flex-wrap gap-4">
          <select
            v-model="filters.role"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="text"
            v-model="filters.search"
            placeholder="Search users..."
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          />

          <button
            @click="openUserModal()"
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            <i class="fas fa-plus mr-2"></i>
            Add User
          </button>
        </div>
      </div>
    </div>

    <!-- Users Table -->
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
            <tr v-for="user in paginatedUsers" :key="user._id">
              <!-- User Info -->
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div
                    class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"
                  >
                    <span class="text-primary font-medium">
                      {{ getInitials(user.name) }}
                    </span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ user.name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ user.email }}
                    </div>
                  </div>
                </div>
              </td>

              <!-- Role -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="
                    user.role === 'admin'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-gray-100 text-gray-800'
                  "
                >
                  {{ user.role }}
                </span>
              </td>

              <!-- Join Date -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatDate(user.createdAt) }}
                </div>
              </td>

              <!-- Last Login -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ user.lastLogin ? formatDate(user.lastLogin) : "Never" }}
                </div>
              </td>

              <!-- Status -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="
                    user.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  "
                >
                  {{ user.isActive ? "Active" : "Inactive" }}
                </span>
              </td>

              <!-- Actions -->
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <button
                  @click="openUserModal(user)"
                  class="text-primary hover:text-primary-dark mr-3"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="toggleUserStatus(user)"
                  :class="
                    user.isActive
                      ? 'text-red-600 hover:text-red-800'
                      : 'text-green-600 hover:text-green-800'
                  "
                  :title="user.isActive ? 'Deactivate User' : 'Activate User'"
                >
                  <i
                    :class="['fas', user.isActive ? 'fa-ban' : 'fa-check']"
                  ></i>
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
                <span class="font-medium">{{ filteredUsers.length }}</span>
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

    <!-- User Modal -->
    <UserModal
      v-if="showUserModal"
      :user="selectedUser"
      @close="closeUserModal"
      @save="saveUser"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import api from "@/utils/axios";
import UserModal from "@/components/admin/UserModal.vue";

export default {
  name: "AdminUsers",
  components: {
    UserModal,
  },
  setup() {
    const users = ref([]);
    const showUserModal = ref(false);
    const selectedUser = ref(null);
    const currentPage = ref(1);
    const itemsPerPage = 10;

    const filters = ref({
      role: "",
      search: "",
    });

    const tableHeaders = [
      "User",
      "Role",
      "Join Date",
      "Last Login",
      "Status",
      "Actions",
    ];

    // Computed properties
    const filteredUsers = computed(() => {
      let filtered = [...users.value];

      if (filters.value.role) {
        filtered = filtered.filter((u) => u.role === filters.value.role);
      }

      if (filters.value.search) {
        const search = filters.value.search.toLowerCase();
        filtered = filtered.filter(
          (u) =>
            u.name.toLowerCase().includes(search) ||
            u.email.toLowerCase().includes(search)
        );
      }

      return filtered;
    });

    const totalPages = computed(() =>
      Math.ceil(filteredUsers.value.length / itemsPerPage)
    );

    const paginatedUsers = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredUsers.value.slice(start, end);
    });

    const paginationStart = computed(
      () => (currentPage.value - 1) * itemsPerPage + 1
    );

    const paginationEnd = computed(() =>
      Math.min(currentPage.value * itemsPerPage, filteredUsers.value.length)
    );

    // Methods
    const fetchUsers = async () => {
      try {
        const response = await api.get("/admin/users");
        users.value = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const openUserModal = (user = null) => {
      selectedUser.value = user;
      showUserModal.value = true;
    };

    const closeUserModal = () => {
      selectedUser.value = null;
      showUserModal.value = false;
    };

    const saveUser = async (userData) => {
      try {
        if (userData._id) {
          await api.put(`/admin/users/${userData._id}`, userData);
        } else {
          await api.post("/admin/users", userData);
        }
        await fetchUsers();
        closeUserModal();
      } catch (error) {
        console.error("Error saving user:", error);
      }
    };

    const toggleUserStatus = async (user) => {
      try {
        await api.patch(`/admin/users/${user._id}/status`, {
          isActive: !user.isActive,
        });
        await fetchUsers();
      } catch (error) {
        console.error("Error toggling user status:", error);
      }
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    };

    const getInitials = (name) => {
      return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
    };

    // Watch for filter changes
    watch(filters, () => {
      currentPage.value = 1;
    });

    onMounted(fetchUsers);

    return {
      users,
      filteredUsers,
      paginatedUsers,
      showUserModal,
      selectedUser,
      currentPage,
      totalPages,
      paginationStart,
      paginationEnd,
      filters,
      tableHeaders,
      openUserModal,
      closeUserModal,
      saveUser,
      toggleUserStatus,
      formatDate,
      getInitials,
    };
  },
};
</script>
