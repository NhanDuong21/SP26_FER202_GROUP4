import { useEffect, useState } from "react";
import UserModal from "../components/users/UserModal";
import UserTable from "../components/users/UserTable";
import { userService } from "../services/userService";

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
    userService
      .getUsers() //services
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

      <UserTable
        users={currentUsers}
        handleEditUser={handleEditUser}
        handleDeleteUser={handleDeleteUser}
      />
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
      <UserModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        editingUserId={editingUserId}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        city={city}
        setCity={setCity}
        handleAddOrUpdateUser={handleAddOrUpdateUser}
      />
    </div>
  );
}

export default UsersPage;
