import axiosClient from "./axiosClient";

export const postService = {
  getAll: () => axiosClient.get("/posts"),
  getById: (id) => axiosClient.get(`/posts/${id}`),
  create: (data) => axiosClient.post("/posts", data),
  update: (id, data) => axiosClient.put(`/posts/${id}`, data),
  remove: (id) => axiosClient.delete(`/posts/${id}`),
};
