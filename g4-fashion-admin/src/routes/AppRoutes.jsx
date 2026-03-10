import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import OrdersPage from "../pages/orders/OrdersPage";
import StatisticsPage from "../pages/statistics/StatisticsPage";
import CategoriesPage from "../pages/categories/CategoriesPage";
import ProductsPage from "../pages/products/ProductsPage";
import BrandsPage from "../pages/brands/BrandsPage";
import CustomersPage from "../pages/customers/CustomersPage";
import PostsPage from "../pages/posts/PostsPage";
import MessagesPage from "../pages/messages/MessagesPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import ProfilePage from "../pages/profile/ProfilePage";
import SettingsPage from "../pages/settings/SettingsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
