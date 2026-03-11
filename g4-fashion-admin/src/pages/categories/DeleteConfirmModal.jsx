export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  categoryName,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="text-lg font-bold text-slate-800">Xác nhận xóa</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Bạn có chắc muốn xóa danh mục{" "}
          <span className="font-semibold text-slate-800">{categoryName}</span>?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-300"
          >
            Hủy
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
