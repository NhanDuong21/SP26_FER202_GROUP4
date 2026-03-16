import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Search, ShoppingCart } from "lucide-react";
import { orderService } from "../../services/orderService";
import { formatCurrency } from "../../utils/ordersUtils/formatCurrency";
import { formatDateTime } from "../../utils/ordersUtils/formatDateTime";
import {
  filterOrders,
  getOrderActions,
  getOrderStatusInfo,
  getPaymentStatusInfo,
} from "../../utils/ordersUtils/orderHelper";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const ordersRes = await orderService.getOrders();
        const orderData = ordersRes.data || [];

        setOrders(orderData);
      } catch (err) {
        console.error("Lỗi lấy đơn hàng:", err);
        setError("Không thể tải dữ liệu đơn hàng.");
        toast.error("Tải đơn hàng thất bại");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, statusFilter, paymentFilter]);

  const filteredOrders = useMemo(() => {
    return filterOrders(orders, keyword, statusFilter, paymentFilter);
  }, [orders, keyword, statusFilter, paymentFilter]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage]);

  const handleChangeStatus = async (order, newStatus) => {
    try {
      setUpdatingId(order.id);

      const payload = {
        status: newStatus,
        completedAt: newStatus === "completed" ? new Date().toISOString() : null,
        cancelledAt: newStatus === "cancelled" ? new Date().toISOString() : null,
      };

      const updatedRes = await orderService.updateOrderStatus(order.id, payload);
      const updatedOrder = updatedRes.data;

      setOrders((prev) =>
        prev.map((item) =>
          item.id === order.id ? { ...item, ...updatedOrder } : item
        )
      );

      toast.success("Cập nhật trạng thái đơn hàng thành công");
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái:", err);
      toast.error("Cập nhật trạng thái thất bại");
    } finally {
      setUpdatingId("");
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-6 text-slate-500 shadow-sm">
        Đang tải dữ liệu...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-white p-6 text-red-500 shadow-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">
          Quản lý Đơn hàng
        </h1>
        <p className="mt-2 text-slate-500">
          Theo dõi và xử lý đơn hàng của khách hàng
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="relative lg:col-span-2">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Tìm kiếm theo mã đơn hàng, tên khách hàng, số điện thoại"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-400"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chờ xử lý</option>
          <option value="processing">Đang xử lý</option>
          <option value="completed">Đã hoàn thành</option>
          <option value="cancelled">Đã hủy</option>
        </select>

        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
        >
          <option value="">Tất cả thanh toán</option>
          <option value="paid">Đã thanh toán</option>
          <option value="unpaid">Chưa thanh toán</option>
        </select>
      </div>

      <div className="rounded-3xl bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
              <ShoppingCart size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800">Danh sách đơn hàng</h2>
              <p className="text-sm text-slate-500">
                Hiển thị {filteredOrders.length} / {orders.length} đơn hàng
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-4 text-left font-semibold">Mã đơn hàng</th>
                <th className="px-5 py-4 text-left font-semibold">Khách hàng</th>
                <th className="px-5 py-4 text-left font-semibold">Tổng tiền</th>
                <th className="px-5 py-4 text-left font-semibold">Trạng thái đơn</th>
                <th className="px-5 py-4 text-left font-semibold">Thanh toán</th>
                <th className="px-5 py-4 text-left font-semibold">Ngày đặt</th>
                <th className="px-5 py-4 text-left font-semibold">Thao tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center text-slate-500">
                    Không có đơn hàng phù hợp
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => {
                  const orderStatus = getOrderStatusInfo(order.status);
                  const paymentStatus = getPaymentStatusInfo(order.paymentStatus);
                  const actions = getOrderActions(order.status);

                  return (
                    <tr key={order.id} className="hover:bg-slate-50/70">
                      <td className="px-5 py-4 font-semibold text-slate-800">
                        {order.code}
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-medium text-slate-800">{order.customerName}</p>
                        <p className="mt-1 text-xs text-slate-500">{order.customerPhone}</p>
                      </td>

                      <td className="px-5 py-4 font-semibold text-emerald-600">
                        {formatCurrency(order.totalAmount)} đ
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${orderStatus.className}`}
                        >
                          {orderStatus.label}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${paymentStatus.className}`}
                        >
                          {paymentStatus.label}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {formatDateTime(order.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        {actions.length === 0 ? (
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${orderStatus.className}`}
                          >
                            {orderStatus.label}
                          </span>
                        ) : (
                          <select
                            defaultValue=""
                            disabled={updatingId === order.id}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (!value) return;
                              handleChangeStatus(order, value);
                              e.target.value = "";
                            }}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <option value="">Chọn thao tác</option>
                            {actions.map((action) => (
                              <option key={action.value} value={action.value}>
                                {action.label}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {filteredOrders.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-500">
              Hiển thị{" "}
              <span className="font-medium text-slate-700">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              -{" "}
              <span className="font-medium text-slate-700">
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length)}
              </span>{" "}
              trong tổng số{" "}
              <span className="font-medium text-slate-700">
                {filteredOrders.length}
              </span>{" "}
              đơn hàng
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Trước
              </button>

              <span className="text-sm text-slate-600">
                Trang <span className="font-semibold">{currentPage}</span> /{" "}
                <span className="font-semibold">{totalPages || 1}</span>
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages || 1))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}