function RecentOrdersTable({ orders }) {
  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Đơn hàng gần đây
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Danh sách các đơn hàng mới cập nhật
          </p>
        </div>

        <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="border-b border-slate-200">
            <tr className="text-left">
              <th className="pb-3 text-sm font-semibold text-slate-500">
                Mã đơn
              </th>
              <th className="pb-3 text-sm font-semibold text-slate-500">
                Khách hàng
              </th>
              <th className="pb-3 text-sm font-semibold text-slate-500">
                Sản phẩm
              </th>
              <th className="pb-3 text-sm font-semibold text-slate-500">
                Ngày
              </th>
              <th className="pb-3 text-sm font-semibold text-slate-500">
                Tổng tiền
              </th>
              <th className="pb-3 text-sm font-semibold text-slate-500">
                Trạng thái
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-slate-100 last:border-b-0"
              >
                <td className="py-4 text-sm font-semibold text-slate-700">
                  {order.id}
                </td>
                <td className="py-4 text-sm text-slate-600">
                  {order.customer}
                </td>
                <td className="py-4 text-sm text-slate-600">{order.product}</td>
                <td className="py-4 text-sm text-slate-500">{order.date}</td>
                <td className="py-4 text-sm font-medium text-slate-700">
                  {order.total}
                </td>
                <td className="py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrdersTable;
