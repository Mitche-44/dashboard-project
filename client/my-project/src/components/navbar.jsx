import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            TaskMaster Pro
          </Link>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="px-4 py-2 text-gray-300 hover:text-white font-medium transition"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="px-5 py-2 bg-red-500/20 border border-red-500 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-5 py-2 bg-blue-500/20 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition font-medium"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition shadow-md font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}