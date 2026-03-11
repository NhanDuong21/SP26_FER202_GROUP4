import { useEffect } from "react";
import { CalendarDays, FolderOpen, Package, Tag, X } from "lucide-react";

export default function CategoryDetailModal({
  isOpen,
  onClose,
  category,
  getParentName,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !category) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-2xl rounded-[28px] bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
              <FolderOpen size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Chi tiết danh mục
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Xem thông tin chi tiết của danh mục
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 px-6 py-6 md:grid-cols-[140px_1fr]">
          <div>
            <img
              src={category.image}
              alt={category.name}
              className="h-32 w-32 rounded-3xl border border-slate-200 object-cover"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <FolderOpen size={16} />
                Tên danh mục
              </p>
              <p className="font-semibold text-slate-800">{category.name}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <Tag size={16} />
                Slug
              </p>
              <p className="font-semibold text-slate-800">{category.slug}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 text-sm text-slate-500">Danh mục cha</p>
              <p className="font-semibold text-slate-800">
                {getParentName(category.parentId)}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <Package size={16} />
                Số sản phẩm
              </p>
              <p className="font-semibold text-slate-800">
                {category.productCount}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 text-sm text-slate-500">Trạng thái</p>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  category.status === "active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {category.status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
              </span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays size={16} />
                Ngày cập nhật
              </p>
              <p className="font-semibold text-slate-800">
                {category.updatedAt}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 px-6 py-4 text-right">
          <button
            onClick={onClose}
            className="rounded-2xl bg-slate-200 px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-300"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
