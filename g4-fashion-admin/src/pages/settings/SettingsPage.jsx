import { useState, useEffect } from "react";
import { Settings, RotateCcw, Save } from "lucide-react";

function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "",
    siteDescription: "",
    adminEmail: "",
    timezone: "",
    language: "",
  });

  const [tab, setTab] = useState("general");

  // thêm state password
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // load dữ liệu
  useEffect(() => {
  fetch("http://localhost:3001/settings/1")
    .then((res) => res.json())
    .then((data) => {
      setSettings((prev) => ({
        ...prev,
        siteName: data.siteName,
        siteDescription: data.siteDescription,
        timezone: data.timezone,
        language: data.language,
      }));
    });

  fetch("http://localhost:3001/users/1")
    .then((res) => res.json())
    .then((user) => {
      setSettings((prev) => ({
        ...prev,
        adminEmail: user.email,
      }));
    });
}, []);

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    fetch("http://localhost:3001/settings/1")
      .then((res) => res.json())
      .then((data) =>
        setSettings((prev) => ({
          ...prev,
          siteName: data.siteName,
          siteDescription: data.siteDescription,
          timezone: data.timezone,
          language: data.language,
        }))
      );

    fetch("http://localhost:3001/users/1")
      .then((res) => res.json())
      .then((user) =>
        setSettings((prev) => ({
          ...prev,
          adminEmail: user.email,
        }))
      );

    setPassword({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // xử lý đổi mật khẩu
    if (tab === "password") {
      fetch("http://localhost:3001/users/1")
        .then((res) => res.json())
        .then((user) => {
          if (password.oldPassword !== user.password) {
            alert("Mật khẩu cũ không đúng!");
            return;
          }

          if (password.newPassword.length < 6) {
            alert("Mật khẩu phải >= 6 ký tự");
            return;
          }

          if (password.newPassword !== password.confirmPassword) {
            alert("Xác nhận mật khẩu không khớp");
            return;
          }

          fetch("http://localhost:3001/users/1", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: password.newPassword,
            }),
          }).then(() => {
            alert("Đổi mật khẩu thành công");

            setPassword({
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
          });
        });

      return;
    }

    // lưu settings
    fetch("http://localhost:3001/settings/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        siteName: settings.siteName,
        siteDescription: settings.siteDescription,
        timezone: settings.timezone,
        language: settings.language,
      }),
    });

    fetch("http://localhost:3001/users/1", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: settings.adminEmail,
      }),
    });

    alert("Đã lưu cài đặt!");
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div className="flex gap-6">

          <h2
            onClick={() => setTab("general")}
            className={`flex cursor-pointer items-center gap-2 text-xl font-semibold ${
              tab === "general" ? "text-blue-600" : "text-slate-800"
            }`}
          >
            <Settings size={20} />
            Cài đặt hệ thống
          </h2>

          <h2
            onClick={() => setTab("password")}
            className={`flex cursor-pointer items-center gap-2 text-xl font-semibold ${
              tab === "password" ? "text-blue-600" : "text-slate-800"
            }`}
          >
            <Settings size={20} />
            Mật khẩu
          </h2>

        </div>

        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-100"
          >
            <RotateCcw size={16} />
            Khôi phục
          </button>

          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            <Save size={16} />
            Lưu thay đổi
          </button>
        </div>
      </div>

      {/* FORM CÀI ĐẶT */}
      {tab === "general" && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-600 mb-1">
                Tên website
              </label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-600 mb-1">
                Email quản trị
              </label>
              <input
                type="email"
                name="adminEmail"
                value={settings.adminEmail}
                onChange={handleChange}
                className="rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>

          </form>
        </div>
      )}

      {/* FORM PASSWORD */}
      {tab === "password" && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-600 mb-1">
                Mật khẩu hiện tại
              </label>
              <input
                type="password"
                name="oldPassword"
                value={password.oldPassword}
                onChange={handlePasswordChange}
                className="rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-600 mb-1">
                Mật khẩu mới
              </label>
              <input
                type="password"
                name="newPassword"
                value={password.newPassword}
                onChange={handlePasswordChange}
                className="rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-600 mb-1">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
                className="rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>

          </div>

        </div>
      )}
    </div>
  );
}

export default SettingsPage;