import { useEffect } from "react";
import { CalendarDays, Package2, Tag, X } from "lucide-react";
import {
  infoItemClass,
  modalCloseButtonClass,
  modalContainerClass,
  modalHeaderClass,
  modalOverlayClass,
} from "../../utils/uiClasses";
import { formatCurrency } from "../../utils/formatCurrency";
import { getProductStatusInfo } from "../../utils/products/productUi";

export default function ProductDetailModal({
  open,
  product,
  getCategoryName,
  getBrandName,
  onClose,
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

  const statusInfo = getProductStatusInfo(product.status);

  return (
    <div className={modalOverlayClass} onClick={onClose}>
      <div
        className={`${modalContainerClass} max-w-4xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={modalHeaderClass}>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Chi tiết sản phẩm
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Xem nhanh thông tin sản phẩm trong hệ thống
            </p>
          </div>

          <button onClick={onClose} className={modalCloseButtonClass}>
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[300px_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <img
              src={
                product.image ||
                "https://dummyimage.com/400x400/e5e7eb/9ca3af&text=No+Image"
              }
              alt={product.name}
              className="h-72 w-full rounded-2xl object-cover"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-slate-500">{product.slug}</p>
              </div>

              <span
                className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusInfo.className}`}
              >
                {statusInfo.label}
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className={infoItemClass}>
                <p className="text-sm text-slate-500">Mã sản phẩm</p>
                <p className="mt-2 font-semibold text-slate-800">
                  {product.code}
                </p>
              </div>

              <div className={infoItemClass}>
                <p className="text-sm text-slate-500">Danh mục</p>
                <p className="mt-2 font-semibold text-slate-800">
                  {getCategoryName(product.categoryId)}
                </p>
              </div>

              <div className={infoItemClass}>
                <p className="text-sm text-slate-500">Thương hiệu</p>
                <p className="mt-2 font-semibold text-slate-800">
                  {getBrandName(product.brandId)}
                </p>
              </div>

              <div className={infoItemClass}>
                <p className="text-sm text-slate-500">Tồn kho</p>
                <p className="mt-2 font-semibold text-slate-800">
                  {product.stock}
                </p>
              </div>

              <div className={infoItemClass}>
                <p className="text-sm text-slate-500">Giá gốc</p>
                <p className="mt-2 font-semibold text-slate-800">
                  {formatCurrency(product.price)}
                </p>
              </div>

              <div className={infoItemClass}>
                <p className="text-sm text-slate-500">Giá bán</p>
                <p className="mt-2 font-semibold text-rose-600">
                  {formatCurrency(product.salePrice)}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className={infoItemClass}>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays size={16} />
                  Ngày tạo
                </div>
                <p className="mt-2 font-semibold text-slate-800">
                  {product.createdAt}
                </p>
              </div>

              <div className={infoItemClass}>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Package2 size={16} />
                  Mã / Slug
                </div>
                <p className="mt-2 font-semibold text-slate-800">
                  {product.code}
                </p>
                <p className="mt-1 text-sm text-slate-500">{product.slug}</p>
              </div>
            </div>

            <div className={`${infoItemClass} mt-4`}>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Tag size={16} />
                Mô tả sản phẩm
              </div>
              <p className="mt-2 leading-7 text-slate-700">
                {product.description || "Chưa có mô tả"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
