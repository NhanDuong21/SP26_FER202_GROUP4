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

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

function Header({ isCollapsed, onToggleSidebar, onOpenMobileSidebar }) {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setToggleSwitch(theme === "dark");
  }, [theme]);

  const [toggleSwitch, setToggleSwitch] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/users/1")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

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
            {language === "en" ? "EN" : "VN"}
          </button>

          <div 
            onClick={() => {
              setToggleSwitch(!toggleSwitch);
              setTheme(toggleSwitch ? "light" : "dark");
            }}
            className={`hidden h-7 w-12 cursor-pointer items-center rounded-full px-1 transition sm:flex ${
              toggleSwitch ? "bg-blue-500" : "bg-slate-200"
            }`}
          >
            <div 
              className={`h-5 w-5 rounded-full bg-white shadow-sm transition ${
                toggleSwitch ? "translate-x-5" : ""
              }`}
            />
          </div>

          <button 
            onClick={() => navigate("/settings")}
            className="hidden h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 sm:flex"
          >
            <Settings size={18} />
          </button>

          <Link
            to="/notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
          </Link>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="hidden h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 sm:flex"
          >
            <RotateCcw size={18} />
          </button>

          <button className="hidden h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 md:flex">
            <Languages size={18} />
          </button>

          <div className="ml-1 border-l border-slate-200 pl-4">
            <Link
              to="/profile"
              className="flex items-center gap-3 rounded-lg px-2 py-1 transition hover:bg-slate-100"
            >
              <div className="h-11 w-11 overflow-hidden rounded-full border border-slate-200">
                <img
                  src={user?.avatar}
                  alt="avatar"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="hidden sm:block leading-tight">
                <p className="text-[15px] font-semibold text-slate-800">
                  {user?.name}
                </p>
                <p className="text-sm text-slate-500">
                  {user?.email}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;