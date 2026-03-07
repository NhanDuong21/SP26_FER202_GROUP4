import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuClass = ({ isActive }) =>
    `px-4 py-2 rounded transition ${
      isActive ? "bg-slate-700" : "hover:bg-slate-700"
    }`;

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

      <div className="flex flex-col gap-2">
        <NavLink to="/" className={menuClass}>
          Dashboard
        </NavLink>

        <NavLink to="/users" className={menuClass}>
          Users
        </NavLink>

        <NavLink to="/posts" className={menuClass}>
          Posts
        </NavLink>

        <NavLink to="/comments" className={menuClass}>
          Comments
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
