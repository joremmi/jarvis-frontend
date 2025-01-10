import api from "@/utils/axios";
import router from "../router";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === "admin",
    currentUser: (state) => state.user,
  },

  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },

    setUser(user) {
      this.user = user;
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    redirectPath: null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    CLEAR_AUTH(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    SET_REDIRECT_PATH(state, path) {
      state.redirectPath = path;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        console.log("Dispatching login with credentials:", credentials);
        const response = await api.post("/auth/login", credentials);
        console.log("Login API response:", response.data);

        commit("SET_TOKEN", response.data.token);
        commit("SET_USER", response.data.user);

        // Set the Authorization header for future requests
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        return response.data;
      } catch (error) {
        console.error("Login error in Vuex store:", error);
        throw error;
      }
    },
    async register(_, userData) {
      await api.post("/auth/register", userData);
      router.push({
        name: "Login",
        query: { redirect: router.currentRoute.value.query.redirect },
      });
    },
    setRedirectPath({ commit }, path) {
      commit("SET_REDIRECT_PATH", path);
    },
    logout({ commit }) {
      commit("CLEAR_AUTH");
      delete api.defaults.headers.common["Authorization"];
      if (router.currentRoute.value.meta.requiresAuth) {
        router.push("/login");
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
  },
};
