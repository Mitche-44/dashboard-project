import { deleteTask, updateTask } from "../services/api";

export default function TaskList({ tasks, refresh }) {
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    
    try {
      await deleteTask(id);
      refresh();
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Failed to delete task. Please try again.");
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const newStatus = task.status === "completed" ? "pending" : "completed";
      await updateTask(task.id, { status: newStatus });
      refresh();
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task status.");
    }
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white p-4 rounded shadow hover:shadow-md transition ${
            task.status === "completed" ? "opacity-75 bg-gray-50" : ""
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.status === "completed"}
                  onChange={() => handleToggleComplete(task)}
                  className="w-5 h-5 cursor-pointer"
                />
                <h3 className={`font-semibold text-lg ${
                  task.status === "completed" ? "line-through text-gray-500" : ""
                }`}>
                  {task.title}
                </h3>
              </div>
              
              {task.description && (
                <p className={`text-gray-600 mt-1 ml-8 ${
                  task.status === "completed" ? "line-through text-gray-400" : ""
                }`}>
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center gap-3 mt-2 ml-8">
                <span className={`text-xs px-2 py-1 rounded ${
                  task.status === "completed" 
                    ? "bg-green-100 text-green-700" 
                                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {task.status || "pending"}
                </span>
                {task.created_at && (
                  <span className="text-xs text-gray-400">
                    Created: {new Date(task.created_at).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            
            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-500 hover:text-red-700 font-semibold ml-4"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}