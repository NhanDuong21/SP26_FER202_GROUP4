import { useState } from "react";
import { Eye, Send, Trash2, Check, Clock } from "lucide-react";
import MessageViewModal from "./MessageViewModal"; // modal xem chi tiết
import MessageDeleteModal from "./MessageDeleteModal"; // modal xác nhận xóa
import MessageReplyModal from "./MessageReplyModal"; // modal trả lời

import {
    tableHeaderCellClass,
    tableCellClass,
    iconActionButtonClass
} from "../../utils/uiClasses";

export default function MessageTable({ messages, onReply, onDelete }) {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showReplyModal, setShowReplyModal] = useState(false);

    // Mở modal khi nhấn "Xem chi tiết"
    const onView = (msg) => {
        setSelectedMessage(msg);
        setShowViewModal(true);
    };

    // Đóng modal
    const onCloseViewModal = () => {
        setSelectedMessage(null);
        setShowViewModal(false);
    };

    const onOpenReplyModal = (msg) => {
        setSelectedMessage(msg);
        setShowReplyModal(true);
    };

    const onCloseReplyModal = () => {
        setShowReplyModal(false);
        setSelectedMessage(null);
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const onOpenDeleteModal = (msg) => {
        setSelectedMessage(msg);
        setShowDeleteModal(true);
    };

    const onCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedMessage(null);
    };

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case "cao":
                return "bg-red-100 text-red-700";
            case "trung bình":
                return "bg-yellow-100 text-yellow-700";
            case "thấp":
                return "bg-green-100 text-green-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <>
            <div className="overflow-x-auto rounded-xl border bg-white">
                <table className="w-full">
                    <thead className="bg-slate-50 text-left">
                        <tr>
                            <th className="p-4">Khách hàng</th>
                            <th className="p-4">Tiêu đề & Nội dung</th>
                            <th className="p-4">Danh mục</th>
                            <th className="whitespace-nowrap p-4">Độ ưu tiên</th>
                            <th className="p-4">Trạng thái</th>
                            <th className="p-4">Thời gian</th>
                            <th className="p-4">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((msg) => (
                            <tr key={msg.id} className="border-t hover:bg-slate-50">
                                {/* Khách hàng */}
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${msg.name}`}
                                            alt={msg.name}
                                            className="h-10 w-10 rounded-full"
                                        />
                                        <div>
                                            <div className="font-medium text-slate-800">{msg.name}</div>
                                            <div className="text-sm text-slate-500">{msg.email}</div>
                                            <div className="text-sm text-slate-400">{msg.phone}</div>
                                        </div>
                                    </div>
                                </td>

                                {/* Tiêu đề + nội dung */}
                                <td className="p-4">
                                    <div className="font-medium text-slate-800">{msg.title}</div>
                                    <div className="text-sm text-slate-500 line-clamp-2">
                                        {msg.content}
                                    </div>
                                </td>

                                {/* Danh mục */}
                                <td className="p-4">
                                    <span className="whitespace-nowrap rounded bg-blue-100 px-2 py-1 text-xs text-blue-600">
                                        {msg.category}
                                    </span>
                                </td>

                                {/* Độ ưu tiên */}
                                <td className="p-4">
                                    <span className={`whitespace-nowrap rounded px-2 py-1 text-xs ${getPriorityColor(msg.priority)}`}>
                                        {msg.priority}
                                    </span>
                                </td>

                                {/* Trạng thái */}
                                <td className="p-4">
                                    {msg.status.toLowerCase() === "đã trả lời" && (
                                        <span className="whitespace-nowrap rounded px-2 py-1 text-xs bg-green-100 text-green-700 inline-flex items-center gap-1">
                                            <Check size={12} /> {msg.status}
                                        </span>
                                    )}

                                    {msg.status.toLowerCase() === "chưa trả lời" && (
                                        <span className="whitespace-nowrap rounded px-2 py-1 text-xs bg-red-100 text-red-700 inline-flex items-center gap-1">
                                            <Clock size={12} /> {msg.status}
                                        </span>
                                    )}

                                </td>

                                {/* Thời gian */}
                                <td className="whitespace-nowrap p-4 text-sm text-slate-500">{msg.time}</td>

                                {/* Thao tác */}
                                <td className={tableCellClass}>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onView(msg)}
                                            className={`${iconActionButtonClass} bg-blue-50 text-blue-600 hover:bg-blue-100`}
                                            title="Xem chi tiết"
                                        >
                                            <Eye size={18} />
                                        </button>

                                        <button
                                            onClick={() => onOpenReplyModal(msg)}
                                            className={`${iconActionButtonClass} bg-green-50 text-green-600 hover:bg-green-100`}
                                            title="Trả lời"
                                        >
                                            <Send size={18} />
                                        </button>

                                        <button
                                            onClick={() => onOpenDeleteModal(msg)}
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

            {/* Modal xem chi tiết */}
            <MessageViewModal
                open={showViewModal}
                message={selectedMessage}
                onClose={onCloseViewModal}
            />
            
            {/* Modal trả lời */}
            <MessageReplyModal
                open={showReplyModal}
                message={selectedMessage}
                onClose={onCloseReplyModal}
                onSend={(replyText) => {
                    onReply(selectedMessage, replyText);
                    onCloseReplyModal();
                }}
            />

            {/* Modal xác nhận xóa */}
            <MessageDeleteModal
                isOpen={showDeleteModal}
                onClose={onCloseDeleteModal}
                onConfirm={(id) => {
                    onDelete(id);
                    onCloseDeleteModal();
                }}
                message={selectedMessage}
            />
        </>
    );
}