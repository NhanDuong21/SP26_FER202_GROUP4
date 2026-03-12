import axiosClient from "./axiosClient";

export const customerService = {
  getAll: () => axiosClient.get("/customers"),
  getById: (id) => axiosClient.get(`/customers/${id}`),
  create: (data) => axiosClient.post("/customers", data),
  update: (id, data) => axiosClient.put(`/customers/${id}`, data),
  remove: (id) => axiosClient.delete(`/customers/${id}`),
};
