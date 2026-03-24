import { useEffect } from "react";
import { User, Mail, Phone, X } from "lucide-react";
import {
  modalOverlayClass,
  modalContainerClass,
  modalHeaderClass,
  modalCloseButtonClass,
  infoItemClass,
  secondaryButtonClass,
} from "../../utils/customers/uiClasses";
import { formatCurrency } from "../../utils/formatCurrency";

// Hàm helper (copy từ trước)
const getLevelBadgeClass = (level) => {
  switch (level) {
    case "VIP": return "bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full text-xs font-medium";
    case "Gold": return "bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full text-xs font-medium";
    case "Silver": return "bg-gray-200 text-gray-800 px-2.5 py-0.5 rounded-full text-xs font-medium";
    case "Bronze": return "bg-orange-100 text-orange-800 px-2.5 py-0.5 rounded-full text-xs font-medium";
    default: return "bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full text-xs font-medium";
  }
};

const getStatusBadgeClass = (status) => {
  return status === "active"
    ? "bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-medium"
    : "bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full text-xs font-medium";
};

export default function CustomerDetailModal({ isOpen, onClose, customer }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !customer) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "—";
      return d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  };

  return (
    <div onClick={handleOverlayClick} className={modalOverlayClass}>
      <div className={`${modalContainerClass} max-w-2xl`}>
        <div className={modalHeaderClass}>
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
              <User size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Chi tiết khách hàng</h2>
              <p className="mt-1 text-sm text-slate-500">
                Thông tin và thống kê từ đơn hàng
              </p>
            </div>
          </div>
          <button onClick={onClose} className={modalCloseButtonClass}>
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 px-6 py-6 md:grid-cols-[140px_1fr]">
          <div>
            <div className="h-32 w-32 rounded-3xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400">
              <User size={48} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className={infoItemClass}>
              <p className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <User size={16} /> Tên khách hàng
              </p>
              <p className="font-semibold text-slate-800">{customer.name || "—"}</p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <Mail size={16} /> Email
              </p>
              <p className="font-semibold text-slate-800">{customer.email || "Chưa có"}</p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <Phone size={16} /> Số điện thoại
              </p>
              <p className="font-semibold text-slate-800">{customer.phone || "Chưa có"}</p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 text-sm text-slate-500">Mã khách hàng</p>
              <p className="font-semibold text-slate-800">{customer.code || customer.id || "—"}</p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 text-sm text-slate-500">Cấp độ</p>
              <span className={getLevelBadgeClass(customer.level)}>
                {customer.level || "Bronze"}
              </span>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 text-sm text-slate-500">Số đơn hàng</p>
              <p className="font-semibold text-slate-800">{customer.orderCount ?? 0}</p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 text-sm text-slate-500">Đơn hàng cuối</p>
              <p className="font-semibold text-slate-800">{formatDate(customer.lastOrderDate)}</p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 text-sm text-slate-500">Tổng chi tiêu</p>
              <p className="font-semibold text-slate-800">
                {formatCurrency(customer.totalSpent ?? 0)}
              </p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 text-sm text-slate-500">Trạng thái</p>
              <span className={getStatusBadgeClass(customer.status)}>
                {customer.status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 px-6 py-4 text-right">
          <button onClick={onClose} className={secondaryButtonClass}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}