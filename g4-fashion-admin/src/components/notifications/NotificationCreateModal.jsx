import { useState } from "react";
import { X, Info } from "lucide-react";

import {
  modalOverlayClass,
  modalContainerClass,
  modalHeaderClass,
  modalCloseButtonClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "../../utils/uiClasses";

export default function NotificationCreateModal({ open, onClose, onCreate, notifications = [] }) {

  const [form, setForm] = useState({
    title: "",
    content: "",
    type: "",
    priority: "",
    status: "",
    target: "",
    time: ""
  });

  const [errors, setErrors] = useState({});

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const validate = () => {

    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Vui lòng nhập tiêu đề!";
    }

    if (!form.type) {
      newErrors.type = "Vui lòng chọn loại!";
    }

    if (!form.priority) {
      newErrors.priority = "Vui lòng chọn độ ưu tiên!";
    }

    if (!form.status) {
      newErrors.status = "Vui lòng chọn trạng thái!";
    }

    if (!form.target) {
      newErrors.target = "Vui lòng chọn đối tượng nhận!";
    }

    if (!form.content.trim()) {
      newErrors.content = "Vui lòng nhập nội dung!";
    }

    if (!form.time) {
      newErrors.time = "Vui lòng chọn thời gian gửi!";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {

    if (!validate()) return;

    const date = new Date(form.time);

    const formattedTime =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0") +
      " " +
      String(date.getHours()).padStart(2, "0") +
      ":" +
      String(date.getMinutes()).padStart(2, "0");

    const newId =
      notifications && notifications.length > 0
        ? String(Math.max(...notifications.map(n => Number(n.id))) + 1)
        : "1";

    const newNotification = {
      id: String(newId),
      title: form.title,
      content: form.content,
      type: form.type,
      priority: form.priority,
      status: form.status,
      target: form.target,
      time: formattedTime
    };

    onCreate(newNotification);
    onClose();
  };

  return (
    <div className={modalOverlayClass} onClick={onClose}>

      <div
        className={`${modalContainerClass} max-w-2xl`}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}

        <div className={modalHeaderClass}>

          <h2 className="text-xl font-bold text-slate-800">
            Tạo thông báo mới
          </h2>

          <button onClick={onClose} className={modalCloseButtonClass}>
            <X size={20} />
          </button>

        </div>

        <div className="p-6 space-y-5">

          {/* Tiêu đề */}

          <div>

            <label className="text-sm">
              <span className="text-red-500">*</span> Tiêu đề
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Nhập tiêu đề thông báo"
              className={`w-full mt-1 border rounded-lg px-3 py-2
              ${errors.title ? "border-red-400" : ""}`}
            />

            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title}
              </p>
            )}

          </div>

          {/* Row */}

          <div className="grid grid-cols-3 gap-4">

            {/* Loại thông báo */}

            <div>

              <label className="text-sm">
                <span className="text-red-500">*</span> Loại thông báo
              </label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className={`w-full mt-1 border rounded-lg px-3 py-2
                ${!form.type ? "text-gray-400" : "text-slate-800"}
                ${errors.type ? "border-red-400" : ""}`}
              >

                <option value="">Chọn loại thông báo</option>
                <option className="text-slate-800">Cảnh báo</option>
                <option className="text-slate-800">Thành Công</option>
                <option className="text-slate-800">Thông Tin</option>
                <option className="text-slate-800">Lỗi</option>

              </select>

              {errors.type && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.type}
                </p>
              )}

            </div>

            {/* Độ ưu tiên */}

            <div>

              <label className="text-sm">
                <span className="text-red-500">*</span> Độ ưu tiên
              </label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className={`w-full mt-1 border rounded-lg px-3 py-2
                ${!form.priority ? "text-gray-400" : "text-slate-800"}
                ${errors.priority ? "border-red-400" : ""}`}
              >

                <option value="">Chọn độ ưu tiên</option>
                <option className="text-slate-800">Thấp</option>
                <option className="text-slate-800">Trung bình</option>
                <option className="text-slate-800">Cao</option>
                <option className="text-slate-800">Khẩn cấp</option>

              </select>

              {errors.priority && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.priority}
                </p>
              )}

            </div>

            {/* Trạng thái */}

            <div>

              <label className="text-sm">
                <span className="text-red-500">*</span> Trạng thái
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={`w-full mt-1 border rounded-lg px-3 py-2
                ${!form.status ? "text-gray-400" : "text-slate-800"}
                ${errors.status ? "border-red-400" : ""}`}
              >

                <option value="">Chọn trạng thái</option>
                <option className="text-slate-800">Đã xuất bản</option>
                <option className="text-slate-800">Đã lên lịch</option>
                <option className="text-slate-800">Đã gửi</option>
                <option className="text-slate-800">Bản nháp</option>

              </select>

              {errors.status && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.status}
                </p>
              )}

            </div>

          </div>

          {/* Target + Time */}

          <div className="grid grid-cols-2 gap-4">

            {/* Đối tượng nhận */}

            <div>

              <label className="text-sm">
                <span className="text-red-500">*</span> Đối tượng nhận
              </label>

              <select
                name="target"
                value={form.target}
                onChange={handleChange}
                className={`w-full mt-1 border rounded-lg px-3 py-2
                ${!form.target ? "text-gray-400" : "text-slate-800"}
                ${errors.target ? "border-red-400" : ""}`}
              >

                <option value="">Chọn đối tượng nhận</option>
                <option className="text-slate-800">Khách hàng mới (156)</option>
                <option className="text-slate-800">Tất cả khách hàng</option>
                <option className="text-slate-800">Khách VIP</option>

              </select>

              {errors.target && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.target}
                </p>
              )}

            </div>

            {/* Thời gian gửi */}

            <div>

              <label className="flex items-center gap-1 text-sm">

                Thời gian gửi

                <Info
                  size={14}
                  className="text-gray-400"
                  title="Nếu không chọn thời gian, thông báo sẽ được gửi ngay"
                />

              </label>

              <input
                type="datetime-local"
                name="time"
                value={form.time}
                onChange={handleChange}
                step="60"
                className={`w-full mt-1 border rounded-lg px-3 py-2
  ${form.time ? "text-slate-800" : "text-gray-400"}
  ${errors.time ? "border-red-400" : ""}`}
              />

              {errors.time && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.time}
                </p>
              )}

            </div>

          </div>

          {/* Nội dung */}

          <div>

            <label className="text-sm">
              <span className="text-red-500">*</span> Nội dung
            </label>

            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Nhập nội dung thông báo..."
              className={`w-full mt-1 border rounded-lg px-3 py-3 h-32
              ${errors.content ? "border-red-400" : ""}`}
              maxLength={500}
            />

            {errors.content && (
              <p className="text-red-500 text-xs mt-1">
                {errors.content}
              </p>
            )}

            <div className="text-right text-xs text-gray-400">
              {form.content.length}/500
            </div>

          </div>

          {/* Buttons */}

          <div className="flex gap-3 pt-2">

            <button
              onClick={handleSubmit}
              className={primaryButtonClass}
            >
              Tạo thông báo
            </button>

            <button
              onClick={onClose}
              className={secondaryButtonClass}
            >
              Hủy
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}