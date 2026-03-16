import { Search } from "lucide-react";
import { inputClass, inputWithIconClass } from "../../utils/uiClasses";

export default function ProductToolbar({
  searchTerm,
  statusFilter,
  categoryFilter,
  brandFilter,
  categories,
  brands,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onBrandChange,
}) {
  return (
    <div className="grid gap-4 border-b border-slate-200 px-6 py-5 md:grid-cols-2 xl:grid-cols-4">
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm theo mã, tên, slug..."
          className={inputWithIconClass}
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className={inputClass}
      >
        <option value="all">Tất cả trạng thái</option>
        <option value="selling">Đang bán</option>
        <option value="paused">Tạm dừng</option>
        <option value="out_of_stock">Hết hàng</option>
      </select>

      <select
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
        className={inputClass}
      >
        <option value="all">Tất cả danh mục</option>
        {categories.map((category) => (
          <option key={category.id} value={String(category.id)}>
            {category.name}
          </option>
        ))}
      </select>

      <select
        value={brandFilter}
        onChange={(e) => onBrandChange(e.target.value)}
        className={inputClass}
      >
        <option value="all">Tất cả thương hiệu</option>
        {brands.map((brand) => (
          <option key={brand.id} value={String(brand.id)}>
            {brand.name}
          </option>
        ))}
      </select>
    </div>
  );
}
