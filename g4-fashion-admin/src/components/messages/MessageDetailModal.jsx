import { Dialog } from "@headlessui/react";

export default function MessageDetailModal({ open, onClose, message }) {
    if (!message) return null;

    return (
        <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <div className="relative rounded bg-white p-6 w-96">
                <Dialog.Title className="text-lg font-bold mb-2">Chi tiết tin nhắn</Dialog.Title>
                <div className="mb-4">
                    <p><b>Khách hàng:</b> {message.name}</p>
                    <p><b>Email:</b> {message.email}</p>
                    <p><b>Số điện thoại:</b> {message.phone}</p>
                    <p><b>Tiêu đề:</b> {message.title}</p>
                    <p><b>Nội dung:</b> {message.content}</p>
                    <p><b>Danh mục:</b> {message.category}</p>
                    <p><b>Ưu tiên:</b> {message.priority}</p>
                    <p><b>Trạng thái:</b> {message.status}</p>
                    <p><b>Thời gian:</b> {message.time}</p>
                </div>
                <button className="mt-2 rounded bg-blue-500 px-4 py-2 text-white" onClick={onClose}>
                    Đóng
                </button>
            </div>
        </Dialog>
    );
}