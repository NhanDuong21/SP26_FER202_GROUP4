function StatCard({ title, value, subtitle, icon, change, trend }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900">{value}</h3>
        </div>

        <div className="rounded-xl bg-slate-100 p-3 text-slate-700">{icon}</div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span
          className={`font-semibold ${
            trend === "up" ? "text-green-600" : "text-red-500"
          }`}
        >
          {change}
        </span>
        <span className="text-slate-400">{subtitle}</span>
      </div>
    </div>
  );
}

export default StatCard;
