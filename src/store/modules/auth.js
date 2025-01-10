// frontend\src\store\modules\auth.js

import api from "@/services/api";

export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
    isAuthenticated: false,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem("isAdmin", user?.role === "admin");
    },
    SET_TOKEN(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
      }
    },
    SET_AUTH(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    LOGOUT(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await api.post("/auth/login", credentials);
        const { user, token } = response.data;

        commit("SET_USER", user);
        commit("SET_TOKEN", token);
        commit("SET_AUTH", true);

        return response.data;
      } catch (error) {
        throw error.response?.data?.error || "Login failed";
      }
    },

    async adminLogin({ commit }, credentials) {
      try {
        const response = await api.post("/auth/admin/login", credentials);
        const { user, token } = response.data;

        if (user.role !== "admin") {
          throw new Error("Access denied. Admin privileges required.");
        }

        commit("SET_USER", user);
        commit("SET_TOKEN", token);
        commit("SET_AUTH", true);

        return response.data;
      } catch (error) {
        throw (
          error.response?.data?.message || error.message || "Admin login failed"
        );
      }
    },

    logout({ commit }) {
      commit("LOGOUT");
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user,
    isAdmin: (state) => state.user?.role === "admin",
  },
};
