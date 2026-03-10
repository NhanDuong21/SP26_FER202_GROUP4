import { NavLink } from "react-router-dom";
import { UserCircle2, X } from "lucide-react";
import { menuItems } from "../../utils/menuItems";

function Sidebar({ isCollapsed, isMobileOpen, onCloseMobile }) {
  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen shrink-0 overflow-hidden bg-[#0e1b46] text-white transition-all duration-300 lg:sticky lg:z-30 ${
          isCollapsed ? "w-[96px]" : "w-[290px]"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          <div
            className={`border-b border-white/10 ${
              isCollapsed ? "px-4 py-5" : "px-7 py-5"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div
                className={`flex items-center ${
                  isCollapsed ? "justify-center" : "gap-4"
                }`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md">
                  <span className="text-sm font-extrabold tracking-wider text-slate-900">
                    G4
                  </span>
                </div>

                {!isCollapsed && (
                  <div>
                    <h1 className="text-[20px] font-extrabold uppercase leading-none tracking-wide">
                      G4 Fashion
                    </h1>
                    <p className="mt-1 text-sm font-medium uppercase tracking-wide text-slate-300">
                      Trang quản trị
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={onCloseMobile}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 hover:bg-white/10 lg:hidden"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div
            className={`border-b border-white/10 ${
              isCollapsed ? "px-3 py-6" : "px-7 py-6"
            }`}
          >
            <div
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "gap-4"
              }`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white">
                <UserCircle2 size={34} strokeWidth={1.8} />
              </div>

              {!isCollapsed && (
                <div className="min-w-0">
                  <p className="truncate text-[18px] font-semibold leading-tight">
                    Admin G4 Fashion
                  </p>
                  <p className="truncate text-sm text-slate-300">
                    admin@g4fashion.com
                  </p>
                </div>
              )}
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-5">
            <div className="space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      `group flex items-center rounded-2xl transition-all duration-200 ${
                        isCollapsed
                          ? "justify-center px-3 py-4"
                          : "h-[58px] gap-4 px-4"
                      } ${
                        isActive
                          ? "bg-gradient-to-r from-[#2d67f6] to-[#5a32d7] text-white shadow-lg"
                          : "text-slate-200 hover:bg-white/10 hover:text-white"
                      }`
                    }
                    title={isCollapsed ? item.label : ""}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Icon size={18} strokeWidth={2.2} />
                    </div>

                    {!isCollapsed && (
                      <span className="truncate text-[17px] font-medium">
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
