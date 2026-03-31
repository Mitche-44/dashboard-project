import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to Your Task Dashboard
      </h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Manage your tasks efficiently, keep track of progress, and stay productive.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/signup"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded shadow-lg transition"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded shadow-lg transition"
        >
          Login
        </Link>
      </div>
      <div className="mt-12 text-gray-500 text-sm">
        &copy; 2026 Task Dashboard. All rights reserved.
      </div>
    </div>
  );
}