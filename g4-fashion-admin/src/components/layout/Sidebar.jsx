import { NavLink } from "react-router-dom";
import { UserCircle2 } from "lucide-react";
import { menuItems } from "../../utils/menuItems";

function Sidebar() {
  return (
    <aside className="h-screen w-[290px] shrink-0 overflow-hidden bg-[#0e1b46] text-white">
      <div className="flex h-full flex-col">
        <div className="border-b border-white/10 px-7 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md">
              <span className="text-sm font-extrabold tracking-wider text-slate-900">
                G4
              </span>
            </div>

            <div>
              <h1 className="text-[20px] font-extrabold uppercase leading-none tracking-wide">
                G4 Fashion
              </h1>
              <p className="mt-1 text-sm font-medium uppercase tracking-wide text-slate-300">
                Trang quản trị
              </p>
            </div>
          </div>
        </div>

        <div className="border-b border-white/10 px-7 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white">
              <UserCircle2 size={34} strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-[18px] font-semibold leading-tight">
                Admin G4 Fashion
              </p>
              <p className="truncate text-sm text-slate-300">
                admin@g4fashion.com
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <div className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex h-[58px] items-center gap-4 rounded-2xl px-4 transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-[#2d67f6] to-[#5a32d7] text-white shadow-lg"
                        : "text-slate-200 hover:bg-white/8 hover:text-white"
                    }`
                  }
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <Icon size={18} strokeWidth={2.2} />
                  </div>

                  <span className="text-[17px] font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
