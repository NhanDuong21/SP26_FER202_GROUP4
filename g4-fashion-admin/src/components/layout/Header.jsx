import {
  Bell,
  Languages,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  RotateCcw,
  Settings,
  UserCircle2,
} from "lucide-react";

function Header({ isCollapsed, onToggleSidebar, onOpenMobileSidebar }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div className="flex h-[78px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:bg-slate-50 hover:text-slate-600 lg:hidden"
          >
            <Menu size={18} />
          </button>

          <button
            onClick={onToggleSidebar}
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:bg-slate-50 hover:text-slate-600 lg:flex"
          >
            {isCollapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="hidden px-2 text-sm font-semibold text-slate-500 sm:block">
            VN
          </button>

          <div className="hidden h-7 w-12 items-center rounded-full bg-slate-200 px-1 sm:flex">
            <div className="h-5 w-5 rounded-full bg-white shadow-sm" />
          </div>

          <button className="hidden h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 sm:flex">
            <Settings size={18} />
          </button>

          <button className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>

          <button className="hidden h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 sm:flex">
            <RotateCcw size={18} />
          </button>

          <button className="hidden h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 md:flex">
            <Languages size={18} />
          </button>

          <div className="ml-1 flex items-center gap-3 border-l border-slate-200 pl-3 sm:pl-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <UserCircle2 size={26} />
            </div>

            <div className="hidden sm:block">
              <p className="text-[15px] font-semibold leading-tight text-slate-800">
                Admin G4 Fashion
              </p>
              <p className="text-sm text-slate-500">admin@g4fashion.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
