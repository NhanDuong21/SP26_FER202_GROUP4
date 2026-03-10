import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <Header />

          <main className="flex-1 px-8 py-6">
            <div className="min-h-[calc(100vh-126px)] rounded-[6px] border border-slate-200 bg-[#f8f8f8] p-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
