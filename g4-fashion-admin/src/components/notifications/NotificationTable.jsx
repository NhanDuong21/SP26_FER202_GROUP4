import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  Eye,
  Pencil,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";
import {
  tableCellClass,
  iconActionButtonClass,
} from "../../utils/uiClasses";

export default function NotificationTable({
  notifications,
  onView,
  onEdit,
  onDelete,
}) {
  const { t } = useLanguage();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [notifications]);

  const totalPages = Math.max(
    1,
    Math.ceil(notifications.length / itemsPerPage)
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNotifications = notifications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getTypeIcon = (type) => {
    switch (type) {
      case "Cảnh báo":
        return <AlertTriangle className="text-yellow-500" size={18} />;
      case "Thành Công":
        return <CheckCircle className="text-green-500" size={18} />;
      default:
        return <Info className="text-blue-500" size={18} />;
    }
  };

  const getBadge = (value) => {
    switch (value) {
      case "Khẩn cấp":
        return "bg-red-100 text-red-700";
      case "Cao":
        return "bg-orange-100 text-orange-700";
      case "Trung bình":
        return "bg-yellow-100 text-yellow-700";
      case "Thấp":
        return "bg-green-100 text-green-700";

      case "Đã xuất bản":
        return "bg-blue-100 text-blue-700";
      case "Đã lên lịch":
        return "bg-purple-100 text-purple-700";
      case "Đã gửi":
        return "bg-green-100 text-green-700";
      case "Bản nháp":
        return "bg-gray-100 text-gray-600";

      case "Cảnh báo":
        return "bg-yellow-100 text-yellow-700";
      case "Thành Công":
        return "bg-green-100 text-green-700";
      case "Thông Tin":
        return "bg-blue-100 text-blue-700";
      case "Lỗi":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-t border-slate-200 bg-slate-50 text-left">
            <tr>
              <th className="p-4">{t("Icon")}</th>
              <th className="p-4">{t("Tiêu đề")}</th>
              <th className="p-4">{t("Loại")}</th>
              <th className="p-4">{t("Độ ưu tiên")}</th>
              <th className="p-4">{t("Trạng thái")}</th>
              <th className="p-4">{t("Đối tượng nhận")}</th>
              <th className="p-4">{t("Thời gian")}</th>
              <th className="p-4 text-center">{t("Thao tác")}</th>
            </tr>
          </thead>

          <tbody>
            {currentNotifications.map((notification) => (
              <tr
                key={notification.id}
                className="border-t border-slate-100 transition hover:bg-slate-50"
              >
                <td className="p-4">{getTypeIcon(notification.type)}</td>

                <td className="p-4">
                  <div className="max-w-[240px]">
                    <p className="line-clamp-1 font-semibold text-slate-800">
                      {notification.title}
                    </p>
                    <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                      {notification.content}
                    </p>
                  </div>
                </td>

                <td className="p-4">
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${getBadge(
                      notification.type
                    )}`}
                  >
                    {notification.type}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${getBadge(
                      notification.priority
                    )}`}
                  >
                    {notification.priority}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${getBadge(
                      notification.status
                    )}`}
                  >
                    {notification.status}
                  </span>
                </td>

                <td className="p-4 text-slate-600">{notification.target}</td>

                <td className="p-4 text-slate-600">{notification.time}</td>

                <td className={tableCellClass}>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView(notification)}
                      className={`${iconActionButtonClass} bg-blue-50 text-blue-600 hover:bg-blue-100`}
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => onEdit(notification)}
                      className={`${iconActionButtonClass} bg-emerald-50 text-emerald-600 hover:bg-emerald-100`}
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(notification)}
                      className={`${iconActionButtonClass} bg-red-50 text-red-600 hover:bg-red-100`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {currentNotifications.length === 0 && (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                  Không có thông báo phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-6 py-4 text-sm">
        <div className="text-slate-600">
          {t("Trang")} {currentPage} / {totalPages}
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium ${
                  currentPage === page
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>
    </>
  );
}