import { Bell, Settings } from "lucide-react";

function Topbar() {
  return (
    <div className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
      {/* Left */}
      <div>
        <h1 className="text-lg font-semibold text-slate-800">=</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <button className="relative text-slate-600 hover:text-slate-900">
          <Bell size={20} />

          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Settings */}
        <button className="text-slate-600 hover:text-slate-900">
          <Settings size={20} />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
            A
          </div>

          <div className="hidden flex-col md:flex">
            <span className="text-sm font-semibold text-slate-800">Admin</span>
            <span className="text-xs text-slate-500">nyan@admin.fashon</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
