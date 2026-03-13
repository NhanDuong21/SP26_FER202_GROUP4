import { FolderKanban, Tag, Package, Layers3 } from "lucide-react";
import { statCardClass } from "../../utils/uiClasses";

export default function CategoryStats({ stats }) {
  const items = [
    {
      title: "Tổng danh mục",
      value: stats.total,
      icon: FolderKanban,
      iconClass: "bg-sky-100 text-sky-600",
    },
    {
      title: "Đang hoạt động",
      value: stats.active,
      icon: Tag,
      iconClass: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Tổng sản phẩm",
      value: stats.totalProducts,
      icon: Package,
      iconClass: "bg-violet-100 text-violet-600",
    },
    {
      title: "Danh mục gốc",
      value: stats.root,
      icon: Layers3,
      iconClass: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.title} className={statCardClass}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">{item.title}</p>
                <h3 className="mt-3 text-3xl font-bold text-slate-800">
                  {item.value}
                </h3>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconClass}`}
              >
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
