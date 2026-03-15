import { Megaphone, CheckCircle, Calendar, FileText } from "lucide-react";
import { statCardClass } from "../../utils/uiClasses";

export default function NotificationStats({ stats }) {

    const items = [
        {
            title: "Tổng thông báo",
            value: stats.total,
            icon: Megaphone,
            iconClass: "bg-blue-100 text-blue-600",
        },
        {
            title: "Đã xuất bản",
            value: stats.published,
            icon: CheckCircle,
            iconClass: "bg-green-100 text-green-600",
        },
        {
            title: "Đã lên lịch",
            value: stats.scheduled,
            icon: Calendar,
            iconClass: "bg-purple-100 text-purple-600",
        },
        {
            title: "Bản nháp",
            value: stats.draft,
            icon: FileText,
            iconClass: "bg-yellow-100 text-yellow-600",
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

                                <p className="text-sm text-slate-500">
                                    {item.title}
                                </p>

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