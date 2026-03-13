import { Boxes, CirclePause, PackageCheck, PackageX } from "lucide-react";
import { statCardClass } from "../../utils/uiClasses";

export default function ProductStats({ stats }) {
  const items = [
    {
      title: "Tổng sản phẩm",
      value: stats.total,
      icon: Boxes,
      iconClass: "bg-blue-100 text-blue-600",
    },
    {
      title: "Đang bán",
      value: stats.selling,
      icon: PackageCheck,
      iconClass: "bg-green-100 text-green-600",
    },
    {
      title: "Tạm dừng",
      value: stats.paused,
      icon: CirclePause,
      iconClass: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Hết hàng",
      value: stats.outOfStock,
      icon: PackageX,
      iconClass: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.title} className={statCardClass}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{item.title}</p>
                <h3 className="mt-2 text-3xl font-bold text-slate-800">
                  {item.value}
                </h3>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconClass}`}
              >
                <Icon size={26} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
