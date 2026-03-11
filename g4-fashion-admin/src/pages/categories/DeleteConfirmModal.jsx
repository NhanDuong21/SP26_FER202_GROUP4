import { useEffect } from "react";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  categoryName,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl">
          🗑️
        </div>

        <h3 className="mt-4 text-center text-xl font-bold text-slate-800">
          Xác nhận xóa
        </h3>

        <p className="mt-3 text-center text-sm leading-6 text-slate-600">
          Bạn có chắc muốn xóa danh mục{" "}
          <span className="font-semibold text-slate-800">{categoryName}</span>?
          Hành động này không thể hoàn tác.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={onClose}
            className="rounded-2xl bg-slate-200 px-4 py-2.5 text-slate-700 hover:bg-slate-300"
          >
            Hủy
          </button>

          <button
            onClick={onConfirm}
            className="rounded-2xl bg-red-600 px-4 py-2.5 text-white hover:bg-red-700"
          >
            Xóa danh mục
          </button>
        </div>
      </div>
    </div>
  );
}
