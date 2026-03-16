import { X, AlertTriangle, CheckCircle, Info } from "lucide-react";
import {
    modalOverlayClass,
    modalContainerClass,
    modalHeaderClass,
    modalCloseButtonClass,
} from "../../utils/uiClasses";

export default function NotificationViewModal({ open, notification, onClose }) {

    if (!open || !notification) return null;

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "Khẩn cấp":
                return "bg-red-100 text-red-700";
            case "Cao":
                return "bg-orange-100 text-orange-700";
            case "Trung bình":
                return "bg-yellow-100 text-yellow-700";
            case "Thấp":
                return "bg-green-100 text-green-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Đã xuất bản":
                return "bg-blue-100 text-blue-700";
            case "Đã gửi":
                return "bg-green-100 text-green-700";
            case "Đã lên lịch":
                return "bg-purple-100 text-purple-700";
            case "Bản nháp":
                return "bg-gray-100 text-gray-600";
            default:
                return "bg-gray-100";
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case "Cảnh báo":
                return <AlertTriangle className="text-yellow-500" size={20} />;
            case "Thành Công":
                return <CheckCircle className="text-green-500" size={20} />;
            default:
                return <Info className="text-blue-500" size={20} />;
        }
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
                        Chi tiết thông báo
                    </h2>

                    <button onClick={onClose} className={modalCloseButtonClass}>
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">

                    {/* Thông tin */}
                    <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-lg">

                        <div className="space-y-2 text-sm">

                            <div className="flex items-center gap-2">
                                <strong>Loại:</strong>
                                {getTypeIcon(notification.type)}
                                <span className="text-slate-700">
                                    {notification.type}
                                </span>
                            </div>

                            <div>
                                <strong>Độ ưu tiên:</strong>{" "}
                                <span
                                    className={`px-2 py-1 rounded text-xs ${getPriorityColor(notification.priority)}`}
                                >
                                    {notification.priority}
                                </span>
                            </div>

                        </div>

                        <div className="space-y-2 text-sm">

                            <div>
                                <strong>Trạng thái:</strong>{" "}
                                <span
                                    className={`px-2 py-1 rounded text-xs ${getStatusColor(notification.status)}`}
                                >
                                    {notification.status}
                                </span>
                            </div>

                            <div>
                                <strong>Thời gian:</strong> {notification.time}
                            </div>

                        </div>

                    </div>

                    {/* Title */}
                    <div className="flex items-center text-lg text-slate-800">
                        <span className="text-red-500 mr-2">*</span>

                        <span className="font-semibold mr-2">
                            Tiêu đề:
                        </span>

                        <span className="text-slate-700">
                            {notification.title}
                        </span>
                    </div>


                    {/* Content */}
                    <div className="mt-3">

                        <div className="flex items-center font-semibold text-slate-800">
                            <span className="text-red-500 mr-2">*</span>
                            Nội dung:
                        </div>

                        <div className="ml-6 mt-2 bg-gray-100 p-4 rounded-lg text-slate-700 text-sm">
                            {notification.content}
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end pt-4 border-t">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
                        >
                            Đóng
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}