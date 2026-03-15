import { ChevronLeft, ChevronRight } from "lucide-react";
import { outlineButtonClass } from "../../utils/uiClasses";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-6 py-4">
      <p className="text-sm text-slate-500">
        Trang{" "}
        <span className="font-semibold text-slate-700">{currentPage}</span> /{" "}
        {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${outlineButtonClass} px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-medium transition ${
              currentPage === page
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${outlineButtonClass} px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
