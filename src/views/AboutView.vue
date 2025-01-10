<template>
  <main class="min-h-screen pt-20">
    <!-- Hero Section -->
    <section class="relative h-[40vh] bg-secondary overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="/images/about-hero.jpg"
          alt="About Jarvis Safety"
          class="w-full h-full object-cover opacity-30"
        />
      </div>
      <div
        class="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/70"
      ></div>
      <div class="container mx-auto px-4 h-full flex items-center relative">
        <h1 class="text-5xl font-bold text-white">About Us</h1>
      </div>
    </section>

    <!-- Company Overview -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-4xl font-bold text-secondary mb-8">Our Story</h2>
              <div class="space-y-6">
                <p class="text-lg text-gray-600 leading-relaxed">
                  Jarvis Safety is a leading provider of QHSE services,
                  committed to ensuring workplace safety and environmental
                  compliance. With over a decade of experience, we've helped
                  numerous organizations implement effective safety measures and
                  achieve regulatory compliance.
                </p>
                <p class="text-lg text-gray-600 leading-relaxed">
                  Founded in 2015, our journey began with a simple yet powerful
                  mission: to create safer workplaces through innovative
                  solutions and expert guidance. Today, we serve clients across
                  multiple industries, from construction and manufacturing to
                  healthcare and energy sectors.
                </p>
                <div class="grid grid-cols-3 gap-8 mt-12">
                  <div class="text-center">
                    <div class="text-4xl font-bold text-primary mb-2">500+</div>
                    <div class="text-gray-600">Projects Completed</div>
                  </div>
                  <div class="text-center">
                    <div class="text-4xl font-bold text-primary mb-2">98%</div>
                    <div class="text-gray-600">Client Satisfaction</div>
                  </div>
                  <div class="text-center">
                    <div class="text-4xl font-bold text-primary mb-2">50+</div>
                    <div class="text-gray-600">Expert Consultants</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="space-y-8">
              <div class="bg-white p-6 rounded-xl shadow-sm">
                <h3
                  class="text-xl font-semibold text-secondary mb-4 flex items-center"
                >
                  <i class="fas fa-certificate text-primary mr-3"></i>
                  Industry Certifications
                </h3>
                <ul class="space-y-3 text-gray-600">
                  <li class="flex items-center">
                    <i class="fas fa-check text-primary mr-2"></i>
                    ISO 45001:2018 Certified
                  </li>
                  <li class="flex items-center">
                    <i class="fas fa-check text-primary mr-2"></i>
                    NEBOSH Accredited Training Provider
                  </li>
                  <li class="flex items-center">
                    <i class="fas fa-check text-primary mr-2"></i>
                    IOSH Approved Institution
                  </li>
                </ul>
              </div>
              <div class="bg-white p-6 rounded-xl shadow-sm">
                <h3
                  class="text-xl font-semibold text-secondary mb-4 flex items-center"
                >
                  <i class="fas fa-users text-primary mr-3"></i>
                  Our Expertise
                </h3>
                <ul class="space-y-3 text-gray-600">
                  <li class="flex items-center">
                    <i class="fas fa-check text-primary mr-2"></i>
                    Comprehensive Safety Audits & Risk Assessments
                  </li>
                  <li class="flex items-center">
                    <i class="fas fa-check text-primary mr-2"></i>
                    Custom Training Programs & Certification
                  </li>
                  <li class="flex items-center">
                    <i class="fas fa-check text-primary mr-2"></i>
                    Environmental Management Solutions
                  </li>
                  <li class="flex items-center">
                    <i class="fas fa-check text-primary mr-2"></i>
                    Emergency Response Planning
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div
            class="bg-gray-50 p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              class="mb-6 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"
            >
              <i class="fas fa-bullseye text-primary text-2xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-secondary mb-4">Our Mission</h3>
            <p class="text-gray-600 leading-relaxed">
              To provide comprehensive QHSE solutions that protect people,
              assets, and the environment while promoting sustainable business
              practices.
            </p>
          </div>

          <div
            class="bg-gray-50 p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              class="mb-6 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"
            >
              <i class="fas fa-eye text-primary text-2xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-secondary mb-4">Our Vision</h3>
            <p class="text-gray-600 leading-relaxed">
              To be the leading provider of innovative QHSE solutions, setting
              industry standards for excellence and reliability.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Values -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-secondary mb-12 text-center">
          Our Core Values
        </h2>
        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            v-for="(value, index) in coreValues"
            :key="index"
            class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <div
              class="mb-6 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto"
            >
              <i :class="`fas ${value.icon} text-primary text-2xl`"></i>
            </div>
            <h3 class="text-xl font-semibold text-secondary mb-4">
              {{ value.title }}
            </h3>
            <p class="text-gray-600">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "AboutView",
  data() {
    return {
      stats: {
        projects: "500+",
        satisfaction: "98%",
        consultants: "50+",
      },
      certifications: [
        "ISO 45001:2018 Certified",
        "NEBOSH Accredited Training Provider",
        "IOSH Approved Institution",
      ],
      expertise: [
        "Comprehensive Safety Audits & Risk Assessments",
        "Custom Training Programs & Certification",
        "Environmental Management Solutions",
        "Emergency Response Planning",
      ],
      coreValues: [
        {
          title: "Excellence",
          description: "Commitment to the highest standards",
          icon: "fa-award",
        },
        {
          title: "Integrity",
          description: "Honest and ethical conduct in all operations",
          icon: "fa-shield-alt",
        },
        {
          title: "Innovation",
          description: "Continuous improvement and adaptation",
          icon: "fa-lightbulb",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
