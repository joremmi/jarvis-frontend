<template>
  <main class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-[40vh] w-full">
      <img
        src="/images/contact-hero.jpg"
        alt="Contact Us"
        class="object-cover w-full h-full"
      />
      <div
        class="absolute inset-0 bg-black/50 flex items-center justify-center"
      >
        <h1 class="text-5xl font-bold text-white">Contact Us</h1>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-3xl font-bold text-secondary mb-8">
              Send us a Message
            </h2>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label class="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  class="w-full p-3 border border-gray-300 rounded-md"
                  v-model="formData.name"
                  required
                />
              </div>
              <div>
                <label class="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  class="w-full p-3 border border-gray-300 rounded-md"
                  v-model="formData.email"
                  required
                />
              </div>
              <div>
                <label class="block text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  class="w-full p-3 border border-gray-300 rounded-md"
                  v-model="formData.subject"
                  required
                />
              </div>
              <div>
                <label class="block text-gray-700 mb-2">Message</label>
                <textarea
                  class="w-full p-3 border border-gray-300 rounded-md h-32"
                  v-model="formData.message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                class="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h3 class="text-2xl font-bold text-secondary mb-4">
                Contact Information
              </h3>
              <div class="space-y-4">
                <p class="flex items-center gap-3">
                  <span>📍</span>
                  <span>123 Business Street, Nairobi, Kenya</span>
                </p>
                <p class="flex items-center gap-3">
                  <span>📞</span>
                  <span>+254 123 456 7890</span>
                </p>
                <p class="flex items-center gap-3">
                  <span>📧</span>
                  <span>info@jarvissafety.com</span>
                </p>
              </div>
            </div>

            <div class="bg-white p-8 rounded-lg shadow-md">
              <h3 class="text-2xl font-bold text-secondary mb-4">
                Business Hours
              </h3>
              <div class="space-y-2">
                <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                <p>Saturday: 9:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const formData = ref({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      // Add form submission logic here
    };

    return {
      formData,
      handleSubmit,
    };
  },
};
</script>

<style>
.contact {
  max-width: 600px;
  margin: auto;
  padding: 32px;
}
.contact form div {
  margin-bottom: 12px;
}
.contact label {
  display: block;
  margin-bottom: 4px;
}
.contact input,
.contact textarea {
  width: 100%;
  padding: 8px;
}
.contact button {
  background-color: #28a745;
  color: white;
  padding: 10px 16px;
  border: none;
  cursor: pointer;
}
.contact button:hover {
  background-color: #218838;
}
</style>
