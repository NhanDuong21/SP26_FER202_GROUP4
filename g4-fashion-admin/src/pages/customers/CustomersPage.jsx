import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Eye,
  Pencil,
  Trash2,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { customerService } from "../../services/customer";
import {
  tableCellClass,
  tableHeaderCellClass,
  iconActionButtonClass,
  inputClass,
  cardClass,
  sectionHeaderClass,
  primaryButtonClass,
} from "../../utils/customers/uiClasses";
import {
  getCustomerStatusBadgeClass,
  getCustomerLevelBadgeClass,
  getActionButtonColorClass,
} from "../../utils/customers/customerUi";
import CustomerFormModal from "./CustomerFormModal";
import CustomerDetailModal from "./CustomerDetailModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { formatCurrency } from "../../utils/formatCurrency";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingCustomer, setDeletingCustomer] = useState(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await customerService.getAll();
      setCustomers(res.data);
    } catch (err) {
      console.error("Lỗi lấy khách hàng:", err);
      setError("Không thể tải dữ liệu khách hàng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredCustomers = customers.filter((c) => {
    const matchSearch = [c.name, c.email, c.phone, c.code]
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchStatus =
      !statusFilter || c.status === statusFilter ? true : false;
    return matchSearch && matchStatus;
  });

  const handleOpenCreate = () => {
    setEditingCustomer(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (customer) => {
    setEditingCustomer(customer);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingCustomer(null);
    setIsFormOpen(false);
  };

  const handleSubmitForm = async (payload) => {
    try {
      if (editingCustomer) {
        await customerService.update(editingCustomer.id, payload);
        toast.success("Cập nhật khách hàng thành công");
      } else {
        await customerService.create(payload);
        toast.success("Thêm khách hàng thành công");
      }
      await fetchCustomers();
      handleCloseForm();
    } catch (err) {
      console.error("Lỗi lưu khách hàng:", err);
      toast.error("Không thể lưu khách hàng");
    }
  };

  const handleOpenDetail = (customer) => {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setSelectedCustomer(null);
    setIsDetailOpen(false);
  };

  const handleOpenDelete = (customer) => {
    setDeletingCustomer(customer);
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setDeletingCustomer(null);
    setIsDeleteOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await customerService.remove(deletingCustomer.id);
      await fetchCustomers();
      handleCloseDelete();
      toast.success("Xóa khách hàng thành công");
    } catch (err) {
      console.error("Lỗi xóa khách hàng:", err);
      toast.error("Không thể xóa khách hàng");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Quản lý Khách hàng
          </h1>
          <p className="mt-2 text-slate-500">
            Danh sách khách hàng trong hệ thống
          </p>
        </div>

        <button onClick={handleOpenCreate} className={primaryButtonClass}>
          <User size={18} />
          Thêm khách hàng
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email, điện thoại hoặc mã khách hàng"
            value={searchText}
            onChange={handleSearchChange}
            className={`${inputClass} pl-10`}
          />
        </div>

        <select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="w-full md:w-48 rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Ngưng hoạt động</option>
        </select>
      </div>

      <div className={cardClass}>
        <div className={sectionHeaderClass}>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Danh sách khách hàng
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Quản lý thông tin khách hàng
            </p>
          </div>
        </div>

        {loading ? (
          <div className="px-6 py-10 text-slate-500">Đang tải dữ liệu...</div>
        ) : error ? (
          <div className="px-6 py-10 text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className={tableHeaderCellClass}>Khách hàng</th>
                  <th className={tableHeaderCellClass}>Thông tin liên hệ</th>
                  <th className={tableHeaderCellClass}>Cấp độ</th>
                  <th className={tableHeaderCellClass}>Đơn hàng</th>
                  <th className={tableHeaderCellClass}>Tổng chi tiêu</th>
                  <th className={tableHeaderCellClass}>Đơn hàng cuối</th>
                  <th className={tableHeaderCellClass}>Trang thái</th>
                  <th className={`${tableHeaderCellClass} text-center`}>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.map((c) => (
                  <tr
                    key={c.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50/80"
                  >
                    <td className={tableCellClass}>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                          <User size={18} />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">
                            {c.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {c.code}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className={`${tableCellClass} text-slate-600`}>
                      <div>{c.email}</div>
                      <div className="mt-1 text-xs">{c.phone}</div>
                    </td>

                    <td className={tableCellClass}>
                      <span className={getCustomerLevelBadgeClass(c.level)}>
                        {c.level}
                      </span>
                    </td>

                    <td className={tableCellClass}>
                      <div className="inline-flex items-center gap-1 font-semibold text-slate-800">
                        <ShoppingCart size={16} /> {c.orderCount || 0}
                      </div>
                    </td>

                    <td className={tableCellClass}>
                      {formatCurrency(c.totalSpent || 0)}
                    </td>

                    <td className={`${tableCellClass} text-slate-600`}>{c.lastOrderDate}</td>

                    <td className={tableCellClass}>
                      <span className={getCustomerStatusBadgeClass(c.status)}>
                        {c.status === "active" ? "Hoạt động" : "Ngưng hoạt động"}
                      </span>
                    </td>

                    <td className={tableCellClass}>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenDetail(c)}
                          className={`${iconActionButtonClass} ${getActionButtonColorClass(
                            "view",
                          )}`}
                          title="Xem"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(c)}
                          className={`${iconActionButtonClass} ${getActionButtonColorClass(
                            "edit",
                          )}`}
                          title="Chỉnh sửa"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(c)}
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

                {filteredCustomers.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      Không có khách hàng nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* footer with simple pagination info */}
            <div className="px-6 py-4 flex items-center justify-between text-sm text-slate-600">
              <div>
                {`1-${filteredCustomers.length} của ${filteredCustomers.length} khách hàng`}
              </div>
              <div className="flex items-center gap-2">
                {/* placeholder for page buttons */}
                <button className="rounded-full border px-3 py-1">1</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <CustomerFormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
        editingCustomer={editingCustomer}
      />

      <CustomerDetailModal
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        customer={selectedCustomer}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        customerName={deletingCustomer?.name}
      />
    </div>
  );
}

