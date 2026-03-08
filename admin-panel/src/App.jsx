import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";

import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import PostsPage from "./pages/PostsPage";
import CommentsPage from "./pages/CommentsPage";
import Topbar from "./components/layout/Topbar";

import "./App.css";

function App() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex flex-1 flex-col">
        <Topbar />

        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/comments" element={<CommentsPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
