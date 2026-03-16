import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import NotificationStats from "../../components/notifications/NotificationStats";
import NotificationTable from "../../components/notifications/NotificationTable";
import NotificationCreateModal from "../../components/notifications/NotificationCreateModal";
import NotificationViewModal from "../../components/notifications/NotificationViewModal";
import NotificationDeleteModal from "../../components/notifications/NotificationDeleteModal";
import { notificationService } from "../../services/notificationService";
import { primaryButtonClass } from "../../utils/uiClasses";

export default function NotificationsPage() {

  const [notifications, setNotifications] = useState([]);

  // Create Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // View Modal State
  const [isViewOpen, setIsViewOpen] = useState(false);

  // Delete Modal State
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

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

  const handleCreateNotification = async (data) => {
    try {
      await notificationService.create(data);
      toast.success("Tạo thông báo thành công");
      loadNotifications();
    } catch (error) {
      toast.error("Tạo thông báo thất bại");
    }
  };


  // View Modal Handlers
  const handleOpenView = (notification) => {
    setSelectedNotification(notification);
    setIsViewOpen(true);
  };

  const handleCloseView = () => {
    setIsViewOpen(false);
    setSelectedNotification(null);
  };

  // Delete Modal Handlers
  const handleOpenDelete = (notification) => {
    setSelectedNotification(notification);
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
    setSelectedNotification(null);
  };


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

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Quản lý Thông báo
          </h1>

          <p className="mt-2 text-slate-500">
            Quản lý thông báo và cảnh báo hệ thống
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className={primaryButtonClass}
        >
          <Plus size={18} />
          Tạo thông báo
        </button>

      </div>

      {/* Stats */}

      <NotificationStats stats={stats} />

      {/* Table */}

      <NotificationTable
        notifications={notifications}
        onView={handleOpenView}
        onDelete={handleOpenDelete}
      />

      <NotificationCreateModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateNotification}
      />

      <NotificationViewModal
        open={isViewOpen}
        notification={selectedNotification}
        onClose={handleCloseView}
      />

      <NotificationDeleteModal
        isOpen={isDeleteOpen}
        onClose={handleCloseDelete}
        onConfirm={handleDeleteNotification}
        notification={selectedNotification}
      />
    </div>

  );
}
