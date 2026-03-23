import { useMemo } from "react";
import data from "../../../db.json";

function DashboardPage() {
  const stats = useMemo(() => {
    const completedOrders = data.orders.filter(
      (order) => order.status === "completed"
    );

    const totalRevenue = completedOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    const totalOrders = data.orders.length;
    const totalCustomers = data.customers.length;
    const totalProducts = data.products.length;

    const completedCount = data.orders.filter(
      (order) => order.status === "completed"
    ).length;

    const pendingCount = data.orders.filter(
      (order) => order.status === "pending"
    ).length;

    const cancelledCount = data.orders.filter(
      (order) => order.status === "cancelled"
    ).length;

    return {
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
      completedCount,
      pendingCount,
      cancelledCount,
    };
  }, []);

  const monthlyRevenue = useMemo(() => {
    const monthMap = {
      "01": 0,
      "02": 0,
      "03": 0,
      "04": 0,
      "05": 0,
      "06": 0,
      "07": 0,
      "08": 0,
      "09": 0,
      "10": 0,
      "11": 0,
      "12": 0,
    };

    data.orders.forEach((order) => {
      if (order.status === "completed") {
        const month = order.createdAt.slice(5, 7);
        monthMap[month] += order.totalAmount;
      }
    });

    return Object.entries(monthMap).map(([month, revenue]) => ({
      month: `T${parseInt(month, 10)}`,
      revenue,
    }));
  }, []);

  const maxRevenue = Math.max(...monthlyRevenue.map((item) => item.revenue), 1);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[36px] font-extrabold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-500">
          Tổng quan về hoạt động kinh doanh và chỉ số quan trọng
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Tổng doanh thu"
          value={`₫${formatCurrency(stats.totalRevenue)}`}
          change="12.5% so với tháng trước"
          changeColor="text-emerald-500"
          icon="💰"
        />

        <StatCard
          title="Đơn hàng mới"
          value={stats.totalOrders}
          change="8.3% so với tháng trước"
          changeColor="text-emerald-500"
          icon="🛒"
        />

    <StatCard
          title="Khách hàng"
          value={stats.totalCustomers}
          change="2.1% so với tháng trước"
          changeColor="text-rose-500"
          icon="👤"
        />

        <StatCard
          title="Sản phẩm"
          value={stats.totalProducts}
          change="15.7% so với tháng trước"
          changeColor="text-emerald-500"
          icon="🏷️"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <h2 className="mb-6 text-lg font-bold text-slate-800">
            Doanh thu theo tháng
          </h2>

          <div className="flex h-[320px] items-end justify-between gap-4">
            {monthlyRevenue.map((item) => {
              const height = `${Math.max((item.revenue / maxRevenue) * 100, 8)}%`;

              return (
                <div
                  key={item.month}
                  className="flex flex-1 flex-col items-center justify-end gap-3"
                >
                  <div className="text-xs text-slate-400">
                    {item.revenue > 0 ? formatCurrency(item.revenue) : ""}
                  </div>

                  <div className="flex h-[240px] items-end">
                    <div
                      className="w-10 rounded-t-xl bg-sky-500 transition-all duration-300"
                      style={{ height }}
                    />
                  </div>

                  <div className="text-sm font-medium text-slate-500">
                    {item.month}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-bold text-slate-800">
            Trạng thái đơn hàng
          </h2>

          <ul className="space-y-4">
            <StatusItem
              label={`Hoàn thành (${stats.completedCount})`}
              color="green"
            />
            <StatusItem
              label={`Đang xử lý (${stats.pendingCount})`}
              color="yellow"
            />
            <StatusItem
              label={`Đã hủy (${stats.cancelledCount})`}
              color="red"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, changeColor, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <p className="text-base font-medium text-slate-500">{title}</p>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg">
          {icon}
        </div>
      </div>

      <h3 className="text-[36px] font-extrabold tracking-tight text-slate-900">
        {value}
      </h3>

      <p className={`mt-3 text-sm font-medium ${changeColor}`}>↗ {change}</p>
    </div>
  );
}

function StatusItem({ label, color }) {
  const map = {
    green: "bg-emerald-500",
    yellow: "bg-amber-400",
    red: "bg-rose-500",
  };

  return (
    <li className="flex items-center gap-3">
      <span className={`h-3 w-3 rounded-full ${map[color]}`} />
      <span className="text-slate-700">{label}</span>
    </li>
  );
}

export default DashboardPage;