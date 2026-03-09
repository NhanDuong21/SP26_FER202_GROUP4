import { apiClient } from "./apiClient";

export const productService = {
  getAll() {
    return apiClient.get("/products");
  },

  getById(id) {
    return apiClient.get(`/products/${id}`);
  },

  create(productData) {
    return apiClient.post("/products", productData);
  },

  update(id, productData) {
    return apiClient.put(`/products/${id}`, productData);
  },

  remove(id) {
    return apiClient.delete(`/products/${id}`);
  },
};
