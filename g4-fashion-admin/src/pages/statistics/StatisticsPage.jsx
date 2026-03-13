import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  DollarSign,
  ShoppingCart,
  Eye,
  Percent,
  Users,
  Heart,
  Star,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { statisticsService } from "../../services/statisticsService";
import { formatCurrency } from "../../utils/statisticsUtils/formatCurrency";
import {
  getRevenueByMonth,
  getTrafficSources,
  getRevenueByCategory,
  getCustomerStats,
  getPerformanceStats,
  getRevenueByDay,
} from "../../utils/statisticsUtils/statisticsHelper";

const COLORS = ["#3b82f6", "#14b8a6", "#f97316", "#a855f7", "#eab308"];

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          ordersRes,
          customersRes,
          categoriesRes,
          visitsRes,
          reviewsRes,
          favoritesRes,
        ] = await Promise.all([
          statisticsService.getOrders(),
          statisticsService.getCustomers(),
          statisticsService.getCategories(),
          statisticsService.getVisits(),
          statisticsService.getReviews(),
          statisticsService.getFavorites(),
        ]);

        const orders = ordersRes.data || [];
        const customers = customersRes.data || [];
        const categories = categoriesRes.data || [];
        const visits = visitsRes.data || [];
        const reviews = reviewsRes.data || [];
        const favorites = favoritesRes.data || [];

        const summary = getPerformanceStats(orders, visits, reviews, favorites);

        setStatistics({
          summary,
          revenueByMonth: getRevenueByMonth(orders),
          revenueByDay: getRevenueByDay(orders),
          trafficSources: getTrafficSources(visits),
          revenueByCategory: getRevenueByCategory(orders, categories),
          customerStats: getCustomerStats(orders, customers),
          performanceStats: {
            totalLikes: summary.totalLikes,
            totalPageviews: summary.totalPageviews,
            averageRating: summary.averageRating,
            averageOrderValue: summary.averageOrderValue,
          },
        });
      } catch (err) {
        console.error("Lỗi lấy thống kê:", err);
        setError("Không thể tải dữ liệu thống kê.");
        toast.error("Tải thống kê thất bại");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm text-slate-500">
        Đang tải dữ liệu...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm text-red-500">
        {error}
      </div>
    );
  }

  const statCards = [
    {
      title: "Doanh thu tháng này",
      value: `${formatCurrency(statistics.summary.totalRevenue)} đ`,
      icon: DollarSign,
      iconClass: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Đơn hàng",
      value: statistics.summary.totalOrders,
      icon: ShoppingCart,
      iconClass: "bg-sky-100 text-sky-600",
    },
    {
      title: "Đơn chờ xử lý",
      value: statistics.summary.pendingOrders,
      icon: ShoppingCart,
      iconClass: "bg-orange-100 text-orange-600",
    },
    {
      title: "Lượt truy cập",
      value: statistics.summary.totalVisits,
      icon: Eye,
      iconClass: "bg-violet-100 text-violet-600",
    },
    {
      title: "Tỷ lệ chuyển đổi",
      value: `${statistics.summary.conversionRate}%`,
      icon: Percent,
      iconClass: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">
          Thống kê & Báo cáo
        </h1>
        <p className="mt-2 text-slate-500">
          Phân tích dữ liệu bán hàng và hiệu suất kinh doanh
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div key={card.title} className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">{card.title}</p>
                  <h3 className="mt-3 text-3xl font-bold text-slate-800">
                    {card.value}
                  </h3>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconClass}`}
                >
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-3xl bg-white p-5 shadow-sm xl:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            Doanh thu theo tháng
          </h2>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={statistics.revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `${formatCurrency(value)} đ`}
                  labelFormatter={(label, payload) => {
                    if (payload && payload.length) {
                      const orders = payload[0].payload.orders;
                      return `${label} • ${orders} đơn`;
                    }
                    return label;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            Nguồn traffic
          </h2>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statistics.trafficSources}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={95}
                  label
                >
                  {statistics.trafficSources.map((item, index) => (
                    <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            Doanh thu theo ngày trong tháng
          </h2>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={statistics.revenueByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `${formatCurrency(value)} đ`}
                  labelFormatter={(label, payload) => {
                    if (payload && payload.length) {
                      const orders = payload[0].payload.orders;
                      return `${label} • ${orders} đơn`;
                    }
                    return label;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#14b8a6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            Doanh thu theo danh mục
          </h2>

          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statistics.revenueByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${formatCurrency(value)} đ`} />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-slate-800">
            Thống kê khách hàng
          </h2>

          <div className="grid grid-cols-2 gap-8">
            <InfoItem
              color="text-blue-500"
              value={statistics.customerStats.totalCustomers}
              label="Tổng khách hàng"
            />
            <InfoItem
              color="text-emerald-500"
              value={statistics.customerStats.newCustomers}
              label="Khách hàng mới"
            />
            <InfoItem
              color="text-amber-500"
              value={statistics.customerStats.vipCustomers}
              label="Khách VIP"
            />
            <InfoItem
              color="text-violet-500"
              value={`${statistics.customerStats.returnRate}%`}
              label="Tỷ lệ quay lại"
            />
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-slate-800">
          Chỉ số hiệu suất
        </h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <SmallStat icon={Heart} color="text-rose-400" value={statistics.performanceStats.totalLikes} label="Tổng lượt thích" />
          <SmallStat icon={Eye} color="text-sky-400" value={statistics.performanceStats.totalPageviews} label="Pageviews" />
          <SmallStat icon={Star} color="text-amber-400" value={statistics.performanceStats.averageRating} label="Đánh giá trung bình" />
          <SmallStat
            icon={Users}
            color="text-violet-400"
            value={`${formatCurrency(statistics.performanceStats.averageOrderValue)} đ`}
            label="Giá trị đơn TB"
          />
        </div>
      </div>
    </div>
  );
}

function InfoItem({ value, label, color }) {
  return (
    <div>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}

function SmallStat({ icon, value, label, color }) {
  const IconComponent = icon;

  return (
    <div className="text-center">
      <IconComponent className={`mx-auto mb-3 ${color}`} size={22} />
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}