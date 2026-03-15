export const getCustomerStatusBadgeClass = (status) => {
  return status === "active"
    ? "inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
    : "inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700";
};

export const getCustomerLevelBadgeClass = (level) => {
  switch (level) {
    case "Gold":
      return "inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700";
    case "Silver":
      return "inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700";
    case "VIP":
      return "inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700";
    case "Bronze":
      return "inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600";
    default:
      return "inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700";
  }
};

export const getActionButtonColorClass = (type) => {
  switch (type) {
    case "view":
      return "bg-sky-50 text-sky-700 hover:bg-sky-100";
    case "edit":
      return "bg-emerald-50 text-emerald-700 hover:bg-emerald-100";
    case "delete":
      return "bg-rose-50 text-rose-700 hover:bg-rose-100";
    default:
      return "bg-slate-100 text-slate-700 hover:bg-slate-200";
  }
};
