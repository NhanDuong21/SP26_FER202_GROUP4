import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

import NotificationStats from "../../components/notifications/NotificationStats";
import NotificationTable from "../../components/notifications/NotificationTable";
import { notificationService } from "../../services/notificationService";

export default function NotificationsPage() {

  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    try {
      const res = await notificationService.getAll();
      setNotifications(res.data);
    } catch (error) {
      console.error("Load notifications failed:", error);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleDeleteNotification = async (id) => {
    try {

      await notificationService.remove(id);

      toast.success("Xóa thông báo thành công");

      await loadNotifications();

    } catch (error) {

      console.error(error);
      toast.error("Xóa thông báo thất bại");

    }
  };

  const stats = {
    total: notifications.length,
    published: notifications.filter(n => n.status === "Đã xuất bản").length,
    scheduled: notifications.filter(n => n.status === "Đã lên lịch").length,
    draft: notifications.filter(n => n.status === "Bản nháp").length
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Thông báo
          </h1>

          <p className="text-slate-500">
            Quản lý thông báo và cảnh báo hệ thống
          </p>
        </div>
      </div>

      {/* Stats */}

      <NotificationStats stats={stats} />

      {/* Table */}

      <NotificationTable
        notifications={notifications}
        onDelete={handleDeleteNotification}
      />

    </div>
  );
}