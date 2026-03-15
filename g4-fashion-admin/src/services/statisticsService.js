import axiosClient from "./axiosClient";

export const statisticsService = {
    getOrders: () => axiosClient.get("/orders"),
    getCustomers: () => axiosClient.get("/customers"),
    getCategories: () => axiosClient.get("/categories"),
    getVisits: () => axiosClient.get("/visits"),
    getReviews: () => axiosClient.get("/reviews"),
    getFavorites: () => axiosClient.get("/favorites"),
};