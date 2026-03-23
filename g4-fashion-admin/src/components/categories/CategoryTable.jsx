import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  tableHeaderCellClass,
  tableCellClass,
  iconActionButtonClass,
} from "../../utils/uiClasses";
import {
  getActionButtonColorClass,
  getCategoryStatusBadgeClass,
} from "../../utils/categories/categoryUi";

export default function CategoryTable({
  categories,
  getParentName,
  getProductCount,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className={tableHeaderCellClass}>Hình ảnh</th>
            <th className={tableHeaderCellClass}>Tên danh mục</th>
            <th className={tableHeaderCellClass}>Danh mục cha</th>
            <th className={tableHeaderCellClass}>Số sản phẩm</th>
            <th className={tableHeaderCellClass}>Trạng thái</th>
            <th className={tableHeaderCellClass}>Ngày cập nhật</th>
            <th className={`${tableHeaderCellClass} text-center`}>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-t border-slate-100 transition hover:bg-slate-50/80"
            >
              <td className={tableCellClass}>
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-14 w-14 rounded-2xl border border-slate-200 object-cover"
                />
              </td>

              <td className={tableCellClass}>
                <div className="font-semibold text-slate-800">
                  {category.name}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  /{category.slug}
                </div>
              </td>

              <td className={`${tableCellClass} text-slate-600`}>
                {category.parentId ? (
                  <span className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                    {getParentName(category.parentId)}
                  </span>
                ) : (
                  <span className="text-slate-500">Danh mục gốc</span>
                )}
              </td>

              <td className={tableCellClass}>
                <span className="font-semibold text-blue-600">
                  {getProductCount(category.id)}
                </span>
              </td>

              <td className={tableCellClass}>
                <span className={getCategoryStatusBadgeClass(category.status)}>
                  {category.status === "active"
                    ? "Hoạt động"
                    : "Ngưng hoạt động"}
                </span>
              </td>

              <td className={`${tableCellClass} text-slate-600`}>
                {category.updatedAt}
              </td>

              <td className={tableCellClass}>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onView(category)}
                    className={`${iconActionButtonClass} ${getActionButtonColorClass(
                      "view",
                    )}`}
                    title="Xem chi tiết"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => onEdit(category)}
                    className={`${iconActionButtonClass} ${getActionButtonColorClass(
                      "edit",
                    )}`}
                    title="Chỉnh sửa"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(category)}
                    className={`${iconActionButtonClass} ${getActionButtonColorClass(
                      "delete",
                    )}`}
                    title="Xóa"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {categories.length === 0 && (
            <tr>
              <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                Chưa có danh mục nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
