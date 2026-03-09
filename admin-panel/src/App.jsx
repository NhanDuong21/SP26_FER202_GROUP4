import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import PostsPage from "./pages/PostsPage";
import CommentsPage from "./pages/CommentsPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import CustomersPage from "./pages/CustomersPage";
import BrandsPage from "./pages/BrandsPage";
import CategoriesPage from "./pages/CategoriesPage";
import SettingsPage from "./pages/SettingsPage";

import "./App.css";

function App() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex flex-1 flex-col">
        <Topbar />

        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/comments" element={<CommentsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
