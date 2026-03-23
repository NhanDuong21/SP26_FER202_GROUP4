import { useState, useEffect } from "react";
import { X, Save } from "lucide-react";

import {
    modalOverlayClass,
    modalContainerClass,
    modalHeaderClass,
    modalCloseButtonClass,
} from "../../utils/uiClasses";

export default function NotificationEditModal({
    open,
    notification,
    onClose,
    onSave
}) {

    const [form, setForm] = useState({
        title: "",
        content: "",
        type: "",
        priority: "",
        status: "",
        target: "",
        time: ""
    });

    // Load dữ liệu thông báo khi mở modal
    useEffect(() => {
        if (notification) {
            setForm(notification);
        }
    }, [notification]);

    if (!open || !notification) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = () => {
        onSave({
            ...notification,
            ...form
        });
    };

    return (
        <div className={modalOverlayClass}>
            <div className={`${modalContainerClass} max-w-2xl`}>

                {/* Header */}
                <div className={modalHeaderClass}>
                    <h2 className="text-lg font-bold">
                        Chỉnh sửa thông báo
                    </h2>

                    <button onClick={onClose} className={modalCloseButtonClass}>
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6 space-y-4">

                    {/* Title */}
                    <div>
                        <label className="text-sm font-medium">
                            <span className="text-red-500">*</span> Tiêu đề
                        </label>

                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2 mt-1"
                        />
                    </div>

                    {/* Row 1 */}
                    <div className="grid grid-cols-3 gap-3">

                        <div>
                            <label className="text-sm font-medium">
                                <span className="text-red-500">*</span> Loại thông báo
                            </label>

                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 mt-1"
                            >
                                <option>Cảnh báo</option>
                                <option>Thành Công</option>
                                <option>Thông Tin</option>
                                <option>Lỗi</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                <span className="text-red-500">*</span> Độ ưu tiên
                            </label>

                            <select
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 mt-1"
                            >
                                <option>Thấp</option>
                                <option>Trung bình</option>
                                <option>Cao</option>
                                <option>Khẩn cấp</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                <span className="text-red-500">*</span> Trạng thái
                            </label>

                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 mt-1"
                            >
                                <option>Đã xuất bản</option>
                                <option>Đã lên lịch</option>
                                <option>Đã gửi</option>
                                <option>Bản nháp</option>
                            </select>
                        </div>

                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-2 gap-3">

                        <div>
                            <label className="text-sm font-medium">
                                <span className="text-red-500">*</span> Đối tượng nhận
                            </label>

                            <select
                                name="target"
                                value={form.target}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 mt-1"
                            >
                                <option>Tất cả khách hàng</option>
                                <option>Khách VIP</option>
                                <option>Khách hàng mới (156)</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                <span className="text-red-500">*</span> Thời gian gửi
                            </label>

                            <input
                                type="datetime-local"
                                name="time"
                                value={form.time}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 mt-1"
                            />
                        </div>

                    </div>

                    {/* Content */}
                    <div>
                        <label className="text-sm font-medium">
                            Nội dung
                        </label>

                        <textarea
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            rows={4}
                            className="w-full border rounded-lg p-3 mt-1"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">

                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        >
                            Hủy
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            <Save size={16} />
                            Lưu thay đổi
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}