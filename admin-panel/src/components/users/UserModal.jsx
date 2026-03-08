function UserModal({
  isModalOpen,
  handleCloseModal,
  editingUserId,
  name,
  setName,
  email,
  setEmail,
  city,
  setCity,
  handleAddOrUpdateUser,
}) {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {editingUserId ? "Edit User" : "Add User"}
          </h2>
          <button
            onClick={handleCloseModal}
            className="text-xl text-slate-500 hover:text-slate-700"
          >
            X
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <input
            className="rounded border border-slate-300 px-3 py-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="rounded border border-slate-300 px-3 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="rounded border border-slate-300 px-3 py-2"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={handleCloseModal}
              className="rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
            >
              Cancel
            </button>

            <button
              onClick={handleAddOrUpdateUser}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              {editingUserId ? "Update User" : "Add User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
