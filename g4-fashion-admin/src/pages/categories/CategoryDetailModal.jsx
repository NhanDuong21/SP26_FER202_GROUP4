import { useEffect } from "react";
import { CalendarDays, FolderOpen, Package, Tag, X } from "lucide-react";
import {
  modalOverlayClass,
  modalContainerClass,
  modalHeaderClass,
  modalCloseButtonClass,
  infoItemClass,
  secondaryButtonClass,
} from "../../utils/categories/uiClasses";
import { getCategoryStatusBadgeClass } from "../../utils/categories/categoryUi";

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
    <div onClick={handleOverlayClick} className={modalOverlayClass}>
      <div className={`${modalContainerClass} max-w-2xl`}>
        <div className={modalHeaderClass}>
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

          <button onClick={onClose} className={modalCloseButtonClass}>
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
            <div className={infoItemClass}>
              <p className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <FolderOpen size={16} />
                Tên danh mục
              </p>
              <p className="font-semibold text-slate-800">{category.name}</p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <Tag size={16} />
                Slug
              </p>
              <p className="font-semibold text-slate-800">{category.slug}</p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 text-sm text-slate-500">Danh mục cha</p>
              <p className="font-semibold text-slate-800">
                {getParentName(category.parentId)}
              </p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <Package size={16} />
                Số sản phẩm
              </p>
              <p className="font-semibold text-slate-800">
                {category.productCount}
              </p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 text-sm text-slate-500">Trạng thái</p>
              <span className={getCategoryStatusBadgeClass(category.status)}>
                {category.status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
              </span>
            </div>

            <div className={infoItemClass}>
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
          <button onClick={onClose} className={secondaryButtonClass}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
