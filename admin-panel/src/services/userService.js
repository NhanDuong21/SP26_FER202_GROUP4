const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const userService = {
  getUsers: async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("Không thể tải danh sách users");
    }
    return response.json();
  },

  createUser: async (newUser) => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error("Không thể tạo user");
    }

    return response.json();
  },

  updateUser: async (id, updatedUser) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      throw new Error("Không thể cập nhật user");
    }

    return response.json();
  },

  deleteUser: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Không thể xóa user");
    }

    return true;
  },
};
