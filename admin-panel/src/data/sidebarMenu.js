import {
  LayoutDashboard,
  FolderKanban,
  BadgeCent,
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
    title: "Users",
    path: "/users",
    icon: Users,
  },
  {
    title: "Posts",
    path: "/posts",
    icon: FileText,
  },
  {
    title: "Comments",
    path: "/comments",
    icon: MessageSquare,
  },
  {
    title: "Products",
    path: "/products",
    icon: Package,
  },
  {
    title: "Orders",
    path: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "Brands",
    path: "/brands",
    icon: BadgeCent,
  },
  {
    title: "Categories",
    path: "/categories",
    icon: FolderKanban,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];
