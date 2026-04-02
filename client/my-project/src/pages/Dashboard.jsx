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
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading tasks...</p>
      </div>
    );
  }

  // Count statistics
  const completedCount = tasks.filter(t => t.status === "completed").length;
  const pendingCount = tasks.filter(t => t.status !== "completed").length;

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Task Dashboard</h1>
        
        {/* Statistics */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="bg-white px-6 py-3 rounded-lg shadow">
            <span className="text-2xl font-bold text-blue-600">{tasks.length}</span>
            <span className="text-gray-600 ml-2">Total Tasks</span>
          </div>
          <div className="bg-white px-6 py-3 rounded-lg shadow">
            <span className="text-2xl font-bold text-yellow-600">{pendingCount}</span>
            <span className="text-gray-600 ml-2">Pending</span>
          </div>
          <div className="bg-white px-6 py-3 rounded-lg shadow">
            <span className="text-2xl font-bold text-green-600">{completedCount}</span>
            <span className="text-gray-600 ml-2">Completed</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left column - Add Task Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <TaskForm refresh={fetchTasks} />
          </div>
          
          {/* Right column - Task List */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Your Tasks ({tasks.length})
            </h2>
            {tasks.length > 0 ? (
              <TaskList tasks={tasks} refresh={fetchTasks} />
            ) : (
              <p className="text-center text-gray-500 py-8">
                No tasks yet. Add one above!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}