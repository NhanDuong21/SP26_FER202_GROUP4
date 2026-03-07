import DashBoard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <DashBoard />
    </div>
  );
}

export default App;
