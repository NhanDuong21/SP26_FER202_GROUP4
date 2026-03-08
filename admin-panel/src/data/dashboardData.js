import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";

export const dashboardStats = [
  {
    id: 1,
    title: "Tổng doanh thu",
    value: "₫234,500,000",
    change: "+12.5%",
    trend: "up",
    subtitle: "so với tháng trước",
    icon: DollarSign,
  },
  {
    id: 2,
    title: "Đơn hàng mới",
    value: "1,234",
    change: "+8.3%",
    trend: "up",
    subtitle: "so với tháng trước",
    icon: ShoppingCart,
  },
  {
    id: 3,
    title: "Khách hàng",
    value: "5,678",
    change: "-2.1%",
    trend: "down",
    subtitle: "so với tháng trước",
    icon: Users,
  },
  {
    id: 4,
    title: "Sản phẩm",
    value: "456",
    change: "+15.7%",
    trend: "up",
    subtitle: "so với tháng trước",
    icon: Package,
  },
];

export const monthlyRevenue = [
  { month: "T1", revenue: 4200000 },
  { month: "T2", revenue: 5100000 },
  { month: "T3", revenue: 4700000 },
  { month: "T4", revenue: 6200000 },
  { month: "T5", revenue: 6900000 },
  { month: "T6", revenue: 6500000 },
  { month: "T7", revenue: 7200000 },
  { month: "T8", revenue: 7800000 },
  { month: "T9", revenue: 8300000 },
  { month: "T10", revenue: 9100000 },
];

export const orderStatusData = [
  { id: 1, label: "Đã giao", value: 58, color: "bg-green-500" },
  { id: 2, label: "Đang xử lý", value: 27, color: "bg-yellow-500" },
  { id: 3, label: "Đã hủy", value: 15, color: "bg-red-500" },
];
