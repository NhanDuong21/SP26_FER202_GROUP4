import { Search } from "lucide-react";
import { inputClass, inputWithIconClass } from "../../utils/uiClasses";

export default function MessageToolbar({
    searchTerm,
    categoryFilter,
    priorityFilter,
    statusFilter,
    categories,
    onSearchChange,
    onCategoryChange,
    onPriorityChange,
    onStatusChange,
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
                    placeholder="Tìm theo tên, email, tiêu đề..."
                    className={inputWithIconClass}
                />
            </div>

            <select
                value={categoryFilter}
                onChange={(e) => onCategoryChange(e.target.value)}
                className={inputClass}
            >
                <option value="all">Tất cả danh mục</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            <select
                value={priorityFilter}
                onChange={(e) => onPriorityChange(e.target.value)}
                className={inputClass}
            >
                <option value="all">Tất cả độ ưu tiên</option>
                <option value="Khẩn cấp">Khẩn cấp</option>
                <option value="Cao">Cao</option>
                <option value="Trung bình">Trung bình</option>
                <option value="Thấp">Thấp</option>
            </select>

            <select
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value)}
                className={inputClass}
            >
                <option value="all">Tất cả trạng thái</option>
                <option value="Chưa trả lời">Chưa trả lời</option>
                <option value="Đã trả lời">Đã trả lời</option>
            </select>
        </div>
    );
}