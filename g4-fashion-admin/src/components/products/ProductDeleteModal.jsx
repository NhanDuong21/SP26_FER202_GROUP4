import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import {
  modalCloseButtonClass,
  modalContainerClass,
  modalHeaderClass,
  modalOverlayClass,
  outlineButtonClass,
  primaryButtonClass,
} from "../../utils/uiClasses";

export default function ProductDeleteModal({
  open,
  product,
  onClose,
  onConfirm,
}) {
  useEffect(() => {
    if (!open) return;

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open || !product) return null;

  return (
    <div className={modalOverlayClass} onClick={onClose}>
      <div
        className={`${modalContainerClass} max-w-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={modalHeaderClass}>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Xác nhận xóa</h2>
            <p className="mt-1 text-sm text-slate-500">
              Hành động này sẽ xóa sản phẩm khỏi hệ thống
            </p>
          </div>

          <button onClick={onClose} className={modalCloseButtonClass}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="rounded-3xl border border-red-100 bg-red-50 p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                <AlertTriangle size={22} />
              </div>

              <div>
                <p className="font-semibold text-slate-800">
                  Bạn có chắc muốn xóa sản phẩm này?
                </p>
                <p className="mt-2 text-slate-600">
                  <span className="font-semibold">{product.name}</span>
                </p>
                <p className="mt-1 text-sm text-slate-500">{product.code}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button onClick={onClose} className={outlineButtonClass}>
              Hủy
            </button>

            <button
              onClick={onConfirm}
              className={`${primaryButtonClass} bg-red-600 hover:bg-red-700`}
            >
              Xóa sản phẩm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
