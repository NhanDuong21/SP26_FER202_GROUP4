import { X } from "lucide-react";
import { formatCurrency } from "../../utils/ordersUtils/formatCurrency";
import { formatDateTime } from "../../utils/ordersUtils/formatDateTime";
import {
  getOrderStatusInfo,
  getPaymentStatusInfo,
} from "../../utils/ordersUtils/orderHelper";

export default function OrderDetailModal({ order, orderItems, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Chi tiết đơn hàng {order.code}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Khách hàng: {order.customerName} - {order.customerPhone}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[calc(90vh-80px)] overflow-y-auto p-6">
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase text-slate-500">Mã đơn</p>
              <p className="mt-2 font-semibold text-slate-800">{order.code}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase text-slate-500">Ngày đặt</p>
              <p className="mt-2 font-semibold text-slate-800">
                {formatDateTime(order.createdAt)}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase text-slate-500">Trạng thái đơn</p>
              <div className="mt-2">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    getOrderStatusInfo(order.status).className
                  }`}
                >
                  {getOrderStatusInfo(order.status).label}
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase text-slate-500">Thanh toán</p>
              <div className="mt-2">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    getPaymentStatusInfo(order.paymentStatus).className
                  }`}
                >
                  {getPaymentStatusInfo(order.paymentStatus).label}
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-4 text-left font-semibold">Ảnh</th>
                    <th className="px-4 py-4 text-left font-semibold">Sản phẩm</th>
                    <th className="px-4 py-4 text-left font-semibold">Đơn giá</th>
                    <th className="px-4 py-4 text-left font-semibold">Số lượng</th>
                    <th className="px-4 py-4 text-left font-semibold">Thành tiền</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 bg-white">
                  {orderItems.map((item, index) => (
                    <tr key={`${item.productId}-${index}`}>
                      <td className="px-4 py-4">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="h-16 w-16 rounded-xl border border-slate-200 object-cover"
                        />
                      </td>

                      <td className="px-4 py-4">
                        <p className="font-medium text-slate-800">{item.productName}</p>
                        {item.productCode && (
                          <p className="mt-1 text-xs text-slate-500">{item.productCode}</p>
                        )}
                      </td>

                      <td className="px-4 py-4 text-slate-700">
                        {formatCurrency(item.price)} đ
                      </td>

                      <td className="px-4 py-4 text-slate-700">{item.quantity}</td>

                      <td className="px-4 py-4 font-semibold text-emerald-600">
                        {formatCurrency(item.lineTotal)} đ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 ml-auto w-full max-w-md space-y-3 rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Tạm tính</span>
              <span className="font-medium text-slate-800">
                {formatCurrency(order.subtotal)} đ
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Giảm giá</span>
              <span className="font-medium text-rose-600">
                - {formatCurrency(order.discount || 0)} đ
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Phí vận chuyển</span>
              <span className="font-medium text-slate-800">
                {formatCurrency(order.shippingFee || 0)} đ
              </span>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-slate-800">
                  Tổng giá trị đơn
                </span>
                <span className="text-lg font-bold text-emerald-600">
                  {formatCurrency(order.totalAmount)} đ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}