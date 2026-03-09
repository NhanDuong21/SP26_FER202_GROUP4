import { useEffect, useState } from "react";
import { toast } from "sonner";

import UserModal from "../components/users/UserModal";
import UserTable from "../components/users/UserTable";
import { userService } from "../services/userService";
import ConfirmDialog from "../components/shared/ConfirmDialog";

function UsersPage() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const [editingUserId, setEditingUserId] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // modal add/edit
  const [isModalOpen, setIsModalOpen] = useState(false);

  // confirm delete dialog
  const [deleteUserId, setDeleteUserId] = useState(null);

  //fetch users
  useEffect(() => {
    userService
      .getUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Lỗi khi fetch users:", error);
        setError(error.message);
        toast.error("Không thể tải danh sách users");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // reset form về trạng thái ban đầu
  const resetForm = () => {
    setName("");
    setEmail("");
    setCity("");
    setEditingUserId(null);
  };

  const handleOpenDeleteModal = (id) => {
    setDeleteUserId(id);
  };

  const handleCloseDeleteModal = () => {
    setDeleteUserId(null);
  };

  const handleDeleteUser = () => {
    if (!deleteUserId) return;

    const updatedUsers = users.filter((user) => user.id !== deleteUserId);
    setUsers(updatedUsers);

    toast.success("Xóa user thành công");

    // nếu đang edit user bị xóa thì reset form
    if (editingUserId === deleteUserId) {
      resetForm();
    }

    setDeleteUserId(null);
  };

  /* =====================================================
   ADD / UPDATE USER
  ===================================================== */
  const handleAddOrUpdateUser = () => {
    if (!name || !email || !city) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    // UPDATE
    if (editingUserId) {
      const updatedUsers = users.map((user) =>
        user.id === editingUserId
          ? {
              ...user,
              name,
              email,
              address: {
                ...user.address,
                city,
              },
            }
          : user,
      );

      setUsers(updatedUsers);
      toast.success("Cập nhật user thành công");

      resetForm();
      setIsModalOpen(false);
      return;
    }

    // ADD
    const newUser = {
      id: Date.now(),
      name,
      email,
      address: {
        street: "Chưa có",
        suite: "Chưa có",
        city,
      },
    };

    setUsers([newUser, ...users]);

    toast.success("Thêm user thành công");

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

  // filter theo search
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / usersPerPage),
  );

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;

  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-3xl font-bold">Users</h1>
        <div className="text-lg text-slate-600">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-3xl font-bold">Users</h1>
        <div className="rounded-lg bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  //ui main page
  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Users</h1>

      {/* Search + Add button */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <input
          type="text"
          placeholder="Search user..."
          className="rounded border border-slate-300 px-3 py-2"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <button
          onClick={handleOpenAddModal}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add User
        </button>
      </div>

      {/* Table */}
      <UserTable
        users={currentUsers}
        handleEditUser={handleEditUser}
        handleDeleteUser={handleOpenDeleteModal}
      />

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded bg-slate-200 px-4 py-2 hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-medium text-slate-700">
          Page {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded bg-slate-200 px-4 py-2 hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal add/edit user */}
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

      {/* Confirm delete */}
      <ConfirmDialog
        isOpen={!!deleteUserId}
        title="Xóa user"
        message="Bạn có chắc muốn xóa user này không? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={handleDeleteUser}
        onClose={handleCloseDeleteModal}
      />
    </div>
  );
}

export default UsersPage;
