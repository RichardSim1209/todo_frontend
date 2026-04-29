import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-200 via-indigo-100 to-white flex items-center justify-center py-20">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden bg-white">
        <div className="p-10 md:w-1/2 bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
          <h1 className="text-5xl font-black leading-tight">
            Organize Your Day
          </h1>
          <p className="mt-5 text-lg text-indigo-100">
            Add, update and complete tasks quickly with your dedicated todo
            board.
          </p>
        </div>
        <div className="p-10 md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome to TodoApp
          </h2>
          <p className="mt-3 text-gray-600">
            Login or register to start managing your tasks.
          </p>
          <div className="flex items-center space-x-4 mt-8">
            <Link
              to="/login"
              className="w-full text-center bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="w-full text-center bg-gray-100 text-gray-800 py-3 rounded-lg shadow hover:bg-gray-200 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hero;
