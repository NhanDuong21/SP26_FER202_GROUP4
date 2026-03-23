import { useEffect, useState } from "react";
import { User, ShoppingCart, Search } from "lucide-react";
import {
  tableCellClass,
  tableHeaderCellClass,
  inputClass,
  primaryButtonClass,
} from "../../utils/customers/uiClasses";
import { formatCurrency } from "../../utils/formatCurrency";
import CustomerFormModal from "./CustomerFormModal";
import CustomerDetailModal from "./CustomerDetailModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function CustomersPage() {
  const [customerStats, setCustomerStats] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingCustomer, setDeletingCustomer] = useState(null);

  const calculateCustomerStats = async () => {
    try {
      setStatsLoading(true);
      const res = await fetch("http://localhost:3001/orders"); // ← Port backend của bạn
      if (!res.ok) {
        throw new Error(`Lỗi fetch orders: ${res.status} - ${res.statusText}`);
      }
      const orders = await res.json();

      if (!Array.isArray(orders) || orders.length === 0) {
        setCustomerStats([]);
        return;
      }

      const statsMap = {};
      orders.forEach((order) => {
        const phone = String(order.customerPhone || "").trim();
        if (!phone) return;

        if (!statsMap[phone]) {
          statsMap[phone] = {
            phone,
            name: String(order.customerName || "").trim() || "Khách vãng lai",
            orderCount: 0,
            totalSpent: 0,
            lastOrderDate: "",
          };
        }

        statsMap[phone].orderCount += 1;
        statsMap[phone].totalSpent += Number(order.totalAmount || 0) || 0;

        const orderDate = (order.completedAt || order.createdAt || "").slice(0, 10);
        if (orderDate && (!statsMap[phone].lastOrderDate || orderDate > statsMap[phone].lastOrderDate)) {
          statsMap[phone].lastOrderDate = orderDate;
        }
      });

      const statsArray = Object.values(statsMap).map((item) => {
        let level = "Bronze";
        if (item.orderCount >= 20) level = "VIP";
        else if (item.orderCount >= 10) level = "Gold";
        else if (item.orderCount >= 5) level = "Silver";

        const lastDate = item.lastOrderDate ? new Date(item.lastOrderDate) : null;
        const today = new Date();
        const diffDays = lastDate ? Math.floor((today - lastDate) / (1000 * 60 * 60 * 24)) : 999;
        const status = diffDays <= 30 ? "active" : "inactive";

        return { ...item, level, status };
      });

      statsArray.sort((a, b) => b.totalSpent - a.totalSpent);
      setCustomerStats(statsArray);
    } catch (err) {
      console.error("Lỗi tính thống kê khách hàng:", err);
      setCustomerStats([]);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    calculateCustomerStats();
  }, []);

  const filteredStats = customerStats.filter((cust) =>
    [cust.name, cust.phone]
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase().trim())
  );

  const handleOpenCreate = () => {
    setEditingCustomer(null);
    setIsFormOpen(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Quản lý Khách hàng
          </h1>
          <p className="mt-2 text-slate-500">
            Danh sách và thống kê khách hàng trong hệ thống
          </p>
        </div>
        <button onClick={handleOpenCreate} className={primaryButtonClass}>
          <User size={18} />
          Thêm khách hàng
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc số điện thoại"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={`${inputClass} pl-10`}
          />
        </div>
      </div>

      {/* Danh sách */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Danh sách khách hàng</h2>
          <p className="mt-1 text-sm text-slate-500">
            Dữ liệu được tính tự động từ tất cả đơn hàng
          </p>
        </div>

        {statsLoading ? (
          <div className="p-10 text-center text-slate-500">Đang tải dữ liệu...</div>
        ) : filteredStats.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            {searchText ? "Không tìm thấy khách hàng phù hợp" : "Chưa có đơn hàng nào"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left font-medium text-slate-700">Khách hàng</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-700">SDT</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-700">Cấp độ</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-700">Đơn hàng</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-700">Tổng chi tiêu</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-700">Đơn hàng cuối</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-700">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredStats.map((cust) => (
                  <tr key={cust.phone} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                          <User size={18} />
                        </div>
                        <span className="font-medium text-slate-800">{cust.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{cust.phone}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          cust.level === "VIP"
                            ? "bg-purple-100 text-purple-800"
                            : cust.level === "Gold"
                            ? "bg-yellow-100 text-yellow-800"
                            : cust.level === "Silver"
                            ? "bg-gray-200 text-gray-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {cust.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      <div className="flex items-center gap-1">
                        <ShoppingCart size={16} />
                        {cust.orderCount}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {formatCurrency(cust.totalSpent)}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {cust.lastOrderDate
                        ? new Date(cust.lastOrderDate).toLocaleDateString("vi-VN")
                        : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          cust.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {cust.status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Các modal */}
      <CustomerFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={(payload) => {
          console.log("Submit customer:", payload);
          setIsFormOpen(false);
        }}
        editingCustomer={editingCustomer}
      />
      <CustomerDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        customer={selectedCustomer}
      />
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          setIsDeleteOpen(false);
        }}
        customerName={deletingCustomer?.name}
      />
    </div>
  );
}