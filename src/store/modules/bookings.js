// frontend\src\store\modules\bookings.js

import { bookingService } from "@/services/booking";

export default {
  namespaced: true,
  state: {
    bookings: [],
    loading: false,
    error: null,
  },
  mutations: {
    SET_BOOKINGS(state, bookings) {
      state.bookings = bookings;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    UPDATE_BOOKING_STATUS(state, { bookingId, status }) {
      const booking = state.bookings.find((b) => b.id === bookingId);
      if (booking) {
        booking.status = status;
      }
    },
  },
  actions: {
    async fetchMyBookings({ commit }) {
      try {
        commit("SET_LOADING", true);
        const bookings = await bookingService.getMyBookings();
        commit("SET_BOOKINGS", bookings);
      } catch (error) {
        commit("SET_ERROR", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async cancelBooking({ commit }, bookingId) {
      try {
        await bookingService.cancelBooking(bookingId);
        commit("UPDATE_BOOKING_STATUS", { bookingId, status: "CANCELLED" });
      } catch (error) {
        console.error("Error cancelling booking:", error);
        throw error;
      }
    },
  },
  getters: {
    sortedBookings: (state) => {
      return [...state.bookings].sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  },
};
