<!-- frontend\src\views\admin\SettingsView.vue -->

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-900">System Settings</h2>

    <!-- Settings Sections -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- General Settings -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          General Settings
        </h3>
        <form @submit.prevent="saveGeneralSettings" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              v-model="generalSettings.companyName"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Contact Email
            </label>
            <input
              v-model="generalSettings.contactEmail"
              type="email"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              v-model="generalSettings.phoneNumber"
              type="tel"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>

          <button
            type="submit"
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? "Saving..." : "Save General Settings" }}
          </button>
        </form>
      </div>

      <!-- Booking Settings -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Booking Settings
        </h3>
        <form @submit.prevent="saveBookingSettings" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Booking Time Slot Duration (minutes)
            </label>
            <select
              v-model="bookingSettings.timeSlotDuration"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Advance Booking Days
            </label>
            <input
              v-model="bookingSettings.advanceBookingDays"
              type="number"
              min="1"
              max="90"
              class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Business Hours
            </label>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-xs text-gray-600">Start Time</label>
                <input
                  v-model="bookingSettings.businessHours.start"
                  type="time"
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label class="text-xs text-gray-600">End Time</label>
                <input
                  v-model="bookingSettings.businessHours.end"
                  type="time"
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? "Saving..." : "Save Booking Settings" }}
          </button>
        </form>
      </div>

      <!-- Notification Settings -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Notification Settings
        </h3>
        <form @submit.prevent="saveNotificationSettings" class="space-y-4">
          <div>
            <label class="flex items-center space-x-2">
              <input
                v-model="notificationSettings.emailNotifications"
                type="checkbox"
                class="rounded text-primary focus:ring-primary"
              />
              <span class="text-sm text-gray-700"
                >Enable Email Notifications</span
              >
            </label>
          </div>

          <div>
            <label class="flex items-center space-x-2">
              <input
                v-model="notificationSettings.smsNotifications"
                type="checkbox"
                class="rounded text-primary focus:ring-primary"
              />
              <span class="text-sm text-gray-700"
                >Enable SMS Notifications</span
              >
            </label>
          </div>

          <button
            type="submit"
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? "Saving..." : "Save Notification Settings" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import api from "@/utils/axios";

export default {
  name: "AdminSettings",
  setup() {
    const isSubmitting = ref(false);

    const generalSettings = ref({
      companyName: "",
      contactEmail: "",
      phoneNumber: "",
    });

    const bookingSettings = ref({
      timeSlotDuration: "30",
      advanceBookingDays: 30,
      businessHours: {
        start: "09:00",
        end: "17:00",
      },
    });

    const notificationSettings = ref({
      emailNotifications: true,
      smsNotifications: false,
    });

    const saveGeneralSettings = async () => {
      try {
        isSubmitting.value = true;
        await api.put("/admin/settings/general", generalSettings.value);
        // Show success message
      } catch (error) {
        console.error("Error saving general settings:", error);
        // Show error message
      } finally {
        isSubmitting.value = false;
      }
    };

    const saveBookingSettings = async () => {
      try {
        isSubmitting.value = true;
        await api.put("/admin/settings/booking", bookingSettings.value);
        // Show success message
      } catch (error) {
        console.error("Error saving booking settings:", error);
        // Show error message
      } finally {
        isSubmitting.value = false;
      }
    };

    const saveNotificationSettings = async () => {
      try {
        isSubmitting.value = true;
        await api.put(
          "/admin/settings/notifications",
          notificationSettings.value
        );
        // Show success message
      } catch (error) {
        console.error("Error saving notification settings:", error);
        // Show error message
      } finally {
        isSubmitting.value = false;
      }
    };

    // Fetch settings on component mount
    const fetchSettings = async () => {
      try {
        const [general, booking, notifications] = await Promise.all([
          api.get("/admin/settings/general"),
          api.get("/admin/settings/booking"),
          api.get("/admin/settings/notifications"),
        ]);

        generalSettings.value = general.data;
        bookingSettings.value = booking.data;
        notificationSettings.value = notifications.data;
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();

    return {
      isSubmitting,
      generalSettings,
      bookingSettings,
      notificationSettings,
      saveGeneralSettings,
      saveBookingSettings,
      saveNotificationSettings,
    };
  },
};
</script>
