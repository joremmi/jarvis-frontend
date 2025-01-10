// frontend\src\store\bookings.js

import axios from "axios";

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
        const response = await axios.get(
          "http://localhost:5000/api/bookings/my-bookings"
        );
        commit("SET_BOOKINGS", response.data);
      } catch (error) {
        commit("SET_ERROR", "Failed to fetch bookings");
        console.error("Error fetching bookings:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async cancelBooking({ commit }, bookingId) {
      try {
        await axios.patch(
          `http://localhost:5000/api/bookings/${bookingId}/cancel`
        );
        commit("UPDATE_BOOKING_STATUS", { bookingId, status: "CANCELLED" });
        return true;
      } catch (error) {
        console.error("Error cancelling booking:", error);
        throw error;
      }
    },
  },
  getters: {
    sortedBookings: (state) => {
      return [...state.bookings].sort((a, b) => {
        return new Date(b.booking_date) - new Date(a.booking_date);
      });
    },
  },
};
