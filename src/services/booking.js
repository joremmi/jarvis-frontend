// frontend\src\services\booking.js

import api from "./api";

export const bookingService = {
  createBooking: async (formData) => {
    try {
      const bookingData = {
        serviceId: formData.serviceId,
        date: formData.date,
        time: formData.time,
        notes: formData.notes || "",
      };

      const response = await api.createBooking(bookingData);
      return response.data;
    } catch (error) {
      console.error("Booking error:", error);
      throw error.response?.data?.error || "Booking failed";
    }
  },

  getMyBookings: async () => {
    try {
      const response = await api.getMyBookings();
      return response.data;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error.response?.data?.error || "Failed to fetch bookings";
    }
  },

  cancelBooking: async (bookingId) => {
    try {
      const response = await api.cancelBooking(bookingId);
      return response.data;
    } catch (error) {
      console.error("Error cancelling booking:", error);
      throw error.response?.data?.error || "Failed to cancel booking";
    }
  },
};
