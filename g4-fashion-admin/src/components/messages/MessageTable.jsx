import { useState } from "react";
import { Eye, Send, Trash2, Check, Clock } from "lucide-react";
import MessageViewModal from "./MessageViewModal";
import MessageDeleteModal from "./MessageDeleteModal";
import MessageReplyModal from "./MessageReplyModal";

import {
  tableCellClass,
  iconActionButtonClass
} from "../../utils/uiClasses";

export default function MessageTable({ messages, onReply, onDelete }) {

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(messages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMessages = messages.slice(startIndex, startIndex + itemsPerPage);

  const onView = (msg) => {
    setSelectedMessage(msg);
    setShowViewModal(true);
  };

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

  const onOpenDeleteModal = (msg) => {
    setSelectedMessage(msg);
    setShowDeleteModal(true);
  };

  const onCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedMessage(null);
  };

  const getBadge = (value) => {
    switch (value) {
      case "Khẩn cấp":
        return "bg-red-100 text-red-700";
      case "Cao":
        return "bg-orange-100 text-orange-700";
      case "Trung bình":
        return "bg-yellow-100 text-yellow-700";
      case "Thấp":
        return "bg-green-100 text-green-700";

      case "Đã trả lời":
        return "bg-green-100 text-green-700";
      case "Chưa trả lời":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Header */}
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Danh sách tin nhắn
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="p-4">Khách hàng</th>
                <th className="p-4">Tiêu đề</th>
                <th className="p-4">Danh mục</th>
                <th className="p-4">Độ ưu tiên</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4">Thời gian</th>
                <th className="p-4 text-center">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {currentMessages.map((msg) => (

                <tr
                  key={msg.id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition"
                >

                  {/* Khách hàng */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">

                      <img
                        src={`https://ui-avatars.com/api/?name=${msg.name}`}
                        alt={msg.name}
                        className="h-10 w-10 rounded-full"
                      />

                      <div>
                        <p className="font-semibold text-slate-800">
                          {msg.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {msg.email}
                        </p>

                        <p className="text-xs text-slate-400">
                          {msg.phone}
                        </p>
                      </div>

                    </div>
                  </td>

                  {/* Tiêu đề */}
                  <td className="p-4">
                    <div className="max-w-[240px]">
                      <p className="font-semibold text-slate-800 line-clamp-1">
                        {msg.title}
                      </p>

                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        {msg.content}
                      </p>
                    </div>
                  </td>

                  {/* Danh mục */}
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      {msg.category}
                    </span>
                  </td>

                  {/* Độ ưu tiên */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadge(msg.priority)}`}>
                      {msg.priority}
                    </span>
                  </td>

                  {/* Trạng thái */}
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${getBadge(msg.status)}`}>
                      {msg.status === "Đã trả lời" && <Check size={12} />}
                      {msg.status === "Chưa trả lời" && <Clock size={12} />}
                      {msg.status}
                    </span>
                  </td>

                  {/* Thời gian */}
                  <td className="p-4 text-slate-600">
                    {msg.time}
                  </td>

                  {/* Actions */}
                  <td className={tableCellClass}>
                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => onView(msg)}
                        className={`${iconActionButtonClass} bg-blue-50 text-blue-600 hover:bg-blue-100`}
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => onOpenReplyModal(msg)}
                        className={`${iconActionButtonClass} bg-emerald-50 text-emerald-600 hover:bg-emerald-100`}
                      >
                        <Send size={18} />
                      </button>

                      <button
                        onClick={() => onOpenDeleteModal(msg)}
                        className={`${iconActionButtonClass} bg-red-50 text-red-600 hover:bg-red-100`}
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

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 text-sm">

          <div className="text-slate-600">
            Trang {currentPage} / {totalPages}
          </div>

          <div className="flex items-center gap-2">

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium
                  ${currentPage === page
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
            >
              ›
            </button>

          </div>

        </div>

      </div>

      {/* Modals */}

      <MessageViewModal
        open={showViewModal}
        message={selectedMessage}
        onClose={onCloseViewModal}
      />

      <MessageReplyModal
        open={showReplyModal}
        message={selectedMessage}
        onClose={onCloseReplyModal}
        onSend={(replyText) => {
          onReply(selectedMessage, replyText);
          onCloseReplyModal();
        }}
      />

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