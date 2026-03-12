import axiosClient from "./axiosClient";

export const brandService = {
  getAll: () => axiosClient.get("/brands"),
  getById: (id) => axiosClient.get(`/brands/${id}`),
  create: (data) => axiosClient.post("/brands", data),
  update: (id, data) => axiosClient.put(`/brands/${id}`, data),
  remove: (id) => axiosClient.delete(`/brands/${id}`),
  };
