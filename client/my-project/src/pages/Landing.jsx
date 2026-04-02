import { Link } from "react-router-dom";
import { 
  FiCheckCircle, 
  FiTrendingUp, 
  FiShield, 
  FiClipboard, 
  FiBarChart2,
  FiUsers,
  FiSmile,
  FiArrowRight
} from "react-icons/fi";
import { MdEmail, MdTask } from "react-icons/md";
import TodoIllustration from "../assets/undraw_task-list_qe3p.svg"; // Updated SVG

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section with Image */}
      <div className="flex flex-col items-center justify-center px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left side - Text Content */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
              <FiCheckCircle className="text-blue-600" />
              <span className="text-sm font-semibold">Productivity Redefined</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TaskMaster Pro
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Organize your tasks, boost productivity, and achieve your goals with our powerful task management system
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
            >
              Get Started Free
              <FiArrowRight className="text-lg" />
            </Link>
          </div>

          {/* Right side - SVG Illustration */}
          <div className="flex justify-center">
            <img 
              src={TodoIllustration} 
              alt="Task management illustration" 
              className="w-full max-w-md h-auto animate-float"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Why Choose TaskMaster Pro?
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to manage tasks effectively in one place
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-8 rounded-xl hover:shadow-xl transition group bg-gradient-to-br from-gray-50 to-white">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <FiClipboard className="text-4xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Easy Task Management</h3>
              <p className="text-gray-600">
                Create, edit, and organize your tasks with a simple and intuitive interface that saves you time
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl hover:shadow-xl transition group bg-gradient-to-br from-gray-50 to-white">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <FiTrendingUp className="text-4xl text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Track Progress</h3>
              <p className="text-gray-600">
                Mark tasks as complete and watch your productivity soar with real-time visual statistics
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl hover:shadow-xl transition group bg-gradient-to-br from-gray-50 to-white">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <FiShield className="text-4xl text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is protected with enterprise-grade security, authentication, and encryption
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get started in just three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdEmail className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Create an Account</h3>
              <p className="text-gray-600">
                Sign up in seconds with just your email and password - it's free!
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdTask className="text-3xl text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Add Your Tasks</h3>
              <p className="text-gray-600">
                Create tasks with titles and descriptions to stay organized and focused
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBarChart2 className="text-3xl text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Track & Complete</h3>
              <p className="text-gray-600">
                Mark tasks as done and watch your progress with real-time statistics
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div className="transform hover:scale-105 transition">
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-lg opacity-90">Tasks Completed</div>
            </div>
            <div className="transform hover:scale-105 transition">
              <div className="text-5xl font-bold mb-2">5K+</div>
              <div className="text-lg opacity-90">Happy Users</div>
            </div>
            <div className="transform hover:scale-105 transition">
              <div className="text-5xl font-bold mb-2">99%</div>
              <div className="text-lg opacity-90">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of satisfied users who love TaskMaster Pro
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiUsers className="text-2xl text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Sarah Johnson</h4>
                  <div className="flex text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "TaskMaster Pro has transformed how I manage my daily tasks. The interface is clean and intuitive!"
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FiSmile className="text-2xl text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Mike Chen</h4>
                  <div className="flex text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Finally a task manager that actually helps me stay productive. Highly recommended!"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of users who are already managing their tasks more efficiently
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
          >
            Create Free Account
            <FiArrowRight className="text-lg" />
          </Link>
        </div>
      </div>
    </div>
  );
}