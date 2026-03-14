    import { X, TriangleAlert } from "lucide-react";
    import {
    modalOverlayClass,
    modalContainerClass,
    modalHeaderClass,
    modalCloseButtonClass,
    } from "../../utils/uiClasses";

    export default function MessageDeleteModal({ open, message, onClose, onDelete }) {
    if (!open || !message) return null;

    return (
        <div className={modalOverlayClass} onClick={onClose}>
        <div
            className={`${modalContainerClass} max-w-md`}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className={modalHeaderClass}>
            <button onClick={onClose} className={modalCloseButtonClass}>
                <X size={20} />
            </button>
            </div>

            <div className="p-6 text-center">

            {/* Icon */}
            <div className="flex justify-center mb-4">
                <div className="bg-red-100 p-4 rounded-xl">
                <TriangleAlert className="text-red-600" size={28} />
                </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-slate-800 mb-2">
                Xác nhận xóa
            </h2>

            {/* Content */}
            <p className="text-slate-600 text-sm mb-6">
                Bạn có chắc muốn xóa tin nhắn từ{" "}
                <span className="font-semibold">{message.name}</span>? 
                Hành động này không thể hoàn tác.
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4">
                <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                >
                Hủy
                </button>

                <button
                onClick={() => onDelete(message.id)}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium"
                >
                Xóa tin nhắn
                </button>
            </div>

            </div>
        </div>
        </div>
    );
    }