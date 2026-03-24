import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

import MessageStats from "../../components/messages/MessageStats";
import MessageTable from "../../components/messages/MessageTable";
import MessageToolbar from "../../components/messages/MessageToolbar";
import { messageService } from "../../services/messageService";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadMessages = async () => {
    try {
      const res = await messageService.getAll();
      setMessages(res.data);
    } catch (error) {
      console.error("Load messages failed:", error);
      toast.error("Tải danh sách tin nhắn thất bại");
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);

      setSearchTerm("");
      setCategoryFilter("all");
      setPriorityFilter("all");
      setStatusFilter("all");

      await loadMessages();
      toast.success("Làm mới dữ liệu thành công");
    } catch (error) {
      console.error("Refresh failed:", error);
      toast.error("Làm mới dữ liệu thất bại");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await messageService.remove(id);
      toast.success("Xóa tin nhắn thành công");
      await loadMessages();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Xóa tin nhắn thất bại");
    }
  };

  const handleReplyMessage = async (message, replyText) => {
    try {
      const updatedMessage = {
        ...message,
        reply: replyText,
        status: "Đã trả lời",
        replyTime: new Date().toISOString(),
      };

      await messageService.reply(message.id, updatedMessage);
      toast.success("Gửi phản hồi thành công");
      await loadMessages();
    } catch (error) {
      console.error(error);
      toast.error("Gửi phản hồi thất bại");
    }
  };

  const categories = useMemo(() => {
    return [...new Set(messages.map((m) => m.category).filter(Boolean))];
  }, [messages]);

  const filteredMessages = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return messages.filter((message) => {
      const matchesSearch =
        !keyword ||
        message.name?.toLowerCase().includes(keyword) ||
        message.email?.toLowerCase().includes(keyword) ||
        message.title?.toLowerCase().includes(keyword) ||
        message.content?.toLowerCase().includes(keyword);

      const matchesCategory =
        categoryFilter === "all" || message.category === categoryFilter;

      const matchesPriority =
        priorityFilter === "all" || message.priority === priorityFilter;

      const matchesStatus =
        statusFilter === "all" || message.status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPriority &&
        matchesStatus
      );
    });
  }, [messages, searchTerm, categoryFilter, priorityFilter, statusFilter]);

  const stats = {
    total: messages.length,
    unread: messages.filter((m) => m.status === "Chưa trả lời").length,
    replied: messages.filter((m) => m.status === "Đã trả lời").length,
    urgent: messages.filter((m) => m.priority === "Cao").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Tin nhắn</h1>
          <p className="text-slate-500">Quản lý tin nhắn từ khách hàng</p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={isRefreshing ? "animate-spin" : ""}
          />
          {isRefreshing ? "Đang làm mới..." : "Làm mới"}
        </button>
      </div>

      <MessageStats stats={stats} />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-semibold text-slate-800">
            Danh sách tin nhắn
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Hiển thị và lọc toàn bộ tin nhắn khách hàng trong hệ thống
          </p>
        </div>

        <MessageToolbar
          searchTerm={searchTerm}
          categoryFilter={categoryFilter}
          priorityFilter={priorityFilter}
          statusFilter={statusFilter}
          categories={categories}
          onSearchChange={setSearchTerm}
          onCategoryChange={setCategoryFilter}
          onPriorityChange={setPriorityFilter}
          onStatusChange={setStatusFilter}
        />

        <MessageTable
          messages={filteredMessages}
          onDelete={handleDeleteMessage}
          onReply={handleReplyMessage}
        />
      </div>
    </div>
  );
}