import { NavLink } from "react-router-dom";
import { sidebarMenu } from "../../data/sidebarMenu";

function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-slate-900 p-4 text-white">
      <h1 className="mb-4 text-xl font-bold">G4 FASHION</h1>

      <nav className="flex flex-col gap-2">
        {sidebarMenu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="rounded-lg px-3 py-2 hover:bg-white/10"
            >
              <div className="flex items-center gap-2">
                <Icon size={18} />
                <span>{item.title}</span>
              </div>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
