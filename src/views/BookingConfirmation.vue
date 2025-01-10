<!-- frontend\src\views\BookingConfirmation.vue -->

<template>
  <div class="confirmation-page">
    <h1>Booking Confirmation</h1>
    <p v-if="loading">Loading booking details...</p>
    <div v-else>
      <p><strong>Service:</strong> {{ bookingDetails.serviceName }}</p>
      <p><strong>Date:</strong> {{ bookingDetails.date }}</p>
      <p><strong>Time:</strong> {{ bookingDetails.time }}</p>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      bookingDetails: {},
      loading: true,
    };
  },
  mounted() {
    const bookingId = this.$route.query.bookingId;
    if (!bookingId) {
      this.error = "Booking ID is missing.";
      this.loading = false;
      return;
    }

    // Fetch booking details
    axios
      .get(`/api/bookings/${bookingId}`)
      .then((response) => {
        this.bookingDetails = response.data;
      })
      .catch(() => {
        this.error = "Failed to load booking details.";
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style scoped>
.confirmation-page {
  max-width: 500px;
  margin: auto;
  text-align: center;
  min-height: 80vh;
}

.error {
  color: red;
}

.booking-confirmation-page {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.booking-details {
  margin-bottom: 20px;
}

.booking-details ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.booking-details li {
  margin-bottom: 10px;
}

.booking-details li span:first-child {
  font-weight: bold;
}

.actions {
  margin-top: 20px;
  text-align: center;
}

.actions button {
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
}

.actions button:hover {
  background-color: #3e8e41;
}
</style>
