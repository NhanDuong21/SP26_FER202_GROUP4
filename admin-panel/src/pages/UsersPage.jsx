import { useEffect, useState } from "react";

function UsersPage() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
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
      return;
    }

    const newUser = {
      id: users.length + 1,
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
  };

  const handleEditUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setCity(user.address.city);
    setEditingUserId(user.id);
  };

  return (
    <div className="users-page">
      <h1 className="users-title">Users</h1>
      <div className="flex gap-3 mb-6 flex-wrap">
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

        <button
          onClick={handleAddOrUpdateUser}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingUserId ? "Update User" : "Add User"}
        </button>

        {editingUserId && (
          <button
            onClick={resetForm}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
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
            {users.map((user) => (
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
    </div>
  );
}

export default UsersPage;
