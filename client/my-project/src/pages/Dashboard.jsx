import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { getTasks } from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      navigate("/login"); // Redirect if not authenticated
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchTasks();
    }
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl mb-4 font-bold">Dashboard</h1>
      <TaskForm refresh={fetchTasks} />
      {loading ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : tasks.length > 0 ? (
        <TaskList tasks={tasks} refresh={fetchTasks} />
      ) : (
        <p className="text-center text-gray-500">No tasks found. Add one above!</p>
      )}
    </div>
  );
}