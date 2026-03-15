import axiosClient from "./axiosClient";

export const messageService = {
  getAll: () => axiosClient.get("/messages"),

  getById: (id) => axiosClient.get(`/messages/${id}`),

  create: (data) => axiosClient.post("/messages", data),

  reply: (id, data) => axiosClient.put(`/messages/${id}`, data),

  remove: (id) => axiosClient.delete(`/messages/${id}`),
};