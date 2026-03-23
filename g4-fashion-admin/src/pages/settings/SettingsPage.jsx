import { useState, useEffect } from "react";
import { Settings, RotateCcw, Save } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

function SettingsPage() {
  const { language, setLanguage, t } = useLanguage();

  const [settings, setSettings] = useState({
    siteName: "",
    siteDescription: "",
    adminEmail: "",
    timezone: "",
    language: language || "",
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

  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      language,
    }));
  }, [language]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = (e) => {
    if (e?.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }

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
    if (e?.preventDefault) e.preventDefault();

    // xử lý đổi mật khẩu
    if (tab === "password") {
      fetch("http://localhost:3001/users/1")
        .then((res) => res.json())
        .then((user) => {
          if (password.oldPassword !== user.password) {
            alert(t("Mật khẩu cũ không đúng!"));
            return;
          }

          if (password.newPassword.length < 6) {
            alert(t("Mật khẩu phải >= 6 ký tự"));
            return;
          }

          if (password.newPassword !== password.confirmPassword) {
            alert(t("Xác nhận mật khẩu không khớp"));
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
            alert(t("Đổi mật khẩu thành công"));

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

    alert(t("Đã lưu cài đặt!"));

    // update app language immediately
    setLanguage(settings.language);
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
            {t("Cài đặt hệ thống")}
          </h2>

          <h2
            onClick={() => setTab("password")}
            className={`flex cursor-pointer items-center gap-2 text-xl font-semibold ${
              tab === "password" ? "text-blue-600" : "text-slate-800"
            }`}
          >
            <Settings size={20} />
            {t("Mật khẩu")}
          </h2>

          <h2
            onClick={() => setTab("language")}
            className={`flex cursor-pointer items-center gap-2 text-xl font-semibold ${
              tab === "language" ? "text-blue-600" : "text-slate-800"
            }`}
          >
            <Settings size={20} />
            {t("Ngôn ngữ")}
          </h2>

        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            <Save size={16} />
            {t("Lưu thay đổi")}
          </button>
        </div>
      </div>

      {/* FORM CÀI ĐẶT */}
      {tab === "general" && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >

            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-600 mb-1">
                {t("Tên website")}
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
                {t("Email quản trị")}
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
                {t("Mật khẩu hiện tại")}
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
                {t("Mật khẩu mới")}
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
                {t("Xác nhận mật khẩu")}
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

      {tab === "language" && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-600 mb-1">
                {t("Chọn ngôn ngữ")}
              </label>
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="">{t("Chọn ngôn ngữ")}</option>
                {[
                  { code: "en", nameKey: "English" },
                  { code: "vi", nameKey: "Tiếng Việt" },
                ].map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {t(lang.nameKey)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;