import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Bảng điều khiển", path: "/dashboard" },
  { label: "Đơn hàng", path: "/orders" },
  { label: "Thống kê", path: "/statistics" },
  { label: "Danh mục", path: "/categories" },
  { label: "Sản phẩm", path: "/products" },
  { label: "Thương hiệu", path: "/brands" },
  { label: "Khách hàng", path: "/customers" },
  { label: "Bài viết", path: "/posts" },
  { label: "Tin nhắn", path: "/messages" },
  { label: "Thông báo", path: "/notifications" },
  { label: "Thông tin cá nhân", path: "/profile" },
  { label: "Cài đặt", path: "/settings" },
];

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">G4 FASHION</h1>
        <p className="text-sm text-slate-300">Trang quản trị</p>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-white text-slate-900 font-semibold"
                  : "text-slate-200 hover:bg-slate-800"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
