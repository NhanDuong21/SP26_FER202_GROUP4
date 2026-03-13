import { Dialog } from "@headlessui/react";

export default function MessageDeleteModal({ open, onClose, message, onConfirm }) {
    if (!message) return null;

    return (
        <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <div className="relative rounded bg-white p-6 w-80">
                <Dialog.Title className="text-lg font-bold mb-4">Xóa tin nhắn</Dialog.Title>
                <p>Bạn có chắc muốn xóa tin nhắn từ <b>{message.name}</b> không?</p>
                <div className="mt-4 flex justify-end gap-2">
                    <button className="rounded border px-4 py-2" onClick={onClose}>Hủy</button>
                    <button className="rounded bg-red-500 px-4 py-2 text-white" onClick={onConfirm}>Xóa</button>
                </div>
            </div>
        </Dialog>
    );
}