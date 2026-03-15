import { useState, useEffect } from "react";

function ProfilePage() {

  const [tab, setTab] = useState("info");
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/users/1")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setFormData(data);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    fetch("http://localhost:3000/users/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setEditing(false);
      });
  };

  if (!user) return <p className="p-10">Loading...</p>;

  return (
    <div className="bg-gray-50 p-8 min-h-screen">

      <div className="max-w-6xl mx-auto flex gap-6">

        {/* LEFT PROFILE */}

        <div className="w-1/3 space-y-6">

          <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100">

            <div className="relative inline-block">

              <img
                src={user.avatar}
                alt="Avatar"
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-100"
              />

              <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full border-2 border-white text-xs">
                <i className="fas fa-camera"></i>
              </button>

            </div>

            <h2 className="text-xl font-bold mt-4 text-gray-800">
              {user.name}
            </h2>

            <p className="text-gray-500 text-sm">
              {user.role}
            </p>

            <div className="mt-3">
              <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full font-medium">
                Công nghệ thông tin
              </span>
            </div>

            <p className="text-gray-400 text-xs mt-4">
              <i className="far fa-calendar-alt mr-1"></i>
              Tham gia từ {user.createdAt}
            </p>

          </div>

        </div>


        {/* RIGHT CONTENT */}

        <div className="w-2/3">

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-full">

            {/* TABS */}

            <div className="flex border-b">

              <button
                onClick={() => setTab("info")}
                className={`px-6 py-4 text-sm font-medium ${tab === "info"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
                  }`}
              >
                Thông tin cá nhân
              </button>

              <button
                onClick={() => setTab("history")}
                className={`px-6 py-4 text-sm font-medium ${tab === "history"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
                  }`}
              >
                Lịch sử hoạt động
              </button>

              

            </div>


            {/* CONTENT */}

            <div className="p-8">

              <div className="flex justify-between items-center mb-8">

                <h3 className="text-lg font-bold text-gray-800">

                  {tab === "info" && "Thông tin cá nhân"}
                  {tab === "history" && "Lịch sử hoạt động"}
                  {tab === "stats" && "Thống kê"}

                </h3>

                {tab === "info" && !editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700"
                  >
                    <i className="fas fa-pen text-xs"></i>
                    Chỉnh sửa
                  </button>
                )}

              </div>


              {/* INFO */}

              {tab === "info" && (

                <div className="space-y-6">

                  {/* EMAIL */}

                  <div className="flex">
                    <div className="w-32 text-gray-400 text-sm">Name:</div>

                    {editing ? (
                      <input
                        name="name"
                        value={formData.name || ""}
                        onChange={handleChange}
                        className="border px-3 py-1 rounded text-sm w-full"
                      />
                    ) : (
                      <div className="text-gray-700 text-sm flex-1">
                        {user.name}
                      </div>
                    )}
                  </div>

                  <div className="flex">
                    <div className="w-32 text-gray-400 text-sm">Email:</div>

                    {editing ? (
                      <input
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChange}
                        className="border px-3 py-1 rounded text-sm w-full"
                      />
                    ) : (
                      <div className="text-gray-700 text-sm flex-1">
                        {user.email}
                      </div>
                    )}
                  </div>
                  

                  <div className="flex">
                    <div className="w-32 text-gray-400 text-sm">Sex:</div>

                    {editing ? (
                      <input
                        name="sex"
                        value={formData.sex || ""}
                        onChange={handleChange}
                        className="border px-3 py-1 rounded text-sm w-full"
                      />
                    ) : (
                      <div className="text-gray-700 text-sm flex-1">
                        {user.sex}
                      </div>
                    )}
                  </div>

                  <div className="flex">
                    <div className="w-32 text-gray-400 text-sm">Date:</div>

                    {editing ? (
                      <input
                        name="date"
                        value={formData.date || ""}
                        onChange={handleChange}
                        className="border px-3 py-1 rounded text-sm w-full"
                      />
                    ) : (
                      <div className="text-gray-700 text-sm flex-1">
                        {user.date}
                      </div>
                    )}
                  </div>




                  <div className="flex">
                    <div className="w-32 text-gray-400 text-sm">Phone:</div>

                    {editing ? (
                      <input
                        name="phone"
                        value={formData.phone || ""}
                        onChange={handleChange}
                        className="border px-3 py-1 rounded text-sm w-full"
                      />
                    ) : (
                      <div className="text-gray-700 text-sm flex-1">
                        {user.phone}
                      </div>
                    )}
                  </div>

                  {/* ADDRESS */}

                  <div className="flex">
                    <div className="w-32 text-gray-400 text-sm">Địa chỉ:</div>

                    {editing ? (
                      <input
                        name="address"
                        value={formData.address || ""}
                        onChange={handleChange}
                        className="border px-3 py-1 rounded text-sm w-full"
                      />
                    ) : (
                      <div className="text-gray-700 text-sm flex-1">
                        {user.address}
                      </div>
                    )}
                  </div>

                  {/* STATUS */}

                  <div className="flex">
                    <div className="w-32 text-gray-400 text-sm">Trạng thái:</div>

                    {editing ? (
                      <input
                        name="status"
                        value={formData.status || ""}
                        onChange={handleChange}
                        className="border px-3 py-1 rounded text-sm w-full"
                      />
                    ) : (
                      <div className="text-gray-700 text-sm flex-1">
                        {user.status}
                      </div>
                    )}
                  </div>


                  {/* BUTTONS */}

                  {editing && (
                    <div className="flex gap-3 pt-6">

                      <button
                        onClick={handleSave}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                      >
                        Lưu
                      </button>

                      <button
                        onClick={() => {
                          setEditing(false);
                          setFormData(user);
                        }}
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                      >
                        Hủy
                      </button>

                    </div>
                  )}

                </div>

              )}


              {/* HISTORY */}

              {tab === "history" && (
                <div className="space-y-4">

                  <div className="border-l-4 border-blue-500 pl-4 py-2">

                    <p className="text-sm text-gray-700">
                      Đăng nhập vào hệ thống
                    </p>

                    <span className="text-xs text-gray-400">
                      {user.createdAt}
                    </span>

                  </div>

                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfilePage;