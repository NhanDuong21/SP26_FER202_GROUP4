import { Dialog } from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MessageReplyModal({ open, onClose, message, onReply }) {
    const [reply, setReply] = useState("");

    if (!message) return null;

    const handleSend = () => {
        toast.success("Trả lời tin nhắn thành công!");
        setReply("");
        onClose();
        onReply();
    };

    return (
        <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <div className="relative rounded bg-white p-6 w-96">
                <Dialog.Title className="text-lg font-bold mb-2">Trả lời tin nhắn</Dialog.Title>
                <div className="mb-4">
                    <p><b>Khách hàng:</b> {message.name}</p>
                    <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        className="w-full rounded border p-2"
                        placeholder="Nhập phản hồi..."
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button className="rounded border px-4 py-2" onClick={onClose}>Hủy</button>
                    <button className="rounded bg-green-500 px-4 py-2 text-white" onClick={handleSend}>Gửi</button>
                </div>
            </div>
        </Dialog>
    );
}