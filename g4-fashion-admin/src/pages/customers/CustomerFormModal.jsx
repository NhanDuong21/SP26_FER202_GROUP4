import { useEffect, useState, useRef } from "react";
import { UserPlus, Mail, Phone, X, AlertCircle } from "lucide-react";
import {
  inputClass,
  inputWithIconClass,
  modalOverlayClass,
  modalContainerClass,
  modalHeaderClass,
  modalCloseButtonClass,
  secondaryButtonClass,
  primaryButtonClass,
} from "../../utils/customers/uiClasses";
import { formatCurrency } from "../../utils/formatCurrency";

const initialFormData = {
  code: "",
  name: "",
  email: "",
  phone: "",
  level: "Bronze",
  status: "active",
};

export default function CustomerFormModal({
  isOpen,
  onClose,
  onSubmit,
  editingCustomer,
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState("");
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    if (editingCustomer) {
      setFormData({
        code: editingCustomer.code || editingCustomer.id || "",
        name: editingCustomer.name || "",
        email: editingCustomer.email || "",
        phone: editingCustomer.phone || "",
        level: editingCustomer.level || "Bronze",
        status: editingCustomer.status || "active",
      });
    } else {
      setFormData(initialFormData);
      if (nameInputRef.current) nameInputRef.current.focus();
    }
    setFormError("");
  }, [editingCustomer, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["orderCount", "totalSpent", "lastOrderDate", "level"].includes(name)) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.name.trim()) return "Tên khách hàng không được để trống.";
    if (!formData.email.trim()) return "Email không được để trống.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Email không hợp lệ.";
    if (formData.phone && !/^\d{9,11}$/.test(formData.phone.trim()))
      return "Số điện thoại không hợp lệ (9-11 số).";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMsg = validate();
    if (errorMsg) {
      setFormError(errorMsg);
      return;
    }

    const payload = {
      ...formData,
      code: editingCustomer
        ? editingCustomer.code || editingCustomer.id
        : `CUST-${Date.now().toString().slice(-6)}`,
      updatedAt: new Date().toISOString(),
      ...(editingCustomer ? {} : { createdAt: new Date().toISOString() }),
      orderCount: editingCustomer?.orderCount ?? 0,
      totalSpent: editingCustomer?.totalSpent ?? 0,
      lastOrderDate: editingCustomer?.lastOrderDate ?? null,
      level: editingCustomer?.level ?? "Bronze",
    };

    onSubmit(payload);
  };

  return (
    <div onClick={handleOverlayClick} className={modalOverlayClass}>
      <div
        className={`
          ${modalContainerClass} 
          max-w-md 
          max-h-[90vh] 
          overflow-hidden 
          flex 
          flex-col
        `}
      >
        {/* Header cố định */}
        <div className={modalHeaderClass}>
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <UserPlus size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {editingCustomer ? "Cập nhật khách hàng" : "Thêm khách hàng mới"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {editingCustomer ? "Chỉnh sửa thông tin cơ bản" : "Nhập thông tin khách hàng mới"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className={modalCloseButtonClass}>
            <X size={20} />
          </button>
        </div>

        {/* Phần nội dung CUỘN ĐƯỢC */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-50 overscroll-contain">
          {formError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 flex items-center gap-2">
              <AlertCircle size={16} /> {formError}
            </div>
          )}

          {/* Mã khách hàng */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Mã khách hàng</label>
            <input
              type="text"
              value={formData.code || "(tự động)"}
              readOnly
              className={`${inputClass} bg-slate-50 text-slate-500 cursor-not-allowed`}
            />
          </div>

          {/* Tên */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              required
              ref={nameInputRef}
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputWithIconClass}
                required
              />
            </div>
          </div>

          {/* SĐT */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Số điện thoại</label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputWithIconClass}
              />
            </div>
          </div>

          {/* Cấp độ */}
          <div className="opacity-70">
            <label className="mb-2 block text-sm font-medium text-slate-700">Cấp độ (tự động từ đơn hàng)</label>
            <input
              type="text"
              value={editingCustomer?.level || "Bronze"}
              readOnly
              disabled
              className={`${inputClass} bg-slate-100 cursor-not-allowed`}
            />
          </div>

          {/* Các trường tự động */}
          <div className="grid grid-cols-2 gap-4 opacity-70">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Số đơn hàng</label>
              <input
                type="number"
                value={editingCustomer?.orderCount ?? 0}
                readOnly
                disabled
                className={`${inputClass} bg-slate-100 cursor-not-allowed`}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Tổng chi tiêu</label>
              <input
                type="text"
                value={formatCurrency(editingCustomer?.totalSpent ?? 0)}
                readOnly
                disabled
                className={`${inputClass} bg-slate-100 cursor-not-allowed`}
              />
            </div>
          </div>

          <div className="opacity-70">
            <label className="mb-2 block text-sm font-medium text-slate-700">Đơn hàng cuối</label>
            <input
              type="text"
              value={
                editingCustomer?.lastOrderDate
                  ? new Date(editingCustomer.lastOrderDate).toLocaleDateString("vi-VN")
                  : "Chưa có"
              }
              readOnly
              disabled
              className={`${inputClass} bg-slate-100 cursor-not-allowed`}
            />
          </div>

          {/* Trạng thái */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Trạng thái</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Ngưng hoạt động</option>
            </select>
          </div>
        </div>

        {/* Footer cố định */}
        <div className="border-t border-slate-200 px-6 py-4 flex justify-end gap-3">
          <button type="button" onClick={onClose} className={secondaryButtonClass}>
            Hủy
          </button>
          <button type="button" onClick={handleSubmit} className={primaryButtonClass}>
            {editingCustomer ? "Cập nhật" : "Thêm khách hàng"}
          </button>
        </div>
      </div>
    </div>
  );
}