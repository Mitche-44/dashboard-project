import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // go back to landing
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Dashboard App
      </Link>

      <div className="space-x-4">
        {token ? (
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">
              Login
            </Link>
            <Link to="/signup" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}