import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  const token = localStorage.getItem("token"); // check if user is logged in

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
        <Routes>
          {/* Landing page accessible to everyone */}
          <Route path="/" element={<Landing />} />

          {/* Auth routes */}
          <Route
            path="/login"
            element={token ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/signup"
            element={token ? <Navigate to="/dashboard" /> : <Signup />}
          />

          {/* Protected route */}
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;