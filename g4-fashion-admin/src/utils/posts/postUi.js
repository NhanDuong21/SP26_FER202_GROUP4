export const getPostStatusBadgeClass = (status) => {
  switch (status) {
    case "published":
      return "inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700";
    case "draft":
      return "inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700";
    default:
      return "inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700";
  }
};
