import { Eye, Pencil, Trash2, AlertTriangle, CheckCircle, Info } from "lucide-react";

export default function NotificationTable({ notifications, onDelete }) {

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
                        <th className="p-4">Loại</th>
                        <th className="p-4">Tiêu đề & Nội dung</th>
                        <th className="p-4">Loại</th>
                        <th className="whitespace-nowrap p-4">Độ ưu tiên</th>
                        <th className="p-4">Trạng thái</th>
                        <th className="whitespace-nowrap p-4">Tỷ lệ đọc</th>
                        <th className="p-4">Thời gian</th>
                        <th className="p-4 text-center">Thao tác</th>
                    </tr>
                </thead>

                <tbody>

                    {notifications.map((item) => (

                        <tr
                            key={item.id}
                            className="border-t hover:bg-slate-50"
                        >

                            {/* Icon */}
                            <td className="p-4">
                                {getTypeIcon(item.type)}
                            </td>

                            {/* Title + content */}
                            <td className="p-4">

                                <div className="font-medium text-slate-800">
                                    {item.title}
                                </div>

                                <div className="text-xs text-slate-500 mt-1">
                                    {item.content}
                                </div>

                            </td>

                            {/* Type */}
                            <td className="whitespace-nowrap p-4">
                                <span className={`px-2 py-1 text-xs rounded-full ${getTypeBadge(item.type)}`}>
                                    {item.type}
                                </span>
                            </td>

                            {/* Priority */}
                            <td className="whitespace-nowrap p-4">
                                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityBadge(item.priority)}`}>
                                    {item.priority}
                                </span>
                            </td>

                            {/* Status */}
                            <td className="whitespace-nowrap p-4">
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(item.status)}`}>
                                    {item.status}
                                </span>
                            </td>

                            {/* Read rate */}
                            <td className="whitespace-nowrap p-4 text-sm">
                                {item.readRate || "0%"}
                            </td>

                            {/* Time */}
                            <td className="p-4 text-sm">
                                {item.time}
                            </td>

                            {/* Actions */}
                            <td className="p-4 flex justify-center gap-3">

                                <Eye
                                    size={18}
                                    className="cursor-pointer text-slate-500 hover:text-blue-600"
                                />

                                <Pencil
                                    size={18}
                                    className="cursor-pointer text-green-600 hover:text-green-700"
                                />

                                <Trash2
                                    size={18}
                                    onClick={() => onDelete(item.id)}
                                    className="cursor-pointer text-red-500 hover:text-red-700"
                                />

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}