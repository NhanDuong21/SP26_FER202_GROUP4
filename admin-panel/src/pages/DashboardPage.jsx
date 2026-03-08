import { useEffect, useState } from "react";
import StatCard from "../components/dashboard/StatCard";
import { Users, FileText, MessageSquare, CheckSquare } from "lucide-react";

function DashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
    comments: 0,
    todos: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, postsRes, commentsRes, todosRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/users"),
          fetch("https://jsonplaceholder.typicode.com/posts"),
          fetch("https://jsonplaceholder.typicode.com/comments"),
          fetch("https://jsonplaceholder.typicode.com/todos"),
        ]);

        const users = await usersRes.json();
        const posts = await postsRes.json();
        const comments = await commentsRes.json();
        const todos = await todosRes.json();

        setStats({
          users: users.length,
          posts: posts.length,
          comments: comments.length,
          todos: todos.length,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="mt-1 text-slate-500">
          Welcome back! Here is an overview of your admin panel.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Users"
          value={stats.users}
          subtitle="Registered users"
          icon={<Users size={22} />}
        />

        <StatCard
          title="Total Posts"
          value={stats.posts}
          subtitle="Published posts"
          icon={<FileText size={22} />}
        />

        <StatCard
          title="Total Comments"
          value={stats.comments}
          subtitle="User feedback"
          icon={<MessageSquare size={22} />}
        />

        <StatCard
          title="Total Todos"
          value={stats.todos}
          subtitle="Task records"
          icon={<CheckSquare size={22} />}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
