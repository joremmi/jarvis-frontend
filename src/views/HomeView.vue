<template>
  <main class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-[100vh] flex overflow-hidden">
      <!-- Left Content -->
      <div class="w-1/2 flex items-start justify-center px-16 z-10 pt-24">
        <div class="max-w-2xl animate-fade-in h-txt">
          <h1 class="mb-8">
            <span class="text-primary text-6xl font-semibold block"
              >Expert Safety</span
            >
            <span class="text-white text-6xl font-semibold block"
              >Consultancy</span
            >
            <span class="text-primary text-6xl font-semibold block"
              >Services</span
            >
          </h1>
          <p
            class="text-xl text-gray-300 mb-10 animate-slide-in max-w-lg leading-relaxed"
          >
            Leading provider of comprehensive workplace safety solutions. We
            specialize in risk assessment, compliance management, and
            professional training programs designed to protect your workforce
            and optimize operational efficiency. With over 10 years of industry
            expertise, we deliver tailored solutions that meet the unique safety
            challenges of your business.
          </p>
          <router-link to="/services" class="modern-button">
            Explore Our Services
          </router-link>
        </div>
      </div>

      <!-- Right Background -->
      <div class="absolute inset-0 w-full">
        <div
          class="absolute right-0 w-1/2 h-full bg-cover bg-center bg-no-repeat mix-blend-luminosity"
          style="background-image: url('/images/home-hero.jpg')"
        ></div>
        <div
          class="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-transparent"
        ></div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-20 bg-gray-50">
      <div class="container">
        <h2 class="text-4xl font-bold text-center mb-16 text-primary-dark">
          Our Services
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow dped"
          >
            <div
              class="mb-6 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"
            >
              <i :class="`fas fa-${service.icon} text-primary text-2xl`"></i>
            </div>
            <h3 class="text-2xl font-semibold mb-4 text-secondary">
              {{ service.title }}
            </h3>
            <p class="text-gray-600 mb-6">{{ service.description }}</p>
            <button
              class="w-full py-3 text-primary font-medium border border-primary/20 rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-20">
      <div class="container">
        <h2 class="text-4xl font-bold text-center mb-16 text-primary-dark">
          Why Choose Jarvis Safety
        </h2>
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="rounded-xl overflow-hidden">
            <img
              src="/images/about-hero.jpg"
              alt="Why Choose Us"
              class="w-full h-auto"
            />
          </div>
          <div class="space-y-8">
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="flex gap-6"
            >
              <div
                class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <i class="fas fa-check text-primary"></i>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2 text-secondary">
                  {{ feature.title }}
                </h3>
                <p class="text-gray-600">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary py-20">
      <div class="container text-center">
        <h2 class="text-4xl font-bold text-white mb-6">
          Ready to Enhance Your Workplace Safety?
        </h2>
        <p class="text-white/90 text-xl mb-8">
          Contact us today for a free consultation
        </p>
        <router-link
          to="/contact"
          class="bg-white text-primary px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block"
        >
          Get Started
        </router-link>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      services: [
        {
          icon: "shield-alt",
          title: "Safety Audits",
          description:
            "Comprehensive workplace safety assessments and recommendations.",
        },
        {
          icon: "graduation-cap",
          title: "Training Programs",
          description: "Expert-led safety training and certification courses.",
        },
        {
          icon: "clipboard-check",
          title: "Compliance Support",
          description:
            "Stay compliant with current safety regulations and standards.",
        },
      ],
      features: [
        {
          title: "Expert Team",
          description:
            "Certified professionals with years of industry experience.",
        },
        {
          title: "Comprehensive Solutions",
          description: "Tailored safety solutions for your specific needs.",
        },
        {
          title: "24/7 Support",
          description: "Round-the-clock assistance for your safety concerns.",
        },
      ],
    };
  },
};
</script>

<style>
.dped {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.h-txt {
  height: 100vh;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 2pc;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-slide-in {
  animation: slide-in 0.8s ease-out forwards;
  animation-delay: 0.2s;
  opacity: 0;
}
</style>
