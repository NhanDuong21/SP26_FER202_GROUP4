import { Search } from "lucide-react";
import { inputClass, inputWithIconClass } from "../../utils/uiClasses";

export default function CategoryToolbar({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
}) {
  return (
    <div className="grid gap-4 border-b border-slate-200 px-6 py-5 md:grid-cols-2">
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm theo tên hoặc slug danh mục..."
          className={inputWithIconClass}
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className={inputClass}
      >
        <option value="all">Tất cả trạng thái</option>
        <option value="active">Hoạt động</option>
        <option value="inactive">Ngưng hoạt động</option>
      </select>
    </div>
  );
}
