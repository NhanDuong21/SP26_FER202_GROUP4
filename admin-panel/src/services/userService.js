import { apiClient } from "./apiClient";

export const userService = {
  getAll() {
    return apiClient.get("/users");
  },

  getById(id) {
    return apiClient.get(`/users/${id}`);
  },

  create(userData) {
    return apiClient.post("/users", userData);
  },

  update(id, userData) {
    return apiClient.put(`/users/${id}`, userData);
  },

  remove(id) {
    return apiClient.delete(`/users/${id}`);
  },
};
