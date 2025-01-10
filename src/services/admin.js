// frontend/src/services/admin.js
import api from './api';

export const adminService = {
  getAllBookings: async () => {
    try {
      const response = await api.get('/admin/bookings');
      return response.data.bookings;
    } catch (error) {
      console.error('Error fetching admin bookings:', error);
      throw error.response?.data?.message || 'Failed to fetch bookings';
    }
  },
};
