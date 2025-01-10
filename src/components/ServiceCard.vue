<template>
  <div class="service-card">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <button @click="bookService">Book Now</button>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
  },
  methods: {
    bookService() {
      this.$router.push({
        name: "BookService",
        query: { service: this.title },
      });
    },
  },
};
</script>

<style>
.service-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin-bottom: 16px;
}
.service-card h3 {
  margin-bottom: 8px;
}
.service-card button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.service-card button:hover {
  background-color: #218838;
}
</style>
