import { Search } from "lucide-react";
import { inputClass, inputWithIconClass } from "../../utils/uiClasses";

export default function NotificationToolbar({
    searchTerm,
    typeFilter,
    priorityFilter,
    statusFilter,
    onSearchChange,
    onTypeChange,
    onPriorityChange,
    onStatusChange,
}) {
    return (
        <div className="grid gap-4 border-b border-slate-200 px-6 py-5 md:grid-cols-2 xl:grid-cols-4">

            {/* SEARCH */}
            <div className="relative">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Tìm tiêu đề, nội dung..."
                    className={inputWithIconClass}
                />
            </div>

            {/* TYPE */}
            <select
                value={typeFilter}
                onChange={(e) => onTypeChange(e.target.value)}
                className={inputClass}
            >
                <option value="all">Tất cả loại</option>
                <option value="Cảnh báo">Cảnh báo</option>
                <option value="Lỗi">Lỗi</option>
                <option value="Thành Công">Thành công</option>
                <option value="Thông Tin">Thông tin</option>
            </select>

            {/* PRIORITY */}
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

            {/* STATUS */}
            <select
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value)}
                className={inputClass}
            >
                <option value="all">Tất cả trạng thái</option>
                <option value="Đã xuất bản">Đã xuất bản</option>
                <option value="Đã lên lịch">Đã lên lịch</option>
                <option value="Bản nháp">Bản nháp</option>
            </select>
        </div>
    );
}