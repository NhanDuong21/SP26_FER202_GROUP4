import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import MessageStats from "../../components/messages/MessageStats";
import MessageTable from "../../components/messages/MessageTable";
import { messageService } from "../../services/messageService";
import toast from "react-hot-toast";

export default function MessagesPage() {

  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    try {
      const res = await messageService.getAll();
      setMessages(res.data);
    } catch (error) {
      console.error("Load messages failed:", error);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

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
        replyTime: new Date().toISOString()
      };

      await messageService.reply(message.id, updatedMessage);

      toast.success("Gửi phản hồi thành công");

      await loadMessages();

    } catch (error) {
      console.error(error);
      toast.error("Gửi phản hồi thất bại");
    }
  };

  const stats = {
    total: messages.length,
    unread: messages.filter(m => m.status === "Chưa trả lời").length,
    replied: messages.filter(m => m.status === "Đã trả lời").length,
    urgent: messages.filter(m => m.priority === "Cao").length
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Tin nhắn
          </h1>

          <p className="text-slate-500">
            Quản lý tin nhắn từ khách hàng
          </p>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-slate-50"
        >
          <RefreshCw size={16} />
          Làm mới
        </button>

      </div>

      {/* Stats */}

      <MessageStats stats={stats} />

      {/* Table */}

      <MessageTable
        messages={messages}
        onDelete={handleDeleteMessage}
        onReply={handleReplyMessage}
      />


    </div>
  );
}