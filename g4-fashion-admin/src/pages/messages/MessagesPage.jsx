// src/pages/messages/MessagesPage.jsx
import { useMemo, useEffect } from "react";
import { FaEnvelope, FaClock, FaCheckCircle, FaExclamationCircle, FaSync } from "react-icons/fa";
import toast from "react-hot-toast";
import { cardClass, primaryButtonClass, outlineButtonClass, sectionHeaderClass } from "../../utils/uiClasses";

import { useMessagesData } from "../../hooks/messages/useMessagesData";
import { useMessageFilters } from "../../hooks/messages/useMessageFilters";
import { useMessageModals } from "../../hooks/messages/useMessageModals";

import MessageStats from "../../components/messages/MessageStats";
import MessageTable from "../../components/messages/MessageTable";
import MessageDetailModal from "../../components/messages/MessageDetailModal";
import MessageReplyModal from "../../components/messages/MessageReplyModal";

export default function MessagesPage() {
  const { messages, loading, error, fetchData, deleteMessage } = useMessagesData();

  const {
    isDetailOpen,
    isReplyOpen,
    selectedMessage,
    handleOpenDetail,
    handleCloseDetail,
    handleOpenReply,
    handleCloseReply,
    handleSelectMessage
  } = useMessageModals();

  const { searchTerm, setSearchTerm, statusFilter, setStatusFilter, priorityFilter, setPriorityFilter, paginatedMessages, currentPage, setCurrentPage, totalPages } = useMessageFilters(messages);

  // fetch dữ liệu khi mount
  useEffect(() => {
    fetchData();
  }, []);

  // thống kê
  const stats = useMemo(() => ({
    total: messages.length,
    unread: messages.filter(m => m.status === "Chưa đọc").length,
    replied: messages.filter(m => m.status === "Đã trả lời").length,
    urgent: messages.filter(m => m.priority === "Cao").length,
  }), [messages]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tin nhắn này?")) {
      await deleteMessage(id);
      toast.success("Xóa tin nhắn thành công");
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Tin nhắn</h1>
          <p className="mt-2 text-slate-500">Quản lý tin nhắn từ khách hàng</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={fetchData} className={outlineButtonClass}>
            <FaSync /> Làm mới
          </button>
        </div>
      </div>

      {/* Statistics */}
      <MessageStats stats={stats} />

      {/* Messages Table */}
      <div className={cardClass}>
        <div className={sectionHeaderClass}>
          <h2 className="text-xl font-bold text-slate-800">Danh sách tin nhắn</h2>
        </div>

        {loading ? (
          <div className="p-6 text-slate-500">Đang tải dữ liệu...</div>
        ) : error ? (
          <div className="p-6 text-red-500">{error}</div>
        ) : (
          <MessageTable
            messages={paginatedMessages}
            onView={(msg) => { handleSelectMessage(msg); handleOpenDetail(); }}
            onReply={(msg) => { handleSelectMessage(msg); handleOpenReply(); }}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className={outlineButtonClass}>Trước</button>
          <span className="px-4 py-2">{currentPage} / {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className={outlineButtonClass}>Tiếp</button>
        </div>
      )}

      {/* Modals */}
      <MessageDetailModal
        open={isDetailOpen}
        message={selectedMessage}
        onClose={handleCloseDetail}
      />

      <MessageReplyModal
        open={isReplyOpen}
        message={selectedMessage}
        onClose={handleCloseReply}
      />
    </div>
  );
}