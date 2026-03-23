import axiosClient from "./axiosClient";

export const orderService = {
  getOrders: () => axiosClient.get("/orders"),
  updateOrderStatus: (id, payload) => axiosClient.patch(`/orders/${id}`, payload),
};