import api from "./api";

export const getServices = async () => {
  try {
    const response = await api.get("/services");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch services";
  }
};
