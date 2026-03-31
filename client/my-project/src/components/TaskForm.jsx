import { useState } from "react";
import { addTask } from "../services/api";

export default function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert("Title is required!");
    try {
      await addTask({ title, description });
      setTitle("");
      setDescription("");
      refresh();
    } catch (err) {
      alert("Failed to add task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col space-y-2">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition-all"
      >
        Add Task
      </button>
    </form>
  );
}