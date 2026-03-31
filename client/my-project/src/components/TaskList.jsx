import { deleteTask } from "../services/api";

export default function TaskList({ tasks, refresh }) {
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      refresh();
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white p-4 rounded shadow flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{task.title}</p>
            {task.description && <p className="text-gray-500">{task.description}</p>}
            <p className="text-sm text-gray-400">Status: {task.status}</p>
          </div>
          <button
            onClick={() => handleDelete(task.id)}
            className="text-red-500 font-semibold hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}