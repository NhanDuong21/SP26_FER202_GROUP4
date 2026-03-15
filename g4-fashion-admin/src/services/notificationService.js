import axiosClient from "./axiosClient";

export const notificationService = {

    getAll: () => axiosClient.get("/notifications"),

    getById: (id) => axiosClient.get(`/notifications/${id}`),

    create: (data) => axiosClient.post("/notifications", data),

    update: (id, data) => axiosClient.put(`/notifications/${id}`, data),

    remove: (id) => axiosClient.delete(`/notifications/${id}`),

};