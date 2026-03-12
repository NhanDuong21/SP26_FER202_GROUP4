import { useEffect } from "react";
import { Building2, Globe, Package, Calendar, X } from "lucide-react";
import {
  modalOverlayClass,
  modalContainerClass,
  modalHeaderClass,
  modalCloseButtonClass,
  infoItemClass,
  secondaryButtonClass,
} from "../../utils/categories/uiClasses";

export default function BrandDetailModal({
  isOpen,
  onClose,
  brand,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !brand) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const getBrandStatusBadgeClass = (status) => {
    return status === "active"
      ? "inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
      : "inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700";
  };

  return (
    <div onClick={handleOverlayClick} className={modalOverlayClass}>
      <div className={`${modalContainerClass} max-w-2xl`}>
        <div className={modalHeaderClass}>
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <Building2 size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Chi tiết thương hiệu
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Xem thông tin chi tiết của thương hiệu
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
              src={brand.logo}
              alt={brand.name}
              className="h-32 w-32 rounded-2xl border border-slate-200 object-cover"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className={infoItemClass}>
              <p className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <Building2 size={16} />
                Tên thương hiệu
              </p>
              <p className="font-semibold text-slate-800">{brand.name}</p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 text-sm text-slate-500">Slug</p>
              <p className="font-semibold text-slate-800">{brand.slug}</p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 text-sm text-slate-500">Quốc gia</p>
              <p className="font-semibold text-slate-800">{brand.country}</p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <Package size={16} />
                Số sản phẩm
              </p>
              <p className="font-semibold text-slate-800">
                {brand.productCount}
              </p>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 text-sm text-slate-500">Trạng thái</p>
              <span className={getBrandStatusBadgeClass(brand.status)}>
                {brand.status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
              </span>
            </div>

            <div className={infoItemClass}>
              <p className="mb-2 text-sm text-slate-500">Nổi bật</p>
              <span className={brand.featured ? "inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700" : "inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"}>
                {brand.featured ? "Có" : "Không"}
              </span>
            </div>

            <div className={`${infoItemClass} md:col-span-2`}>
              <p className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <Globe size={16} />
                Website
              </p>
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-blue-600 hover:underline font-semibold"
              >
                {brand.website}
              </a>
            </div>

            <div className={`${infoItemClass} md:col-span-2`}>
              <p className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <Calendar size={16} />
                Ngày cập nhật
              </p>
              <p className="font-semibold text-slate-800">
                {brand.updatedAt}
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
