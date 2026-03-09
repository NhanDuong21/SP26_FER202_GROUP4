function ConfirmDialog({ open, onClose, onConfirm, product }) {
  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold text-slate-800">Xác nhận xóa</h2>
        <p className="mt-3 text-slate-600">
          Bạn có chắc muốn xóa sản phẩm{" "}
          <span className="font-semibold text-slate-800">{product.name}</span>{" "}
          không?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 font-medium text-slate-600 hover:bg-slate-50"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
