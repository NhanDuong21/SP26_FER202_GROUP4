import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  Shirt,
  BadgeCheck,
  ShoppingCart,
  Users,
  FileText,
  MessageCircleMore,
  Bell,
  UserCircle2,
  Settings,
} from "lucide-react";

export const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Thống kê", path: "/statistics", icon: BarChart3 },
  { label: "Danh mục", path: "/categories", icon: FolderKanban },
  { label: "Thương hiệu", path: "/brands", icon: BadgeCheck },
  { label: "Sản phẩm", path: "/products", icon: Shirt },
  { label: "Đơn hàng", path: "/orders", icon: ShoppingCart },
  { label: "Khách hàng", path: "/customers", icon: Users },
  { label: "Bài viết", path: "/posts", icon: FileText },
  { label: "Tin nhắn", path: "/messages", icon: MessageCircleMore },
  { label: "Thông báo", path: "/notifications", icon: Bell },
  { label: "Thông tin cá nhân", path: "/profile", icon: UserCircle2 },
  { label: "Cài đặt", path: "/settings", icon: Settings },
];
