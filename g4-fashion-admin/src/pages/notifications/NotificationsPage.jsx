import { useEffect, useMemo, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

import NotificationStats from "../../components/notifications/NotificationStats";
import NotificationTable from "../../components/notifications/NotificationTable";
import NotificationToolbar from "../../components/notifications/NotificationToolbar";
import NotificationCreateModal from "../../components/notifications/NotificationCreateModal";
import NotificationViewModal from "../../components/notifications/NotificationViewModal";
import NotificationEditModal from "../../components/notifications/NotificationEditModal";
import NotificationDeleteModal from "../../components/notifications/NotificationDeleteModal";
import { notificationService } from "../../services/notificationService";
import { primaryButtonClass } from "../../utils/uiClasses";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const loadNotifications = async () => {
    try {
      const res = await notificationService.getAll();
      setNotifications(res.data);
    } catch (error) {
      console.error("Load notifications failed:", error);
      toast.error("Tải danh sách thông báo thất bại");
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      setSearchTerm("");
      setTypeFilter("all");
      setPriorityFilter("all");
      setStatusFilter("all");
      await loadNotifications();
      toast.success("Làm mới dữ liệu thành công");
    } catch (error) {
      console.error("Refresh failed:", error);
      toast.error("Làm mới dữ liệu thất bại");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleCreateNotification = async (data) => {
    try {
      await notificationService.create(data);
      toast.success("Tạo thông báo thành công");
      setIsCreateOpen(false);
      await loadNotifications();
    } catch (error) {
      console.error(error);
      toast.error("Tạo thông báo thất bại");
    }
  };

  const handleUpdateNotification = async (updatedNotification) => {
    try {
      await notificationService.update(
        updatedNotification.id,
        updatedNotification
      );

      toast.success("Cập nhật thông báo thành công");
      setIsEditOpen(false);
      await loadNotifications();
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật thông báo thất bại");
    }
  };

  const handleOpenView = (notification) => {
    setSelectedNotification(notification);
    setIsViewOpen(true);
  };

  const handleCloseView = () => {
    setIsViewOpen(false);
    setSelectedNotification(null);
  };

  const handleOpenEdit = (notification) => {
    setSelectedNotification(notification);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setSelectedNotification(null);
  };

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
      setIsDeleteOpen(false);
      await loadNotifications();
    } catch (error) {
      console.error(error);
      toast.error("Xóa thông báo thất bại");
    }
  };

  const filteredNotifications = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    return notifications.filter((notification) => {
      const matchesSearch =
        !keyword ||
        notification.title?.toLowerCase().includes(keyword) ||
        notification.content?.toLowerCase().includes(keyword) ||
        notification.target?.toLowerCase().includes(keyword);

      const matchesType =
        typeFilter === "all" || notification.type === typeFilter;

      const matchesPriority =
        priorityFilter === "all" || notification.priority === priorityFilter;

      const matchesStatus =
        statusFilter === "all" || notification.status === statusFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesPriority &&
        matchesStatus
      );
    });
  }, [notifications, searchTerm, typeFilter, priorityFilter, statusFilter]);

  const stats = {
    total: notifications.length,
    published: notifications.filter((n) => n.status === "Đã xuất bản").length,
    scheduled: notifications.filter((n) => n.status === "Đã lên lịch").length,
    draft: notifications.filter((n) => n.status === "Bản nháp").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Quản lý Thông báo
          </h1>
          <p className="mt-2 text-slate-500">
            Quản lý thông báo và cảnh báo hệ thống
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={isRefreshing ? "animate-spin" : ""}
            />
            {isRefreshing ? "Đang làm mới..." : "Làm mới"}
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className={primaryButtonClass}
          >
            <Plus size={18} />
            Tạo thông báo
          </button>
        </div>
      </div>

      <NotificationStats stats={stats} />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-semibold text-slate-800">
            Danh sách thông báo
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Hiển thị và lọc toàn bộ thông báo trong hệ thống
          </p>
        </div>

        <NotificationToolbar
          searchTerm={searchTerm}
          typeFilter={typeFilter}
          priorityFilter={priorityFilter}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onTypeChange={setTypeFilter}
          onPriorityChange={setPriorityFilter}
          onStatusChange={setStatusFilter}
        />

        <NotificationTable
          notifications={filteredNotifications}
          onView={handleOpenView}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      </div>

      <NotificationCreateModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateNotification}
        notifications={notifications}
      />

      <NotificationEditModal
        open={isEditOpen}
        notification={selectedNotification}
        onClose={handleCloseEdit}
        onSave={handleUpdateNotification}
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