import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Brand Section - Centered */}
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            TaskMaster Pro
          </h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Your productivity partner for managing tasks efficiently and achieving goals.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} TaskMaster Pro. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a 
              href="https://x.com/twitt_login?lang=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              Twitter
            </a>
            <a 
              href="https://github.com/Mitche-44/dashboard-project" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/login/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}