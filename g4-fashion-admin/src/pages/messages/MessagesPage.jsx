import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import MessageStats from "../../components/messages/MessageStats";
import MessageTable from "../../components/messages/MessageTable";
import { getMessages } from "../../services/messageService";

export default function MessagesPage() {

  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    const data = await getMessages();
    setMessages(data);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const stats = {
    total: messages.length,
    unread: messages.filter(m => m.status === "Chưa đọc").length,
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
          onClick={loadMessages}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-slate-50"
        >
          <RefreshCw size={16} />
          Làm mới
        </button>

      </div>

      {/* Stats */}

      <MessageStats stats={stats} />

      {/* Table */}

      <MessageTable messages={messages} />

    </div>
  );
}