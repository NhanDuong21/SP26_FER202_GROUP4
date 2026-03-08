import StatCard from "../components/dashboard/StatCard";
import RecentOrdersTable from "../components/dashboard/RecentOrdersTable";
import { recentOrders } from "../data/ordersData";
import RevenueChart from "../components/dashboard/RevenueChart";
import {
  dashboardStats,
  monthlyRevenue,
  orderStatusData,
} from "../data/dashboardData";

function DashboardPage() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      {/* Stats Cards */}
      {/* Revenue + Order Status */}
      {/* Recent Orders */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-500">
          Tổng quan về hoạt động kinh doanh và chỉ số quan trọng
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((item) => {
          const Icon = item.icon;

          return (
            <StatCard
              key={item.id}
              title={item.title}
              value={item.value}
              subtitle={item.subtitle}
              change={item.change}
              trend={item.trend}
              icon={<Icon size={22} />}
            />
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueChart data={monthlyRevenue} />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-slate-800">
            Trạng thái đơn hàng
          </h2>

          <div className="space-y-5">
            {orderStatusData.map((item) => (
              <div key={item.id}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium text-slate-600">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    {item.value}%
                  </span>
                </div>

                <div className="h-3 w-full rounded-full bg-slate-100">
                  <div
                    className={`h-3 rounded-full ${item.color}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Tổng đơn hàng tháng này</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">1,234</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <RecentOrdersTable orders={recentOrders} />
      </div>
    </div>
  );
}

export default DashboardPage;
