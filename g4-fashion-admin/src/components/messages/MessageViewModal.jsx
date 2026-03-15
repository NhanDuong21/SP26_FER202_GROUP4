import { X, Check, Clock } from "lucide-react";
import {
  modalOverlayClass,
  modalContainerClass,
  modalHeaderClass,
  modalCloseButtonClass,
} from "../../utils/uiClasses";

export default function MessageViewModal({ open, message, onClose, onReply }) {
  if (!open || !message) return null;

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "cao":
        return "bg-red-100 text-red-700";
      case "trung bình":
        return "bg-blue-100 text-blue-700";
      case "thấp":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className={modalOverlayClass} onClick={onClose}>
      <div
        className={`${modalContainerClass} max-w-3xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={modalHeaderClass}>
          <h2 className="text-xl font-bold text-slate-800">
            Chi tiết tin nhắn
          </h2>
          <button onClick={onClose} className={modalCloseButtonClass}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* Thông tin */}
          <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-lg">

            <div className="space-y-2 text-sm">
              <div>
                <strong>Khách hàng:</strong> {message.name}
              </div>
              <div>
                <strong>Email:</strong> {message.email}
              </div>
              <div>
                <strong>Điện thoại:</strong> {message.phone}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <strong>Danh mục:</strong>{" "}
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                  {message.category}
                </span>
              </div>

              <div>
                <strong>Độ ưu tiên:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded text-xs ${getPriorityColor(
                    message.priority
                  )}`}
                >
                  {message.priority}
                </span>
              </div>

              <div>
                <strong>Trạng thái:</strong>{" "}

                {message.status.toLowerCase() === "đã trả lời" && (
                  <span className="whitespace-nowrap rounded px-2 py-1 text-xs bg-green-100 text-green-700 inline-flex items-center gap-1">
                    <Check size={14} /> {message.status}
                  </span>
                )}

                {message.status.toLowerCase() === "chưa trả lời" && (
                  <span className="whitespace-nowrap rounded px-2 py-1 text-xs bg-red-100 text-red-700 inline-flex items-center gap-1">
                    <Clock size={14} /> {message.status}
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Tiêu đề */}
          <div>
            <h3 className="font-semibold text-lg text-slate-800">
              {message.title}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {message.time}
            </p>
          </div>

          {/* Nội dung tin nhắn */}
          <div className="bg-gray-100 p-4 rounded-lg text-slate-700 text-sm">
            {message.content}
          </div>

          {/* Phản hồi admin */}
          {message.reply && (
            <div>
              <h4 className="font-semibold text-slate-800 mb-2">
                Phản hồi từ Admin User
              </h4>

              <p className="text-xs text-slate-500 mb-2">
                {message.replyTime}
              </p>

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-slate-700">
                {message.reply}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
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