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

export function getMenuItems(t) {
  return [
    { label: t("Dashboard"), path: "/dashboard", icon: LayoutDashboard },
    { label: t("Thống kê"), path: "/statistics", icon: BarChart3 },
    { label: t("Danh mục"), path: "/categories", icon: FolderKanban },
    { label: t("Thương hiệu"), path: "/brands", icon: BadgeCheck },
    { label: t("Sản phẩm"), path: "/products", icon: Shirt },
    { label: t("Đơn hàng"), path: "/orders", icon: ShoppingCart },
    { label: t("Khách hàng"), path: "/customers", icon: Users },
    { label: t("Bài viết"), path: "/posts", icon: FileText },
    { label: t("Tin nhắn"), path: "/messages", icon: MessageCircleMore },
    { label: t("Thông báo"), path: "/notifications", icon: Bell },
    { label: t("Thông tin cá nhân"), path: "/profile", icon: UserCircle2 },
    { label: t("Cài đặt"), path: "/settings", icon: Settings },
  ];
}
