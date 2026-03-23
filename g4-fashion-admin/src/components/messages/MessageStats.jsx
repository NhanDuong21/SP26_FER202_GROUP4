import { MessageSquare, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { statCardClass } from "../../utils/uiClasses";

export default function MessageStats({ stats }) {

    const items = [
        {
            title: "Tổng tin nhắn",
            value: stats.total,
            icon: MessageSquare,
            iconClass: "bg-blue-100 text-blue-600",
        },
        {
            title: "Chưa trả lời",
            value: stats.unread,
            icon: Clock,
            iconClass: "bg-gray-100 text-gray-600",
        },
        {
            title: "Đã trả lời",
            value: stats.replied,
            icon: CheckCircle,
            iconClass: "bg-green-100 text-green-600",
        },
        {
            title: "Khẩn cấp",
            value: stats.urgent,
            icon: AlertTriangle,
            iconClass: "bg-orange-100 text-orange-600",
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