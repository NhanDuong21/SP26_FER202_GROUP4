import axiosClient from "./axiosClient";

export const postCategoryService = {
  getAll: () => axiosClient.get("/postCategories"),
};
