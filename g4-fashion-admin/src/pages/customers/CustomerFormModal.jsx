import { useEffect, useState } from "react";
import { UserPlus, Mail, Phone, Tag, X } from "lucide-react";
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

const initialFormData = {
  code: "",
  name: "",
  email: "",
  phone: "",
  level: "Bronze",
  orderCount: 0,
  totalSpent: 0,
  lastOrderDate: "",
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

  useEffect(() => {
    if (!isOpen) return;

    const nextData = editingCustomer
      ? {
          code: editingCustomer.code || "",
          name: editingCustomer.name || "",
          email: editingCustomer.email || "",
          phone: editingCustomer.phone || "",
          level: editingCustomer.level || "Bronze",
          orderCount: editingCustomer.orderCount || 0,
          totalSpent: editingCustomer.totalSpent || 0,
          lastOrderDate: editingCustomer.lastOrderDate || "",
          status: editingCustomer.status || "active",
        }
      : initialFormData;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData(nextData);
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.name.trim()) return "Tên khách hàng không được để trống.";
    if (!formData.email.trim()) return "Email không được để trống.";
    // simple email check
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email))
      return "Địa chỉ email không hợp lệ.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = validate();
    if (msg) {
      setFormError(msg);
      return;
    }

    const payload = {
      ...formData,
      code: editingCustomer ? editingCustomer.code : `CUST-${Date.now()}`,
      orderCount: Number(formData.orderCount) || 0,
      totalSpent: Number(formData.totalSpent) || 0,
      lastOrderDate: formData.lastOrderDate || null,
      createdAt: editingCustomer ? editingCustomer.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSubmit(payload);
  };

  return (
    <div onClick={handleOverlayClick} className={modalOverlayClass}>
      <div className={`${modalContainerClass} max-w-md`}> 
        <div className={modalHeaderClass}>
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <UserPlus size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {editingCustomer ? "Cập nhật khách hàng" : "Thêm khách hàng"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Nhập thông tin khách hàng
              </p>
            </div>
          </div>

          <button onClick={onClose} className={modalCloseButtonClass}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5">
          {formError && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {formError}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Mã khách hàng
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                readOnly
                className={`${inputClass} bg-slate-50 text-slate-500`}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Họ và tên
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputWithIconClass}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Số điện thoại
              </label>
              <div className="relative">
                <Phone
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputWithIconClass}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Cấp độ
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="VIP">VIP</option>
                <option value="Bronze">Bronze</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Số đơn hàng
                </label>
                <input
                  type="number"
                  name="orderCount"
                  value={formData.orderCount}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Tổng chi tiêu
                </label>
                <input
                  type="number"
                  name="totalSpent"
                  value={formData.totalSpent}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Đơn hàng cuối
              </label>
              <input
                type="date"
                name="lastOrderDate"
                value={formData.lastOrderDate?.slice(0, 10) || ""}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Trạng thái
              </label>
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

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose} className={secondaryButtonClass}>
              Hủy
            </button>
            <button type="submit" className={primaryButtonClass}>
              {editingCustomer ? "Cập nhật" : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
