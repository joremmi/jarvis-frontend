// frontend/src/store/modules/adminBookings.js
import { adminService } from '@/services/admin';

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
  },
  actions: {
    async fetchAllBookings({ commit }) {
      try {
        commit('SET_LOADING', true);
        const bookings = await adminService.getAllBookings();
        commit('SET_BOOKINGS', bookings);
      } catch (error) {
        commit('SET_ERROR', error);
      } finally {
        commit('SET_LOADING', false);
      }
    },
  },
  getters: {
    sortedBookings: (state) => {
      return [...state.bookings].sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  },
};
