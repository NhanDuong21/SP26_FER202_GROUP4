export default function OrdersPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPrev,
  onNext,
}) {
  if (totalItems <= 0) return null;

  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-slate-500">
        Hiển thị{" "}
        <span className="font-medium text-slate-700">
          {(currentPage - 1) * itemsPerPage + 1}
        </span>{" "}
        -{" "}
        <span className="font-medium text-slate-700">
          {Math.min(currentPage * itemsPerPage, totalItems)}
        </span>{" "}
        trong tổng số{" "}
        <span className="font-medium text-slate-700">{totalItems}</span> đơn hàng
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Trước
        </button>

        <span className="text-sm text-slate-600">
          Trang <span className="font-semibold">{currentPage}</span> /{" "}
          <span className="font-semibold">{totalPages || 1}</span>
        </span>

        <button
          onClick={onNext}
          disabled={currentPage === totalPages || totalPages === 0}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
}