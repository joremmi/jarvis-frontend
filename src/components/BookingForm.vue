<template>
  <form @submit.prevent="submitForm" class="booking-form">
    <h2>Book a Service</h2>

    <div class="form-group">
      <label for="name">Name:</label>
      <input
        type="text"
        id="name"
        v-model="form.name"
        :class="{ error: v$.form.name.$error }"
        @blur="v$.form.name.$touch()"
      />
      <span class="error-message" v-if="v$.form.name.$error">
        {{ v$.form.name.$errors[0].$message }}
      </span>
    </div>

    <div class="form-group">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="form.email"
        :class="{ error: v$.form.email.$error }"
        @blur="v$.form.email.$touch()"
      />
      <span class="error-message" v-if="v$.form.email.$error">
        {{ v$.form.email.$errors[0].$message }}
      </span>
    </div>

    <div class="form-group">
      <label for="service">Service:</label>
      <select
        id="service"
        v-model="form.service"
        :class="{ error: v$.form.service.$error }"
        @blur="v$.form.service.$touch()"
      >
        <option value="">Select a service</option>
        <option
          v-for="service in services"
          :key="service.id"
          :value="service.id"
        >
          {{ service.title }}
        </option>
      </select>
      <span class="error-message" v-if="v$.form.service.$error">
        {{ v$.form.service.$errors[0].$message }}
      </span>
    </div>

    <button type="submit" :disabled="v$.$invalid || loading">
      {{ loading ? "Submitting..." : "Submit" }}
    </button>

    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { mapState } from "vuex";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        service: "",
      },
      loading: false,
      successMessage: "",
      errorMessage: "",
    };
  },
  validations() {
    return {
      form: {
        name: { required },
        email: { required, email },
        service: { required },
      },
    };
  },
  computed: {
    ...mapState(["services"]),
  },
  methods: {
    async submitForm() {
      this.v$.$touch();
      if (this.v$.$invalid) return;

      this.loading = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        await this.$store.dispatch("bookService", this.form);
        this.successMessage = "Booking successful!";
        this.form = { name: "", email: "", service: "" };
        this.v$.$reset();
      } catch (error) {
        this.errorMessage =
          error.message || "Booking failed. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.booking-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.error {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
}

.success-message {
  color: green;
  margin-top: 10px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
