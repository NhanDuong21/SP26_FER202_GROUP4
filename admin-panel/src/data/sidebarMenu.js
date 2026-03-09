import {
  LayoutDashboard,
  FolderKanban,
  BadgePercent,
  Package,
  ShoppingCart,
  Users,
  FileText,
  MessageSquare,
  Settings,
} from "lucide-react";

export const sidebarMenu = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Khách hàng",
    path: "/customers",
    icon: Users,
  },
  {
    title: "Bài viết",
    path: "/posts",
    icon: FileText,
  },
  {
    title: "Bình luận",
    path: "/comments",
    icon: MessageSquare,
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
    title: "Thương hiệu",
    path: "/brands",
    icon: BadgePercent,
  },
  {
    title: "Danh mục",
    path: "/categories",
    icon: FolderKanban,
  },
  {
    title: "Users",
    path: "/users",
    icon: Users,
  },
  {
    title: "Cài đặt",
    path: "/settings",
    icon: Settings,
  },
];
