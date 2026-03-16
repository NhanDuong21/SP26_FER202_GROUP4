import { Eye, Pencil, Trash2, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { tableCellClass, iconActionButtonClass } from "../../utils/uiClasses";

export default function NotificationTable({ notifications, onView, onEdit, onDelete }) {
    const getTypeBadge = (type) => {
        switch (type) {
            case "Cảnh báo":
                return "bg-yellow-100 text-yellow-700";
            case "Thành Công":
                return "bg-green-100 text-green-700";
            case "Thông Tin":
                return "bg-blue-100 text-blue-700";
            case "Lỗi":
                return "bg-red-100 text-red-700";
            default:
                return "bg-slate-100";
        }
    };

    const getPriorityBadge = (priority) => {
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
                return "bg-slate-100";
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "Đã xuất bản":
                return "bg-blue-100 text-blue-700";
            case "Đã lên lịch":
                return "bg-purple-100 text-purple-700";
            case "Đã gửi":
                return "bg-green-100 text-green-700";
            case "Bản nháp":
                return "bg-gray-100 text-gray-600";
            default:
                return "bg-slate-100";
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case "Cảnh báo":
                return <AlertTriangle className="text-yellow-500" size={18} />;
            case "Thành Công":
                return <CheckCircle className="text-green-500" size={18} />;
            default:
                return <Info className="text-blue-500" size={18} />;
        }
    };

    return (
        <div className="overflow-x-auto rounded-xl border bg-white">

            <table className="w-full">

                <thead className="bg-slate-50 text-left">
                    <tr>
                        <th className="p-4">Icon</th>
                        <th className="p-4">Tiêu đề & Nội dung</th>
                        <th className="p-4">Loại</th>
                        <th className="p-4 whitespace-nowrap">Độ ưu tiên</th>
                        <th className="p-4">Trạng thái</th>
                        <th className="p-4 whitespace-nowrap">Tỷ lệ đọc</th>
                        <th className="p-4">Thời gian</th>
                        <th className="p-4 text-center">Thao tác</th>
                    </tr>
                </thead>

                <tbody>

                    {notifications.map((notification) => (

                        <tr
                            key={notification.id}
                            className="border-t hover:bg-slate-50"
                        >

                            {/* Icon */}
                            <td className="p-4">
                                {getTypeIcon(notification.type)}
                            </td>

                            {/* Title + content */}
                            <td className="p-4">

                                <div className="font-medium text-slate-800">
                                    {notification.title}
                                </div>

                                <div className="text-sm text-slate-500 line-clamp-2 mt-1">
                                    {notification.content}
                                </div>

                            </td>

                            {/* Type */}
                            <td className="p-4 whitespace-nowrap">
                                <span
                                    className={`px-2 py-1 text-xs rounded-full ${getTypeBadge(notification.type)}`}
                                >
                                    {notification.type}
                                </span>
                            </td>

                            {/* Priority */}
                            <td className="p-4 whitespace-nowrap">
                                <span
                                    className={`px-2 py-1 text-xs rounded-full ${getPriorityBadge(notification.priority)}`}
                                >
                                    {notification.priority}
                                </span>
                            </td>

                            {/* Status */}
                            <td className="p-4 whitespace-nowrap">
                                <span
                                    className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(notification.status)}`}
                                >
                                    {notification.status}
                                </span>
                            </td>

                            {/* Read Rate */}
                            <td className="p-4 text-sm whitespace-nowrap">
                                {notification.readRate || "0%"}
                            </td>

                            {/* Time */}
                            <td className="p-4 text-sm whitespace-nowrap">
                                {notification.time}
                            </td>

                            {/* Actions */}
                            <td className={tableCellClass}>

                                <div className="flex items-center justify-center gap-2">

                                    <button
                                        onClick={() => onView(notification)}
                                        className={`${iconActionButtonClass} bg-blue-50 text-blue-600 hover:bg-blue-100`}
                                        title="Xem chi tiết"
                                    >
                                        <Eye size={18} />
                                    </button>

                                    <button
                                        onClick={() => onEdit(notification)}
                                        className={`${iconActionButtonClass} bg-green-50 text-green-600 hover:bg-green-100`}
                                        title="Sửa"
                                    >
                                        <Pencil size={18} />
                                    </button>

                                    <button
                                        onClick={() => onDelete(notification)}
                                        className={`${iconActionButtonClass} bg-red-50 text-red-600 hover:bg-red-100`}
                                        title="Xóa"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}