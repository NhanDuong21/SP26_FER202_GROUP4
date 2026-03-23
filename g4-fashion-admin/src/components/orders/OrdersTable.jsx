import { Eye, ShoppingCart } from "lucide-react";
import { formatCurrency } from "../../utils/ordersUtils/formatCurrency";
import { formatDateTime } from "../../utils/ordersUtils/formatDateTime";
import {
  getOrderActions,
  getOrderStatusInfo,
  getPaymentStatusInfo,
} from "../../utils/ordersUtils/orderHelper";

export default function OrdersTable({
  orders,
  totalOrders,
  updatingId,
  onView,
  onChangeStatus,
}) {
  return (
    <div className="rounded-3xl bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
            <ShoppingCart size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-slate-800">Danh sách đơn hàng</h2>
            <p className="text-sm text-slate-500">
              Hiển thị {orders.length} / {totalOrders} đơn hàng
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
              <th className="px-5 py-4 text-left font-semibold">View</th>
              <th className="px-5 py-4 text-left font-semibold">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-5 py-12 text-center text-slate-500">
                  Không có đơn hàng phù hợp
                </td>
              </tr>
            ) : (
              orders.map((order) => {
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
                      <button
                        onClick={() => onView(order)}
                        className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-medium text-sky-700 transition hover:bg-sky-100"
                      >
                        <Eye size={15} />
                        Xem
                      </button>
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
                            onChangeStatus(order, value);
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
    </div>
  );
}