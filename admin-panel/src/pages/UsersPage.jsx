import { useEffect, useState } from "react";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Không thể tải danh sách users");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Lỗi khi fetch users:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const resetForm = () => {
    setName("");
    setEmail("");
    setCity("");
    setEditingUserId(null);
  };

  const handleDeleteUser = (id) => {
    const isConfirmed = window.confirm("Bạn có chắc muốn xóa user này không?");
    if (!isConfirmed) return;

    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);

    if (editingUserId === id) {
      resetForm();
    }
  };

  const handleAddOrUpdateUser = () => {
    if (!name || !email || !city) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (editingUserId) {
      const updatedUsers = users.map((user) =>
        user.id === editingUserId
          ? {
              ...user,
              name: name,
              email: email,
              address: {
                ...user.address,
                city: city,
              },
            }
          : user,
      );

      setUsers(updatedUsers);
      resetForm();
      setIsModalOpen(false);
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      address: {
        street: "Chưa có",
        suite: "Chưa có",
        city: city,
      },
    };

    setUsers([newUser, ...users]);
    resetForm();
    setIsModalOpen(false);
  };

  const handleEditUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setCity(user.address.city);
    setEditingUserId(user.id);
    setIsModalOpen(true);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  //pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / usersPerPage),
  );

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  //effect load
  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Users</h1>
        <div className="text-slate-600 text-lg">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Users</h1>
        <div className="rounded-lg bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      <div className="flex gap-3 mb-6 flex-wrap justify-between items-center">
        <input
          type="text"
          placeholder="Search user..."
          className="border border-slate-300 rounded px-3 py-2"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <button
          onClick={handleOpenAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Address</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  {user.address.street}, {user.address.city}
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-slate-200 hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        <span className="text-slate-700 font-medium">
          Page {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-slate-200 hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">
                {editingUserId ? "Edit User" : "Add User"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-slate-500 hover:text-slate-700 text-xl"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <input
                className="border border-slate-300 rounded px-3 py-2"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="border border-slate-300 rounded px-3 py-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="border border-slate-300 rounded px-3 py-2"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAddOrUpdateUser}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {editingUserId ? "Update User" : "Add User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersPage;
