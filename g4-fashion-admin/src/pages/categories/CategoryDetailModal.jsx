import { useEffect } from "react";

export default function CategoryDetailModal({
  isOpen,
  onClose,
  category,
  getParentName,
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

  if (!isOpen || !category) return null;

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
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Chi tiết danh mục
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Xem thông tin chi tiết của danh mục
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl px-3 py-2 text-slate-500 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 px-6 py-5 md:grid-cols-[120px_1fr]">
          <div>
            <img
              src={category.image}
              alt={category.name}
              className="h-28 w-28 rounded-2xl border border-slate-200 object-cover"
            />
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-slate-500">Tên danh mục</p>
              <p className="font-semibold text-slate-800">{category.name}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Slug</p>
              <p className="font-semibold text-slate-800">{category.slug}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Danh mục cha</p>
              <p className="font-semibold text-slate-800">
                {getParentName(category.parentId)}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Số sản phẩm</p>
              <p className="font-semibold text-slate-800">
                {category.productCount}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Trạng thái</p>
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                  category.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {category.status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
              </span>
            </div>

            <div>
              <p className="text-sm text-slate-500">Ngày cập nhật</p>
              <p className="font-semibold text-slate-800">
                {category.updatedAt}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 px-6 py-4 text-right">
          <button
            onClick={onClose}
            className="rounded-2xl bg-slate-200 px-4 py-2.5 text-slate-700 hover:bg-slate-300"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
