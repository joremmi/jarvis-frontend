<template>
  <div class="book-service">
    <h1>Book a Service</h1>
    <BookingForm />
  </div>
</template>

<script>
import BookingForm from "../components/BookingForm.vue";

export default {
  name: "BookService",
  components: { BookingForm },
};
</script>

<style>
.book-service {
  padding: 32px;
}
</style>
