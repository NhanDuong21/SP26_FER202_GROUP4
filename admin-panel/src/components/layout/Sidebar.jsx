import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  BadgeCent,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Tag,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Thống kê",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Danh mục",
    path: "/categories",
    icon: FolderKanban,
  },
  {
    title: "Thương hiệu",
    path: "/brands",
    icon: BadgeCent,
  },
  {
    title: "Sản phẩm",
    path: "/products",
    icon: Package,
  },
  {
    title: "Đơn hàng",
    path: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "Khách hàng",
    path: "/users",
    icon: Users,
  },
  {
    title: "Bài viết",
    path: "/posts",
    icon: FileText,
  },
  {
    title: "Chủ đề",
    path: "/comments",
    icon: Tag,
  },
  {
    title: "Cài đặt",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className="flex min-h-screen w-72 flex-col bg-[#0f172a] px-4 py-5 text-white">
      <div className="mb-6 flex items-center gap-4 rounded-2xl bg-white/5 px-4 py-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-bold text-slate-900">
          G4
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-wide">G4 FASHION</h1>
          <p className="text-sm text-slate-300">TRANG QUẢN TRỊ</p>
        </div>
      </div>

      <div className="mb-6 rounded-2xl bg-white/5 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-300 text-sm font-bold text-slate-800">
            A
          </div>

          <div>
            <p className="font-semibold text-white">Admin G4 Fashion</p>
            <p className="text-sm text-slate-300">nyan@admin.fashon</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
