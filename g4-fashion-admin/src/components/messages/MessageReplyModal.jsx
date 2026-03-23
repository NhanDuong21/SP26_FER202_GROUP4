import { useState, useEffect } from "react";
import { X, Send } from "lucide-react";
import {
    modalOverlayClass,
    modalContainerClass,
    modalHeaderClass,
    modalCloseButtonClass,
} from "../../utils/uiClasses";

export default function MessageReplyModal({ open, message, onClose, onSend }) {

    const [reply, setReply] = useState("");

    // Khi mở modal → load reply từ db.json
    useEffect(() => {
        if (message) {
            setReply(message.reply || "");
        }
    }, [message]);

    if (!open || !message) return null;

    const handleSubmit = () => {
        if (!reply.trim()) return;

        onSend(reply);
    };

    return (
        <div className={modalOverlayClass}>
            <div className={`${modalContainerClass} max-w-xl`}>

                {/* Header */}
                <div className={modalHeaderClass}>
                    <h2 className="text-lg font-bold">
                        Trả lời tin nhắn: {message.title}
                    </h2>

                    <button onClick={onClose} className={modalCloseButtonClass}>
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6 space-y-4">

                    <div className="bg-slate-100 p-4 rounded-lg text-sm text-slate-700">
                        <h2 className="text-lg font-bold mb-2">
                            Tin nhắn gốc:
                        </h2>

                        {message.content}
                    </div>

                    {/* Input reply */}
                    <div>
                        <label className="text-sm font-medium">
                            Nội dung phản hồi
                        </label>

                        <textarea
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            rows={5}
                            className="w-full border rounded-lg p-3 mt-1"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">

                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        >
                            Hủy
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            <Send size={16} />
                            {message.reply ? "Cập nhật phản hồi" : "Gửi phản hồi"}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}