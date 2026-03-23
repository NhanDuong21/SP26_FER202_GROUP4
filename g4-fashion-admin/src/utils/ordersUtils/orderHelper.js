export const getOrderStatusInfo = (status) => {
  switch (status) {
    case "pending":
      return {
        label: "Chờ xử lý",
        className: "bg-amber-100 text-amber-700",
      };
    case "processing":
      return {
        label: "Đang xử lý",
        className: "bg-sky-100 text-sky-700",
      };
    case "completed":
      return {
        label: "Đã hoàn thành",
        className: "bg-emerald-100 text-emerald-700",
      };
    case "cancelled":
      return {
        label: "Đã hủy",
        className: "bg-rose-100 text-rose-700",
      };
    default:
      return {
        label: "Không xác định",
        className: "bg-slate-100 text-slate-700",
      };
  }
};

export const getPaymentStatusInfo = (status) => {
  switch (status) {
    case "paid":
      return {
        label: "Đã thanh toán",
        className: "bg-emerald-100 text-emerald-700",
      };
    case "unpaid":
      return {
        label: "Chưa thanh toán",
        className: "bg-amber-100 text-amber-700",
      };
    default:
      return {
        label: "Không xác định",
        className: "bg-slate-100 text-slate-700",
      };
  }
};

export const getOrderActions = (status) => {
  switch (status) {
    case "pending":
      return [
        { value: "processing", label: "Chuyển sang đang xử lý" },
        { value: "cancelled", label: "Hủy đơn" },
      ];
    case "processing":
      return [
        { value: "completed", label: "Đánh dấu hoàn thành" },
        { value: "cancelled", label: "Hủy đơn" },
      ];
    default:
      return [];
  }
};

export const filterOrders = (orders, keyword, statusFilter, paymentFilter) => {
  return orders.filter((order) => {
    const search = keyword.trim().toLowerCase();

    const matchKeyword =
      !search ||
      order.code?.toLowerCase().includes(search) ||
      order.customerName?.toLowerCase().includes(search) ||
      order.customerPhone?.toLowerCase().includes(search);

    const matchStatus = !statusFilter || order.status === statusFilter;
    const matchPayment = !paymentFilter || order.paymentStatus === paymentFilter;

    return matchKeyword && matchStatus && matchPayment;
  });
};