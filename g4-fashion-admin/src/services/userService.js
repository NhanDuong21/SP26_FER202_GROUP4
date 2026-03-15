import axiosClient from './axiosClient';

const userService = {
  getUserById: async (id) => {
    const response = await axiosClient.get(`/users/${id}`);
    return response.data;
  },
  getUsers: async () => {
    const response = await axiosClient.get('/users');
    return response.data;
  },
};

export default userService;