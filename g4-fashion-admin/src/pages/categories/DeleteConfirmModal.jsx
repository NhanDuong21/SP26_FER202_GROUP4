import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import {
  modalOverlayClass,
  modalContainerClass,
  modalCloseButtonClass,
  secondaryButtonClass,
} from "../../utils/uiClasses";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  categoryName,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div onClick={handleOverlayClick} className={modalOverlayClass}>
      <div className={`${modalContainerClass} max-w-md p-6`}>
        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
            <AlertTriangle size={26} />
          </div>

          <button onClick={onClose} className={modalCloseButtonClass}>
            <X size={20} />
          </button>
        </div>

        <h3 className="mt-4 text-xl font-bold text-slate-800">Xác nhận xóa</h3>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Bạn có chắc muốn xóa danh mục{" "}
          <span className="font-semibold text-slate-800">{categoryName}</span>?
          Hành động này không thể hoàn tác.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className={secondaryButtonClass}>
            Hủy
          </button>

          <button
            onClick={onConfirm}
            className="rounded-2xl bg-red-600 px-4 py-2.5 font-medium text-white transition hover:bg-red-700"
          >
            Xóa danh mục
          </button>
        </div>
      </div>
    </div>
  );
}
