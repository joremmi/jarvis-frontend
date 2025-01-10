// frontend\src\router\index.js

import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/ContactView.vue"),
  },
  {
    path: "/services",
    name: "Services",
    component: () => import("@/views/ServicesView.vue"),
  },
  {
    path: "/booking/:serviceId",
    name: "Booking",
    component: () => import("@/views/BookingView.vue"),
  },
  {
    path: "/booking-confirmation",
    name: "BookingConfirmation",
    component: () => import("@/views/BookingConfirmation.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("@/views/ForgotPassword.vue"),
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: () => import("@/views/admin/LoginView.vue"),
  },
  {
    path: "/admin",
    component: () => import("@/layouts/AdminLayout.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: "",
        name: "AdminDashboard",
        component: () => import("@/views/admin/DashboardView.vue"),
      },
      {
        path: "services",
        name: "AdminServices",
        component: () => import("@/views/admin/ServicesView.vue"),
      },
      {
        path: "bookings",
        name: "AdminBookings",
        component: () => import("@/views/admin/BookingsView.vue"),
      },
      {
        path: "users",
        name: "AdminUsers",
        component: () => import("@/views/admin/UsersView.vue"),
      },
      {
        path: "settings",
        name: "AdminSettings",
        component: () => import("@/views/admin/SettingsView.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useStore(); // Assuming Vuex; use Pinia if applicable
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  const isAdmin = store.getters["auth/isAdmin"];

  if (to.name === "AdminLogin") {
    next(); // Proceed to admin login page
    return;
  }
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login"); // Redirect to login if not authenticated
    return;
  }
  if (to.meta.requiresAdmin && !isAdmin) {
    next("/"); // Redirect to home if not an admin
    return;
  }
  next(); // Proceed to the next route
});

export default router;
