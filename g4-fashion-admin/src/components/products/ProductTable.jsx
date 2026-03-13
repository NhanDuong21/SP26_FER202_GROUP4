import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  iconActionButtonClass,
  tableCellClass,
  tableHeaderCellClass,
} from "../../utils/uiClasses";
import { formatCurrency } from "../../utils/categories/formatCurrency";
import { getProductStatusInfo } from "../../utils/products/productUi";

export default function ProductTable({
  products,
  getCategoryName,
  getBrandName,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px] text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className={tableHeaderCellClass}>Hình ảnh</th>
            <th className={tableHeaderCellClass}>Mã SP</th>
            <th className={tableHeaderCellClass}>Tên sản phẩm</th>
            <th className={tableHeaderCellClass}>Danh mục</th>
            <th className={tableHeaderCellClass}>Thương hiệu</th>
            <th className={tableHeaderCellClass}>Giá</th>
            <th className={tableHeaderCellClass}>Tồn kho</th>
            <th className={tableHeaderCellClass}>Trạng thái</th>
            <th className={tableHeaderCellClass}>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const statusInfo = getProductStatusInfo(product.status);

            return (
              <tr
                key={product.id}
                className="border-t border-slate-100 transition hover:bg-slate-50/70"
              >
                <td className={tableCellClass}>
                  <img
                    src={
                      product.image ||
                      "https://dummyimage.com/100x100/e5e7eb/9ca3af&text=No+Image"
                    }
                    alt={product.name}
                    className="h-14 w-14 rounded-xl border border-slate-200 object-cover"
                  />
                </td>

                <td className={`${tableCellClass} font-medium text-slate-600`}>
                  {product.code}
                </td>

                <td className={tableCellClass}>
                  <div className="max-w-[240px]">
                    <p className="font-semibold text-slate-800 line-clamp-1">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                      {product.slug}
                    </p>
                  </div>
                </td>

                <td className={`${tableCellClass} text-slate-600`}>
                  {getCategoryName(product.categoryId)}
                </td>

                <td className={`${tableCellClass} text-slate-600`}>
                  {getBrandName(product.brandId)}
                </td>

                <td className={tableCellClass}>
                  <div className="font-semibold text-slate-800">
                    {formatCurrency(product.salePrice)}
                  </div>

                  {Number(product.salePrice) < Number(product.price) && (
                    <div className="mt-1 text-xs text-slate-400 line-through">
                      {formatCurrency(product.price)}
                    </div>
                  )}
                </td>

                <td className={`${tableCellClass} font-medium text-slate-600`}>
                  {product.stock}
                </td>

                <td className={tableCellClass}>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusInfo.className}`}
                  >
                    {statusInfo.label}
                  </span>
                </td>

                <td className={tableCellClass}>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(product)}
                      className={`${iconActionButtonClass} bg-blue-50 text-blue-600 hover:bg-blue-100`}
                      title="Xem chi tiết"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => onEdit(product)}
                      className={`${iconActionButtonClass} bg-amber-50 text-amber-600 hover:bg-amber-100`}
                      title="Chỉnh sửa"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(product)}
                      className={`${iconActionButtonClass} bg-red-50 text-red-600 hover:bg-red-100`}
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}

          {products.length === 0 && (
            <tr>
              <td colSpan={9} className="px-6 py-12 text-center text-slate-500">
                Chưa có sản phẩm nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
