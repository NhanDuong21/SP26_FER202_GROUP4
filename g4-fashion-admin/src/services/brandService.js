import axiosClient from "./axiosClient";

export const brandService = {
  getAll: () => axiosClient.get("/brands"),
};
