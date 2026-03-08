function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-800">{value}</h3>
        </div>

        <div className="rounded-xl bg-slate-100 p-3 text-slate-700">{icon}</div>
      </div>

      <p className="text-sm text-slate-400">{subtitle}</p>
    </div>
  );
}

export default StatCard;
