export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} Dashboard App. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
          <a href="#" className="hover:text-blue-400 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}