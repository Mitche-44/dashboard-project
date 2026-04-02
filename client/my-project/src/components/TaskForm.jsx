import { useState } from "react";
import { addTask } from "../services/api";

export default function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      alert("Please enter a task title");
      return;
    }
    
    setLoading(true);
    
    try {
      const taskData = {
        title: trimmedTitle,
        description: description.trim() || ""
      };
      
      console.log("Sending to backend:", taskData);
      
      const response = await addTask(taskData);
      console.log("Backend response:", response);
      
      // Clear form
      setTitle("");
      setDescription("");
      await refresh();
      
    } catch (err) {
      console.error("Error details:", err);
      const errorMessage = err.response?.data?.error || err.message || "Failed to add task";
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        disabled={loading}
      />
      
      <textarea
        placeholder="Task description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows="3"
        disabled={loading}
      />
      
      <button
        type="submit"
        disabled={loading || !title.trim()}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-all disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}